import { Router } from 'express';
import * as tecnicosController from '../controllers/tecnicosController.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

// login público
router.post('/login', tecnicosController.login);

// protegidas
router.get('/', auth, tecnicosController.listar);
router.get('/:id', auth, tecnicosController.buscarPorId);
router.post('/', auth, tecnicosController.criar);
router.patch('/:id', auth, tecnicosController.atualizar);
router.delete('/:id', auth, tecnicosController.deletar);

export default router;