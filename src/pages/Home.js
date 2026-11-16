import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PokemonCard from '../components/PokemonCard';
import { usePokemon } from '../context/PokemonContext';

export default function Home() {
  const { pokemon, favoritos } = usePokemon();
  const capturados = useMemo(() => pokemon.filter((item) => item.capturado).length, [pokemon]);
  const recentes = pokemon.slice(0, 4);
  return <div className="app-layout"><Sidebar /><main className="main-content"><section className="welcome-banner"><div><span className="eyebrow">CENTRO DE TREINAMENTO</span><h1>Bem-vindo à sua <span>Pokédex!</span></h1><p>Descubra, organize e acompanhe seus Pokémon favoritos.</p><Link className="primary-button" to="/pokedex">Explorar Pokédex <span>→</span></Link></div><div className="banner-orb"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" /></div><div className="banner-decoration">POKÉMON</div></section>
    <section className="stats-grid"><div className="stat-card"><div className="stat-icon red">◉</div><div><span>Total de Pokémon</span><strong>{pokemon.length}</strong><small>Na sua Pokédex</small></div></div><div className="stat-card"><div className="stat-icon green">✓</div><div><span>Capturados</span><strong>{capturados}</strong><small>{pokemon.length ? Math.round(capturados / pokemon.length * 100) : 0}% da coleção</small></div></div><div className="stat-card"><div className="stat-icon yellow">♥</div><div><span>Favoritos</span><strong>{favoritos.length}</strong><small>Seus preferidos</small></div></div></section>
    <section className="section-heading"><div><span className="eyebrow">SUA COLEÇÃO</span><h2>Pokémon em destaque</h2></div><Link to="/pokedex" className="text-link">Ver todos <span>→</span></Link></section>
    <div className="pokemon-grid">{recentes.map((item, index) => <PokemonCard key={item.id} item={item} index={index} />)}</div>
    <section className="home-bottom"><div><span className="eyebrow">DICA DO TREINADOR</span><h3>Uma jornada começa com o primeiro Pokémon.</h3><p>Conheça os detalhes de cada criatura e monte sua coleção.</p></div><Link to="/cadastrar" className="outline-button">＋ Adicionar Pokémon</Link></section>
  </main></div>;
}
