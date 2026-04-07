// rodar na raiz do backend

npm init -y -> comando que cria o arquivo package.json automaticamente no seu projeto.
package.json: arquivo que diz como seu projeto funciona e o que ele precisa pra rodar. 
OBS: mudar o type para module no 'package.json' para usar ES Modules

npm install express 

Um middleware é uma função que processa a requisição no meio do ciclo, permitindo manipular, validar ou transformar os dados antes da rota final ser executada.

npm install cors

# 1️⃣ Instalar Prisma CLI e Client de uma vez
npm install prisma@5.0.0 @prisma/client@5.0.0

# 2️⃣ Inicializar o Prisma (gera pasta prisma, schema.prisma e .env, se ainda não tiver)
npx prisma init

# 3️⃣ Gerar o Prisma Client (precisa sempre que alterar o schema)
npx prisma generate

# 4️⃣ Criar a primeira migration e aplicar no banco Supabase usando a URL direta
npx prisma migrate dev --name init

npm install jsonwebtoken bcryptjs

------------------------------------------------------------------------------------------------------
Frontend envia requisição → ex: GET /chamados/1

Routes decide qual controller tratar → chama o controller correto

Controller:
- pega parâmetros (ex: id)
- valida dados (ex: id válido)
- chama o service

Service:
- aplica a lógica de negócio
- decide o que fazer (buscar, criar, atualizar, etc.)
- chama o repository

Repository:
- usa o Prisma para acessar o banco de dados
- executa a query (SELECT, INSERT, UPDATE, DELETE)

Banco de dados (PostgreSQL):
- processa a query
- retorna os dados

Repository:
- recebe os dados do banco
- devolve para o service

Service:
- pode tratar os dados (ex: regra, fallback, erro)
- devolve para o controller

Controller:
- define o status HTTP (200, 201, 404, etc.)
- envia a resposta em JSON

Frontend:
- recebe os dados
- renderiza na tela