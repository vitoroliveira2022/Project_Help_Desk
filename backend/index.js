// Importa o framework Express (serve pra criar o servidor)
import express from 'express';
import cors from 'cors';

// Cria a aplicação (seu servidor backend)
const app = express();

// 👇 habilita CORS (fazer chamadas a API)
app.use(cors());

// Middleware que processa o corpo das requisições, permitindo interpretar dados no formato JSON 
// antes de chegar nas rotas
app.use(express.json());

// rota: endpoint (URL) + método HTTP
app.get('/', (req, res) => {
    res.send('Olá, mundo!'); // resposta para quem acessar a raiz do servidor
});

// Array de chamados
const chamados = [
    {
        id: 1,
        titulo: 'Problema com o computador',
        descricao: 'O computador não liga',
        status: 'Aberto'
    },
    {
        id: 2,
        titulo: 'Problema com a impressora',
        descricao: 'A impressora não imprime',
        status: 'Aberto'
    },
    {
        id: 3,
        titulo: 'Problema com o email',
        descricao: 'Não consigo acessar meu email',
        status: 'Aberto'
    }
];

// Rota GET para listar os chamados
app.get('/chamados', (req, res) => {
    res.json(chamados);
});

// Rota POST para criar um novo chamado
app.post('/chamados', (req, res) => {
    const novoChamado = {
        id: chamados.length + 1, // gera automaticamente
        ...req.body
    };

    chamados.push(novoChamado);
    res.status(201).json(novoChamado);
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  // Mostra no terminal que o servidor está rodando
  console.log('Servidor rodando 🚀');

});