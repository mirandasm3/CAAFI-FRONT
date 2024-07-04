import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/personal-management.css";
import UserIcon from "../components/UserIcon.jsx";
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import config from "../Config.js";

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
    fetch((`${config.apiUrl}/personales`))
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un error con la conexión');
        }
        return response.json();
      })
      .then(data => {
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
    performSearch();
  }, [searchTerm]);

  const deletePerson = async (matricula) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      try {
        const response = await fetch(`${config.apiUrl}/personal`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ matricula })
        });
        if (!response.ok) {
          throw new Error('Error al conectarse');
        }
        alert('Eliminación exitosa');
        setPersonal(personal.filter(person => person.matricula !== matricula));
        setFilteredPersonal(filteredPersonal.filter(person => person.matricula !== matricula));
      } catch (error) {
        console.error('Hubo un error al eliminar el registro:', error);
        alert('Hubo un error al eliminar el registro.');
      }
    }
  };

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
                    <Button variant="primary" onClick={() => viewPerson(person.matricula)}>Ver</Button>
                    <Button variant="secondary" onClick={() => editPerson(person.matricula)}>Editar</Button>
                    <Button variant="danger" onClick={() => deletePerson(person.matricula)}>Eliminar</Button>
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
  console.log(`View person with ID: ${id}`);
};

const editPerson = (id) => {
  console.log(`Edit person with ID: ${id}`);
};