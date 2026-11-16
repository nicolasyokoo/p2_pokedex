import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import pokemonIniciais from '../data/pokemon';

const PokemonContext = createContext();
function carregarPokemon() {
  try {
    const salvos = JSON.parse(localStorage.getItem('pokedex-pokemon') || 'null');
    if (!Array.isArray(salvos)) return pokemonIniciais;
    // Migra a coleção antiga: inclui os 151 registros sem apagar capturas/edições já feitas.
    const porId = new Map(salvos.map(item => [item.id, item]));
    const base = pokemonIniciais.map(item => ({ ...item, ...(porId.get(item.id) || {}) }));
    const extras = salvos.filter(item => item.personalizado || item.id > 151);
    return [...base, ...extras.filter(item => !base.some(baseItem => baseItem.id === item.id))];
  } catch { return pokemonIniciais; }
}
export function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState(carregarPokemon);
  const [favoritos, setFavoritos] = useState(() => { try { return JSON.parse(localStorage.getItem('pokedex-favoritos') || '[]'); } catch { return []; } });
  useEffect(() => { localStorage.setItem('pokedex-pokemon', JSON.stringify(pokemon)); }, [pokemon]);
  useEffect(() => { localStorage.setItem('pokedex-favoritos', JSON.stringify(favoritos)); }, [favoritos]);
  const alternarFavorito = useCallback(id => setFavoritos(atuais => atuais.includes(id) ? atuais.filter(x => x !== id) : [...atuais,id]), []);
  const adicionarPokemon = useCallback(novo => setPokemon(atuais => [...atuais,novo]), []);
  const atualizarPokemon = useCallback((id, dados) => setPokemon(atuais => atuais.map(item => item.id === id ? { ...item, ...dados, id } : item)), []);
  const removerPokemon = useCallback(id => { setPokemon(atuais => atuais.filter(item => item.id !== id)); setFavoritos(atuais => atuais.filter(item => item !== id)); }, []);
  const alternarCaptura = useCallback(id => setPokemon(atuais => atuais.map(item => item.id === id ? { ...item, capturado: !item.capturado } : item)), []);
  const valor = useMemo(() => ({ pokemon, favoritos, alternarFavorito, adicionarPokemon, atualizarPokemon, removerPokemon, alternarCaptura }), [pokemon,favoritos,alternarFavorito,adicionarPokemon,atualizarPokemon,removerPokemon,alternarCaptura]);
  return <PokemonContext.Provider value={valor}>{children}</PokemonContext.Provider>;
}
export function usePokemon() { return useContext(PokemonContext); }
