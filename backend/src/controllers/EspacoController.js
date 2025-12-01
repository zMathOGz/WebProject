const EspacoModel = require('../models/EspacoModel');

const EspacoController = {
    index: async (req, res) => {
        try {
            console.log("--- DEBUG: Iniciando busca de espaços ---");
            
            // Busca dados no Model
            const espacos = await EspacoModel.listAllEspacosWithDetails();
            
            // LOG IMPORTANTE: Verifica o que veio do banco
            console.log("DEBUG BACKEND - Resultado do SQL:", espacos);

            if (!espacos) {
                console.log("DEBUG BACKEND - Atenção: 'espacos' é null ou undefined");
            } else if (espacos.length === 0) {
                console.log("DEBUG BACKEND - Atenção: Array de espaços está vazio.");
            }

            res.json(espacos);
        } catch (error) {
            console.error("DEBUG BACKEND - ERRO CRÍTICO:", error);
            res.status(500).json({ error: 'Erro ao listar espaços' });
        }
    },

    store: async (req, res) => {
        try {
            await EspacoModel.create(req.body);
            res.status(201).json({ message: 'Espaço criado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar espaço' });
        }
    },

    update: async (req, res) => {
        try {
            await EspacoModel.update(req.params.id, req.body);
            res.json({ message: 'Espaço atualizado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar espaço' });
        }
    },

    delete: async (req, res) => {
        try {
            await EspacoModel.delete(req.params.id);
            res.json({ message: 'Espaço excluído' });
        } catch (error) {
            console.error("Erro ao excluir:", error);
            // Código de erro MySQL para restrição de chave estrangeira (1451)
            if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.errno === 1451) {
                return res.status(400).json({ 
                    error: 'Não é possível excluir este espaço pois existem reservas associadas a ele (FK RESTRICT).' 
                });
            }
            res.status(500).json({ error: 'Erro ao excluir espaço' });
        }
    }
};

module.exports = EspacoController;