import { useEffect, useState } from 'react';

// Pega dados globais de autenticação (usuário logado e status de loading)
import { useAuthContext } from '../context/AuthContext';

// Serviços da API relacionados a chamados
import {
  getChamados,
  getChamadoById,
  createChamado,
  updateChamado,
  deleteChamado,
} from '../services/chamadosService';


// Hook customizado responsável por toda lógica de chamados
export default function useChamados() {

  // Pega estado de autenticação global
  const { isAuthenticated, loading: authLoading } = useAuthContext();

  // Lista de chamados armazenada localmente no hook
  const [chamados, setChamados] = useState([]);

  // Controle de carregamento das operações de chamados
  const [loading, setLoading] = useState(false);

  // Guarda erros relacionados às operações
  const [error, setError] = useState(null);


  // =========================
  // BUSCAR TODOS OS CHAMADOS
  // =========================
  const buscarChamados = async () => {
    try {
      setLoading(true);   // ativa loading
      setError(null);     // limpa erros anteriores

      // Busca dados na API
      const data = await getChamados();

      // Atualiza estado com os chamados recebidos
      setChamados(data);

    } catch (err) {
      // Captura erro da requisição
      setError(err.message || 'Erro ao buscar chamados');

    } finally {
      // Finaliza loading independente de sucesso ou erro
      setLoading(false);
    }
  };


  // ==========================================
  // CARREGA CHAMADOS AO ENTRAR NO SISTEMA
  // ==========================================
  useEffect(() => {

    // Espera o Auth terminar de carregar
    if (authLoading) return;

    // Se não estiver logado, não faz nada
    if (!isAuthenticated) return;

    // Busca os chamados quando usuário estiver autenticado
    buscarChamados();

  }, [isAuthenticated, authLoading]);


  // =========================
  // BUSCAR CHAMADO POR ID
  // =========================
  const buscarChamadoPorId = async (id) => {
    try {
      setError(null);

      // Busca chamado específico na API
      const data = await getChamadoById(id);

      // Atualiza cache local (evita chamadas repetidas)
      setChamados((prev) => {

        const exists = prev.some((c) => c.id === data.id);

        // Se já existe, atualiza ele
        if (exists) {
          return prev.map((c) => (c.id === data.id ? data : c));
        }

        // Se não existe, adiciona ao array
        return [...prev, data];
      });

      return data;

    } catch (err) {
      setError(err.message || 'Erro ao buscar chamado por ID');
    }
  };


  // =========================
  // ADICIONAR CHAMADO
  // =========================
  const adicionarChamado = async (novo) => {
    try {
      setError(null);

      // Envia novo chamado para API
      const data = await createChamado(novo);

      // Adiciona no início da lista local
      setChamados((prev) => [data, ...prev]);

    } catch (err) {
      setError(err.message || 'Erro ao adicionar chamado');
    }
  };


  // =========================
  // ATUALIZAR CHAMADO
  // =========================
  const atualizarChamado = async (id, dados) => {
    try {
      setError(null);

      // Atualiza no backend
      const atualizado = await updateChamado(id, dados);

      // Atualiza estado local substituindo o item
      setChamados((prev) =>
        prev.map((c) => (c.id === Number(id) ? atualizado : c))
      );

    } catch (err) {
      setError(err.message || 'Erro ao atualizar chamado');
    }
  };


  // =========================
  // REMOVER CHAMADO
  // =========================
  const removerChamado = async (id) => {
    try {
      setError(null);

      // Remove no backend
      await deleteChamado(id);

      // Remove do estado local
      setChamados((prev) =>
        prev.filter((c) => c.id !== Number(id))
      );

    } catch (err) {
      setError(err.message || 'Erro ao remover chamado');
    }
  };


  // =========================
  // RETORNO DO HOOK
  // =========================
  return {
    chamados,              // lista de chamados
    loading,               // estado de carregamento
    error,                 // erros do hook
    buscarChamados,       // recarregar lista
    adicionarChamado,     // criar chamado
    atualizarChamado,     // editar chamado
    removerChamado,       // deletar chamado
    buscarChamadoPorId,   // buscar um chamado específico
  };
}