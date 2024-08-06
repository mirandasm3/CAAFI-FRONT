import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../styles/select-student.css";
import UserIcon from "../components/UserIcon";

export default function VisitQrPage() {
  const [matricula, setMatricula] = useState("");
  const location = useLocation();
  const { roomType } = location.state || {};

  useEffect(() => {
    setMatricula(Cookies.get('user-matricula'));
  });

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
              <Button variant="link" onClick={() => navigate(-1)} style={{ color: 'black', fontSize: '30px', marginLeft:'-100px'}}>
                <i className="bi bi-arrow-left"></i>
              </Button>
              <h2 style={{ marginBottom: '2px', marginLeft: '-35%' }}>Registrar visita</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p style={{ fontSize: "1.3rem" }}>Presenta este QR en la entrada del CAAFI.</p>
          <img style={{ width: "50%", marginBottom: "3rem" }} src={`http://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${JSON.stringify({ matricula, roomType })}`} alt="QR" />
          <Button onClick={() => { navigate("/inicio") }} style={{ width: "50%", marginBottom: "2rem" }}>Listo</Button>
          </Col>
      </Row>
    </Container>
    </>
  );
}
