// src/services/chamadosService.jsx
const API_CHAMADOS = 'http://localhost:3000/chamados';

const getToken = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  return session?.token || '';
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Erro na requisição');
  return data;
};

export const getChamados = async () => {
  const res = await fetch(API_CHAMADOS, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(res);
};

export const getChamadoById = async (id) => {
  const res = await fetch(`${API_CHAMADOS}/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(res);
};

export const createChamado = async (data) => {
  const res = await fetch(API_CHAMADOS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateChamado = async (id, data) => {
  const res = await fetch(`${API_CHAMADOS}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteChamado = async (id) => {
  const res = await fetch(`${API_CHAMADOS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(res);
};