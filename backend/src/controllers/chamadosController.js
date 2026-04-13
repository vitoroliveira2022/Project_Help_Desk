import * as service from '../services/chamadosService.js';

// LISTAR
export const listar = async (req, res) => {
  try {
    const usuario = req.usuario;
    let chamados;

    if (usuario.role === 'ADMIN' || usuario.role === 'TECNICO') {
      chamados = await service.listar(); // todos
    } else {
      chamados = await service.listarPorUsuario(usuario.id); // só os próprios
    }

    return res.json(chamados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao listar chamados' });
  }
};

// BUSCAR POR ID
export const buscarPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = req.usuario;

    const chamado = await service.buscarPorId(id);

    if (
      !chamado ||
      (
        usuario.role !== 'ADMIN' &&
        usuario.role !== 'TECNICO' &&
        chamado.usuarioId !== usuario.id
      )
    ) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });
    }

    return res.json(chamado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar chamado' });
  }
};

// CRIAR
export const criar = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo || !descricao) {
      return res.status(400).json({
        erro: 'titulo e descricao são obrigatórios'
      });
    }

    const usuarioId = req.usuario.id;

    const chamado = await service.criar({
      titulo,
      descricao,
      usuarioId
    });

    return res.status(201).json(chamado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao criar chamado' });
  }
};

// ATUALIZAR
export const atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const chamado = await service.atualizar(id, req.body);

    if (!chamado) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });
    }

    return res.json(chamado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao atualizar chamado' });
  }
};

// DELETAR
export const deletar = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deletado = await service.deletar(id);

    if (!deletado) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });
    }

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao deletar chamado' });
  }
};

// ASSUMIR CHAMADO
export const assumir = async (req, res) => {
  try {
    const usuario = req.usuario;

    if (usuario.role !== 'TECNICO') {
      return res.status(403).json({
        erro: 'Apenas técnicos podem assumir chamados'
      });
    }

    const id = Number(req.params.id);

    const chamado = await service.assumir(id, usuario.id);

    if (!chamado) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });
    }

    return res.json(chamado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao assumir chamado' });
  }
};