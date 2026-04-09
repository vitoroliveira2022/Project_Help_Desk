import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChamadosContext } from '../context/ChamadosContext';
import ErrorPage from './ErrorPage';

export default function ListarChamados() {
  const { chamados, removerChamado, loading, error } = useChamadosContext();
  const navigate = useNavigate();
  const [excluindo, setExcluindo] = useState(false); // controla exclusão individual

  const handleExcluir = async (id) => {
    setExcluindo(true);
    try {
      await removerChamado(id);
    } catch (err) {
      console.error('Erro ao excluir chamado:', err);
    } finally {
      setExcluindo(false);
    }
  };

  if (loading) return <p>Carregando chamados...</p>;
  if (error) return <ErrorPage mensagem={error} />;

  if (!chamados || chamados.length === 0) {
    return (
      <div>
        <h2>Chamados</h2>
        <p>Nenhum chamado encontrado.</p>
        <button onClick={() => navigate('/dashboard')}>Voltar para Dashboard</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Chamados</h2>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '1rem' }}>
        Voltar para Dashboard
      </button>
      <ul>
        {chamados.map((c) => (
          <li key={c.id}>
            <strong>{c.titulo}</strong> - {c.descricao} ({c.status})
            <button onClick={() => navigate(`/editar/${c.id}`)}>Editar</button>
            <button onClick={() => handleExcluir(c.id)} disabled={excluindo}>
              {excluindo ? 'Excluindo...' : 'Excluir'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}