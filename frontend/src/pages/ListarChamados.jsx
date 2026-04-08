import { useNavigate } from 'react-router-dom';
import { useChamadosContext } from '../context/ChamadosContext';
import ErrorPage from './ErrorPage';

export default function ListarChamados() {
  const { chamados, removerChamado, loading, error } = useChamadosContext();
  const navigate = useNavigate();

  if (loading) return <p>Carregando chamados...</p>;
  if (error) return <ErrorPage mensagem={error} />;

  if (!chamados || chamados.length === 0) {
    return (
      <div>
        <h2>Chamados</h2>
        <button onClick={() => navigate('/cadastrar')}>Novo Chamado</button>
        <p>Nenhum chamado encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Chamados</h2>
      <button onClick={() => navigate('/cadastrar')}>Novo Chamado</button>
      <ul>
        {chamados.map((c) => (
          <li key={c.id}>
            <strong>{c.titulo}</strong> - {c.descricao} ({c.status})
            <button onClick={() => navigate(`/editar/${c.id}`)}>Editar</button>
            <button onClick={() => removerChamado(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}