import { Router } from 'express';
import * as usuariosController from '../controllers/usuariosController.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

// login (público)
router.post('/login', usuariosController.login);

// cadastro de usuário (público)
router.post('/', usuariosController.criarUsuario);

// protegidas
router.post('/tecnicos', auth, usuariosController.criarTecnico);
router.post('/admin', auth, usuariosController.criarAdmin);
router.get('/', auth, usuariosController.listar);
router.get('/:id', auth, usuariosController.buscarPorId);
router.patch('/:id', auth, usuariosController.atualizar);
router.delete('/:id', auth, usuariosController.deletar);

export default router;