/*
Sempre que um setState do hook for chamado (setChamados, setLoading, setError), ou seja, sempre que 
um estado mudar:

1. O Provider re-renderiza e executa novamente o hook useChamados, atualizando o valor do contexto (chamadosData).
2. Todos os componentes que consomem o contexto e usam os valores dele também re-renderizam.

Exemplos:
- ListarChamados → lê chamados, loading, error → re-renderiza
- CadastrarChamado → usa apenas funções do contexto (ex: adicionarChamado) → não re-renderiza

OBS: O useEffect interno do hook (com array de dependências vazio) não é executado em re-renders.
*/

import { useEffect, useState } from 'react';
import {
  getChamados,
  getChamadoById,
  createChamado,
  updateChamado,
  deleteChamado,
} from '../services/chamadosService'; // funções que fazem as requisições à API 

export default function useChamados() {

  const [chamados, setChamados] = useState([]); // estado para armazenar a lista de chamados
  const [loading, setLoading] = useState(false); // estado para o carregamento (UX)
  const [error, setError] = useState(null); // estado para armazenar mensagens de erro

  const buscarChamados = async () => {
    try {
      setLoading(true); // inicia o carregamento dos dados       
      setError(null);   // limpa o estado erro para novas requisições
      const data = await getChamados(); // chamada à API
      setChamados(data); // atualiza estado com os dados retornados
    } catch (err) {
      setError('Erro ao buscar chamados'); // tratamento de erro
    } finally {
      setLoading(false); // finaliza loading independente de sucesso ou erro
    }
  };

  // Executa apenas na montagem do Provider (ChamadosContext)
  // Não é executado em re-renders; só rodaria novamente se o Provider fosse desmontado e montado de novo
  useEffect(() => {
    buscarChamados();
  }, []); // [] = executa uma única vez

  
  const buscarChamadoPorId = async (id) => {
    try{
      setError(null); // limpa o estado de erro antes de tentar buscar
      // tenta encontrar no estado local primeiro para evitar requisição desnecessária
      const chamadoExistente = chamados.find((c) => c.id === Number(id));

      // se já existir retorna o chamado encontrado (cache local) sem fazer nova requisição na API
      if (chamadoExistente) return chamadoExistente;

      // se não existir no estado, busca na API
      return await getChamadoById(id);
    } catch {
      setError('Erro ao buscar chamado por ID');
    }
    
  };

  const adicionarChamado = async (novo) => {
    try {
      setError(null); // limpa o estado de erro antes de tentar criar
      const data = await createChamado(novo); // faz a requisição de criação na API
      // adiciona o novo chamado na lista de chamados
      setChamados((prev) => [...prev, data]); 
    } catch {
      setError('Erro ao adicionar chamado');
    }
  };

  const atualizarChamado = async (id, dados) => {
    try {
      setError(null); // limpa o estado de erro antes de tentar atualizar
      const atualizado = await updateChamado(id, dados); // faz a requisição de atualização na API

      // substitui apenas o item atualizado (imutabilidade)
      setChamados((prev) =>
        prev.map((c) => (c.id === Number(id) ? atualizado : c))
      );

    } catch {
      setError('Erro ao atualizar chamado');
    }
  };

  const removerChamado = async (id) => {
    try {
      setError(null); // limpa o estado de erro antes de tentar remover
      await deleteChamado(id); // faz a requisição de exclusão na API

      // remove do estado local (lista de chamados) o item deletado
      setChamados((prev) => prev.filter((c) => c.id !== Number(id)));

    } catch {
      setError('Erro ao remover chamado');
    }
  };

  // Retorna a lista de chamados e funções para serem usados nos componentes
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