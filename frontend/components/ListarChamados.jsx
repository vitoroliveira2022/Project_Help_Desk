import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListarChamados() {
  // o estado chamados é para armazenar a lista de chamados que vem do backend
  const [chamados, setChamados] = useState([]);
  const navigate = useNavigate();

  
const excluirChamado = async (id) => {
    await fetch(`http://localhost:3000/chamados/${id}`, {
    method: 'DELETE',
  });
};

  useEffect(() => {
    const fetchChamados = async () => {
      const response = await fetch('http://localhost:3000/chamados'); // rota GET /chamados do backend
      const data = await response.json();
      setChamados(data); // atualiza o estado com o array de chamados do backend
    };
    fetchChamados();
  }, []); // [] garante que o fetch só rode uma vez, quando o componente for montado

  return (
    <div>
      <h2>Chamados</h2>
      <ul>
        {chamados.map((chamado) => (
          <li key={chamado.id}>
            <strong>{chamado.titulo}</strong> - {chamado.descricao} (Status: {chamado.status})
            <button type='button' onClick={() => excluirChamado(chamado.id)}>Excluir</button>
            <button type='button' onClick={() => navigate(`/editar/${chamado.id}`)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}