const db = require('../../server'); // Importa a conexão do arquivo principal
const bcrypt = require('bcryptjs');

const UserModel = {
  // Cria um novo usuário com senha criptografada
  create: async (usuario) => {
    try {
      const { nome, email, senha, isAdmin } = usuario;
      
      // Gera o hash da senha (Custo 10 é o padrão recomendado)
      const salt = await bcrypt.genSalt(10);
      const senha_hash = await bcrypt.hash(senha, salt);

      const sql = 'INSERT INTO USUARIOS (nome, email, senha_hash, isAdmin) VALUES (?, ?, ?, ?)';
      const values = [nome, email, senha_hash, isAdmin || false];

      // Retorna uma Promise para permitir uso de async/await no Controller
      return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    } catch (error) {
      throw error;
    }
  },

  // Busca usuário por email (para Login)
  findByEmail: (email) => {
    const sql = 'SELECT * FROM USUARIOS WHERE email = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]); // Retorna apenas o primeiro usuário encontrado
      });
    });
  },

  // Busca por ID (útil para sessão)
  findById: (id) => {
    const sql = 'SELECT id, nome, email, isAdmin FROM USUARIOS WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }
};

module.exports = UserModel;