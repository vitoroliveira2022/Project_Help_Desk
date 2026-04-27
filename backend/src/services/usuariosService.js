// Service: camada que aplica regras de negócio
// Recebe dados do controller, valida, trata senha (hash)
// e delega persistência para o repository.

import * as repository from '../repositories/usuariosRepository.js';
import bcrypt from 'bcryptjs';


// BUSCAR USUÁRIO POR EMAIL
export const buscarPorEmail = async (email) => {
  return repository.buscarPorEmail(email);
};


// LISTAR TODOS OS USUÁRIOS
export const listar = async () => {
  return repository.listar();
};


// BUSCAR USUÁRIO POR ID
export const buscarPorId = async (id) => {
  return repository.buscarPorId(id);
};


// CRIAR USUÁRIO
// valida email único e faz hash da senha antes de salvar
export const criar = async (dados) => {

  // verifica se email já existe
  const existente = await repository.buscarPorEmail(dados.email);

  if (existente) {
    throw new Error('EMAIL_JA_EXISTE');
  }

  const { senha, ...resto } = dados;

  // gera hash da senha
  const hash = await bcrypt.hash(senha, 10);

  // salva usuário com senha criptografada
  return repository.criar({
    ...resto,
    senha: hash
  });
};


// ATUALIZAR USUÁRIO
export const atualizar = async (id, dados) => {

  // verifica se usuário existe
  const existe = await repository.buscarPorId(id);

  if (!existe) return null;

  // verificar email duplicado
  if (dados.email) {
    const usuarioComEmail = await repository.buscarPorEmail(dados.email);

    // impede usar email já existente em outro usuário
    if (usuarioComEmail && usuarioComEmail.id !== id) {
      throw new Error('EMAIL_JA_EXISTE');
    }
  }

  // se estiver atualizando senha, gerar hash
  if (dados.senha) {
    dados.senha = await bcrypt.hash(dados.senha, 10);
  }

  return repository.atualizar(id, dados);
};


// DELETAR USUÁRIO
// verifica existência antes de deletar
export const deletar = async (id) => {
  const existe = await repository.buscarPorId(id);

  if (!existe) return false;

  await repository.deletar(id);
  return true;
};