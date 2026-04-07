import { prisma } from '../config/prisma.js';

export const listar = () => {
  return prisma.tecnico.findMany({
    orderBy: { id: 'asc' },
    include: {
      chamados: true
    }
  });
};

export const buscarPorId = (id) => {
  return prisma.tecnico.findUnique({
    where: { id },
    include: {
      chamados: true
    }
  });
};

export const criar = (dados) => {
  return prisma.tecnico.create({
    data: dados
  });
};

export const atualizar = (id, dados) => {
  return prisma.tecnico.update({
    where: { id },
    data: dados
  });
};

export const deletar = (id) => {
  return prisma.tecnico.delete({
    where: { id }
  });
};

export const buscarPorEmail = (email) => {
  return prisma.tecnico.findUnique({
    where: { email }
  });
};