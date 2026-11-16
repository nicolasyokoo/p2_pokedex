import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';

const cores = { Grama: 'grass', Veneno: 'poison', Fogo: 'fire', Água: 'water', Inseto: 'bug', Voador: 'flying', Normal: 'normal', Elétrico: 'electric', Fada: 'fairy', Terra: 'ground', Pedra: 'rock', Psíquico: 'psychic', Gelo: 'ice', Lutador: 'fighting', Fantasma: 'ghost', Dragão: 'dragon' };

export function TypeBadge({ tipo }) {
  return <span className={`type-badge ${cores[tipo] || 'normal'}`}>{tipo}</span>;
}

export default function PokemonCard({ item, index = 0 }) {
  const { favoritos, alternarFavorito } = usePokemon();
  const favorito = favoritos.includes(item.id);
  return (
    <article className="pokemon-card" style={{ "--card-index": index }}>
      <button className={`favorite-button ${favorito ? 'is-favorite' : ''}`} onClick={() => alternarFavorito(item.id)} aria-label="Alternar favorito">{favorito ? '♥' : '♡'}</button>
      <Link to={`/pokemon/${item.id}`} className="pokemon-card-link">
        <div className="pokemon-art"><span className="card-number">#{String(item.id).padStart(3, '0')}</span><img src={item.imagem || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} alt={item.nome} onError={(e) => { e.currentTarget.style.display = 'none'; }} /></div>
        <div className="pokemon-card-info"><h3>{item.nome}</h3><div className="type-list">{item.tipos.map((tipo) => <TypeBadge key={tipo} tipo={tipo} />)}</div><span className={`capture-label ${item.capturado ? 'captured' : ''}`}>{item.capturado ? '● Capturado' : '○ Não capturado'}</span></div>
      </Link>
    </article>
  );
}
