import React, { useState } from 'react';
import { askClaude } from '../api';

function Pricing() {
  const [item, setItem] = useState('');
  const [materials, setMaterials] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function getPricing() {
    setLoading(true);
    const prompt = `You are a jewelry business expert.
    A handmade jewelry maker wants to sell their work.
    Item: ${item}
    Materials used and costs: ${materials}
    Time taken to make: ${time} minutes
    
    Please provide:
    1. Suggested selling price in Australian dollars
    2. Breakdown of costs
    3. A ready to use Etsy product description
    4. Tips for selling this item
    
    Be specific and practical.`;

    const response = await askClaude(prompt);
    setResult(response);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#6c3fc5' }}>💰 Pricing Helper</h1>
      <p style={{ color: '#666' }}>Calculate your costs and get an Etsy ready description</p>

      <div style={{ background: '#f3effc', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#6c3fc5', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
            What did you make?
          </label>
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="e.g. beaded bracelet, crystal earrings..."
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '15px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#6c3fc5', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
            Materials and costs
          </label>
          <textarea
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            placeholder="e.g. 50 seed beads ($2), elastic cord ($0.50), clasp ($0.30)..."
            style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '15px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#6c3fc5', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
            How long did it take? (minutes)
          </label>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="e.g. 45"
            type="number"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '15px' }}
          />
        </div>

        <button
          onClick={getPricing}
          disabled={loading || !item || !materials || !time}
          style={{ background: '#6c3fc5', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
        >
          {loading ? 'Calculating...' : 'Get Pricing + Etsy Description'}
        </button>
      </div>

      {result && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '2px solid #e0d4f7' }}>
          <h3 style={{ color: '#6c3fc5' }}>Your Pricing Report</h3>
          <p style={{ whiteSpace: 'pre-wrap', color: '#444', lineHeight: '1.8' }}>{result}</p>
        </div>
      )}
    </div>
  );
}

export default Pricing;