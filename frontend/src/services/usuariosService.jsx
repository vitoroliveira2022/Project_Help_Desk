// src/services/usuariosService.jsx

// Importa a função genérica de requisição da API (já com token e tratamento de erro)
import { api } from '../utils/api';


// =======================
// LISTAR USUÁRIOS (ADMIN)
// =======================
export const getUsuarios = () => {
  // Retorna todos os usuários cadastrados (acesso geralmente restrito ao ADMIN)
  return api('/usuarios');
};


// =======================
// BUSCAR USUÁRIO POR ID
// =======================
export const getUsuarioById = (id) => {
  // Busca um usuário específico pelo ID
  return api(`/usuarios/${id}`);
};


// =======================
// CRIAR USUÁRIO COMUM (USER)
// =======================
export const createUsuario = (data) => {
  return api('/usuarios', {
    method: 'POST', // cria um novo usuário comum
    body: JSON.stringify(data), // envia os dados do usuário
  });
};


// =======================
// CRIAR TÉCNICO (ADMIN)
// =======================
export const createTecnico = (data) => {
  return api('/usuarios/tecnicos', {
    method: 'POST', // cria usuário com role de técnico
    body: JSON.stringify(data),
  });
};


// =======================
// CRIAR ADMIN (ADMIN)
// =======================
export const createUsuarioAdmin = (data) => {
  return api('/usuarios/admin', {
    method: 'POST', // cria usuário com role de admin
    body: JSON.stringify(data),
  });
};


// =======================
// ATUALIZAR USUÁRIO
// =======================
export const updateUsuario = (id, data) => {
  return api(`/usuarios/${id}`, {
    method: 'PATCH', // atualiza parcialmente os dados do usuário
    body: JSON.stringify(data),
  });
};


// =======================
// DELETAR USUÁRIO
// =======================
export const deleteUsuario = (id) => {
  return api(`/usuarios/${id}`, {
    method: 'DELETE', // remove o usuário do sistema
  });
};