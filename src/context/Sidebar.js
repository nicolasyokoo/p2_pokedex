import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return <aside className="sidebar"><p className="side-label">MENU PRINCIPAL</p><NavLink to="/" end>▦ <span>Visão geral</span></NavLink><NavLink to="/pokedex">◉ <span>Todos os Pokémon</span></NavLink><NavLink to="/favoritos">♥ <span>Meus favoritos</span></NavLink><NavLink to="/cadastrar">＋ <span>Novo Pokémon</span></NavLink><div className="side-note"><div className="side-note-icon">✦</div><strong>Seja um mestre!</strong><p>Explore, capture e complete sua coleção Pokémon.</p></div></aside>;
}
