// Importa função que pega o token de autenticação salvo (JWT)
import { getToken } from './auth';

// Função genérica para fazer requisições para a API
export const api = async (url, options = {}) => {

  // Faz a requisição HTTP para o backend
  const res = await fetch(`http://localhost:3000${url}`, {

    // Espalha as opções recebidas (method, body, etc)
    ...options,

    // Define os headers da requisição
    headers: {

      // Informa que o conteúdo enviado/recebido é JSON
      'Content-Type': 'application/json',

      // Envia o token de autenticação no header (JWT)
      Authorization: `Bearer ${getToken()}`,

      // Permite sobrescrever ou adicionar outros headers se necessário
      ...options.headers,
    },
  });

  // Tenta converter a resposta para JSON
  // Se falhar (ex: resposta vazia), retorna objeto vazio
  const data = await res.json().catch(() => ({}));

  // Se a resposta não for OK (status 200–299), lança erro
  if (!res.ok) {
    throw new Error(data.message || 'Erro na requisição');
  }

  // Se tudo der certo, retorna os dados da API
  return data;
};