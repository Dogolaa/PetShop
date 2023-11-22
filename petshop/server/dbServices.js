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

  async BuscarProdutos() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tbl_produtos";
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async NovoProduto(data) {
    try {
      const query =
        "INSERT INTO tbl_produtos (nome,estoque,preco) VALUES (?,?,?)";
      const nome = data.nome;
      const preco = data.preco;
      const estoque = data.estoque;

      const response = await new Promise((resolve, reject) => {
        connection.query(query, [nome, preco, estoque], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log("Produto inserido com sucesso");
      return response;
    } catch (error) {
      console.log("Erro ao inserir produto :" + error);
      throw error;
    }
  }

  async DeletarProduto(id) {
    const query = `DELETE FROM tbl_produtos WHERE id = ?;`;
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, id, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Produto nao encontrado");
      }
      console.log("Produto foi deletado com sucessos");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async BuscarServicos() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tbl_servicos";
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async NovoServico(data) {
    try {
      const query =
        "INSERT INTO tbl_servicos (nome,estoque,preco) VALUES (?,?,?)";
      const nome = data.nome;
      const preco = data.preco;
      const estoque = data.estoque;

      const response = await new Promise((resolve, reject) => {
        connection.query(query, [nome, preco, estoque], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log("Servico inserido com sucesso");
      return response;
    } catch (error) {
      console.log("Erro ao inserir servico :" + error);
      throw error;
    }
  }

  async DeletarServico(id) {
    const query = `DELETE FROM tbl_servicos WHERE id = ?;`;
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(query, id, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      if (response.affectedRows == 0) {
        throw new Error("Servico nao encontrado");
      }
      console.log("Servico foi deletado com sucesso");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }






}

module.exports = dbServices;
