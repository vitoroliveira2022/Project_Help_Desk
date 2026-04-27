import * as repository from '../repositories/chamadosRepository.js';

// Service de chamados
// Camada responsável por regras de negócio antes de acessar o repository


// LISTAR TODOS OS CHAMADOS
export const listar = async () => {
  return repository.listar();
};


// LISTAR CHAMADOS DE UM USUÁRIO ESPECÍFICO
export const listarPorUsuario = async (usuarioId) => {
  return repository.listarPorUsuario(usuarioId);
};


// BUSCAR CHAMADO POR ID
export const buscarPorId = async (id) => {
  return repository.buscarPorId(id);
};


// CRIAR CHAMADO
export const criar = async (dados) => {
  return repository.criar(dados);
};


// ATUALIZAR CHAMADO
// primeiro verifica se existe antes de atualizar
export const atualizar = async (id, dados) => {
  const existente = await repository.buscarPorId(id);

  if (!existente) {
    return null;
  }

  return repository.atualizar(id, dados);
};


// TÉCNICO ASSUME CHAMADO
// só permite assumir se:
// - chamado existir
// - chamado ainda não tiver técnico
export const assumir = async (id, tecnicoId) => {
  const chamado = await repository.buscarPorId(id);

  if (!chamado) return null;

  if (chamado.tecnicoId) return null;

  // atualiza técnico responsável e status
  return repository.atualizar(id, {
    tecnicoId,
    status: 'EM_ATENDIMENTO'
  });
};


// DELETAR CHAMADO
// verifica se existe antes de deletar
export const deletar = async (id) => {
  const existente = await repository.buscarPorId(id);

  if (!existente) {
    return false;
  }

  await repository.deletar(id);
  return true;
};


// CRIAR SOLUÇÃO DO CHAMADO
// apenas delega para o repository
export const criarSolucao = async (dados) => {
  return repository.criarSolucao(dados);
};