import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Cookies from 'js-cookie';
import config from "../Config";
import FormData from 'form-data';
import "../styles/registration-request.css";

export default function RegistrationRequest() {
  const location = useLocation();
  const { studentType, registrationType } = location.state || {};
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [paymentProof, setPaymentProof] = useState(null);
  const [bitacoraCero, setBitacoraCero] = useState(null);
  const [idiomas, setIdiomas] = useState([]);
  const [faculties] = useState([
    { id: 1, name: "Idiomas" },
    { id: 2, name: "Estadística e Informática" },
    { id: 3, name: "Economía" },
    { id: 4, name: "Sociología" },
  ]);
  const [programs] = useState({
    1: [
      'Licenciatura en lengua inglesa',
      'Licenciatura en lengua francesa',
      'Licenciatura en enseñanza del inglés (virtual)',
      'Maestría en enseñanza del inglés como lengua extranjera',
      'Maestría en didáctica del francés',
      'Maestría en Educación para la interculturalidad y sustentabilidad',
      'Doctorado en estudios del lenguaje y lingüística aplicada',
      'Reconocimientos como programas de calidad'
    ],
    2: [
      'Licenciatura en ingeniería en ciencia de datos',
      'Licenciatura en ingeniería en sistemas y tecnologías de la información',
      'Licenciatura en ingeniería de software plan 2023',
      'Licenciatura en ingeniería de ciberseguridad e infraestructura de cómputo',
      'Licenciatura en estadística',
      'Licenciatura en redes y servicios de computo',
      'Licenciatura en ingeniería de software',
      'Licenciatura en Tecnologías computacionales',
      'Licenciatura en ciencias y técnicas estadísticas',
      'Licenciatura en informática'
    ],
    3: [
      'Economía plan 2017',
      'Economía plan 2024'
    ],
    4: [
      'Sociología',
      'Sociología plan 2013'
    ]
  });
  
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    setSemesters(Array.from({ length: 12 }, (_, i) => `Semestre ${i + 1}`));
    setLevels(Array.from({ length: 9 }, (_, i) => (i + 1)));
  }, []);

  const handleFacultyChange = (event) => {
    const facultyId = event.target.value;
    setSelectedFaculty(facultyId);

    const selectedFacultyPrograms = programs[facultyId] || [];
    setSelectedPrograms(selectedFacultyPrograms);
  };

  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  const handleRemoveFile = (setFile) => {
    setFile(null);
  };

  const handleIdiomaChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setIdiomas([...idiomas, parseInt(value)]);
    } else {
      setIdiomas(idiomas.filter((idioma) => idioma !== parseInt(value)));
    }
  };

  const validateForm = () => {
    const errors = {};
    const matriculaPattern = /^[sS]\d{8}$/;

    const form = document.forms["registrationForm"];
    const fields = ["matricula", "name", "surname", "password"];
    fields.forEach((field) => {
      if (!form[field].value.trim()) {
        errors[field] = "Este campo es obligatorio";
      }
    });

    if (!matriculaPattern.test(form["matricula"].value)) {
      errors["matricula"] = "Formato de matrícula inválido. Debe ser S00000000";
    }

    if (idiomas.length === 0) {
      errors["idiomas"] = "Debe seleccionar al menos un idioma";
    }

    if (!paymentProof) {
      errors["paymentProof"] = "El comprobante de pago es obligatorio";
    }
  
    if (registrationType !== "reinscripcion" && !bitacoraCero) {
      errors["bitacoraCero"] = "La bitácora cero es obligatoria";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);

    const form = document.forms["registrationForm"];

    const formData = new FormData();

    let requestData = {
      matricula: form["matricula"].value,
      nombre: form["name"].value,
      apellidos: form["surname"].value,
      password: form["password"].value,
      tipo: studentType,
      inscripcion: registrationType,
      idiomas: idiomas,
      status: "pendiente",
    };

    if (studentType === "Alumno") {
      requestData["facultad"] = form["faculty"].value;
      requestData["programaEducativo"] = form["program"].value;
      requestData["semestre"] = form["semester"].value;
    } 
    else if (studentType === "delex" && (registrationType === "primeraInscripcion" || registrationType === "reinscripcion")) {
      requestData["nivel"] = form["level"].value;
    }

    if (paymentProof) {
      formData.append("comprobante1", paymentProof);
    }

    if (bitacoraCero) {
      formData.append("comprobante2", bitacoraCero);
    }

    formData.append("requestData", JSON.stringify(requestData));

    try {
      const response = await fetch(`${config.apiUrl}/inscripcion`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de red. Inténtelo de nuevo más tarde.");
    }
  };

  const renderAdditionalFields = () => {
    if (studentType === "Alumno") {
      return (
        <>
          <div className="registration-form-group">
            <label htmlFor="faculty">Facultad</label>
            <select id="faculty" name="faculty" onChange={handleFacultyChange} value={selectedFaculty}>
              <option value="">Selecciona una opción</option>
              {faculties.map(faculty => (
                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
              ))}
            </select>
          </div>
          <div className="registration-form-group">
            <label htmlFor="program">Programa educativo</label>
            <select id="program" name="program">
              <option value="">Selecciona una opción</option>
              {selectedPrograms.map((program, index) => (
                <option key={index} value={program}>{program}</option>
              ))}
            </select>
          </div>
          <div className="registration-form-group">
            <label htmlFor="semester">Semestre</label>
            <select id="semester" name="semester">
              <option value="">Selecciona una opción</option>
              {semesters.map((semester, index) => (
                <option key={index} value={semester}>{semester}</option>
              ))}
            </select>
          </div>
        </>
      );
    } else if (studentType === "delex" && (registrationType === "primeraInscripcion" || registrationType === "reinscripcion")) {
      return (
        <>
          <div className="registration-form-group">
            <label htmlFor="level">Nivel</label>
            <select id="level" name="level">
              <option value="">Selecciona una opción</option>
              {levels.map((level, index) => (
                <option key={index} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </>
      );
    }
  };

  return (
    <div className="registration-container">
      <div className="m-login__head" style={{ position: 'absolute', top: '0', left: '10px', backgroundColor: '#0D47A1', zIndex: '1000', padding: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
        <span className="g-font-weight-400 g-py-0 g-px-12 g-font-size-18" style={{ color: '#ffffff' }}>Universidad Veracruzana</span>
      </div>
      <div className="registration-title" style={{ display: 'flex', alignItems: 'center' }}>
        <Button variant="link" onClick={() => navigate("/registro")} style={{ color: 'black', fontSize: '30px', marginLeft: '-10px' }}>
          <i className="bi bi-arrow-left"></i>
        </Button>
        <h2 style={{ marginLeft: '10px' }}>Registro de inscripción</h2>
      </div>
      <div className="registration-body">
        <form name="registrationForm" onSubmit={handleFormSubmit}>
          <div className="registration-form-group">
            <label htmlFor="matricula">Matrícula</label>
            <input type="text" id="matricula" name="matricula" placeholder="S00000000" required />
            {formErrors.matricula && <div className="error-message">{formErrors.matricula}</div>}
          </div>
          <div className="registration-form-group">
            <label htmlFor="name">Nombre(s)</label>
            <input type="text" id="name" name="name" placeholder="Ej. Juan" required />
            {formErrors.name && <div className="error-message">{formErrors.name}</div>}
          </div>
          <div className="registration-form-group">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" id="surname" name="surname" placeholder="Ej. Pérez" required />
            {formErrors.surname && <div className="error-message">{formErrors.surname}</div>}
          </div>
          <div className="registration-form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
            {formErrors.password && <div className="error-message">{formErrors.password}</div>}
          </div>
          {renderAdditionalFields()}
          <div className="registration-checkbox-group">
            <label>Idioma(s)</label>
            <div>
              <input type="checkbox" id="ingles" name="idioma" value="1" onChange={handleIdiomaChange} />
              <label htmlFor="ingles">Inglés</label>

              <input type="checkbox" id="frances" name="idioma" value="2" onChange={handleIdiomaChange} />
              <label htmlFor="frances">Francés</label>

              <input type="checkbox" id="chino" name="idioma" value="7" onChange={handleIdiomaChange} />
              <label htmlFor="chino">Chino</label>

              <input type="checkbox" id="japones" name="idioma" value="3" onChange={handleIdiomaChange} />
              <label htmlFor="japones">Japonés</label>

              <input type="checkbox" id="italiano" name="idioma" value="4" onChange={handleIdiomaChange} />
              <label htmlFor="italiano">Italiano</label>

              <input type="checkbox" id="aleman" name="idioma" value="5" onChange={handleIdiomaChange} />
              <label htmlFor="aleman">Alemán</label>

              <input type="checkbox" id="portugues" name="idioma" value="6" onChange={handleIdiomaChange} />
              <label htmlFor="portugues">Portugués</label>
              
            </div>
            {formErrors.idiomas && <div className="error-message">{formErrors.idiomas}</div>}
          </div>
          <div className="registration-file-upload-container">
              <div className="registration-file-upload">
                <p>Comprobante de pago</p>
                {paymentProof ? (
                  <>
                    <ul className="registration-file-list">
                      <li>{paymentProof.name}</li>
                    </ul>
                    <button type="button" onClick={() => handleRemoveFile(setPaymentProof)}>Eliminar documento</button>
                  </>
                ) : (
                  <>
                    <p>No hay documentos precargados</p>
                    <input type="file" id="paymentProof" name="paymentProof" accept="application/pdf" onChange={(e) => handleFileChange(e, setPaymentProof)} />
                    <label htmlFor="paymentProof">Agregar documento</label>
                    {formErrors.paymentProof && <div className="error-message">{formErrors.paymentProof}</div>}
                  </>
                )}
              </div>
              {registrationType !== "reinscripcion" && (
                <div className="registration-file-upload">
                  <p>Bitácora cero</p>
                  {bitacoraCero ? (
                    <>
                      <ul className="registration-file-list">
                        <li>{bitacoraCero.name}</li>
                      </ul>
                      <button type="button" onClick={() => handleRemoveFile(setBitacoraCero)}>Eliminar documento</button>
                    </>
                  ) : (
                    <>
                      <p>No hay documentos precargados</p>
                      <input type="file" id="bitacoraCero" name="bitacoraCero" accept="application/pdf" onChange={(e) => handleFileChange(e, setBitacoraCero)} />
                      <label htmlFor="bitacoraCero">Agregar documento</label>
                      {formErrors.bitacoraCero && <div className="error-message">{formErrors.bitacoraCero}</div>}
                    </>
                  )}
                </div>
              )}
            </div>
            <br></br>
            <button type="submit" className="registration-submit-btn">Enviar</button>
        </form>
      </div>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de enviar la solicitud de registro?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registro exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tu registro se ha realizado con éxito.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate("/")}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
