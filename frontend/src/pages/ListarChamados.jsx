import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChamadosContext } from '../context/ChamadosContext';
import ErrorPage from './ErrorPage';

export default function ListarChamados() {
  const { chamados, removerChamado, loading, error } = useChamadosContext();
  const navigate = useNavigate();

  const [excluindoId, setExcluindoId] = useState(null);

  const handleExcluir = async (id) => {
    try {
      setExcluindoId(id);
      await removerChamado(id);
    } catch (err) {
      console.error('Erro ao excluir chamado:', err);
    } finally {
      setExcluindoId(null);
    }
  };

  if (loading) return <p>Carregando chamados...</p>;
  if (error) return <ErrorPage mensagem={error} />;

  if (!chamados || chamados.length === 0) {
    return (
      <div>
        <h2>Chamados</h2>
        <p>Nenhum chamado encontrado.</p>
        <button onClick={() => navigate('/dashboard')}>
          Voltar para Dashboard
        </button>
      </div>
    );
  }

  console.log('Chamados carregados:', chamados);
  return (
    <div>
      <h2>Chamados</h2>
      <button
        onClick={() => navigate('/dashboard')}
        style={{ marginBottom: '1rem' }}
      >
        Voltar para Dashboard
      </button>

      <ul>
        {chamados.map((c) => (
          <li key={c.id}>
            <p>ID do chamado: {c.id}</p>
            <p>ID do usuário: {c.usuario.id}</p>
            <p>Nome do usuario: {c.usuario.nome}</p>
            <p><strong>Título: {c.titulo}</strong></p>
            <p>Descrição: {c.descricao}</p>
            <p>Situação: ({c.status})</p>
            <p>Tecnico: {c.tecnico.nome}</p>
            {c.solucoes && c.solucoes.length > 0 && (
              <p>Solução: {c.solucoes[0].descricao}</p>      
            )}
            <button onClick={() => navigate(`/editar/${c.id}`)}>
              Editar
            </button>

            <button
              onClick={() => handleExcluir(c.id)}
              disabled={excluindoId === c.id}
            >
              {excluindoId === c.id ? 'Excluindo...' : 'Excluir'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}