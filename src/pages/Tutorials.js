import React, { useState } from 'react';
import { askClaude } from '../api';

function Tutorials() {
  const [item, setItem] = useState('');
  const [level, setLevel] = useState('beginner');
  const [tutorial, setTutorial] = useState('');
  const [loading, setLoading] = useState(false);

  async function getTutorial() {
    setLoading(true);
    const prompt = `You are a friendly jewelry making teacher. 
    Create a step by step tutorial for making a ${item} for a ${level} level jewelry maker.
    Include:
    - Materials needed
    - Step by step instructions
    - Beginner tips
    - Common mistakes to avoid
    Keep it encouraging and easy to follow.`;

    const response = await askClaude(prompt);
    setTutorial(response);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#6c3fc5' }}>📚 Tutorials</h1>
      <p style={{ color: '#666' }}>Get step by step jewelry making guides</p>

      <div style={{ background: '#f3effc', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#6c3fc5', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
            What do you want to make?
          </label>
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="e.g. beaded bracelet, earrings, necklace..."
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '15px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#6c3fc5', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
            Skill level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '15px' }}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button
          onClick={getTutorial}
          disabled={loading || !item}
          style={{ background: '#6c3fc5', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
        >
          {loading ? 'Creating tutorial...' : 'Get Tutorial'}
        </button>
      </div>

      {tutorial && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '2px solid #e0d4f7' }}>
          <h3 style={{ color: '#6c3fc5' }}>Your Tutorial</h3>
          <p style={{ whiteSpace: 'pre-wrap', color: '#444', lineHeight: '1.8' }}>{tutorial}</p>
        </div>
      )}
    </div>
  );
}

export default Tutorials;