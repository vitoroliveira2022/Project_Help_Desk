import { Router } from 'express';
import * as chamadosController from '../controllers/chamadosController.js';
import { auth } from '../middlewares/auth.js';


const router = Router();

/* Quando uma requisição HTTP chega com método + URL correspondente, 
o Express executa o middleware "auth" e depois chama o controller indicado. */

router.get('/', auth, chamadosController.listar);

// rota mais específica primeiro
router.patch('/:id/assumir', auth, chamadosController.assumir);

// somente chamados criados pelo usuário ou assumidos por ele
router.get('/:id', auth, chamadosController.buscarPorId);

// usuário cria chamado
router.post('/', auth, chamadosController.criar);

// atualizar (status etc)
router.patch('/:id', auth, chamadosController.atualizar);

// deletar
router.delete('/:id', auth, chamadosController.deletar);

router.post('/:id/solucoes', auth, chamadosController.criarSolucao);

export default router;