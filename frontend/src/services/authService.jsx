// src/services/authService.jsx
const API_USUARIOS = 'http://localhost:3000/usuarios';
const API_TECNICOS = 'http://localhost:3000/tecnicos';

// login usuário
export const loginUsuario = async (email, senha) => {
  const res = await fetch(`${API_USUARIOS}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Login falhou');

  // Certifique-se de que o backend retorna { token, tipo } 
  // Exemplo: { token: '...', tipo: 'USUARIO' }
  if (!data.token) throw new Error('Login falhou: token não retornado');

  return data;
};

// login técnico
export const loginTecnico = async (email, senha) => {
  const res = await fetch(`${API_TECNICOS}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Login falhou');
  if (!data.token) throw new Error('Login falhou: token não retornado');

  return data;
};