import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { usePokemon } from '../context/PokemonContext';
import { processarImagem } from '../utils/processarImagem';

const tiposDisponiveis = ['Normal','Fogo','Água','Grama','Elétrico','Gelo','Lutador','Veneno','Terra','Voador','Psíquico','Inseto','Pedra','Fantasma','Dragão','Fada','Aço'];

export default function Cadastrar() {
  const navigate = useNavigate();
  const { pokemon, adicionarPokemon } = usePokemon();
  const [formulario, setFormulario] = useState({ nome: '', tipo: 'Fogo', altura: '', peso: '', habilidade: '', descricao: '' });
  const [imagem, setImagem] = useState('');
  const [erro, setErro] = useState('');
  const [status, setStatus] = useState('typing');

  function handleChange(e) { setFormulario({ ...formulario, [e.target.name]: e.target.value }); }
  async function handleImagem(e) {
    const arquivo = e.target.files && e.target.files[0];
    if (!arquivo) return;
    try {
      const imagemProcessada = await processarImagem(arquivo);
      setImagem(imagemProcessada);
      setErro('');
    } catch (error) { setErro(error.message); e.target.value = ''; }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!formulario.nome.trim() || !formulario.altura || !formulario.peso || !formulario.habilidade.trim()) { setErro('Preencha todos os campos obrigatórios.'); return; }
    if (pokemon.some((item) => item.nome.toLowerCase() === formulario.nome.trim().toLowerCase())) { setErro('Já existe um Pokémon com esse nome.'); return; }
    setStatus('submitting');
    const novo = { id: Math.max(0, ...pokemon.map((item) => item.id)) + 1, nome: formulario.nome.trim(), tipos: [formulario.tipo], altura: Number(formulario.altura), peso: Number(formulario.peso), habilidade: formulario.habilidade.trim(), descricao: formulario.descricao.trim() || 'Um novo Pokémon adicionado à sua coleção.', stats: { hp: 50, ataque: 50, defesa: 50, velocidade: 50 }, capturado: false, personalizado: true, imagem };
    adicionarPokemon(novo);
    setStatus('success');
    setErro('');
    setTimeout(() => navigate(`/pokemon/${novo.id}`), 700);
  }

  return <div className="app-layout"><Sidebar /><main className="main-content">
    <div className="page-heading"><div><span className="eyebrow">SUA COLEÇÃO</span><h1>Cadastrar Pokémon</h1><p>Adicione um novo registro à sua Pokédex.</p></div></div>
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-intro"><div className="form-pokeball">◉</div><div><h2>Novo Pokémon</h2><p>Os campos marcados com * são obrigatórios.</p></div></div>
      <div className="image-upload-panel">
        <div className="image-upload-preview">{imagem ? <img src={imagem} alt="Prévia do Pokémon" /> : <span>?</span>}</div>
        <div className="image-upload-copy"><strong>Imagem do Pokémon</strong><p>Escolha uma foto do seu computador. A imagem será ajustada automaticamente.</p>
          <label className="outline-button image-upload-button">＋ Escolher imagem<input type="file" accept="image/*" onChange={handleImagem} disabled={status !== 'typing'} /></label>
          {imagem && <button type="button" className="remove-image-button" onClick={() => setImagem('')}>Remover imagem</button>}
        </div>
      </div>
      <div className="form-grid">
        <label>Nome do Pokémon *<input name="nome" value={formulario.nome} onChange={handleChange} placeholder="Ex.: Pikachu" disabled={status !== 'typing'} /></label>
        <label>Tipo principal *<select name="tipo" value={formulario.tipo} onChange={handleChange} disabled={status !== 'typing'}>{tiposDisponiveis.map((tipo) => <option key={tipo}>{tipo}</option>)}</select></label>
        <label>Altura (m) *<input type="number" min="0.1" step="0.1" name="altura" value={formulario.altura} onChange={handleChange} placeholder="Ex.: 0.6" disabled={status !== 'typing'} /></label>
        <label>Peso (kg) *<input type="number" min="0.1" step="0.1" name="peso" value={formulario.peso} onChange={handleChange} placeholder="Ex.: 8.5" disabled={status !== 'typing'} /></label>
        <label className="full-field">Habilidade principal *<input name="habilidade" value={formulario.habilidade} onChange={handleChange} placeholder="Ex.: Static" disabled={status !== 'typing'} /></label>
        <label className="full-field">Descrição<textarea name="descricao" rows="4" value={formulario.descricao} onChange={handleChange} placeholder="Conte um pouco sobre esse Pokémon..." disabled={status !== 'typing'} /></label>
      </div>
      {erro && <p className="form-error">{erro}</p>}{status === 'success' && <p className="form-success">Pokémon cadastrado! Abrindo os detalhes...</p>}
      <div className="form-actions"><button type="button" className="outline-button" onClick={() => navigate('/pokedex')}>Cancelar</button><button className="primary-button" disabled={status !== 'typing'}>{status === 'submitting' ? 'Salvando...' : '＋ Cadastrar Pokémon'}</button></div>
    </form>
  </main></div>;
}
