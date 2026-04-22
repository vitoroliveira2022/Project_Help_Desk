import { prisma } from '../config/prisma.js';

const includeSeguro = {
  usuario: {
    select: {
      id: true,
      nome: true,
      email: true,
      role: true
    }
  },
  tecnico: {
    select: {
      id: true,
      nome: true,
      email: true,
      role: true
    }
  },
  solucoes: {
    include: {
      tecnico: {
        select: {
          id: true,
          nome: true
        }
      }
    },
    orderBy: {
      criadoEm: 'asc'
    }
  }
};

// LISTAR TODOS
export const listar = () => {
  return prisma.chamado.findMany({
    orderBy: { criadoEm: 'desc' },
    include: includeSeguro
  });
};

// LISTAR POR USUÁRIO
export const listarPorUsuario = (usuarioId) => {
  return prisma.chamado.findMany({
    where: { usuarioId },
    orderBy: { criadoEm: 'desc' },
    include: includeSeguro
  });
};

// BUSCAR POR ID
export const buscarPorId = (id) => {
  return prisma.chamado.findUnique({
    where: { id },
    include: includeSeguro
  });
};

// CRIAR
export const criar = (dados) => {
  return prisma.chamado.create({
    data: dados,
    include: includeSeguro
  });
};

// ATUALIZAR
export const atualizar = (id, dados) => {
  return prisma.chamado.update({
    where: { id },
    data: dados,
    include: includeSeguro
  });
};

// DELETAR
export const deletar = (id) => {
  return prisma.chamado.delete({
    where: { id }
  });
};

export const criarSolucao = (dados) => {
  return prisma.solucao.create({
    data: dados,
    include: {
      tecnico: true,
      chamado: true
    }
  });
};