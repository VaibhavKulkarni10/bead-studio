import React, { useState } from 'react';

function Inventory() {
  const [beads, setBeads] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState('');

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
    </div>
  );
}

export default Inventory;