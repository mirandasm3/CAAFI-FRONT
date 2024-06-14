import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PersonalManagment.css";
import UserIcon from "../components/UserIcon.jsx";
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export default function PersonalManagment() {
  const [personal, setPersonal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filteredPersonal, setFilteredPersonal] = useState([]);
  const logoURL = require('../img/caafi-w.png');
  const uvTitleURL = require('../img/Universidad-Veracruzana-Title.png');

  const puesto = (puesto) => {
    switch(puesto) {
      case 1:
        return "Administrador";
      case 2:
        return "Técnico Académico";
      default:
        return "Desconocido";
    }
  };

  useEffect(() => {
    fetch('https://8kzxktht-3000.usw3.devtunnels.ms/personales')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos de la API:', data);
        setPersonal(data);
        setFilteredPersonal(data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener la información del personal.", error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  // Función para realizar la búsqueda
  const performSearch = () => {
    const filtered = personal.filter(person =>
      person.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      puesto(person.idPuesto).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPersonal(filtered);
  };

  useEffect(() => {
    performSearch(); // Actualiza la búsqueda en tiempo real mientras se escribe
  }, [searchTerm]);

  return (
    <Container>
      <div className="top-bar">
        <img src={logoURL} alt="Logo" className="logo" />
        <div className="user-info">
          <img src={uvTitleURL} alt="uv" className="uvTitle"/>
          <UserIcon className="user-icon" />
        </div>
      </div>
      <Row>
        <Col>
          <div style={{ display:'flex', alignItems: 'left' }}>
            <Button variant="link" onClick={() => navigate("/inicio")} style={{ color: 'black', fontSize: '30px', marginLeft:'-150px'}}>
              <i className="bi bi-arrow-left"></i>
            </Button>
          </div>
          <div className="header">
            <h2>Personal CAAFI</h2>
          </div>
          <InputGroup className="search-bar mb-3">
            <Form.Control
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <Button variant="outline-secondary" className="search-button" onClick={performSearch}>
              <FaSearch />
            </Button>
          </InputGroup>
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Puesto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPersonal.map((person, index) => (
                <tr key={index}>
                  <td>{person.matricula}</td>
                  <td>{person.nombre}</td>
                  <td>{person.apellidos}</td>
                  <td>{puesto(person.idPuesto)}</td>
                  <td className="button-group">
                    <Button variant="primary" onClick={() => viewPerson(person.usuario)}>Ver</Button>
                    <Button variant="secondary" onClick={() => editPerson(person.usuario)}>Editar</Button>
                    <Button variant="danger" onClick={() => deletePerson(person.usuario)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

const viewPerson = (id) => {
  // que se hace al dar clic
  console.log(`View person with ID: ${id}`);
};

const editPerson = (id) => {
  // editar
  console.log(`Edit person with ID: ${id}`);
};

const deletePerson = (id) => {
  // eliminar
  console.log(`Delete person with ID: ${id}`);
};