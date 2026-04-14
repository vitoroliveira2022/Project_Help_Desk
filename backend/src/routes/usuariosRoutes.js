import { Router } from 'express';
import * as usuariosController from '../controllers/usuariosController.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

// login (público)
router.post('/login', usuariosController.login);

// criação pública (sempre USER)
router.post('/', usuariosController.criar);

// criação por ADMIN 
router.post('/admin', auth, usuariosController.criar);

// protegidas
router.get('/', auth, usuariosController.listar);
router.get('/:id', auth, usuariosController.buscarPorId);
router.patch('/:id', auth, usuariosController.atualizar);
router.delete('/:id', auth, usuariosController.deletar);

export default router;