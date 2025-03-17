import React from 'react';
import { StrictMode } from 'react'
import App from './App.jsx'
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);