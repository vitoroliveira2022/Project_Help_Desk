// src/services/chamados.service.js

// Importa os dados (simulando banco de dados)
import { chamados } from '../repository/chamadosRepository.js';

// =========================
// LISTAR TODOS OS CHAMADOS
// =========================
export const listar = () => chamados;

// =========================
// BUSCAR UM CHAMADO POR ID
// =========================
export const buscarPorId = (id) =>
  chamados.find(c => c.id === id);

// =========================
// CRIAR UM NOVO CHAMADO
// =========================
export const criar = (dados) => {
  const novo = {
    id: chamados.length + 1, // gera o próximo id
    ...dados                  // título, descrição, status
  };
  chamados.push(novo);        // adiciona ao array
  return novo;
};

// =========================
// ATUALIZAR UM CHAMADO EXISTENTE
// =========================
export const atualizar = (id, dados) => {
  const index = chamados.findIndex(c => c.id === id);
  if (index === -1) return null; // se não encontrou

  // atualiza somente os campos enviados
  chamados[index] = { ...chamados[index], ...dados };
  return chamados[index];
};

// =========================
// DELETAR UM CHAMADO
// =========================
export const deletar = (id) => {
  const index = chamados.findIndex(c => c.id === id);
  if (index === -1) return false; // não encontrado

  chamados.splice(index, 1); // remove do array
  return true;
};