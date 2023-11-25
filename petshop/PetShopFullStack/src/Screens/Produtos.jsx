import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Table,
  ModalBody,
  FormGroup,
} from "react-bootstrap";
import Api from "../Api.jsx";
import { BsTrash } from "react-icons/bs";
import Header from "../Components/header.jsx";

const Produtos = () => {
  useEffect(() => {
    const getProdutos = async () => {
      const responseProdutos = await Api.get("/buscarProdutos");
      setProdutos(responseProdutos.data);
    };
    getProdutos();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [produtos, setProdutos] = useState([]);

  const [NewProdutoName, setNewProdutoName] = useState("");
  const [NewProdutoPreco, setNewProdutoPreco] = useState("");
  const [NewProdutoEstoque, setNewProdutoEstoque] = useState("");

  const handleModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeleteProduct = async (id) => {
    console.log("Deletando produto com o id: ", id);

    try {
      const response = await Api.delete(`DeletarProduto/${id}`);

      if (response.status === 200) {
        setProdutos((prevProdutos) =>
          prevProdutos.filter((produto) => produto.id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      NewProdutoName == null ||
      NewProdutoName == undefined ||
      NewProdutoName == ""
    ) {
      alert("nome nao pode ser nulo!");
      return;
    }
    const newProduct = {
      nome: NewProdutoName,
      preco: NewProdutoPreco,
      estoque: NewProdutoEstoque
    };

    const response = await Api.post(
      "/NovoProduto",
      JSON.stringify(newProduct),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(response.data.insertId);

    setProdutos([
      ...produtos,
      { id: response.data.insertId, nome: NewProdutoName,preco: NewProdutoPreco, estoque: NewProdutoEstoque },
    ]);

    handleClose();

    setNewProdutoName("");
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <Header />
      <h1>Lista de Produtos</h1>

      <Button variant="primary" onClick={handleModal}>
        Cadastrar novo produto
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Digite o Nome do Produto"
                onChange={(e) => setNewProdutoName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPreco">
              <Form.Label>Preco</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Digite o Preco do Produto!"
                onChange={(e) => setNewProdutoPreco(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEstoque">
              <Form.Label>Estoque</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o Estoque inical do Produto"
                onChange={(e) => setNewProdutoEstoque(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Preco</th>
            <th>Estoque</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nome}</td>
              <td>{product.preco}</td>
              <td>{product.estoque}</td>

              <td>
                <Button
                  onClick={() => {
                    handleDeleteProduct(product.id);
                  }}
                >
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Produtos;
