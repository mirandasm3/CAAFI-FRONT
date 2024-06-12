import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/select-student.css";

export default function SelectStudent() {
  const [studentType, setStudentType] = useState("alumnoUV");
  const [registrationType, setRegistrationType] = useState("primeraInscripcion");
  const navigate = useNavigate();

  const logoUrl = require('../img/caafi-w.png');
  const bg = require('../img/background.png');

  const handleStudentTypeChange = (event) => {
    setStudentType(event.target.value);
  };

  const handleRegistrationTypeChange = (event) => {
    setRegistrationType(event.target.value);
  };

  const handleNextButtonClick = () => {
    navigate("/registroa", { state: { studentType, registrationType } });
  };

  return (
    <div className="container-fluid vh-100">
      <div className="m-login__head" style={{ position: 'absolute', top: '0', left: '10px', backgroundColor: '#0D47A1', zIndex: '1000', padding: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
        <span className="g-font-weight-400 g-py-0 g-px-12 g-font-size-18" style={{ color: '#ffffff' }}>Universidad Veracruzana</span>
      </div>
      <div className="row h-100">
        <div className="col-md-6 img-bg">
          <img src={bg} alt="Fondo" className="img-fluid" />
        </div>
        <div className="col-md-6 content">
          <div className="header">
            <div className="logoSS">
              <img src={logoUrl} alt="Logo CAAFI" />
            </div>
          </div>
          <div className="white-box">
            <div style={{ display:'flex', alignItems: 'left' }}>
              <Button variant="link" onClick={() => navigate("/caafi")} style={{ color: 'black', fontSize: '30px', marginLeft:'-150px'}}>
                <i className="bi bi-arrow-left"></i>
              </Button>
              <h2 style={{ marginBottom: '2px', marginLeft: '-38%' }}>Registro de inscripción</h2>
            </div>
            <p>Antes de continuar, selecciona los datos adecuados a tu inscripción</p>
            <div className="form-group">
              <label className="lb1">Tipo de usuario</label>
              <div className="form-check">
                <input type="radio" className="form-check-input" id="alumnoUV" name="studentType" value="alumnoUV" checked={studentType === "alumnoUV"} onChange={handleStudentTypeChange} />
                <label className="form-check-label" htmlFor="alumnoUV">
                  Estudiante UV
                </label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" id="delex" name="studentType" value="delex" checked={studentType === "delex"} onChange={handleStudentTypeChange}/>
                <label className="form-check-label" htmlFor="delex">
                  DELEX
                </label>
              </div>
            </div>
            <div className="form-group">
              <label className="lb1">Tipo de inscripción</label>
              <div className="form-check">
                <input type="radio" className="form-check-input" id="primeraInscripcion" name="registrationType" value="primeraInscripcion" checked={registrationType === "primeraInscripcion"} onChange={handleRegistrationTypeChange}/>
                <label className="form-check-label" htmlFor="primeraInscripcion">
                  1ra Inscripción
                </label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" id="reinscripcion" name="registrationType" value="reinscripcion" checked={registrationType === "reinscripcion"} onChange={handleRegistrationTypeChange} />
                <label className="form-check-label" htmlFor="reinscripcion">
                  Reinscripción
                </label>
              </div>
            </div>
            <Button onClick={handleNextButtonClick}>Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
