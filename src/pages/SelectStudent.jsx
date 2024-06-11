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
    navigate("/solicitud-registro", { state: { studentType, registrationType } });
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 img-bg">
          <img src={bg} alt="Fondo" className="img-fluid" />
        </div>
        <div className="col-md-6 content">
          <div className="logo">
            <img src={logoUrl} alt="Logo CAAFI" />
            <h2>Registro de inscripción</h2>
          </div>
          <div className="form-group">
            <label>Tipo de estudiante:</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="alumnoUV"
                name="studentType"
                value="alumnoUV"
                checked={studentType === "alumnoUV"}
                onChange={handleStudentTypeChange}
              />
              <label className="form-check-label" htmlFor="alumnoUV">
                Alumno UV
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="delex"
                name="studentType"
                value="delex"
                checked={studentType === "delex"}
                onChange={handleStudentTypeChange}
              />
              <label className="form-check-label" htmlFor="delex">
                DELEX
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Tipo de inscripción:</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="primeraInscripcion"
                name="registrationType"
                value="primeraInscripcion"
                checked={registrationType === "primeraInscripcion"}
                onChange={handleRegistrationTypeChange}
              />
              <label className="form-check-label" htmlFor="primeraInscripcion">
                Primera Inscripción
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="reinscripcion"
                name="registrationType"
                value="reinscripcion"
                checked={registrationType === "reinscripcion"}
                onChange={handleRegistrationTypeChange}
              />
              <label className="form-check-label" htmlFor="reinscripcion">
                Reinscripción
              </label>
            </div>
          </div>
          <Button onClick={handleNextButtonClick}>Siguiente</Button>
          <Button variant="link" onClick={() => navigate("/caafi")}>
            <i className="fas fa-arrow-left"></i> Regresar
          </Button>
        </div>
      </div>
    </div>
  );
}
