
const API = 'http://localhost:3000/chamados';

export const getChamados = async () => {
  const res = await fetch(API);
  return res.json();
};

export const getChamadoById = async (id) => {
  const res = await fetch(`${API}/${id}`);
  return res.json();
};

export const createChamado = async (data) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateChamado = async (id, data) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteChamado = async (id) => {
  await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });
};