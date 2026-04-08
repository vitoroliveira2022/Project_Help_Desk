import { Router } from 'express';
import * as usuariosController from '../controllers/usuariosController.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

// login (público)
router.post('/login', usuariosController.login);

// protegidas
router.get('/', auth, usuariosController.listar);
router.get('/:id', auth, usuariosController.buscarPorId);

// criação pública
router.post('/', usuariosController.criar);

// protegidas
router.patch('/:id', auth, usuariosController.atualizar);
router.delete('/:id', auth, usuariosController.deletar);

export default router;