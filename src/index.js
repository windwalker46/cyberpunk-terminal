// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#111'
    }}>
      <div style={{ width: '800px', height: '600px' }}>
        <App />
      </div>
    </div>
  </React.StrictMode>
);