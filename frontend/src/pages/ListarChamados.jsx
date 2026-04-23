import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChamadosContext } from '../context/ChamadosContext';
import ErrorPage from './ErrorPage';

export default function ListarChamados() {
  const { chamados, removerChamado, loading, error } =
    useChamadosContext();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Carregando chamados...</p>
      </div>
    );
  }

  if (error) return <ErrorPage mensagem={error} />;

  if (!chamados || chamados.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold mb-2">
            Chamados
          </h2>

          <p className="text-gray-500 mb-4">
            Nenhum chamado encontrado.
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Voltar para Dashboard
          </button>
        </div>
      </div>
    );
  }

  const card =
    'bg-white p-4 rounded-lg shadow hover:shadow-md transition';

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            Chamados
          </h2>

          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Voltar
          </button>
        </div>

        {/* Lista */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {chamados.map((c) => (
            <div key={c.id} className={card}>

              <p className="text-xs text-gray-500">
                ID: {c.id}
              </p>

              <p className="text-sm text-gray-500">
                Usuário: {c.usuario?.nome}
              </p>

              <h3 className="font-bold mt-1">
                {c.titulo}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {c.descricao}
              </p>

              <p className="text-xs mt-2 text-blue-500">
                {c.status}
              </p>

              <p className="text-xs text-gray-500">
                Técnico: {c.tecnico?.nome || 'Não atribuído'}
              </p>

              {c.solucoes?.length > 0 && (
                <div className="mt-2 bg-gray-50 border rounded p-2">
                  <p className="text-xs text-gray-500">
                    Solução:
                  </p>
                  <p className="text-sm text-gray-700">
                    {c.solucoes[0].descricao}
                  </p>
                </div>
              )}

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => navigate(`/editar/${c.id}`)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded text-sm"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleExcluir(c.id)}
                  disabled={excluindoId === c.id}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded text-sm disabled:opacity-50"
                >
                  {excluindoId === c.id
                    ? 'Excluindo...'
                    : 'Excluir'}
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}