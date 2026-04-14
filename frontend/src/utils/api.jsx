import { getToken } from './auth';

export const api = async (url, options = {}) => {
  const res = await fetch(`http://localhost:3000${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Erro na requisição');
  }

  return data;
};