# 💰 Sistema Financeiro — DW3 (Cliente–Servidor)

Trabalho da disciplina **Desenvolvimento Web III (DW3)** — IFSP Votuporanga.  
Sistema completo com **Frontend (React)** e **Backend (Node.js + Express + PostgreSQL)**.

---

## 🧱 Arquitetura do Projeto

/backend
/controllers
/models
/routes
server.js
/frontend
/src
/pages
/components
/utils

yaml
Copiar código

- **Frontend (porta 3000)**: Interface React consumindo a API.  
- **Backend (porta 4000)**: Servidor Node.js com rotas REST, JWT e auditoria.  
- **Banco**: PostgreSQL com tabelas relacionais e campos de controle.

---

## ⚙️ Arquivo `.env` do Backend

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=dw3db
JWT_SECRET=uma_chave_super_secreta
PORT=4000
🗃️ Estrutura das Tabelas (SQL Completo)
🧩 Relação 1:N — contas → lancamentos
Uma conta pode ter vários lançamentos.

sql
Copiar código
-- 1) USUÁRIOS
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2) CONTAS
CREATE TABLE IF NOT EXISTS contas (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  removido BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  removido_em TIMESTAMP
);

-- 3) LANÇAMENTOS
CREATE TABLE IF NOT EXISTS lancamentos (
  id SERIAL PRIMARY KEY,
  conta_id INTEGER REFERENCES contas(id),
  descricao TEXT NOT NULL,
  data_vencimento DATE NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  removido BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  removido_em TIMESTAMP
);
Auditoria: criado_em, atualizado_em, removido_em
Soft delete: removido = TRUE + data em removido_em

👨‍💻 Criar o Banco via Terminal (Passo a Passo)
1️⃣ Abrir o psql:

bash
Copiar código
psql -U postgres
2️⃣ Criar o banco:

sql
Copiar código
CREATE DATABASE dw3db;
\c dw3db
3️⃣ Colar o SQL das tabelas acima.

4️⃣ Criar usuário admin:

sql
Copiar código
INSERT INTO usuarios (username, password)
VALUES ('admin', '$2a$10$7G3Z6RjU5RJG3j9lUpRMEOLypb7H3nK7tuR5CtGx0CZ0QSTTKI0vq');
(senha: 123456)

▶️ Como Rodar o Projeto
Backend
bash
Copiar código
cd backend
npm install
npm run dev
Servidor em: http://localhost:4000

Frontend
bash
Copiar código
cd frontend
npm install
npm start
Interface em: http://localhost:3000

🔐 Login e Autenticação
Login: Gera JWT com validade de 8h.

Proteção: Middleware auth exige token no header Authorization: Bearer <token>.

Logout: Frontend limpa o token do localStorage.

🔌 Endpoints da API
Usuários
Método	Endpoint	Descrição
POST	/api/login	Faz login e retorna token
POST	/api/criar-admin	Cria usuário inicial

Contas
Método	Endpoint	Descrição
GET	/api/contas	Lista contas
GET	/api/contas/:id	Busca conta específica
POST	/api/contas	Cria nova conta
PUT	/api/contas/:id	Atualiza conta
DELETE	/api/contas/:id	Marca conta como removida

Lançamentos
Método	Endpoint	Descrição
GET	/api/lancamentos	Lista lançamentos
POST	/api/lancamentos	Cria novo lançamento
PUT	/api/lancamentos/:id	Atualiza lançamento
DELETE	/api/lancamentos/:id	Marca lançamento como removido

🧪 Testes no Thunder Client
Login
POST http://localhost:4000/api/login

json
Copiar código
{ "username": "admin", "password": "123456" }
Inserir Conta
POST http://localhost:4000/api/contas

json
Copiar código
{ "nome": "Conta Corrente", "descricao": "Banco do Brasil" }
Inserir Lançamento
POST http://localhost:4000/api/lancamentos

json
Copiar código
{ "conta_id": 1, "descricao": "Salário", "data_vencimento": "2025-11-01", "valor": 3500.00 }
🧾 Auditoria — Testando Soft Delete
1️⃣ Crie uma conta e veja:

sql
Copiar código
SELECT id, nome, removido, criado_em, atualizado_em, removido_em FROM contas;
2️⃣ Delete via API → conta fica com removido = true e removido_em preenchido.

3️⃣ Atualize via PUT → campo atualizado_em muda automaticamente.

📊 Dashboard (Frontend)
Exibe gráfico de lançamentos por conta.

Usa Recharts (npm install recharts).

Visual moderno com Bootstrap 5 e ícones react-bootstrap-icons.

🧠 Explicação para o Professor
Cliente–Servidor: front (React) consome rotas do back (Express/Node).

Banco: PostgreSQL com relacionamento 1:N (contas → lancamentos).

Requisitos:
✅ CRUD completo com campos de texto, data, decimal
✅ Auditoria (criação, alteração, exclusão lógica)
✅ Login com autenticação JWT
✅ Front bonito e responsivo (Bootstrap)
✅ Testável via Thunder Client

⚙️ Scripts
Backend

json
Copiar código
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
Frontend

json
Copiar código
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build"
}
🧭 Modelo ER (ASCII)
diff
Copiar código
USUARIOS
- id (PK)
- username
- password
- criado_em
- atualizado_em

CONTAS
- id (PK)
- nome
- descricao
- removido
- criado_em
- atualizado_em
- removido_em

LANCAMENTOS
- id (PK)
- conta_id (FK -> contas.id)
- descricao
- data_vencimento
- valor
- removido
- criado_em
- atualizado_em
- removido_em
🧯 Solução de Problemas
Erro	Causa	Solução
401 Unauthorized	Token ausente ou inválido	Refazer login
relation does not exist	Tabelas não criadas	Executar SQL
CORS bloqueado	Falta app.use(cors())	Ativar CORS no backend
Token no body	Token vai no header, não no body	Corrigir requisição