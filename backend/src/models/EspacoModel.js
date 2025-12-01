const db = require('../../server');

const EspacoModel = {
  listAllEspacosWithDetails: () => {
    const sql = `SELECT e.*, t.nome AS categoria_nome FROM ESPACOS e LEFT JOIN TIPO_ESPACOS t ON e.tipo_espaco_id = t.id`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, res) => { if(err) reject(err); else resolve(res); });
    });
  },
  create: (data) => {
    const sql = 'INSERT INTO ESPACOS (nome, capacidade, descricao, tipo_espaco_id) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(sql, [data.nome, data.capacidade, data.descricao, data.tipo_espaco_id], (err, res) => {
        if(err) reject(err); else resolve(res);
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM ESPACOS WHERE id = ?', [id], (err, res) => { if(err) reject(err); else resolve(res); });
    });
  }
};
module.exports = EspacoModel;