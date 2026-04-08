// Service: camada que aplica a lógica de negócio
// Recebe dados do controller, trata regras (hash de senha, validações) e chama o repository.

import * as repository from '../repositories/usuariosRepository.js';
import bcrypt from 'bcryptjs';

// Buscar usuário pelo email
export const buscarPorEmail = async (email) => {
  // apenas delega para o repository
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
  // gera hash da senha antes de salvar
  const hash = await bcrypt.hash(dados.senha, 10);

  // passa os dados para o repository, substituindo a senha pelo hash
  return repository.criar({
    ...dados,
    senha: hash
  });
};

// Atualizar usuário
export const atualizar = async (id, dados) => {
  const existe = await repository.buscarPorId(id);

  if (!existe) return null;

  // se a senha estiver sendo atualizada, gerar hash antes
  if (dados.senha) {
    const hash = await bcrypt.hash(dados.senha, 10);
    dados.senha = hash;
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