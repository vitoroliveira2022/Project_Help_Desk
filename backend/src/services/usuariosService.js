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
  const existente = await repository.buscarPorEmail(dados.email);

  if (existente) {
    throw new Error('EMAIL_JA_EXISTE');
  }

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

  // verificar email duplicado
  if (dados.email) {
    const usuarioComEmail = await repository.buscarPorEmail(dados.email);

    if (usuarioComEmail && usuarioComEmail.id !== id) {
      throw new Error('EMAIL_JA_EXISTE');
    }
  }

  // hash senha
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