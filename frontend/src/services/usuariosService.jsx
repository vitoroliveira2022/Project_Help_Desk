// src/services/usuariosService.jsx
const API = 'http://localhost:3000/usuarios';

export const getUsuarios = async () => {
  const res = await fetch(API);
  return res.json();
};

export const getUsuarioById = async (id) => {
  const res = await fetch(`${API}/${id}`);
  return res.json();
};

export const createUsuario = async (data) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateUsuario = async (id, data) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteUsuario = async (id) => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
};