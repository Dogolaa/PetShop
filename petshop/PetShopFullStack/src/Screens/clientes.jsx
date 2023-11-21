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

const Clientes = () => {
  useEffect(() => {
    const getClientes = async () => {
      const responseClientes = await Api.get("/buscarClientes");
      setClientes(responseClientes.data);
    };
    getClientes();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [clientes, setClientes] = useState([]);

  const [newClientesName, setNewClienteName] = useState("");
  const [newClientesEmail, setNewClienteEmail] = useState("");

  const handleModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeleteClient = async (id) => {
    console.log("Deletando cliente com o id: ", id);
  
    try {
      const response = await Api.delete(`DeletarCliente/${id}`);
  
      if (response.status === 200) {
        setClientes((prevClientes) =>
          prevClientes.filter((cliente) => cliente.id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      newClientesName == null ||
      newClientesName == undefined ||
      newClientesName == ""
    ) {
      alert("nome nao pode ser nulo!");
      return;
    }
    const newCliente = {
      id: clientes.length + 1,
      nome: newClientesName,
      email: newClientesEmail,
    };

    await Api.post("/NovoCliente", JSON.stringify(newCliente), {
      headers: { "Content-Type": "application/json" },
    });
    setClientes([...clientes, newCliente]);

    handleClose();

    setNewClienteEmail("");
    setNewClienteName("");
  };

  return (
    <Container>
      <h1>Lista de Clientes</h1>

      <Button variant="primary" onClick={handleModal}>
        Cadastrar novo cliente
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de novo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Digite o Nome do Cliente"
                onChange={(e) => setNewClienteName(e.target.value)}
              />
            </Form.Group>

            <FormGroup controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email do Cliente"
                onChange={(e) => setNewClienteEmail(e.target.value)}
              />
            </FormGroup>
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
            <th>Email</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.nome}</td>
              <td>{client.email}</td>
              <td>
                <Button
                  onClick={() => {
                    handleDeleteClient(client.id);
                  }}
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Clientes;
