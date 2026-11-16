import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { TypeBadge } from '../components/PokemonCard';
import { usePokemon } from '../context/PokemonContext';

export default function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, favoritos, alternarFavorito, alternarCaptura, removerPokemon } = usePokemon();
  const item = pokemon.find((p) => p.id === Number(id));
  if (!item) return <div className="app-layout"><Sidebar /><main className="main-content"><div className="empty-state"><h2>Pokémon não encontrado</h2><p>Esse registro não existe na sua Pokédex.</p><Link to="/pokedex" className="primary-button">Voltar para Pokédex</Link></div></main></div>;
  const favorito = favoritos.includes(item.id);
  const stats = [{ nome: 'HP', valor: item.stats.hp }, { nome: 'Ataque', valor: item.stats.ataque }, { nome: 'Defesa', valor: item.stats.defesa }, { nome: 'Velocidade', valor: item.stats.velocidade }];
  return <div className="app-layout"><Sidebar /><main className="main-content"><button className="back-button" onClick={() => navigate(-1)}>← Voltar</button><section className="detail-hero"><div className="detail-art"><span>#{String(item.id).padStart(3, '0')}</span><img src={item.imagem || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} alt={item.nome} /></div><div className="detail-info"><span className="eyebrow">POKÉMON #{String(item.id).padStart(3, '0')}</span><h1>{item.nome}</h1><div className="type-list">{item.tipos.map((tipo) => <TypeBadge key={tipo} tipo={tipo} />)}</div><p>{item.descricao}</p><div className="detail-facts"><div><span>Altura</span><strong>{item.altura} m</strong></div><div><span>Peso</span><strong>{item.peso} kg</strong></div><div><span>Habilidade</span><strong>{item.habilidade}</strong></div></div><div className="detail-actions"><button className="primary-button" onClick={() => alternarCaptura(item.id)}>{item.capturado ? '✓ Capturado' : '＋ Marcar como capturado'}</button><button className="outline-button" onClick={() => alternarFavorito(item.id)}>{favorito ? '♥ Favorito' : '♡ Favoritar'}</button><Link className="outline-button" to={`/pokemon/${item.id}/editar`}>✎ Editar dados</Link></div></div></section>
    <section className="stats-section"><div className="section-heading"><div><span className="eyebrow">ATRIBUTOS</span><h2>Estatísticas base</h2></div></div>{stats.map((stat) => <div className="stat-line" key={stat.nome}><span>{stat.nome}</span><strong>{stat.valor}</strong><div className="stat-track"><div style={{ width: `${Math.min(stat.valor, 120) / 120 * 100}%` }} /></div></div>)}</section>
    <button className="delete-button" onClick={() => { if (window.confirm(`Excluir ${item.nome} da Pokédex? Essa ação não pode ser desfeita.`)) { removerPokemon(item.id); navigate('/pokedex'); } }}>Excluir Pokémon</button>
  </main></div>;
}
