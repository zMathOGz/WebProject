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

