import React, { useState } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Table,
  ModalBody,
  FormGroup,
} from "react-bootstrap";

const Clientes = () => {
  const [showModal, setShowModal] = useState(false);

  const [clientes, setClientes] = useState([
    { id: 1, name: "Nome 1", email: "Nevisu@gmail.com" },
    { id: 2, name: "Nome 2", email: "dromedario@gmail.com" },
    { id: 3, name: "Nome 3", email: "lesbico@gmail.com" },
  ]);

  const [newClientesName, setNewClienteName] = useState("");
  const [newClientesEmail, setNewClienteEmail] = useState("");

  const handleModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newCliente = {
      id: clientes.lenght + 1,
      name: newClientesName,
      email: newClientesEmail,
    };
    setClientes([...clientes, newCliente])
    handleClose();

    setNewClienteEmail('')
    setNewClienteName('')
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
            <Button variant="primary" type = 'submit'>
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
    </tr>
</thead>
<tbody>
    {clientes.map((client) =>(
        <tr key ={client.id}>
            <td>{client.id}</td>
            <td>{client.name}</td>
            <td>{client.email}</td>
        </tr>
    ))}
</tbody>
</Table>







    </Container>
  );
};

export default Clientes;
