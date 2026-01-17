
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical rendering error:", error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">Failed to load application. Please check console.</div>`;
  }
} else {
  console.error("Could not find root element to mount to");
}
