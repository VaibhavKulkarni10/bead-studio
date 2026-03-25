import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ padding: '60px 20px 40px' }}>
        <h1 style={{ fontSize: '48px', color: '#6c3fc5', marginBottom: '10px' }}>💍 Beadazzled </h1>
        <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px' }}>
          Your AI powered personal jewelry assistant
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', padding: '20px' }}>
        
        <Link to="/face" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#f3effc', borderRadius: '12px', padding: '30px 20px', cursor: 'pointer', border: '2px solid #e0d4f7' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📸</div>
            <h3 style={{ color: '#6c3fc5', marginBottom: '8px' }}>Face Analysis</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>Get jewelry recommendations based on your face shape</p>
          </div>
        </Link>

        <Link to="/design" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#f3effc', borderRadius: '12px', padding: '30px 20px', cursor: 'pointer', border: '2px solid #e0d4f7' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎨</div>
            <h3 style={{ color: '#6c3fc5', marginBottom: '8px' }}>Design Ideas</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>Describe your vibe and get beautiful design suggestions</p>
          </div>
        </Link>

        <Link to="/inventory" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#f3effc', borderRadius: '12px', padding: '30px 20px', cursor: 'pointer', border: '2px solid #e0d4f7' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
            <h3 style={{ color: '#6c3fc5', marginBottom: '8px' }}>Inventory</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>Track your beads and get designs from what you own</p>
          </div>
        </Link>

        <Link to="/tutorials" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#f3effc', borderRadius: '12px', padding: '30px 20px', cursor: 'pointer', border: '2px solid #e0d4f7' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📚</div>
            <h3 style={{ color: '#6c3fc5', marginBottom: '8px' }}>Tutorials</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>Step by step guides tailored to your skill level</p>
          </div>
        </Link>

        <Link to="/pricing" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#f3effc', borderRadius: '12px', padding: '30px 20px', cursor: 'pointer', border: '2px solid #e0d4f7' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>💰</div>
            <h3 style={{ color: '#6c3fc5', marginBottom: '8px' }}>Pricing Helper</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>Calculate costs and generate Etsy descriptions</p>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Home;