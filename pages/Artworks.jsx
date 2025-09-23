
import React, {useEffect, useState} from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

export default function Artworks() {
  const [arts, setArts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios.get('/api/artworks', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setArts(r.data))
      .catch(e => console.error(e));
  }, [navigate]);

  return (
    <div style={{
      fontFamily: 'Segoe UI, Arial',
      padding: 32,
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)'
    }}>
      <h2 style={{textAlign:'center', fontSize:36, color:'#3b3b5c', marginBottom:32, letterSpacing:2}}>Art Gallery</h2>
      {arts.length === 0 ? (
        <p style={{textAlign:'center', color:'#888'}}>No artworks found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 32,
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          {arts.map(a => {
            const description = a.description && a.description.trim().length > 0
              ? a.description
              : <span style={{ color: '#bbb' }}>No description provided.</span>;
            return (
              <div key={a.id} style={{
                background: '#fff',
                boxShadow: '0 4px 16px rgba(60,60,100,0.08)',
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'transform 0.2s',
                border: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 420
              }}>
                <img src={a.imageUrl || 'https://via.placeholder.com/350x220?text=No+Image'} alt={a.title} style={{ width: '100%', height: 220, objectFit: 'cover', background: '#f3f3f3' }} />
                <div style={{ padding: '20px 18px 16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#2d2d44', fontSize: 22 }}>{a.title}</h3>
                  <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontStyle: 'italic', fontSize: 15 }}>by {a.artist}</p>
                  <p style={{ margin: 0, color: '#444', fontSize: 16, flex: 1 }}>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
