import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditarChamado() {
  const { id } = useParams(); // Obtém o ID da URL
  const navigate = useNavigate();
  
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchChamado = async () => {
      const response = await fetch(`http://localhost:3000/chamados/${id}`);
      const data = await response.json();
      setTitulo(data.titulo);
      setDescricao(data.descricao);
      setStatus(data.status);
    };
    fetchChamado();
  }, [id]);

  const atualizarChamado = async (e) => {
    e.preventDefault();
    const atualizadoChamado = { titulo, descricao, status };
    
    await fetch(`http://localhost:3000/chamados/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atualizadoChamado),
    });
    navigate('/'); // volta para a URL raiz (ListarChamados)
  };

  return (
    <form onSubmit={atualizarChamado}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>

      <button type="submit">Atualizar Chamado</button>
    </form>
  );
}