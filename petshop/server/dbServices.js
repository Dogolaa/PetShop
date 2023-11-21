const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("BD foi conectado com sucesso!");
});

class dbServices {
  static instance;

  static getdbServicesInstance() {
    if (!this.instance) {
      this.instance = new dbServices();
    }
    return this.instance;
  }

  async BuscarClientes() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tbl_clientes";
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async NovoCliente(data) {
    try {
      const query = "INSERT INTO tbl_clientes (nome,email) VALUES (?,?)";
      const nome = data.nome;
      const email = data.email;

      const response = await new Promise((resolve, reject) => {
        connection.query(query, [nome, email], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log("Cliente inserido com sucesso");
      return response;
    } catch (error) {
      console.log("Erro ao inserir cliente :" + error);
      throw error;
    }
  }

  async DeletarCliente(id) {
    const query = `DELETE FROM tbl_clientes WHERE id = ?;`;
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, id, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Cliente nao encontrado");
      }
      console.log("Cliente foi deletado com sucessos");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = dbServices;
