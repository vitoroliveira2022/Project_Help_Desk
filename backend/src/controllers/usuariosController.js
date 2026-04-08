// Controller: camada que recebe a requisição do cliente, 
// chama o service para tratar a lógica de negócio e envia a resposta.
// O controller **não faz regras complexas**, apenas coordena a requisição e resposta.

import * as service from '../services/usuariosService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Login do usuário
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await service.buscarPorEmail(email);
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Retorna token + dados básicos do usuário
    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.role // USER ou ADMIN
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};

// Listar todos os usuários
export const listar = async (req, res) => {
  try {
    const dados = await service.listar();
    res.json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};

// Buscar usuário por ID
export const buscarPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = await service.buscarPorId(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
};

// Criar um novo usuário
export const criar = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'nome, email e senha são obrigatórios' });
    }

    const usuario = await service.criar({ nome, email, senha, role });
    res.status(201).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};

// Atualizar dados de um usuário
export const atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = await service.atualizar(id, req.body);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
};

// Deletar um usuário
export const deletar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletado = await service.deletar(id);

    if (!deletado) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
};