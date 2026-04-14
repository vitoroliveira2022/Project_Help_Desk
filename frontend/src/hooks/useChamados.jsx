import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import {
  getChamados,
  getChamadoById,
  createChamado,
  updateChamado,
  deleteChamado,
} from '../services/chamadosService';

export default function useChamados() {
  const { isAuthenticated, loading: authLoading } = useAuthContext();

  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buscarChamados = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getChamados();
      setChamados(data);
    } catch (err) {
      setError(err.message || 'Erro ao buscar chamados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) return;

    buscarChamados();
  }, [isAuthenticated, authLoading]);

  const buscarChamadoPorId = async (id) => {
    try {
      setError(null);

      const data = await getChamadoById(id);

      // opcional: atualizar cache local
      setChamados((prev) => {
        const exists = prev.some((c) => c.id === data.id);

        if (exists) {
          return prev.map((c) => (c.id === data.id ? data : c));
        }

        return [...prev, data];
      });

      return data;
    } catch (err) {
      setError(err.message || 'Erro ao buscar chamado por ID');
    }
  };

  const adicionarChamado = async (novo) => {
    try {
      setError(null);

      const data = await createChamado(novo);

      setChamados((prev) => [data, ...prev]);
    } catch (err) {
      setError(err.message || 'Erro ao adicionar chamado');
    }
  };

  const atualizarChamado = async (id, dados) => {
    try {
      setError(null);

      const atualizado = await updateChamado(id, dados);

      setChamados((prev) =>
        prev.map((c) => (c.id === Number(id) ? atualizado : c))
      );
    } catch (err) {
      setError(err.message || 'Erro ao atualizar chamado');
    }
  };

  const removerChamado = async (id) => {
    try {
      setError(null);

      await deleteChamado(id);

      setChamados((prev) =>
        prev.filter((c) => c.id !== Number(id))
      );
    } catch (err) {
      setError(err.message || 'Erro ao remover chamado');
    }
  };

  return {
    chamados,
    loading,
    error,
    buscarChamados,
    adicionarChamado,
    atualizarChamado,
    removerChamado,
    buscarChamadoPorId,
  };
}