// src/services/tecnicosService.jsx
const API_TECNICOS = 'http://localhost:3000/tecnicos';

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Erro na requisição');
  return data;
};

export const getTecnicos = async () => {
  const res = await fetch(API_TECNICOS);
  return handleResponse(res);
};

export const getTecnicoById = async (id) => {
  const res = await fetch(`${API_TECNICOS}/${id}`);
  return handleResponse(res);
};

export const createTecnico = async (data) => {
  const res = await fetch(API_TECNICOS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateTecnico = async (id, data) => {
  const res = await fetch(`${API_TECNICOS}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteTecnico = async (id) => {
  const res = await fetch(`${API_TECNICOS}/${id}`, { method: 'DELETE' });
  return handleResponse(res);
};