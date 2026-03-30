

// Importa todas as funções do service (onde está a regra de negócio)
import * as service from '../services/chamadosService.js';

// =========================
// LISTAR TODOS OS CHAMADOS
// =========================
export const listar = (req, res) => {
  const dados = service.listar();
  res.json(dados); // converte a resposta para JSON e envia array de chamados ao frontend
};

// =========================
// BUSCAR UM CHAMADO POR ID
// =========================
export const buscarPorId = (req, res) => {
  const id = Number(req.params.id);
  const chamado = service.buscarPorId(id);

  if (!chamado) {
    return res.status(404).json({ mensagem: 'Chamado não encontrado' });
  }

  res.json(chamado); // envia o chamado encontrado como resposta para o frontend
};

// =========================
// CRIAR UM NOVO CHAMADO
// =========================
export const criar = (req, res) => {
  const dados = req.body;

  // opcional: validação mínima
  if (!dados.titulo || !dados.descricao) {
    return res.status(400).json({ mensagem: 'Título e descrição são obrigatórios' });
  }

  const novoChamado = service.criar(dados);
  res.status(201).json(novoChamado); // 201 = Created, envia o novo chamado criado como resposta para o frontend
};

// =========================
// ATUALIZAR UM CHAMADO EXISTENTE
// =========================
export const atualizar = (req, res) => {
  const id = Number(req.params.id);
  const dados = req.body;

  const atualizado = service.atualizar(id, dados);

  if (!atualizado) {
    return res.status(404).json({ mensagem: 'Chamado não encontrado' });
  }

  res.json(atualizado); // envia o chamado atualizado como resposta para o frontend
};

// =========================
// DELETAR UM CHAMADO
// =========================
export const deletar = (req, res) => {
  const id = Number(req.params.id);
  const sucesso = service.deletar(id);

  if (!sucesso) {
    return res.status(404).json({ mensagem: 'Chamado não encontrado' });
  }

  res.status(204).send(); // 204 = No Content, indica que a operação foi bem-sucedida mas não há conteúdo para retornar ao frontend
};