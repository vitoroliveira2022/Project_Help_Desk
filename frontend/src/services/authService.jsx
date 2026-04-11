// src/services/authService.jsx
const API_USUARIOS = 'http://localhost:3000/usuarios';
const API_TECNICOS = 'http://localhost:3000/tecnicos';

// usuario + admin
export const loginUsuario = async (email, senha) => {
  const res = await fetch(`${API_USUARIOS}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Login falhou');

  return {
    token: data.token,
    usuario: data.usuario
  };
};

// tecnico
export const loginTecnico = async (email, senha) => {
  const res = await fetch(`${API_TECNICOS}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Login falhou');

  return {
    token: data.token,
    usuario: data.usuario || data.tecnico
  };
};