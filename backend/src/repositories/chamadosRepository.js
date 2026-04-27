import { prisma } from '../config/prisma.js';

// include padrão para retornar dados relacionados com segurança
// evita retornar senha e campos sensíveis
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
  // inclui soluções do chamado
  solucoes: {
    include: {
      tecnico: {
        select: {
          id: true,
          nome: true
        }
      }
    },
    // ordena soluções pela mais antiga
    orderBy: {
      criadoEm: 'asc'
    }
  }
};


// LISTAR TODOS OS CHAMADOS
// ordena pelos mais recentes
// inclui usuário, técnico e soluções
export const listar = () => {
  return prisma.chamado.findMany({
    orderBy: { criadoEm: 'desc' },
    include: includeSeguro
  });
};


// LISTAR CHAMADOS DE UM USUÁRIO
export const listarPorUsuario = (usuarioId) => {
  return prisma.chamado.findMany({
    where: { usuarioId },
    orderBy: { criadoEm: 'desc' },
    include: includeSeguro
  });
};


// BUSCAR CHAMADO POR ID
// retorna também usuário, técnico e soluções
export const buscarPorId = (id) => {
  return prisma.chamado.findUnique({
    where: { id },
    include: includeSeguro
  });
};


// CRIAR CHAMADO
// retorna já com os relacionamentos incluídos
export const criar = (dados) => {
  return prisma.chamado.create({
    data: dados,
    include: includeSeguro
  });
};


// ATUALIZAR CHAMADO
// retorna chamado atualizado com relacionamentos
export const atualizar = (id, dados) => {
  return prisma.chamado.update({
    where: { id },
    data: dados,
    include: includeSeguro
  });
};


// DELETAR CHAMADO
export const deletar = (id) => {
  return prisma.chamado.delete({
    where: { id }
  });
};


// CRIAR SOLUÇÃO DO CHAMADO
// inclui técnico responsável e chamado relacionado
export const criarSolucao = (dados) => {
  return prisma.solucao.create({
    data: dados,
    include: {
      tecnico: true,
      chamado: true
    }
  });
};