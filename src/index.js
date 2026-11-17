import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PokemonProvider } from './context/PokemonContext';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </BrowserRouter>
  </React.StrictMode>
);
