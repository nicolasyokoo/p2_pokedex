import React, { useMemo, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import PokemonCard from '../components/PokemonCard';
import { usePokemon } from '../context/PokemonContext';

export default function Pokedex({ somenteFavoritos = false }) {
  const { pokemon, favoritos } = usePokemon();
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Todos');
  const [ordem, setOrdem] = useState('numero');
  const [captura, setCaptura] = useState('todos');
  const inputRef = useRef(null);
  function exportarColecao() {
    const arquivo = new Blob([JSON.stringify(pokemon, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(arquivo); const link = document.createElement('a');
    link.href = url; link.download = 'minha-pokedex.json'; link.click(); URL.revokeObjectURL(url);
  }
  const tipos = ['Todos', ...new Set(pokemon.flatMap((item) => item.tipos))].sort((a, b) => a === 'Todos' ? -1 : b === 'Todos' ? 1 : a.localeCompare(b));
  const listaFiltrada = useMemo(() => {
    let resultado = pokemon.filter((item) => (!somenteFavoritos || favoritos.includes(item.id)) && (item.nome.toLowerCase().includes(busca.toLowerCase()) || String(item.id).includes(busca.trim().replace(/^#/,''))) && (tipo === 'Todos' || item.tipos.includes(tipo)) && (captura === 'todos' || (captura === 'capturados' ? item.capturado : !item.capturado)));
    return [...resultado].sort((a, b) => ordem === 'nome' ? a.nome.localeCompare(b.nome) : a.id - b.id);
  }, [pokemon, favoritos, somenteFavoritos, busca, tipo, ordem, captura]);
  return <div className="app-layout"><Sidebar /><main className="main-content"><div className="page-heading"><div><span className="eyebrow">ENCICLOPÉDIA POKÉMON</span><h1>{somenteFavoritos ? 'Meus favoritos' : 'Todos os Pokémon'}</h1><p>{somenteFavoritos ? 'Os Pokémon que você marcou com carinho.' : 'Encontre informações e conheça sua coleção.'}</p></div><div className="heading-actions"><button className="outline-button" onClick={exportarColecao}>↓ Exportar coleção</button><span className="result-count">{listaFiltrada.length} resultados</span></div></div>
    <section className="filter-panel"><div className="search-box"><span>⌕</span><input ref={inputRef} value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome ou número (#025)..." /><button type="button" onClick={() => inputRef.current.focus()}>Buscar</button></div><div className="filter-row"><label>Tipo <select value={tipo} onChange={(e) => setTipo(e.target.value)}>{tipos.map((item) => <option key={item}>{item}</option>)}</select></label><label>Captura <select value={captura} onChange={(e) => setCaptura(e.target.value)}><option value="todos">Todos</option><option value="capturados">Capturados</option><option value="nao">Não capturados</option></select></label><label>Ordenar por <select value={ordem} onChange={(e) => setOrdem(e.target.value)}><option value="numero">Número</option><option value="nome">Nome (A-Z)</option></select></label><button className="clear-button" onClick={() => { setBusca(''); setTipo('Todos'); setOrdem('numero'); setCaptura('todos'); }}>Limpar filtros</button></div></section>
    {listaFiltrada.length ? <div className="pokemon-grid">{listaFiltrada.map((item, index) => <PokemonCard key={item.id} item={item} index={index} />)}</div> : <div className="empty-state"><div>◉</div><h3>Nenhum Pokémon encontrado</h3><p>Tente mudar o nome pesquisado ou os filtros.</p><button className="outline-button" onClick={() => { setBusca(''); setTipo('Todos'); setCaptura('todos'); }}>Limpar pesquisa</button></div>}
  </main></div>;
}
