import { Router } from 'express';
import * as controller from '../controllers/usuariosController.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

// login (público)
router.post('/login', controller.login);

// protegidas
router.get('/', auth, controller.listar);
router.get('/:id', auth, controller.buscarPorId);

// normalmente deixar criar usuário público
router.post('/', controller.criar);

// protegidas
router.patch('/:id', auth, controller.atualizar);
router.delete('/:id', auth, controller.deletar);

export default router;