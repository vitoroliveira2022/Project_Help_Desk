const API = 'http://localhost:3000';

export const login = async (email, senha) => {
  const res = await fetch(`${API}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Login falhou');
  }

  return {
    token: data.token,
    usuario: data.usuario,
  };
};