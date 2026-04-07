import * as repository from '../repositories/usuariosRepository.js';
import bcrypt from 'bcryptjs';

export const buscarPorEmail = async (email) => {
  return repository.buscarPorEmail(email);
};

export const listar = async () => {
  return repository.listar();
};

export const buscarPorId = async (id) => {
  return repository.buscarPorId(id);
};

export const criar = async (dados) => {
  const hash = await bcrypt.hash(dados.senha, 10);

  return repository.criar({
    ...dados,
    senha: hash
  });
};

export const atualizar = async (id, dados) => {
  const existe = await repository.buscarPorId(id);

  if (!existe) return null;

  return repository.atualizar(id, dados);
};

export const deletar = async (id) => {
  const existe = await repository.buscarPorId(id);

  if (!existe) return false;

  await repository.deletar(id);
  return true;
};