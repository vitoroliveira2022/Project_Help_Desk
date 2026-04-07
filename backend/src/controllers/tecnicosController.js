import * as service from '../services/tecnicosService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  const { email, senha } = req.body;

  const tecnico = await service.buscarPorEmail(email);

  if (!tecnico) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const senhaValida = await bcrypt.compare(senha, tecnico.senha);

  if (!senhaValida) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    {
      id: tecnico.id,
      tipo: 'tecnico'
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

  const tecnico = await service.buscarPorId(id);

  if (!tecnico) {
    return res.status(404).json({ erro: 'Técnico não encontrado' });
  }

  res.json(tecnico);
};

export const criar = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      erro: 'nome, email e senha são obrigatórios'
    });
  }

  const tecnico = await service.criar({ nome, email, senha });

  res.status(201).json(tecnico);
};

export const atualizar = async (req, res) => {
  const id = Number(req.params.id);

  const tecnico = await service.atualizar(id, req.body);

  if (!tecnico) {
    return res.status(404).json({ erro: 'Técnico não encontrado' });
  }

  res.json(tecnico);
};

export const deletar = async (req, res) => {
  const id = Number(req.params.id);

  const deletado = await service.deletar(id);

  if (!deletado) {
    return res.status(404).json({ erro: 'Técnico não encontrado' });
  }

  res.status(204).send();
};