import * as repository from '../repositories/chamadosRepository.js';

// LISTAR
export const listar = async () => {
  return repository.listar();
};

export const listarPorUsuario = async (usuarioId) => {
  return repository.listarPorUsuario(usuarioId);
};

// BUSCAR POR ID
export const buscarPorId = async (id) => {
  return repository.buscarPorId(id);
};

// CRIAR
export const criar = async (dados) => {
  return repository.criar(dados);
};

// ATUALIZAR
export const atualizar = async (id, dados) => {
  const existente = await repository.buscarPorId(id);

  if (!existente) {
    return null;
  }

  return repository.atualizar(id, dados);
};

// TECNICO ASSUMIR
export const assumir = async (id, tecnicoId) => {
  const chamado = await repository.buscarPorId(id);

  if (!chamado) {
    return null;
  }

  if (chamado.tecnicoId) {
    throw new Error('Chamado já está em atendimento');
  }
  return repository.atualizar(id, {
    tecnicoId,
    status: 'EM_ATENDIMENTO'
  });
};

// DELETAR
export const deletar = async (id) => {
  const existente = await repository.buscarPorId(id);

  if (!existente) {
    return false;
  }

  await repository.deletar(id);
  return true;
};