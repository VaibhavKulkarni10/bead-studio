import React, { useState, useRef } from 'react';
import { askClaude } from '../api';

function FaceAnalysis() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState('');

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setStreaming(true);
    } catch (err) {
      alert('Could not access camera. Please allow camera permissions.');
    }
  }

  function capturePhoto() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const photoData = canvas.toDataURL('image/jpeg');
    setPhoto(photoData);
    video.srcObject.getTracks().forEach(track => track.stop());
    setStreaming(false);
  }

  async function analyseFace() {
    setLoading(true);
    try {
      const canvas = canvasRef.current;
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
      const formData = new FormData();
      formData.append('file', blob, 'face.jpg');

      const mlResponse = await fetch('http://localhost:8000/analyse-face', {
        method: 'POST',
        body: formData
      });

      const mlData = await mlResponse.json();

      if (mlData.error) {
        alert(mlData.error);
        setLoading(false);
        return;
      }

      setResult(mlData);

      const prompt = `You are an expert jewelry stylist.
A person has the following features:
- Face shape: ${mlData.face_shape}
- Skin tone: ${mlData.skin_tone}

Please provide personalised jewelry recommendations including:
1. Best earring styles for their face shape and why
2. Best necklace styles and lengths
3. Best bracelet styles
4. Colors and metals that complement their skin tone
5. Styles to avoid and why

Be specific, practical and encouraging.`;

      const rec = await askClaude(prompt);
      setRecommendations(rec);

    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  function retake() {
    setPhoto(null);
    setResult(null);
    setRecommendations('');
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#6c3fc5' }}>📸 Face Analysis</h1>
      <p style={{ color: '#666' }}>Get personalised jewelry recommendations based on your face shape and skin tone</p>

      <div style={{ background: '#f3effc', padding: '20px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
        
        {!photo && (
          <>
            <video
              ref={videoRef}
              style={{ width: '100%', borderRadius: '8px', display: streaming ? 'block' : 'none' }}
            />
            {!streaming && (
              <div style={{ padding: '40px', color: '#888' }}>
                <div style={{ fontSize: '60px', marginBottom: '10px' }}>📷</div>
                <p>Click below to start your camera</p>
              </div>
            )}
            {!streaming ? (
              <button
                onClick={startCamera}
                style={{ background: '#6c3fc5', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
              >
                Start Camera
              </button>
            ) : (
              <button
                onClick={capturePhoto}
                style={{ background: '#6c3fc5', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}
              >
                Take Photo
              </button>
            )}
          </>
        )}

        {photo && (
          <>
            <img src={photo} style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} alt="captured" />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={retake}
                style={{ background: 'white', color: '#6c3fc5', border: '2px solid #6c3fc5', padding: '10px 20px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' }}
              >
                Retake
              </button>
              <button
                onClick={analyseFace}
                disabled={loading}
                style={{ background: '#6c3fc5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' }}
              >
                {loading ? 'Analysing...' : 'Analyse My Face'}
              </button>
            </div>
          </>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {result && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '2px solid #e0d4f7', marginBottom: '20px' }}>
          <h3 style={{ color: '#6c3fc5' }}>Your Results</h3>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ background: '#f3effc', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: '#888' }}>Face Shape</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6c3fc5' }}>{result.face_shape}</div>
            </div>
            <div style={{ background: '#f3effc', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: '#888' }}>Skin Tone</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6c3fc5' }}>{result.skin_tone}</div>
            </div>
          </div>
        </div>
      )}

      {recommendations && (
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '2px solid #e0d4f7' }}>
          <h3 style={{ color: '#6c3fc5' }}>Your Personalised Jewelry Recommendations</h3>
          <p style={{ whiteSpace: 'pre-wrap', color: '#444', lineHeight: '1.8' }}>{recommendations}</p>
        </div>
      )}
    </div>
  );
}

export default FaceAnalysis;