import { useChamadosContext } from '../context/ChamadosContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ChamadosResolvidos() {
  const { chamados, loading, error } = useChamadosContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  const resolvidos = chamados.filter(
    (c) =>
      c.status === 'FINALIZADO' &&
      c.tecnicoId === user.id
  );

  const card =
    'bg-white p-4 rounded-lg shadow hover:shadow-md transition';

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        <div className="flex justify-start items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold">
            Chamados Resolvidos
          </h2>

          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Voltar
          </button>
        </div>

        {resolvidos.length === 0 ? (
          <p className="text-gray-500">
            Nenhum chamado resolvido
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resolvidos.map((c) => (
              <div key={c.id} className={card}>
                <p className="text-sm text-gray-500">
                  ID: {c.id}
                </p>

                <p className="text-sm text-gray-500">
                  Usuário: {c.usuario?.nome}
                </p>

                <p className="text-sm text-gray-500">
                  Técnico: {c.tecnico?.nome}
                </p>

                <h4 className="font-bold mt-2">
                  {c.titulo}
                </h4>

                <p className="text-gray-600 text-sm mt-1">
                  {c.descricao}
                </p>

                <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Finalizado
                </span>

                {c.solucoes?.[0] && (
                  <div className="mt-3 bg-gray-50 border rounded p-2">
                    <p className="text-xs text-gray-500">
                      Solução:
                    </p>
                    <p className="text-sm text-gray-700">
                      {c.solucoes[0].descricao}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}