import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="topbar">
      <NavLink to="/" className="brand"><span className="brand-ball">◉</span><span>POKÉ<span className="brand-light">DEX</span></span></NavLink>
      <nav className="navigation">
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/pokedex">Pokédex</NavLink>
        <NavLink to="/favoritos">Favoritos</NavLink>
        <NavLink to="/cadastrar" className="nav-add">＋ Cadastrar</NavLink>
      </nav>
    </header>
  );
}
