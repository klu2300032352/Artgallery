import React, { useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from '../services/axios';

const stripePromise = loadStripe('pk_test_51N...YOUR_PUBLIC_KEY...'); // TODO: Replace with your Stripe public key

function PaymentForm() {
  const [amount] = useState(1000); // Example base price
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(1000);
  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toLowerCase() === 'art50') {
      setDiscount(0.5);
      setFinalAmount(amount * 0.5);
      setMessage('Coupon applied! 50% discount.');
    } else if (coupon.trim().toLowerCase() === 'art10') {
      setDiscount(0.1);
      setFinalAmount(amount * 0.9);
      setMessage('Coupon applied! 10% discount.');
    } else {
      setDiscount(0);
      setFinalAmount(amount);
      setMessage('Invalid coupon code.');
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setMessage('');
    try {
      // 1. Create payment intent on backend (replace with your endpoint)
      const res = await axios.post('/api/payments/create-intent', {
        amount: Math.round(finalAmount),
        coupon
      });
      const clientSecret = res.data.clientSecret;

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
      }
    } catch (err) {
      setMessage('Payment failed.');
    }
    setProcessing(false);
  };

  return (
    <div className="auth-container" style={{maxWidth:500}}>
      <h2>Payment</h2>
      <form onSubmit={handlePayment} className="auth-form">
        <div>
          <label>Amount: </label>
          <span style={{fontWeight:'bold', fontSize:18}}>${finalAmount.toFixed(2)}</span>
        </div>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
        />
        <button type="button" onClick={handleApplyCoupon}>Apply Coupon</button>
        <div style={{marginTop:16}}>
          <CardElement options={{hidePostalCode:true}} />
        </div>
        {message && <div style={{marginTop:8, color: discount ? '#388e3c' : '#c62828'}}>{message}</div>}
        <button type="submit" style={{marginTop:16}} disabled={!stripe || processing}>
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
