import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import RainbowKit from "./Utils/Rainbowkit"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <RainbowKit>
       <App />
    </RainbowKit>
  </React.StrictMode>
  </BrowserRouter>
);


