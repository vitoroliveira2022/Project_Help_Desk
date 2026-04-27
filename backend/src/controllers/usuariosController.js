import * as service from '../services/usuariosService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Controller de usuários
// Responsável por autenticação, cadastro e gerenciamento de usuários
// com controle de permissão por role (ADMIN, TECNICO, USER)


// 🔐 LOGIN (público)
// valida email e senha, gera token JWT e retorna dados do usuário
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // valida campos obrigatórios
    if (!email || !senha) {
      return res.status(400).json({ erro: 'email e senha são obrigatórios' });
    }

    // busca usuário pelo email
    const usuario = await service.buscarPorEmail(email);

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // compara senha enviada com hash do banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // gera token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        role: usuario.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // retorna token + dados do usuário
    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};


// 📋 LISTAR USUÁRIOS
// somente ADMIN pode listar todos
export const listar = async (req, res) => {
  try {
    if (req.usuario?.role !== 'ADMIN') {
      return res.status(403).json({ erro: 'Sem permissão' });
    }

    const dados = await service.listar();
    return res.json(dados);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};


// 🔎 BUSCAR USUÁRIO POR ID
// ADMIN pode ver qualquer usuário
// usuário pode ver apenas o próprio perfil
export const buscarPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // verifica permissão
    if (req.usuario?.role !== 'ADMIN' && req.usuario?.id !== id) {
      return res.status(403).json({ erro: 'Sem permissão' });
    }

    const usuario = await service.buscarPorId(id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    return res.json(usuario);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
};


// ➕ CRIAR USUÁRIO (cadastro público)
// cria usuário com role USER
export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // valida campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'nome, email e senha são obrigatórios'
      });
    }

    const usuario = await service.criar({
      nome,
      email,
      senha,
      role: 'USER'
    });

    return res.status(201).json(usuario);

  } catch (err) {
    if (err.message === 'EMAIL_JA_EXISTE') {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};


// 🛠️ CRIAR TÉCNICO
// somente ADMIN pode criar técnico
export const criarTecnico = async (req, res) => {

  try {
    if (req.usuario?.role !== 'ADMIN') {
      return res.status(403).json({ erro: 'Sem permissão' });
    }

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'nome, email e senha são obrigatórios'
      });
    }

    const usuario = await service.criar({
      nome,
      email,
      senha,
      role: 'TECNICO'
    });

    return res.status(201).json(usuario);

  } catch (err) {
    if (err.message === 'EMAIL_JA_EXISTE') {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar técnico' });
  }
};


// 🛡️ CRIAR ADMIN
// somente ADMIN pode criar outro ADMIN
export const criarAdmin = async (req, res) => {
  try {
    if (req.usuario?.role !== 'ADMIN') {
      return res.status(403).json({ erro: 'Sem permissão' });
    }

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'nome, email e senha são obrigatórios'
      });
    }

    const usuario = await service.criar({
      nome,
      email,
      senha,
      role: 'ADMIN'
    });

    return res.status(201).json(usuario);

  } catch (err) {
    if (err.message === 'EMAIL_JA_EXISTE') {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar admin' });
  }
};


// ✏️ ATUALIZAR USUÁRIO
// ADMIN pode atualizar qualquer usuário
// usuário pode atualizar apenas o próprio
// role não pode ser alterada por aqui
export const atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // verifica permissão
    if (req.usuario?.role !== 'ADMIN' && req.usuario?.id !== id) {
      return res.status(403).json({ erro: 'Sem permissão' });
    }

    // impede alteração de role
    const { role, ...dados } = req.body;

    const usuario = await service.atualizar(id, dados);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    return res.json(usuario);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
};


// 🗑️ DELETAR USUÁRIO
// somente ADMIN pode deletar
export const deletar = async (req, res) => {
  try {
    if (req.usuario?.role !== 'ADMIN') {
      return res.status(403).json({ erro: 'Sem permissão' });
    }

    const id = Number(req.params.id);

    const deletado = await service.deletar(id);

    if (!deletado) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    return res.status(204).send();

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
};