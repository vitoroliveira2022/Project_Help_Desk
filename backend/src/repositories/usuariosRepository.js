import { prisma } from '../config/prisma.js';

// select padrão seguro
// evita retornar senha e outros campos sensíveis
// inclui também chamados criados pelo usuário
const selectSeguro = {
  id: true,
  nome: true,
  email: true,
  role: true,

  // relação: chamados criados pelo usuário
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


// LISTAR TODOS OS USUÁRIOS
// ordena por ID crescente
// retorna apenas campos seguros
export const listar = () => {
  return prisma.usuario.findMany({
    orderBy: { id: 'asc' },
    select: selectSeguro
  });
};


// BUSCAR USUÁRIO POR ID
// retorna dados do usuário + chamados criados
export const buscarPorId = (id) => {
  return prisma.usuario.findUnique({
    where: { id },
    select: selectSeguro
  });
};


// CRIAR USUÁRIO
// retorna apenas dados básicos (sem senha)
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


// ATUALIZAR USUÁRIO
// retorna dados atualizados sem senha
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


// DELETAR USUÁRIO
export const deletar = (id) => {
  return prisma.usuario.delete({
    where: { id }
  });
};


// BUSCAR USUÁRIO POR EMAIL
// usado no login (precisa retornar senha)
export const buscarPorEmail = (email) => {
  return prisma.usuario.findUnique({
    where: { email }
  });
};