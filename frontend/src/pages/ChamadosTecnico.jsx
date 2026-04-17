import { useChamadosContext } from '../context/ChamadosContext';
import { useAuthContext } from '../context/AuthContext';
import { assumirChamado } from '../services/chamadosService';

export default function ChamadosTecnico() {
  const { chamados, loading, error } = useChamadosContext();
  const { user } = useAuthContext();

  const handleAssumir = async (id) => {
    try {
      await assumirChamado(id);
    } catch (err) {
      console.error('Erro ao assumir chamado:', err);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const chamadosDisponiveis = chamados.filter(
    (c) => c.status === 'ABERTO'
  );

  const meusChamados = chamados.filter(
    (c) => c.status === 'EM_ATENDIMENTO' && c.tecnicoId === user.id
  );

  return (
    <div>
      <h2>Área do Técnico</h2>

      <h3>Chamados Disponíveis</h3>
      {chamadosDisponiveis.length === 0 ? (
        <p>Nenhum chamado disponível</p>
      ) : (
        <ul>
          {chamadosDisponiveis.map((c) => (
            <li key={c.id}>
              <strong>{c.titulo}</strong> - {c.descricao}

              <button onClick={() => handleAssumir(c.id)}>
                Pegar Chamado
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h3>Meus Chamados</h3>
      {meusChamados.length === 0 ? (
        <p>Você não tem chamados em andamento</p>
      ) : (
        <ul>
          {meusChamados.map((c) => (
            <li key={c.id}>
              <strong>{c.titulo}</strong> - {c.descricao} ({c.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}