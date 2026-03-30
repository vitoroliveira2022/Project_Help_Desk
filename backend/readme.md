npm init -y -> comando que cria o arquivo package.json automaticamente no seu projeto.
package.json: arquivo que diz como seu projeto funciona e o que ele precisa pra rodar. 
OBS: mudar o type para module no 'package.json' para usar ES Modules

npm install express 

Um middleware é uma função que processa a requisição no meio do ciclo, permitindo manipular, validar ou transformar os dados antes da rota final ser executada.

npm install cors

1️⃣ Routes (Rotas)

O que faz: define quais URLs a API possui e qual função chamar quando alguém acessa.
Exemplo: /chamados/1 → chama a função que busca o chamado.
Analogias: é o menu do restaurante — só mostra as opções.

2️⃣ Controllers

O que faz: recebe as requisições das rotas, chama o service e devolve a resposta para o frontend.
Exemplo: pega o id de /chamados/1 e pede ao service o chamado correspondente.
Analogias: é o garçom — recebe o pedido e leva para a cozinha.

3️⃣ Services

O que faz: contém a lógica de negócio, valida dados, cria, atualiza ou deleta informações.
Exemplo: cria um novo chamado ou atualiza o status de um existente.
Analogias: é a cozinha — prepara os dados conforme a “receita” da aplicação.

4️⃣ Repository

O que faz: acessa os dados, seja em memória (array) ou banco de dados, e fornece para o service.
Exemplo: lista de chamados, usuários, ou qualquer entidade do sistema.
Analogias: é o estoque do restaurante — guarda os ingredientes (informações) que a cozinha vai usar.

🔄 Fluxo completo de uma requisição com repository
Frontend envia requisição → ex: GET /chamados/1
Routes decide qual controller tratar → chama o controller certo
Controller pega parâmetros e valida → chama o service
Service aplica lógica de negócio → chama o repository para acessar os dados
Repository retorna os dados pro service
Service processa os dados → devolve pro controller
Controller envia a resposta pro frontend
Frontend recebe o JSON