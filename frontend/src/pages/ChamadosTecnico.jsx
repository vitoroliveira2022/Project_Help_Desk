import { useChamadosContext } from '../context/ChamadosContext';
import { useAuthContext } from '../context/AuthContext';
import { assumirChamado, criarSolucao } from '../services/chamadosService';
import { useState } from 'react';

export default function ChamadosTecnico() {
  const { chamados, loading, error, buscarChamados } = useChamadosContext();
  const { user } = useAuthContext();
  const [solucoes, setSolucoes] = useState({});

  const handleSolucaoChange = (id, value) => {
    setSolucoes(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleEnviarSolucao = async (id) => {
    try {
      const descricao = solucoes[id];

      if (!descricao) return;

      await criarSolucao(id, descricao);

      setSolucoes(prev => ({
        ...prev,
        [id]: ''
      }));

       // recarrega chamados
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
              <p>ID do chamado: {c.id}</p>
              <p>ID do usuário: {c.usuario.id}</p>
              <p>Nome: {c.usuario.nome}</p>
              <p><strong>Título: {c.titulo}</strong></p>
              <p>Descrição: {c.descricao}</p>
              <p>Situação: ({c.status})</p>
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
              <p>ID do chamado: {c.id}</p>
              <p>ID do usuário: {c.usuario.id}</p>
              <p>Nome: {c.usuario.nome}</p>
              <p><strong>Título: {c.titulo}</strong></p>
              <p>Descrição: {c.descricao}</p>
              <p>Situação: ({c.status})</p>

              <textarea
                placeholder="Descreva a solução..."
                value={solucoes[c.id] || ''}
                onChange={(e) =>
                  handleSolucaoChange(c.id, e.target.value)
                }
              />

              <br />

              <button onClick={() => handleEnviarSolucao(c.id)}>
                Finalizar com Solução
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}