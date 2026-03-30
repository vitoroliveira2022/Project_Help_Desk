// hooks/useChamados.js
import { useEffect, useState } from 'react';
import {
  getChamados,
  getChamadoById,
  createChamado,
  updateChamado,
  deleteChamado,
} from '../services/chamadosService';

export default function useChamados() {
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
      setError('Erro ao buscar chamados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarChamados();
  }, []);

  const buscarChamadoPorId = async (id) => {
    const chamadoExistente = chamados.find((c) => c.id === Number(id));

    if (chamadoExistente) return chamadoExistente;

    return await getChamadoById(id);
  };

  const adicionarChamado = async (novo) => {
    try {
      const data = await createChamado(novo);
      setChamados((prev) => [...prev, data]);
    } catch {
      setError('Erro ao adicionar chamado');
    }
  };

  const atualizarChamado = async (id, dados) => {
    try {
      const atualizado = await updateChamado(id, dados);

      setChamados((prev) =>
        prev.map((c) => (c.id === Number(id) ? atualizado : c))
      );
    } catch {
      setError('Erro ao atualizar chamado');
    }
  };

  const removerChamado = async (id) => {
    try {
      await deleteChamado(id);
      setChamados((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError('Erro ao remover chamado');
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
    buscarChamadoPorId
  };
}