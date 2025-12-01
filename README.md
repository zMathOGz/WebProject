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

### Autenticação
- Login e cadastro de usuários com senhas criptografadas  
- Controle de sessão (usuário logado)

### CRUD Completo
- **Cadastro:** espaços, usuários, reservas  
- **Consulta:** listagem de espaços e reservas com uso de `JOIN` entre tabelas  
- **Edição:** atualização de informações e alteração de espaços reservados  
- **Exclusão:** exclusão de registros com integridade referencial (exclusão em cascata)

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
| **Frontend** | React, HTML5, CSS3, JavaScript |
| **Backend** | Node.js, Express.js |
| **Banco de Dados** | MySQL |
| **Autenticação** | express-session, bcrypt |
| **Controle de Versão** | Git + GitHub |

---

## Estrutura de Pastas (Inicial)

```
sistema-reservas/
├── index.html 
├── style.css 
├── assets/ 
│ ├── img/ 
│ └── icons/
└── README.md 
```

