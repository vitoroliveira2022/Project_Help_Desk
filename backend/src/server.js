// Importa o framework Express (usado para criar o servidor HTTP)
import express from 'express';

// Importa o CORS (permite que o frontend acesse essa API)
import cors from 'cors';

// Importa as rotas de chamados (onde ficam os endpoints)
import chamadosRoutes from '../src/routes/chamadosRoutes.js';
import usuariosRoutes from '../src/routes/usuariosRoutes.js';
import tecnicosRoutes from '../src/routes/tecnicosRoutes.js';

// Cria a aplicação Express (instância do servidor)
const app = express();

// Habilita o CORS para permitir requisições de outros domínios (ex: React rodando em outra porta)
app.use(cors());

// Middleware que permite o servidor entender JSON no corpo das requisições (req.body) 
// antes de chegar nas rotas
app.use(express.json());

// Define que todas as rotas que começam com '/chamados' serão tratadas no arquivo chamadosRoutes
// Define que todas as rotas que começam com '/usuarios' serão tratadas no arquivo usuariosRoutes
// Define que todas as rotas que começam com '/tecnicos' serão tratadas no arquivo tecnicosRoutes
app.use('/chamados', chamadosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/tecnicos', tecnicosRoutes);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  // Exibe mensagem no terminal quando o servidor estiver rodando
  console.log('Servidor rodando 🚀');
});