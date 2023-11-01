
# Backend do Projeto To do List

Este é o repositório do backend do Projeto To do List, desenvolvido usando Node.js e MySQL. O backend é responsável por fornecer serviços e APIs para a aplicação.\
Link do repositório Front end [https://github.com/EdbergMartins/toDoListFrontEnd](https://github.com/EdbergMartins/toDoListFrontEnd).

## Configuração do Ambiente

Antes de começar a usar o backend, você precisa configurar o ambiente e as dependências. Siga as etapas abaixo:

1. Certifique-se de que o Node.js esteja instalado no seu sistema. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. Clone este repositório.

	    git clone https://github.com/EdbergMartins/toDoListFrontEnd.git

3. Navegue até o diretório do projeto.


4. Instale as dependências usando o npm.

	    npm install
    

5. Crie um arquivo `.env` na raiz do projeto e siga o modelo no arquivo `.env.example` para definir as variáveis de ambiente necessárias.

6. Configure o banco de dados MySQL. Crie um banco de dados e defina as configurações de conexão no arquivo `config.js`.

7. Execute as migrações e sementes do banco de dados para criar a estrutura inicial do banco.



	    npm run migrate

## Uso

Após configurar o ambiente, você pode iniciar o servidor. Use o seguinte comando:

    npm run dev

O servidor será iniciado na porta padrão (geralmente 3000) e estará pronto para atender às solicitações da aplicação cliente.

## Endpoints da API

A API do backend oferece os seguintes endpoints:

- `GET /tasks/:id`: Obter task especifica por ID.
- `POST /tasks`: Criar uma nova task.
- `POST/tasks/:description/:id`: Atualizar uma descrição de task existente.
- `PATCH/api/recurso/:id`: Atualizar um status de task existente.
- `DETELE/tasks/:id`: Deletar task especifica.
- `GET /register`: Obter dados de usuário.
- `POST /register`: Registrar novo usuário.
- `POST /register`: Verificar credenciais para logar usuário.
