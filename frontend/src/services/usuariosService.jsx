// src/services/usuariosService.jsx
import { api } from '../utils/api';

// LISTAR
export const getUsuarios = () => {
  return api('/usuarios');
};

// BUSCAR POR ID
export const getUsuarioById = (id) => {
  return api(`/usuarios/${id}`);
};

// CRIAR
export const createUsuario = (data) => {
  return api('/usuarios', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// ATUALIZAR
export const updateUsuario = (id, data) => {
  return api(`/usuarios/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// DELETAR
export const deleteUsuario = (id) => {
  return api(`/usuarios/${id}`, {
    method: 'DELETE',
  });
};