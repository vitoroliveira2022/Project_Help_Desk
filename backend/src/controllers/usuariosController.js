import * as service from '../services/usuariosService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
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
      email: usuario.email,
      role: usuario.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};

export const listar = async (req, res) => {
  const dados = await service.listar();
  res.json(dados);
};

export const buscarPorId = async (req, res) => {
  const id = Number(req.params.id);

  const usuario = await service.buscarPorId(id);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  res.json(usuario);
};

export const criar = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      erro: 'nome, email e senha são obrigatórios'
    });
  }

  const usuario = await service.criar({
    nome,
    email,
    senha,
    role
  });

  res.status(201).json(usuario);
};

export const atualizar = async (req, res) => {
  const id = Number(req.params.id);

  const usuario = await service.atualizar(id, req.body);

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  res.json(usuario);
};

export const deletar = async (req, res) => {
  const id = Number(req.params.id);

  const deletado = await service.deletar(id);

  if (!deletado) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }

  res.status(204).send();
};