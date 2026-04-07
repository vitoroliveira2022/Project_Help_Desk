import { prisma } from '../config/prisma.js';

export const listar = () => {
  return prisma.usuario.findMany({
    orderBy: { id: 'asc' },
    include: {
      chamados: true
    }
  });
};

export const buscarPorId = (id) => {
  return prisma.usuario.findUnique({
    where: { id },
    include: {
      chamados: true
    }
  });
};

export const criar = (dados) => {
  return prisma.usuario.create({
    data: dados
  });
};

export const atualizar = (id, dados) => {
  return prisma.usuario.update({
    where: { id },
    data: dados
  });
};

export const deletar = (id) => {
  return prisma.usuario.delete({
    where: { id }
  });
};

export const buscarPorEmail = (email) => {
  return prisma.usuario.findUnique({
    where: { email }
  });
};