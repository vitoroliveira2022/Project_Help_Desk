// src/services/tecnicosService.jsx
const API = 'http://localhost:3000/tecnicos';

export const getTecnicos = async () => {
  const res = await fetch(API);
  return res.json();
};

export const getTecnicoById = async (id) => {
  const res = await fetch(`${API}/${id}`);
  return res.json();
};

export const createTecnico = async (data) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateTecnico = async (id, data) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTecnico = async (id) => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
};