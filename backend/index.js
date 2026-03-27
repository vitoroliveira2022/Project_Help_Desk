// Importa o framework Express (serve pra criar o servidor)
import express from 'express';
import cors from 'cors';

// Cria a aplicação (seu servidor backend)
const app = express();

// habilita CORS (permite requisições de outros domínios - ex: frontend separado)
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
    res.json(chamados); // envia o array de chamados em formato JSON como resposta para o front
});

// Rota GET para obter um chamado específico por ID
app.get('/chamados/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const chamado = chamados.find(c => c.id === id);

  if (!chamado) {
    return res.status(404).json({ mensagem: 'Chamado não encontrado' });
  }

  res.json(chamado); // envia o chamado encontrado em formato JSON como resposta para o front
});

// Rota POST para criar um novo chamado
app.post('/chamados', (req, res) => {
    const novoChamado = {
        id: chamados.length + 1, // gera automaticamente
        ...req.body // pega os dados do corpo da requisição (título, descrição, status) e adiciona ao novo chamado
    };

    chamados.push(novoChamado); // adiciona o novo chamado ao array
    res.status(201).json(novoChamado); // 201 Created, envia o chamado criado em formato JSON como resposta para o front
});

// Rota DELETE para remover chamado
app.delete('/chamados/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const chamado = chamados.find(c => c.id === id);
    if (!chamado) return res.status(404).json({ mensagem: 'Chamado não encontrado' });

    chamados.splice(chamados.indexOf(chamado), 1); // remove o chamado do array
    res.status(204).send(); // 204 No Content, resposta sem corpo
    });

app.put('/chamados/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const chamadoIndex = chamados.findIndex(c => c.id === id);

    if (chamadoIndex === -1) {
        return res.status(404).json({ mensagem: 'Chamado não encontrado' });
    }

    chamados[chamadoIndex] = { id, ...req.body }; // substitui (atualiza) o chamado existente pelos novos dados
    res.json(chamados[chamadoIndex]); // envia o chamado atualizado em formato JSON como resposta para o front
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  // Mostra no terminal que o servidor está rodando
  console.log('Servidor rodando 🚀');

});