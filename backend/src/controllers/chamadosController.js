import * as service from '../services/chamadosService.js';

// Controller de chamados
// Cada função abaixo recebe a requisição HTTP,
// valida permissões e chama o service correspondente.

// LISTAR CHAMADOS
// ADMIN e TECNICO veem todos
// USER vê apenas seus próprios chamados
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

// BUSCAR CHAMADO POR ID
// ADMIN e TECNICO podem ver qualquer um
// USER só pode ver o próprio chamado
export const buscarPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const usuario = req.usuario;

    const chamado = await service.buscarPorId(id);

    // verifica se existe e se o usuário tem permissão
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

// CRIAR CHAMADO
// usuário autenticado cria chamado vinculado ao seu ID
export const criar = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    // valida campos obrigatórios
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

// ATUALIZAR CHAMADO
// ADMIN pode atualizar qualquer um
// usuário dono pode atualizar
// técnico responsável pode atualizar
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

    // verifica permissão
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

// DELETAR CHAMADO
// ADMIN pode deletar qualquer um
// usuário dono pode deletar
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

    // verifica permissão
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

// TÉCNICO ASSUME CHAMADO
// apenas técnico pode assumir
// chamado não pode já estar em atendimento
export const assumir = async (req, res) => {
  try {
    const usuario = req.usuario;

    // apenas técnicos
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

    // não pode assumir se já tiver técnico
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

// CRIAR SOLUÇÃO DO CHAMADO
// apenas técnico responsável pode enviar solução
// ao criar solução, chamado é finalizado automaticamente
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

    // valida descrição
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

    // garante que só o técnico responsável responda
    if (chamado.tecnicoId !== usuario.id) {
      return res.status(403).json({
        erro: 'Você não é o técnico responsável por este chamado'
      });
    }

    // cria solução
    const solucao = await service.criarSolucao({
      descricao,
      chamadoId: id,
      tecnicoId: usuario.id
    });

    // finaliza chamado automaticamente
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