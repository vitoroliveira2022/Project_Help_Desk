import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { useChamadosContext } from '../context/ChamadosContext';

export default function ListarChamados() {

  // 🔹 Consome o contexto global de chamados
  // chamados → lista de dados
  // removerChamado → função para deletar
  // loading → estado de carregamento
  // error → mensagem de erro
  const { chamados, removerChamado, loading, error } = useChamadosContext(); 

  // 🔹 Hook para navegação entre rotas
  const navigate = useNavigate();

  // 🔹 Se estiver carregando (true), interrompe renderização e mostra mensagem
  if (loading) return <p>Carregando chamados...</p>;

  // 🔹 Se houve erro, mostra componente de erro
  if (error) return <ErrorPage mensagem={error} />;

  // 🔹 Caso não existam chamados
  if (!chamados || chamados.length === 0) {
    return (
      <div>
        <h2>Chamados</h2>

        {/* Redireciona para tela de cadastro */}
        <button onClick={() => navigate('/cadastrar')}>
          Novo Chamado
        </button>

        <p>Nenhum chamado encontrado.</p>
      </div>
    );
  }

  // 🔹 Renderização principal (quando existem chamados)
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

            {/* Navega para tela de edição passando o ID */}
            <button onClick={() => navigate(`/editar/${c.id}`)}>
              Editar
            </button>

            {/* Remove chamado chamando função do contexto */}
            <button onClick={() => removerChamado(c.id)}>
              Excluir
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}