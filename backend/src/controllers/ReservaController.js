const ReservaModel = require('../models/ReservaModel');

const ReservaController = {
    // Listagem com JOIN (Usuário e Espaço)
    index: async (req, res) => {
        try {
            const reservas = await ReservaModel.listAllReservasWithDetails();
            res.json(reservas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar reservas' });
        }
    },

    store: async (req, res) => {
        try {
            // Pega o ID do usuário da sessão para garantir segurança
            const usuario_id = req.session.user.id; 
            const { espaco_id, data, hora_inicio, hora_fim } = req.body;

            await ReservaModel.create({ usuario_id, espaco_id, data, hora_inicio, hora_fim });
            res.status(201).json({ message: 'Reserva criada com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar reserva' });
        }
    },

    // Edição permitindo alterar FK (espaco_id)
    update: async (req, res) => {
        const { id } = req.params;
        const { espaco_id, data, hora_inicio, hora_fim, status } = req.body;

        try {
            await ReservaModel.update(id, { espaco_id, data, hora_inicio, hora_fim, status });
            res.json({ message: 'Reserva atualizada com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar reserva' });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await ReservaModel.delete(id);
            res.json({ message: 'Reserva cancelada/excluída com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir reserva' });
        }
    }
};

module.exports = ReservaController;