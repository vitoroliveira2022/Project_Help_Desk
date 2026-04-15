import * as service from '../services/usuariosService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// 🔐 LOGIN (público)
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'email e senha são obrigatórios' });
    }

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



// 📋 LISTAR (somente ADMIN)
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



// 🔎 BUSCAR POR ID (ADMIN ou próprio usuário)
export const buscarPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);

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



// ➕ USER (cadastro público)
export const criarUsuario = async (req, res) => {
  try {
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
      role: 'USER'
    });

    return res.status(201).json(usuario);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};



// 🛠️ TECNICO (somente ADMIN cria)
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
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar técnico' });
  }
};



// 🛡️ ADMIN (somente ADMIN cria outro ADMIN)
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
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar admin' });
  }
};



// ✏️ ATUALIZAR
export const atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (req.usuario?.role !== 'ADMIN' && req.usuario?.id !== id) {
      return res.status(403).json({ erro: 'Sem permissão' });
    }

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



// 🗑️ DELETAR (somente ADMIN)
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