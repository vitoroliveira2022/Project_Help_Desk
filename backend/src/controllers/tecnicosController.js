// Controller: camada que recebe a requisição do cliente,
// chama o service para tratar a lógica de negócio e envia a resposta.
// O controller **não faz regras complexas**, apenas coordena a requisição e resposta.

import * as service from '../services/tecnicosService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Login do técnico
export const login = async (req, res) => {
  try {
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
        tipo: 'tecnico' // identifica que é técnico
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};

// Listar todos os técnicos
export const listar = async (req, res) => {
  try {
    const dados = await service.listar();
    res.json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar técnicos' });
  }
};

// Buscar técnico por ID
export const buscarPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tecnico = await service.buscarPorId(id);

    if (!tecnico) {
      return res.status(404).json({ erro: 'Técnico não encontrado' });
    }

    res.json(tecnico);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar técnico' });
  }
};

// Criar um novo técnico
export const criar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'nome, email e senha são obrigatórios' });
    }

    const tecnico = await service.criar({ nome, email, senha });
    res.status(201).json(tecnico);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar técnico' });
  }
};

// Atualizar dados de um técnico
export const atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tecnico = await service.atualizar(id, req.body);

    if (!tecnico) {
      return res.status(404).json({ erro: 'Técnico não encontrado' });
    }

    res.json(tecnico);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar técnico' });
  }
};

// Deletar um técnico
export const deletar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletado = await service.deletar(id);

    if (!deletado) {
      return res.status(404).json({ erro: 'Técnico não encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar técnico' });
  }
};