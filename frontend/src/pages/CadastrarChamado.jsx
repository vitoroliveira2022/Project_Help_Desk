// pages/CadastrarChamado.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastrarChamado({ adicionarChamado }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();

    await adicionarChamado({ titulo, descricao, status });

    navigate('/');
  };

  return (
    <form onSubmit={enviar}>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <input value={status} onChange={(e) => setStatus(e.target.value)} />
      <button type="submit">Cadastrar</button>
    </form>
  );
}