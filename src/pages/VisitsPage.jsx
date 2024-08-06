import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../styles/select-student.css";
import UserIcon from "../components/UserIcon";

const rooms = [
  "Sala de lectura",
  "Sala de multimedia",
  "Sala usos múltiples",
  "Cubículos"
];

export default function VisitsPage() {
  const [roomType, setRoomType] = useState("Sala de lectura");

  const navigate = useNavigate();

  return (
    <>
    <div className="report-header">
        <div className="report-logo">
            <img src={require('../img/caafi-w.png')} alt="Logo CAAFI" />
        </div>
        <UserIcon />
        <div className="m-login__head" style={{ position: 'absolute', top: '0', right: '10px', backgroundColor: '#0D47A1', zIndex: '1000', padding: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
            <span className="g-font-weight-400 g-py-0 g-px-12 g-font-size-18" style={{ color: '#ffffff' }}>Universidad Veracruzana</span>
        </div>
    </div>
    <Container className="container-bitacora" style={{ width: "40%" }}>
      <Row>
        <Col>
          <div style={{ display:'flex', alignItems: 'flex-start', marginTop: '20px', marginBottom: '20px' }}>
              <Button variant="link" onClick={() => navigate("/inicio")} style={{ color: 'black', fontSize: '30px', marginLeft:'-100px'}}>
                <i className="bi bi-arrow-left"></i>
              </Button>
              <h2 style={{ marginBottom: '2px', marginLeft: '-35%' }}>Registrar visita</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="registration-form-group" style={{ width: "100%" }}>
            <label htmlFor="name">Nombre(s)</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={() => { navigate("/visitas-qr", { state: { roomType } }) }} style={{ width: "50%", marginTop: "2rem", marginBottom: "2rem" }}>Siguiente</Button>
        </Col>
      </Row>
    </Container>
    </>
  );
}
