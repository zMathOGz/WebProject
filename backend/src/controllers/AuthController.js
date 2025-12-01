const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const user = await UserModel.findByEmail(email);
            if (!user || !(await bcrypt.compare(senha, user.senha_hash))) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
            req.session.user = { id: user.id, nome: user.nome, email: user.email, isAdmin: user.isAdmin };
            res.json({ message: 'Login OK', user: req.session.user });
        } catch (e) { res.status(500).json({ error: 'Erro no servidor' }); }
    },
    logout: (req, res) => {
        req.session.destroy(() => { res.clearCookie('connect.sid'); res.json({ message: 'Logout OK' }); });
    },
    me: (req, res) => {
        res.json({ user: req.session.user || null });
    }
};