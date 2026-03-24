import React, { useState } from 'react';
import { askClaude } from '../api';

function DesignInspiration() {
  const [vibe, setVibe] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function getDesignIdeas() {
    setLoading(true);
    const prompt = `You are a jewelry design expert. A beginner jewelry maker wants design ideas. 
    They described their vibe as: "${vibe}". 
    Give them 3 specific jewelry design ideas with bead colors, patterns and styles. 
    Keep it beginner friendly and encouraging.`;
    
    const response = await askClaude(prompt);
    setResult(response);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#6c3fc5' }}>🎨 Design Inspiration</h1>
      <p style={{ color: '#666' }}>Describe your vibe and get AI powered jewelry design ideas</p>

      <textarea
        value={vibe}
        onChange={(e) => setVibe(e.target.value)}
        placeholder="e.g. boho summer vibes, blues and greens, something for a beach holiday..."
        style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '15px', marginBottom: '15px' }}
      />

      <button
        onClick={getDesignIdeas}
        disabled={loading || !vibe}
        style={{ background: '#6c3fc5', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? 'Getting ideas...' : 'Get Design Ideas'}
      </button>

      {result && (
        <div style={{ marginTop: '30px', background: '#f3effc', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ color: '#6c3fc5' }}>Your Design Ideas</h3>
          <p style={{ whiteSpace: 'pre-wrap', color: '#444', lineHeight: '1.7' }}>{result}</p>
        </div>
      )}
    </div>
  );
}

export default DesignInspiration;