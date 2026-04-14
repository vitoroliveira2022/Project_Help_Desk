import { prisma } from '../config/prisma.js';

const selectSeguro = {
  id: true,
  nome: true,
  email: true,
  role: true,

  // relação correta do seu schema
  chamadosCriados: {
    select: {
      id: true,
      titulo: true,
      descricao: true,
      status: true,
      criadoEm: true,
      atualizadoEm: true,
      tecnicoId: true
    }
  }
};

export const listar = () => {
  return prisma.usuario.findMany({
    orderBy: { id: 'asc' },
    select: selectSeguro
  });
};

export const buscarPorId = (id) => {
  return prisma.usuario.findUnique({
    where: { id },
    select: selectSeguro
  });
};

export const criar = (dados) => {
  return prisma.usuario.create({
    data: dados,
    select: {
      id: true,
      nome: true,
      email: true,
      role: true
    }
  });
};

export const atualizar = (id, dados) => {
  return prisma.usuario.update({
    where: { id },
    data: dados,
    select: {
      id: true,
      nome: true,
      email: true,
      role: true
    }
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