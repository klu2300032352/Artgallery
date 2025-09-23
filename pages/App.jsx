import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="main-app-container">
      <header className="navbar">
        <h1 className="logo">Online Art Gallery</h1>
        <nav className="nav-links">
          <Link to="/artworks">Gallery</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/payment">Payment</Link>
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {!isLoggedIn && <Link to="/signup">Sign Up</Link>}
          {isLoggedIn && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
        </nav>
      </header>
      <main className="welcome-section">
        <p>Welcome! Browse beautiful art pieces.</p>
      </main>
    </div>
  );
}
