import { useChamadosContext } from '../context/ChamadosContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ChamadosResolvidos() {
  const { chamados, loading, error } = useChamadosContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const resolvidos = chamados.filter(
    (c) =>
      c.status === 'FINALIZADO' &&
      c.tecnicoId === user.id
  );

  return (
    <div>
      <h2>Chamados Resolvidos</h2>

      {resolvidos.length === 0 ? (
        <p>Nenhum chamado resolvido</p>
      ) : (
        <ul>
          {resolvidos.map((c) => (
            <li key={c.id}>
              <p>ID: {c.id}</p>
              <p>Usuário: {c.usuario?.nome}</p>
              <p>Técnico: {c.tecnico?.nome}</p>
              <p><strong>{c.titulo}</strong></p>
              <p>{c.descricao}</p>

              {c.solucoes?.[0] && (
                <p>
                  <strong>Solução:</strong> {c.solucoes[0].descricao}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

    <button onClick={() => navigate('/dashboard')}>
        Voltar
    </button>
    </div>
  );
}