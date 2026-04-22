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
    const usuario = req.usuario;

    const chamado = await service.buscarPorId(id);

    if (!chamado) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });
    }

    const podeAtualizar =
      usuario.role === 'ADMIN' ||
      chamado.usuarioId === usuario.id ||
      chamado.tecnicoId === usuario.id;

    if (!podeAtualizar) {
      return res.status(403).json({
        erro: 'Sem permissão para atualizar este chamado'
      });
    }

    const atualizado = await service.atualizar(id, req.body);

    return res.json(atualizado);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao atualizar chamado' });
  }
};

// DELETAR
export const deletar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = req.usuario;

    const chamado = await service.buscarPorId(id);

    if (!chamado) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });
    }

    const podeDeletar =
      usuario.role === 'ADMIN' ||
      chamado.usuarioId === usuario.id;

    if (!podeDeletar) {
      return res.status(403).json({
        erro: 'Sem permissão para deletar este chamado'
      });
    }

    await service.deletar(id);

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

    const existente = await service.buscarPorId(id);

    if (!existente) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });
    }

    if (existente.tecnicoId) {
      return res.status(400).json({
        erro: 'Chamado já está em atendimento'
      });
    }

    const chamado = await service.assumir(id, usuario.id);

    return res.json(chamado);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao assumir chamado' });
  }
};

// CRIAR SOLUÇÃO
export const criarSolucao = async (req, res) => {
  try {
    const usuario = req.usuario;

    // apenas técnico
    if (usuario.role !== 'TECNICO') {
      return res.status(403).json({
        erro: 'Apenas técnicos podem enviar solução'
      });
    }

    const id = Number(req.params.id);
    const { descricao } = req.body;

    if (!descricao) {
      return res.status(400).json({
        erro: 'Descrição da solução é obrigatória'
      });
    }

    const chamado = await service.buscarPorId(id);

    if (!chamado) {
      return res.status(404).json({
        erro: 'Chamado não encontrado'
      });
    }

    // opcional: garantir que só o técnico responsável responda
    if (chamado.tecnicoId !== usuario.id) {
      return res.status(403).json({
        erro: 'Você não é o técnico responsável por este chamado'
      });
    }

    const solucao = await service.criarSolucao({
      descricao,
      chamadoId: id,
      tecnicoId: usuario.id
    });

    // finalizar chamado automaticamente
    await service.atualizar(id, {
      status: 'FINALIZADO'
    });

    return res.status(201).json(solucao);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      erro: 'Erro ao criar solução'
    });
  }
};