import React, { useState } from 'react';
import { askClaude } from '../api';

function Inventory() {
  const [beads, setBeads] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [shopResult, setShopResult] = useState('');
  const [shopLoading, setShopLoading] = useState(false);

  function addBead() {
    if (!name || !color || !quantity) return;
    
    const newBead = {
      id: Date.now(),
      name: name,
      color: color,
      quantity: parseInt(quantity)
    };

    setBeads([...beads, newBead]);
    setName('');
    setColor('');
    setQuantity('');
  }

  function removeBead(id) {
    setBeads(beads.filter(bead => bead.id !== id));
  }

  async function findWhereToBuy() {
    setShopLoading(true);
    const prompt = `You are a jewelry supplies expert based in Australia.
    A jewelry maker is looking for: ${searchItem}

    Please provide:
    1. Top online stores in Australia where they can buy this - include the actual website URLs
    2. Any physical stores in Melbourne that might stock this with their addresses
    3. If this exact item is hard to find, suggest 2-3 alternatives that would work just as well
    4. Approximate price range in Australian dollars
    5. Any tips for buying this item

    Format the website links clearly like this: Website: https://www.example.com.au
    Be specific and practical.`;


    const response = await askClaude(prompt);
    setShopResult(response);
    setShopLoading(false);
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#6c3fc5' }}>📦 Inventory</h1>
      <p style={{ color: '#666' }}>Track your bead collection</p>

      <div style={{ background: '#f3effc', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
        <h3 style={{ color: '#6c3fc5', marginTop: '0' }}>Add Beads</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Bead name"
            style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '14px' }}
          />
          <input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
            style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '14px' }}
          />
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            type="number"
            style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '14px' }}
          />
        </div>
        <button
          onClick={addBead}
          style={{ background: '#6c3fc5', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' }}
        >
          Add to Inventory
        </button>
      </div>

      {beads.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center' }}>No beads yet — add some above!</p>
      ) : (
        <div>
          <h3 style={{ color: '#6c3fc5' }}>Your Beads ({beads.length} types)</h3>
          {beads.map(bead => (
            <div key={bead.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '15px', borderRadius: '8px', marginBottom: '10px', border: '1px solid #e0d4f7' }}>
              <div>
                <strong style={{ color: '#444' }}>{bead.name}</strong>
                <span style={{ color: '#888', marginLeft: '10px' }}>{bead.color}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ background: '#f3effc', color: '#6c3fc5', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>{bead.quantity} pieces</span>
                <button
                  onClick={() => removeBead(bead.id)}
                  style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '18px' }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#6c3fc5' }}>🛍️ Shopping Assistant</h3>
        <p style={{ color: '#666' }}>Can't find something? Let AI find it for you</p>
        
        <div style={{ background: '#f3effc', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <input
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="e.g. turquoise chip beads, gold lobster clasp, elastic cord..."
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e0d4f7', fontSize: '15px', marginBottom: '12px' }}
          />
          <button
            onClick={findWhereToBuy}
            disabled={shopLoading || !searchItem}
            style={{ background: '#6c3fc5', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
          >
            {shopLoading ? 'Finding...' : 'Find Where to Buy'}
          </button>
        </div>

        {shopResult && (
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '2px solid #e0d4f7' }}>
            <h3 style={{ color: '#6c3fc5' }}>Shopping Recommendations</h3>
            <p style={{ whiteSpace: 'pre-wrap', color: '#444', lineHeight: '1.8' }}>{shopResult}</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Inventory;