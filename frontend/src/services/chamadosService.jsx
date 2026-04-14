// src/services/chamadosService.jsx
import { api } from '../utils/api';

// LISTAR TODOS
export const getChamados = () => {
  return api('/chamados');
};

// BUSCAR POR ID
export const getChamadoById = (id) => {
  return api(`/chamados/${id}`);
};

// CRIAR
export const createChamado = (data) => {
  return api('/chamados', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// ATUALIZAR
export const updateChamado = (id, data) => {
  return api(`/chamados/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// DELETAR
export const deleteChamado = (id) => {
  return api(`/chamados/${id}`, {
    method: 'DELETE',
  });
};