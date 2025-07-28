# 💰 Fincheck API

API REST desenvolvida com **NestJS + Prisma** para gerenciamento financeiro pessoal.

Com ela, você pode:

- Criar e autenticar usuários.
- Cadastrar contas bancárias.
- Registrar e listar transações financeiras.

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com) - Framework Node.js moderno e escalável.
- [Prisma ORM](https://www.prisma.io/) - Mapeamento de modelos para banco de dados e criação de migrações para melhor manutenção.
- [PostgreSQL](https://postgresql.org/) - Banco de dados relacional (padrão).
- [JWT](https://jwt.io/) - Autenticação de usuários.
- [Swagger](https://swagger.io/) - Documentação automática da API.

---

## 📦 Instalação

1. Clone o repositório e abra o projeto:

```bash
git clone
cd fincheck-api
```

2. Instale as dependências:

```bash
npm install
```

ou

```bash
yarn
```

3. Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

> Dica: adicione `.env` ao `.gitignore` para evitar versionamento de dados sensíveis.

---

## 📄 Variáveis de Ambiente

O projeto utiliza um arquivo ".env" com as seguintes variáveis:

| Nome           | Descrição                             | Exemplo                                                            |
| -------------- | ------------------------------------- | ------------------------------------------------------------------ |
| `DATABASE_URL` | URL de conexão com o banco PostgreSQL | `postgresql://user:password@localhost:5432/database?schema=public` |
| `JWT_SECRET`   | Chave usada para assinar tokens JWT   | `unsecure_jwt_secret`                                              |

> ⚠️ A variável `JWT_SECRET` não pode ser **"unsecure_jwt_secret"**, pois será rejeitada.

---

## 🐳 Usando PostgreSQL com Docker

Esta aplicação usa PostgreSQL via Docker.

Se você ainda não tem um banco local configurado, basta subir um container com o seguinte comando:

```bash
docker run --name fincheck-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

> O `POSTGRES_USER` e o `POSTGRES_PASSWORD` devem corresponder a string de conexão (DSN) informada no arquivo que contém as variáveis de ambiente.

1. Inicie o container:

```bash
docker start fincheck-db
```

2. Acesse o bash do container:

```bash
docker exec -it fincheck-db bash
```

3. Acesse o PostgreSQL:

```bash
psql -U root
```

4. Crie o banco de dados:

```bash
CREATE DATABASE database;
```

> O nome do banco deve bater com o que estiver em `DATABASE_URL`.

---

## 📤 Prisma e Migrações

Após configurar o banco, gere os arquivos do Prisma e rode as migrações:

```bash
npx prisma migrate
npx prisma migrate dev
```

---

## 💻 Como iniciar a aplicação em modo de desenvolvimento

```bash
$ yarn start:dev
```

> Certifique-se de que as variáveis de ambiente e o banco de dados estão configurados corretamente antes de iniciar o projeto.

⚠️ Importante: não esqueça de alterar o valor da variável de ambiente **JWT_SECRET**.

O valor atual é apenas um placeholder e será rejeitado. Defina uma chave secreta válida e segura para que a aplicação funcione corretamente.

---

## 🔐 Autenticação

A API utiliza autenticação via JWT.

Após fazer login, envie o token no header das requisições protegidas:

```bash
http

Authorization: Bearer <seu-token>
```

---

## 📚 Documentação da API

Acesse a documentação interativa com Swagger:

```bash
GET /docs
```

---

## 🔗 Links

[![portfolio](https://img.shields.io/badge/meu_portfólio-00A6F4?style=for-the-badge&logo=reactquery&logoColor=white)](https://jovemprogramador.dev/)
