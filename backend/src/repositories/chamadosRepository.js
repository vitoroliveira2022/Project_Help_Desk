import { prisma } from '../config/prisma.js';

// LISTAR
export const listar = () => {
  return prisma.chamado.findMany({
    orderBy: { id: 'asc' },
    include: {
      usuario: true,
      tecnico: true
    }
  });
};

export const listarPorUsuario = (usuarioId) => {
  return prisma.chamado.findMany({
    where: { usuarioId },
    orderBy: { id: 'asc' },
    include: {
      usuario: true,
      tecnico: true
    }
  });
};

// BUSCAR POR ID
export const buscarPorId = (id) => {
  return prisma.chamado.findUnique({
    where: { id },
    include: {
      usuario: true,
      tecnico: true
    }
  });
};

// CRIAR
export const criar = (dados) => {
  return prisma.chamado.create({
    data: dados,
    include: {
      usuario: true,
      tecnico: true
    }
  });
};

// ATUALIZAR
export const atualizar = (id, dados) => {
  return prisma.chamado.update({
    where: { id },
    data: dados,
    include: {
      usuario: true,
      tecnico: true
    }
  });
};

// DELETAR
export const deletar = (id) => {
  return prisma.chamado.delete({
    where: { id }
  });
};