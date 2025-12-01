# Sistema de Reservas para Espaços e Eventos

## Descrição do Projeto

O **Sistema de Reservas para Espaços e Eventos** é uma aplicação web desenvolvida para facilitar o agendamento e o gerenciamento de reservas de locais como salas, auditórios e quadras.  
O sistema permite que usuários se cadastrem, realizem login e façam reservas de forma simples, prática e segura.

Este projeto foi desenvolvido como parte da disciplina **Desenvolvimento Web**, com o objetivo de aplicar na prática os conceitos de **frontend responsivo**, **backend estruturado em arquitetura MVC**, **CRUD completo** e **autenticação de usuários** com banco de dados relacional.

---

## Integrantes do Grupo

- Eduardo Luis de Azevedo Passos
- Matheus de Oliveira Gonçalves

---

## Funcionalidades Principais

### Autenticação e Segurança
- Login e cadastro de usuários com senhas criptografadas  
- Controle de sessão (express-session) para manter o usuário logado e proteger rotas

### CRUD Completo
- **Cadastro:** espaços, usuários, reservas  
- **Consulta:** listagem de espaços e reservas com uso de `JOIN` entre tabelas  
- **Edição:** atualização de informações e alteração de espaços reservados  
- **Exclusão:** Exclusão de registros com Integridade Referencial (ON DELETE RESTRICT e ON DELETE CASCADE)

### Frontend Responsivo
- Layout limpo e intuitivo com HTML, CSS e React  
- Design responsivo compatível com desktop, tablet e mobile  
- Componentes reutilizáveis (navbar, header, footer)

### Arquitetura e Backend
- Implementação do padrão **MVC (Model-View-Controller)**  
- Rotas RESTful com **Node.js + Express.js**  
- Banco de dados relacional com **MySQL**

---

## Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-------------|
| **Frontend** | React, HTML5, CSS3, JavaScript (Vite/Tailwind CSS)|
| **Backend** | Node.js, Express.js |
| **Banco de Dados** | MySQL |
| **Autenticação** | express-session, bcrypt |
| **Controle de Versão** | GitHub |

---

# Instruções de Instalação e Execução

Para rodar o Sistema de Reservas para Espaços e Eventos, é necessário configurar o Backend (Node.js) e o Banco de Dados (MySQL) e, em seguida, iniciar as aplicações Frontend e Backend simultaneamente.

# 1. Pré-requisitos e Clonagem

Certifique-se de ter os seguintes programas instalados:

- **Node.js** (versão LTS recomendada)
- **MySQL Server** e uma ferramenta de gerenciamento (como MySQL Workbench).
- **Git** Clone o repositório para sua máquina local

## 2. Configuração do Banco de Dados (MySQL)

### A. Criar o Banco e Tabelas

1. **Criar o Banco de Dados**: No MySQL Workbench, crie um novo esquema chamado `sistema_reservas`.
2. **Executar o Schema**: Execute o script SQL contido no arquivo `backend/database/schema.sql` dentro do banco de dados `sistema_reservas`. Isso criará as 4 tabelas (USUARIOS, ESPACOS, RESERVAS, etc.) com todas as Chaves Estrangeiras.
3. **Inserir Dados de Teste** (Opcional, mas Recomendado): Para popular a lista de espaços e tipos, execute os comandos `INSERT` que estão no final do arquivo `schema.sql` (ou em um script separado de dados de teste).

### B. Configuração das Variáveis de Ambiente

Crie um arquivo chamado `.env` dentro da pasta `/backend` e preencha com as credenciais do seu servidor MySQL:


# Configurações do Banco de Dados MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SUA_SENHA_DO_ROOT
DB_NAME=sistema_reservas

# Configurações do Servidor e Segurança
PORT=3000
SESSION_SECRET=SUA_CHAVE_SECRETA_ALEATORIA 

---

## 3. Instalação das Dependências

Instale as dependências para as duas partes da aplicação:

### 1. Backend (Express, MySQL, bcrypt)

No diretório `backend`:

    cd backend
    npm install

No diretório `fropntend`:

    cd backend
    npm install

# 4. Execução do Projeto

O projeto requer dois terminais separados para rodar o **Backend (API)** e o **Frontend (Interface)**.

| Aplicação            | Terminal      | Comando      | Acesso                     |
|----------------------|---------------|--------------|----------------------------|
| **Backend (API)**    | Terminal 1    | `npm start`  | [http://localhost:3000](http://localhost:3000) |
| **Frontend (Interface)** | Terminal 2    | `npm run dev` | [http://localhost:5173](http://localhost:5173) |

---

## Estrutura de Pastas

```
sistema-reservas/
├── /backend                      # Servidor Node.js/Express
│   ├── /database
│   │   └── schema.sql
│   ├── /src
│   │   ├── /controllers          # Lógica de Negócios (CRUD)
│   │   ├── /models               # Acesso ao MySQL (JOINs, bcrypt)
│   │   └── /routes               # Rotas RESTful
│   ├── .env
│   └── package.json
│
└── /frontend                     # Aplicação React
    ├── /src
    │   ├── /components           # Navbar, Layout
    │   └── /pages                # Views (Login, ReservasPage, EspacosPage)
    └── package.json
```

