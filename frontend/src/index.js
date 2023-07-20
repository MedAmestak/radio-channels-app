import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Router>
    <App />
  </Router>
);
