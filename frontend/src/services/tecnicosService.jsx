// src/services/tecnicosService.jsx
const API_TECNICOS = 'http://localhost:3000/tecnicos';

const getToken = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  return session?.token || '';
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Erro na requisição');
  return data;
};

export const getTecnicos = async () => {
  const res = await fetch(API_TECNICOS, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(res);
};

export const getTecnicoById = async (id) => {
  const res = await fetch(`${API_TECNICOS}/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(res);
};

export const createTecnico = async (data) => {
  const res = await fetch(API_TECNICOS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateTecnico = async (id, data) => {
  const res = await fetch(`${API_TECNICOS}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteTecnico = async (id) => {
  const res = await fetch(`${API_TECNICOS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(res);
};