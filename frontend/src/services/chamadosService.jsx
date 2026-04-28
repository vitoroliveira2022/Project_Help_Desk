// src/services/chamadosService.jsx

// Importa a função genérica de requisição da API (já com token e tratamento de erro)
import { api } from '../utils/api';


// =======================
// LISTAR TODOS OS CHAMADOS
// =======================
export const getChamados = () => {
  // Faz GET em /chamados e retorna todos os chamados
  return api('/chamados');
};


// =======================
// BUSCAR CHAMADO POR ID
// =======================
export const getChamadoById = (id) => {
  // Busca um chamado específico pelo ID
  return api(`/chamados/${id}`);
};


// =======================
// CRIAR NOVO CHAMADO
// =======================
export const createChamado = (data) => {
  return api('/chamados', {
    method: 'POST', // cria novo registro
    body: JSON.stringify(data), // envia os dados do chamado
  });
};


// =======================
// ATUALIZAR CHAMADO
// =======================
export const updateChamado = (id, data) => {
  return api(`/chamados/${id}`, {
    method: 'PATCH', // atualiza parcialmente o chamado
    body: JSON.stringify(data), // dados atualizados
  });
};


// =======================
// DELETAR CHAMADO
// =======================
export const deleteChamado = (id) => {
  return api(`/chamados/${id}`, {
    method: 'DELETE', // remove o chamado do sistema
  });
};


// =======================
// TÉCNICO ASSUMIR CHAMADO
// =======================
export const assumirChamado = (id) => {
  return api(`/chamados/${id}/assumir`, {
    method: 'PATCH', // técnico assume responsabilidade pelo chamado
  });
};


// =======================
// CRIAR SOLUÇÃO PARA UM CHAMADO
// =======================
export const criarSolucao = (chamadoId, descricao) => {
  return api(`/chamados/${chamadoId}/solucoes`, {
    method: 'POST', // cria uma solução vinculada ao chamado
    body: JSON.stringify({ descricao }), // envia a descrição da solução
  });
};