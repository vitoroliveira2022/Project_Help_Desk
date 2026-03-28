// pages/ListarChamados.jsx
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

export default function ListarChamados({ chamados, removerChamado, loading, error }) {
  const navigate = useNavigate();

  if (loading) {
    return <p>Carregando chamados...</p>;
  }

  if (error) {
    return <ErrorPage mensagem={error} />;
  }

  return (
    <div>
      <h2>Chamados</h2>

      <button onClick={() => navigate('/cadastrar')}>
        Novo Chamado
      </button>

      <ul>
        {chamados.map((c) => (
          <li key={c.id}>
            <strong>{c.titulo}</strong> - {c.descricao} ({c.status})

            <button onClick={() => navigate(`/editar/${c.id}`)}>
              Editar
            </button>

            <button onClick={() => removerChamado(c.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}