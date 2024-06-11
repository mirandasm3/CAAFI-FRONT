import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import "../styles/registration-request.css";

export default function RegistrationRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentType, registrationType } = location.state;

  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [facultad, setFacultad] = useState("");
  const [programa, setPrograma] = useState("");
  const [semestre, setSemestre] = useState("");
  const [nivel, setNivel] = useState("");
  const [idiomas, setIdiomas] = useState([]);
  const [comprobantePago, setComprobantePago] = useState(null);
  const [bitacoraCero, setBitacoraCero] = useState(null);
  const [password, setPassword] = useState("");

  const logoUrl = require('../img/caafi-w.png');

  const handleIdiomaChange = (event) => {
    const value = event.target.value;
    setIdiomas((prevIdiomas) =>
      prevIdiomas.includes(value)
        ? prevIdiomas.filter((idioma) => idioma !== value)
        : [...prevIdiomas, value]
    );
  };

  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Manejar la lógica de envío aquí
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col md={10} lg={8}>
          <div className="registration-form">
            <header className="d-flex justify-content-between align-items-center">
              <img src={logoUrl} alt="Logo CAAFI" className="logo" />
              <Button variant="link" onClick={() => navigate("/registro")}>
                <i className="fas fa-arrow-left"></i> Regresar
              </Button>
            </header>
            <h2>Registro de inscripción</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="formMatricula">
                    <Form.Label>Matrícula</Form.Label>
                    <Form.Control
                      type="text"
                      value={matricula}
                      onChange={(e) => setMatricula(e.target.value)}
                      placeholder="zs12345678"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formNombre">
                    <Form.Label>Nombre(s)</Form.Label>
                    <Form.Control
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Juan"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formApellido">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      placeholder="Ej. Pérez"
                    />
                  </Form.Group>
                </Col>
              </Row>
              {studentType === "alumnoUV" && (
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formFacultad">
                      <Form.Label>Facultad</Form.Label>
                      <Form.Control
                        as="select"
                        value={facultad}
                        onChange={(e) => setFacultad(e.target.value)}
                      >
                        <option>Selecciona una opción</option>
                        {/* Opciones adicionales */}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formPrograma">
                      <Form.Label>Programa educativo</Form.Label>
                      <Form.Control
                        as="select"
                        value={programa}
                        onChange={(e) => setPrograma(e.target.value)}
                      >
                        <option>Selecciona una opción</option>
                        {/* Opciones adicionales */}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formSemestre">
                      <Form.Label>Semestre</Form.Label>
                      <Form.Control
                        as="select"
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                      >
                        <option>Selecciona una opción</option>
                        <option>1er Semestre</option>
                        <option>2do Semestre</option>
                        <option>3er Semestre</option>
                        <option>4to Semestre</option>
                        <option>5to Semestre</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              )}
              {studentType === "delex" && (
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formNivel">
                      <Form.Label>Nivel</Form.Label>
                      <Form.Control
                        as="select"
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                      >
                        <option>Selecciona una opción</option>
                        <option>Principiante</option>
                        <option>Intermedio</option>
                        <option>Avanzado</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              )}
              <Form.Group controlId="formIdiomas">
                <Form.Label>Idioma(s)</Form.Label>
                <div className="d-flex flex-wrap">
                  {["Inglés", "Francés", "Chino", "Japonés", "Italiano", "Alemán", "Portugués"].map((idioma) => (
                    <Form.Check
                      key={idioma}
                      type="checkbox"
                      label={idioma}
                      value={idioma}
                      checked={idiomas.includes(idioma)}
                      onChange={handleIdiomaChange}
                      className="mr-3"
                    />
                  ))}
                </div>
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formComprobantePago">
                    <Form.Label>Comprobante de pago</Form.Label>
                    <div className="file-input">
                      {comprobantePago ? (
                        <p>{comprobantePago.name}</p>
                      ) : (
                        <p>No hay documentos precargados</p>
                      )}
                      <Form.File
                        label="Agregar documento"
                        custom
                        onChange={(e) => handleFileChange(e, setComprobantePago)}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBitacoraCero">
                    <Form.Label>Bitácora cero</Form.Label>
                    <div className="file-input">
                      {bitacoraCero ? (
                        <p>{bitacoraCero.name}</p>
                      ) : (
                        <p>No hay documentos precargados</p>
                      )}
                      <Form.File
                        label="Agregar documento"
                        custom
                        onChange={(e) => handleFileChange(e, setBitacoraCero)}
                        disabled={registrationType === "reinscripcion"}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className="btn-submit">
                Enviar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
