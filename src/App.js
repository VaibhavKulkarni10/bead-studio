import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import FaceAnalysis from './pages/FaceAnalysis';
import DesignInspiration from './pages/DesignInspiration';
import Inventory from './pages/Inventory';
import Pricing from './pages/Pricing';
import Tutorials from './pages/Tutorials';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial', minHeight: '100vh' }}>
        <nav style={{ background: '#6c3fc5', padding: '15px 30px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', marginRight: '20px' }}>💍 Beadazzled </span>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/face" style={{ color: 'white', textDecoration: 'none' }}>Face Analysis</Link>
          <Link to="/design" style={{ color: 'white', textDecoration: 'none' }}>Design Ideas</Link>
          <Link to="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory</Link>
          <Link to="/pricing" style={{ color: 'white', textDecoration: 'none' }}>Pricing</Link>
          <Link to="/tutorials" style={{ color: 'white', textDecoration: 'none' }}>Tutorials</Link>
        </nav>
        <div style={{ padding: '30px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/face" element={<FaceAnalysis />} />
            <Route path="/design" element={<DesignInspiration />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/tutorials" element={<Tutorials />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;