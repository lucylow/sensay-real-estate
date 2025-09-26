import React from 'react';

const MinimalApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        PropGuard AI - Sensay Real Estate Chatbot
      </h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        This is a minimal test to verify the app is loading correctly.
      </p>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#2563eb', marginBottom: '10px' }}>
          🏆 Hackathon Features Implemented:
        </h2>
        <ul style={{ color: '#333', lineHeight: '1.6' }}>
          <li>✅ AI-Powered Risk Prediction Engine</li>
          <li>✅ Dynamic Pricing Intelligence</li>
          <li>✅ Contextual Memory System</li>
          <li>✅ ROI Impact Calculator</li>
          <li>✅ Multi-language Support</li>
          <li>✅ Cross-Platform Continuity</li>
        </ul>
        <p style={{ marginTop: '20px', color: '#666' }}>
          If you can see this, React is working correctly!
        </p>
      </div>
    </div>
  );
};

export default MinimalApp;
