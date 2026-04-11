// src/services/usuariosService.jsx
const API_USUARIOS = 'http://localhost:3000/usuarios';

const getToken = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  return session?.token || '';
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Erro na requisição');
  return data;
};

export const getUsuarios = async () => {
  const res = await fetch(API_USUARIOS, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(res);
};

export const getUsuarioById = async (id) => {
  const res = await fetch(`${API_USUARIOS}/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(res);
};

export const createUsuario = async (data) => {
  const res = await fetch(API_USUARIOS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateUsuario = async (id, data) => {
  const res = await fetch(`${API_USUARIOS}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteUsuario = async (id) => {
  const res = await fetch(`${API_USUARIOS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(res);
};