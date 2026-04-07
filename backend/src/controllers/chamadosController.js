import * as service from '../services/chamadosService.js';

// LISTAR
export const listar = async (req, res) => {
  try {
    const usuario = req.usuario; // vem do middleware auth
    let chamados;

    if (usuario.role === 'ADMIN' || usuario.tipo === 'tecnico') {
      chamados = await service.listar(); // todos os chamados
    } else {
      chamados = await service.listarPorUsuario(usuario.id); // só os próprios
    }

    res.json(chamados);

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar chamados' });
  }
};

// BUSCAR POR ID
export const buscarPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = req.usuario;

    const chamado = await service.buscarPorId(id);

    // se não for técnico/admin e não for dono do chamado
    if (!chamado || (usuario.tipo !== 'tecnico' && usuario.role !== 'ADMIN' && chamado.usuarioId !== usuario.id)) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });
    }

    res.json(chamado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar chamado' });
  }
};

// CRIAR (usuario logado)
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

    res.status(201).json(chamado);

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar chamado' });
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

    res.json(chamado);

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar chamado' });
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

    res.status(204).send();

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar chamado' });
  }
};

export const assumir = async (req, res) => {
  try {
    const usuario = req.usuario;

    // checa se é técnico
    if (usuario.tipo !== 'tecnico') {
      return res.status(403).json({ erro: 'Apenas técnicos podem assumir chamados' });
    }

    const id = Number(req.params.id);
    const tecnicoId = usuario.id;

    const chamado = await service.assumir(id, tecnicoId);

    if (!chamado) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });
    }

    res.json(chamado);

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao assumir chamado' });
  }
};