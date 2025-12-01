const UserModel = require('../models/UserModel');

const UserController = {
    store: async (req, res) => {
        // LOG DE DEBUG: Verifique isso no terminal onde roda o "npm start"
        console.log("--- Nova Tentativa de Cadastro ---");
        console.log("Body recebido:", req.body);

        try {
            const { nome, email, senha, isAdmin } = req.body;

            // Validação Robusta
            if (!nome || !email || !senha) {
                console.log("Erro: Campos faltando.");
                return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
            }

            // Criação
            await UserModel.create({ nome, email, senha, isAdmin });
            
            console.log("Sucesso: Usuário criado.");
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

        } catch (error) {
            console.error("Erro no UserController:", error);
            
            // Tratamento específico para duplicidade (Erro 1062 ou similar dependendo do driver)
            // Verificamos a mensagem de erro que definimos no UserModel.js ou o código nativo
            if (error.message === 'Este email já está cadastrado.' || error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Este email já está cadastrado.' });
            }

            return res.status(500).json({ error: 'Erro interno no servidor ao salvar usuário.' });
        }
    }
};

module.exports = UserController;