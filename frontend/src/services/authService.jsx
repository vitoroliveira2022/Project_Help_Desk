// URL base da API (backend rodando localmente)
const API = 'http://localhost:3000';

// Função responsável por fazer o login do usuário
export const login = async (email, senha) => {

  // Faz requisição HTTP para o endpoint de login
  const res = await fetch(`${API}/usuarios/login`, {

    // Método POST porque estamos enviando dados para autenticação
    method: 'POST',

    // Informa que o conteúdo enviado é JSON
    headers: { 'Content-Type': 'application/json' },

    // Corpo da requisição (dados do login)
    body: JSON.stringify({ email, senha }),
  });

  // Converte a resposta da API para JSON
  // Se falhar (ex: resposta vazia), retorna objeto vazio
  const data = await res.json().catch(() => ({}));

  // Se a resposta não for OK (status 200–299), lança erro
  if (!res.ok) {
    throw new Error(data.message || 'Login falhou');
  }

  // Retorna apenas os dados importantes do login
  return {
    token: data.token,       // token JWT para autenticação
    usuario: data.usuario,   // dados do usuário logado
  };
};