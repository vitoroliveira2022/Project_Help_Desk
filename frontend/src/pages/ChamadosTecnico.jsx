import { useChamadosContext } from '../context/ChamadosContext';
import { useAuthContext } from '../context/AuthContext';
import { assumirChamado, criarSolucao } from '../services/chamadosService';
import { useState } from 'react';

export default function ChamadosTecnico() {
  const { chamados, loading, error, buscarChamados } = useChamadosContext();
  const { user } = useAuthContext();
  const [solucoes, setSolucoes] = useState({});

  const handleSolucaoChange = (id, value) => {
    setSolucoes((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEnviarSolucao = async (id) => {
    try {
      const descricao = solucoes[id];
      if (!descricao) return;

      await criarSolucao(id, descricao);

      setSolucoes((prev) => ({
        ...prev,
        [id]: '',
      }));

      await buscarChamados();
    } catch (err) {
      console.error('Erro ao enviar solução:', err);
    }
  };

  const handleAssumir = async (id) => {
    try {
      await assumirChamado(id);
      await buscarChamados();
    } catch (err) {
      console.error('Erro ao assumir chamado:', err);
    }
  };

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

  const chamadosDisponiveis = chamados.filter(
    (c) => c.status === 'ABERTO'
  );

  const meusChamados = chamados.filter(
    (c) =>
      c.status === 'EM_ATENDIMENTO' &&
      c.tecnicoId === user.id
  );

  const card =
    'bg-white p-4 rounded-lg shadow hover:shadow-md transition';

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-6">
          Área do Técnico
        </h2>

        {/* Chamados disponíveis */}
        <h3 className="text-xl font-semibold mb-3">
          Chamados Disponíveis
        </h3>

        {chamadosDisponiveis.length === 0 ? (
          <p className="text-gray-500 mb-6">
            Nenhum chamado disponível
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {chamadosDisponiveis.map((c) => (
              <div key={c.id} className={card}>
                <p className="text-sm text-gray-500">
                  ID: {c.id}
                </p>

                <p className="text-sm text-gray-500">
                  Usuário: {c.usuario.nome}
                </p>

                <h4 className="font-bold mt-2">
                  {c.titulo}
                </h4>

                <p className="text-gray-600 text-sm mt-1">
                  {c.descricao}
                </p>

                <p className="text-xs mt-2 text-blue-500">
                  {c.status}
                </p>

                <button
                  onClick={() => handleAssumir(c.id)}
                  className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                  Pegar Chamado
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Meus chamados */}
        <h3 className="text-xl font-semibold mb-3">
          Meus Chamados
        </h3>

        {meusChamados.length === 0 ? (
          <p className="text-gray-500">
            Você não tem chamados em andamento
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meusChamados.map((c) => (
              <div key={c.id} className={card}>
                <p className="text-sm text-gray-500">
                  ID: {c.id}
                </p>

                <p className="text-sm text-gray-500">
                  Usuário: {c.usuario.nome}
                </p>

                <h4 className="font-bold mt-2">
                  {c.titulo}
                </h4>

                <p className="text-gray-600 text-sm mt-1">
                  {c.descricao}
                </p>

                <p className="text-xs mt-2 text-yellow-500">
                  {c.status}
                </p>

                <textarea
                  placeholder="Descreva a solução..."
                  value={solucoes[c.id] || ''}
                  onChange={(e) =>
                    handleSolucaoChange(c.id, e.target.value)
                  }
                  className="mt-3 w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  onClick={() => handleEnviarSolucao(c.id)}
                  className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                >
                  Finalizar com Solução
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}