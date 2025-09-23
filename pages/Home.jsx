import React from 'react';

export default function Home() {
  return (
    <div className="welcome-section">
      <h2>Welcome to the Online Art Gallery</h2>
      <p>Discover, admire, and purchase beautiful artworks from talented artists around the world. Sign up or log in to start your journey!</p>
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Art Gallery" style={{maxWidth:'100%', borderRadius:12, marginTop:24}} />
    </div>
  );
}
