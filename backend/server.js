require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. Configuração Robusta do CORS ---
// Permite que o Frontend (http://localhost:5173) acesse este Backend
app.use(cors({
    origin: 'http://localhost:5173', // Endereço exato do seu React Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // OBRIGATÓRIO para enviar cookies de sessão
}));

// --- Middlewares Essenciais ---
app.use(express.json()); // Permite ler JSON no body
app.use(express.urlencoded({ extended: true }));

// --- Configuração da Sessão ---
app.use(session({
    name: 'sistema_reservas_sid', // Nome personalizado para o cookie
    secret: process.env.SESSION_SECRET || 'chave_secreta_padrao',
    resave: false,
    saveUninitialized: false, // Não cria sessão vazia sem login
    cookie: {
        httpOnly: true, // Segurança: impede acesso via JS no frontend
        secure: false,  // Defina como true apenas se usar HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
    }
}));

// --- Conexão com Banco de Dados MySQL ---
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'sistema_reservas'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erro Fatal: Não foi possível conectar ao MySQL.', err.message);
        // Não encerra o processo, mas avisa que o DB falhou
    } else {
        console.log('✅ Conectado ao MySQL com sucesso!');
    }
});

// Exporta a conexão para ser usada nos Models
module.exports = db;

// Importação das Rotas da API
const apiRoutes = require('./src/routes/api');
app.use('/', apiRoutes); // Define as rotas na raiz (ex: /login, /usuarios)

// --- Rota de Teste Simples ---
app.get('/health', (req, res) => {
    res.json({ status: 'OK', server: 'Online' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`👉 Aceitando requisições do Frontend em http://localhost:5173`);
});
