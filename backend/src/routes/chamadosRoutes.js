// Importa o Router do Express (serve pra criar rotas separadas do app principal)
import { Router } from 'express';

// Importa todas as funções do controller de chamados
// (listar, buscarPorId, criar, deletar, atualizar)
import * as controller from '../controllers/chamadosController.js';

// Cria uma instância de roteador
// É como se fosse um "mini app" só para rotas de chamados
const router = Router();

// Define uma rota GET para "/chamados"
// Quando alguém acessar GET /chamados → chama controller.listar
router.get('/', controller.listar);

// Define uma rota GET com parâmetro (id)
// Ex: GET /chamados/1 → chama controller.buscarPorId
router.get('/:id', controller.buscarPorId);

// Define uma rota POST para criar um novo chamado
// Ex: POST /chamados → chama controller.criar
router.post('/', controller.criar);

// Define uma rota DELETE para remover um chamado pelo id
// Ex: DELETE /chamados/1 → chama controller.deletar
router.delete('/:id', controller.deletar);

// Define uma rota PATCH para atualizar parcialmente um chamado
// Ex: PATCH /chamados/1 → chama controller.atualizar
router.patch('/:id', controller.atualizar);

// Exporta esse conjunto de rotas para ser usado no server.js
export default router;