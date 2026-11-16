import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { usePokemon } from '../context/PokemonContext';
import { processarImagem } from '../utils/processarImagem';

const tiposDisponiveis = ['Normal','Fogo','Água','Grama','Elétrico','Gelo','Lutador','Veneno','Terra','Voador','Psíquico','Inseto','Pedra','Fantasma','Dragão','Fada','Aço'];
export default function Editar() {
  const { id } = useParams(); const navigate = useNavigate();
  const { pokemon, atualizarPokemon } = usePokemon();
  const item = pokemon.find(p => p.id === Number(id));
  const [form, setForm] = useState(() => item ? { nome:item.nome, tipo1:item.tipos[0] || 'Normal', tipo2:item.tipos[1] || '', altura:item.altura, peso:item.peso, habilidade:item.habilidade, descricao:item.descricao, hp:item.stats.hp, ataque:item.stats.ataque, defesa:item.stats.defesa, velocidade:item.stats.velocidade } : null);
  const [imagem, setImagem] = useState(() => item ? item.imagem || '' : '');
  const [erro,setErro] = useState('');
  if (!item || !form) return <div className="app-layout"><Sidebar/><main className="main-content"><div className="empty-state"><h2>Pokémon não encontrado</h2><Link className="primary-button" to="/pokedex">Voltar</Link></div></main></div>;
  const change = e => setForm(f => ({...f,[e.target.name]:e.target.value}));
  const changeImage = async e => { const file = e.target.files && e.target.files[0]; if (!file) return; try { setImagem(await processarImagem(file)); setErro(''); } catch (error) { setErro(error.message); e.target.value = ''; } };
  const submit = e => { e.preventDefault(); if (!form.nome.trim() || !form.habilidade.trim() || Number(form.altura)<=0 || Number(form.peso)<=0) { setErro('Confira nome, habilidade, altura e peso.'); return; } if (pokemon.some(p => p.id !== item.id && p.nome.toLowerCase() === form.nome.trim().toLowerCase())) { setErro('Já existe outro Pokémon com esse nome.'); return; }
    atualizarPokemon(item.id,{ nome:form.nome.trim(), tipos:[form.tipo1,...(form.tipo2 && form.tipo2 !== form.tipo1 ? [form.tipo2] : [])], altura:Number(form.altura), peso:Number(form.peso), habilidade:form.habilidade.trim(), descricao:form.descricao.trim(), stats:{hp:Number(form.hp),ataque:Number(form.ataque),defesa:Number(form.defesa),velocidade:Number(form.velocidade)}, imagem }); navigate(`/pokemon/${item.id}`); };
  return <div className="app-layout"><Sidebar/><main className="main-content"><div className="page-heading"><div><span className="eyebrow">CRUD · UPDATE</span><h1>Editar {item.nome}</h1><p>Altere os dados e a imagem e salve as modificações.</p></div></div><form className="form-card" onSubmit={submit}>
    <div className="image-upload-panel"><div className="image-upload-preview">{imagem ? <img src={imagem} alt={`Prévia de ${item.nome}`} /> : <span>?</span>}</div><div className="image-upload-copy"><strong>Imagem do Pokémon</strong><p>Você pode trocar a imagem atual ou remover a imagem personalizada.</p><label className="outline-button image-upload-button">＋ Escolher imagem<input type="file" accept="image/*" onChange={changeImage}/></label>{imagem && <button type="button" className="remove-image-button" onClick={() => setImagem('')}>Remover imagem</button>}</div></div>
    <div className="form-grid">
      <label>Nome *<input name="nome" value={form.nome} onChange={change} required/></label>
      <label>Tipo principal<select name="tipo1" value={form.tipo1} onChange={change}>{tiposDisponiveis.map(t=><option key={t}>{t}</option>)}</select></label>
      <label>Tipo secundário<select name="tipo2" value={form.tipo2} onChange={change}><option value="">Nenhum</option>{tiposDisponiveis.map(t=><option key={t}>{t}</option>)}</select></label>
      <label>Altura (m) *<input type="number" min="0.1" step="0.1" name="altura" value={form.altura} onChange={change} required/></label>
      <label>Peso (kg) *<input type="number" min="0.1" step="0.1" name="peso" value={form.peso} onChange={change} required/></label>
      <label>Habilidade *<input name="habilidade" value={form.habilidade} onChange={change} required/></label>
      <label>HP<input type="number" min="1" max="255" name="hp" value={form.hp} onChange={change}/></label><label>Ataque<input type="number" min="1" max="255" name="ataque" value={form.ataque} onChange={change}/></label>
      <label>Defesa<input type="number" min="1" max="255" name="defesa" value={form.defesa} onChange={change}/></label><label>Velocidade<input type="number" min="1" max="255" name="velocidade" value={form.velocidade} onChange={change}/></label>
      <label className="full-field">Descrição<textarea rows="4" name="descricao" value={form.descricao} onChange={change}/></label>
    </div>{erro && <p className="form-error">{erro}</p>}<div className="form-actions"><button type="button" className="outline-button" onClick={()=>navigate(-1)}>Cancelar</button><button className="primary-button">Salvar alterações</button></div></form></main></div>;
}
