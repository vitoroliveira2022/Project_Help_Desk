// Service: camada que aplica a lógica de negócio
// Recebe dados do controller, trata regras (hash de senha, validações) e chama o repository.

import * as repository from '../repositories/usuariosRepository.js';
import bcrypt from 'bcryptjs';

// Buscar usuário pelo email
export const buscarPorEmail = async (email) => {
  return repository.buscarPorEmail(email);
};

// Listar todos os usuários
export const listar = async () => {
  return repository.listar();
};

// Buscar usuário por ID
export const buscarPorId = async (id) => {
  return repository.buscarPorId(id);
};

// Criar usuário
export const criar = async (dados) => {
  const { senha, ...resto } = dados;

  const hash = await bcrypt.hash(senha, 10);

  return repository.criar({
    ...resto,
    senha: hash
  });
};

// Atualizar usuário
export const atualizar = async (id, dados) => {
  const existe = await repository.buscarPorId(id);

  if (!existe) return null;

  // se estiver atualizando senha, gerar hash
  if (dados.senha) {
    dados.senha = await bcrypt.hash(dados.senha, 10);
  }

  return repository.atualizar(id, dados);
};

// Deletar usuário
export const deletar = async (id) => {
  const existe = await repository.buscarPorId(id);

  if (!existe) return false;

  await repository.deletar(id);
  return true;
};