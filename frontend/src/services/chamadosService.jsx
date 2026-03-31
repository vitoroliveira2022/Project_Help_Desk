const API = 'http://localhost:3000/chamados'; // endpoint base da API

// 🔹 Busca todos os chamados
export const getChamados = async () => {
  const res = await fetch(API); // faz requisição a rota GET /chamados no backend
  return res.json(); // retorna o JSON da API para o hook 
};

// 🔹 Busca um chamado específico pelo ID
export const getChamadoById = async (id) => {
  const res = await fetch(`${API}/${id}`); // faz requisição a rota GET /chamados/:id no backend
  return res.json(); // retorna o JSON do chamado para o hook
};

// 🔹 Cria um novo chamado
export const createChamado = async (data) => {
  const res = await fetch(API, { // faz requisição a rota POST /chamados no backend
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json(); // retorna o JSON do chamado para o hook
};

// 🔹 Atualiza um chamado existente
export const updateChamado = async (id, data) => {
  const res = await fetch(`${API}/${id}`, {
    method: 'PATCH', // faz requisição a rota PATCH /chamados/:id no backend
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json(); // retorna o JSON do chamado para o hook
};

// 🔹 Remove um chamado
export const deleteChamado = async (id) => {
  await fetch(`${API}/${id}`, { // faz requisição a rota DELETE /chamados/:id no backend
    method: 'DELETE',
  });

  // não retorna JSON
};