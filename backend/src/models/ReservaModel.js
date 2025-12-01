const db = require('../../server');

const ReservaModel = {
  listAllReservasWithDetails: () => {
    // Adicionamos 'r.espaco_id' no SELECT para que o frontend saiba qual ID preencher no dropdown ao editar
    const sql = `
      SELECT 
        r.id, r.data, r.hora_inicio, r.hora_fim, r.status, r.espaco_id,
        u.nome AS nome_usuario, 
        e.nome AS nome_espaco
      FROM RESERVAS r
      JOIN USUARIOS u ON r.usuario_id = u.id
      JOIN ESPACOS e ON r.espaco_id = e.id
      ORDER BY r.data DESC, r.hora_inicio ASC
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err); else resolve(results);
      });
    });
  },

  create: (reserva) => {
    const { usuario_id, espaco_id, data, hora_inicio, hora_fim } = reserva;
    const sql = 'INSERT INTO RESERVAS (usuario_id, espaco_id, data, hora_inicio, hora_fim, status) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(sql, [usuario_id, espaco_id, data, hora_inicio, hora_fim, 'CONFIRMADA'], (err, result) => {
        if (err) reject(err); else resolve(result);
      });
    });
  },

  // Função Update para atender ao Requisito de Edição com FK
  update: (id, dados) => {
      const { espaco_id, data, hora_inicio, hora_fim } = dados;
      // SQL Update alterando a chave estrangeira (espaco_id) e outros campos
      const sql = 'UPDATE RESERVAS SET espaco_id = ?, data = ?, hora_inicio = ?, hora_fim = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.query(sql, [espaco_id, data, hora_inicio, hora_fim, id], (err, result) => {
              if (err) reject(err); else resolve(result);
          });
      });
  },

  // Função Delete para remover reserva
  delete: (id) => {
      const sql = 'DELETE FROM RESERVAS WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.query(sql, [id], (err, result) => {
              if (err) reject(err); else resolve(result);
          });
      });
  }
};

module.exports = ReservaModel;