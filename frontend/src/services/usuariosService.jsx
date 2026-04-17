// src/services/usuariosService.jsx
import { api } from '../utils/api';


// 📋 LISTAR (ADMIN)
export const getUsuarios = () => {
  return api('/usuarios');
};


// 🔎 BUSCAR POR ID
export const getUsuarioById = (id) => {
  return api(`/usuarios/${id}`);
};


// 🟢 CRIAR USUÁRIO COMUM (USER)
export const createUsuario = (data) => {
  return api('/usuarios', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};


// 🔵 CRIAR TÉCNICO (ADMIN)
export const createTecnico = (data) => {
  
  return api('/usuarios/tecnicos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};


// 🔴 CRIAR ADMIN (ADMIN)
export const createUsuarioAdmin = (data) => {
  return api('/usuarios/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};


// ✏️ ATUALIZAR
export const updateUsuario = (id, data) => {
  return api(`/usuarios/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};


// 🗑️ DELETAR
export const deleteUsuario = (id) => {
  return api(`/usuarios/${id}`, {
    method: 'DELETE',
  });
};