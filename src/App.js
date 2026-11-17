import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Detalhes from './pages/Detalhes';
import Cadastrar from './pages/Cadastrar';
import Editar from './pages/Editar';

export default function App() {
  return <><Header /><Routes><Route path="/" element={<Home />} /><Route path="/pokedex" element={<Pokedex />} /><Route path="/favoritos" element={<Pokedex somenteFavoritos />} /><Route path="/pokemon/:id" element={<Detalhes />} /><Route path="/pokemon/:id/editar" element={<Editar />} /><Route path="/cadastrar" element={<Cadastrar />} /><Route path="*" element={<Home />} /></Routes><footer className="footer">Pokédex Explorer <span>Projeto acadêmico desenvolvido com React</span></footer></>;
}
