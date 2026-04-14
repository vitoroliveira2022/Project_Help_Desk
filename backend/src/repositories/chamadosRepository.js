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
  }
};

// LISTAR
export const listar = () => {
  return prisma.chamado.findMany({
    orderBy: { id: 'asc' },
    include: includeSeguro
  });
};

export const listarPorUsuario = (usuarioId) => {
  return prisma.chamado.findMany({
    where: { usuarioId },
    orderBy: { id: 'asc' },
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