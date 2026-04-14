import * as service from '../services/usuariosService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 🔐 LOGIN (único sistema)
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await service.buscarPorEmail(email);

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        role: usuario.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

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
export const listar = async (req, res) => {
  try {
    const dados = await service.listar();
    return res.json(dados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
};

// 🔎 BUSCAR POR ID
export const buscarPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);

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

// ➕ CRIAR USUÁRIO
export const criar = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'nome, email e senha são obrigatórios'
      });
    }

    // regra de segurança
    let roleFinal = 'USER';

    // só ADMIN pode definir role
    if (req.usuario?.role === 'ADMIN') {
      roleFinal = role || 'USER';
    }

    const usuario = await service.criar({
      nome,
      email,
      senha,
      role: roleFinal
    });

    return res.status(201).json(usuario);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};

// ✏️ ATUALIZAR USUÁRIO
export const atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const usuario = await service.atualizar(id, req.body);

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
export const deletar = async (req, res) => {
  try {
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