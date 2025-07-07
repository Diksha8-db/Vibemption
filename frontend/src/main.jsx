import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { PlaylistProvider } from './context/PlaylistContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <PlaylistProvider>
    <App/>
  </PlaylistProvider>

  </BrowserRouter>
);
