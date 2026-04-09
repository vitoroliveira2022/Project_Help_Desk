// src/services/chamadosService.jsx
const API = 'http://localhost:3000/chamados';

// Pega o token do localStorage
const getToken = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  return session?.token || '';
};

// Função auxiliar para tratar respostas
const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.message || 'Erro na requisição';
    throw new Error(message);
  }

  return data;
};

// 🔹 Busca todos os chamados
export const getChamados = async () => {
  const res = await fetch(API, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return handleResponse(res);
};

// 🔹 Busca um chamado específico pelo ID
export const getChamadoById = async (id) => {
  const res = await fetch(`${API}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return handleResponse(res);
};

// 🔹 Cria um novo chamado
export const createChamado = async (data) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

// 🔹 Atualiza um chamado existente
export const updateChamado = async (id, data) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

// 🔹 Remove um chamado
export const deleteChamado = async (id) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return handleResponse(res);
};