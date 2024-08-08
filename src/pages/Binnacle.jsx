import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import '../styles/binnacle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserIcon from '../components/UserIcon';
import Cookies from 'js-cookie';
import config from "../Config";

export default function Binnacle() {
    const [formData, setFormData] = useState({
        nombre: '',
        grupoFacultad: '',
        sesion: '',
        habilidadArea: '',
        material: '',
        aprendizaje: '',
        evaluacion: 50,
        duda: '',
        asesoria: false,
        observacion: '',
        horaInicio: '',
        horaFin: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userNameFromCookies = Cookies.get('user-name');
        const userSurnamesFromCookies = Cookies.get('user-surnames');
        const now = new Date();
        const formattedNow = now.toISOString();
        const idAlumno = Cookies.get('user-idPersona');
        setFormData(prevState => ({
            ...prevState,
            horaInicio: formattedNow,
            nombre: userNameFromCookies.toString()+" "+userSurnamesFromCookies.toString(),
            idAlumno
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.sesion) errors.nombre = 'Nombre es requerido';
        if (!formData.habilidadArea) errors.grupoFacultad = 'Grupo/Facultad es requerida';
        if (!formData.sesion) errors.sesion = 'Sesión es requerida';
        if (!formData.habilidadArea) errors.habilidadArea = 'Habilidad/Área es requerida';
        if (!formData.material) errors.material = 'Material es requerido';
        if (!formData.aprendizaje) errors.aprendizaje = 'Aprendizaje es requerido';
        if (!formData.duda) errors.duda = 'Duda es requerida';
        if (!formData.observacion) errors.observacion = 'Observación es requerida';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

     const handleSubmit = async () => {
        if (!validateForm()) return;
        const now = new Date();
        const formattedNow = now.toISOString();
        let finalFormData = {
            ...formData,
            horaFin: formattedNow
        }
        try {
            const response = await fetch(`${config.apiUrl}/bitacora`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...finalFormData, asesoria: formData.asesoria ? 1 : 0 }),
            });
            if (response.ok) {
                setShowSuccessModal(true);
                setFormData({
                    nombre: '',
                    grupoFacultad: '',
                    sesion: '',
                    habilidadArea: '',
                    material: '',
                    aprendizaje: '',
                    evaluacion: 50,
                    duda: '',
                    asesoria: false,
                    observacion: '',
                    horaInicio: '',
                    horaFin: ''
                });
            } else {
                alert('Error al registrar');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en el servidor');
        }
    };

    return (
        <div className='bita'>
            <div className="bitacora-header">
                <div md={6} className="bitacora-logo">
                    <img src={require('../img/caafi-w.png')} alt="CAAFI Logo" />
                </div>
                <div md={6} className="text-right m-login__head">
                <div className="m-login__head" style={{ position: 'absolute', top: '0', right: '10px', backgroundColor: '#0D47A1', zIndex: '1000', padding: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                    <span className="g-font-weight-400 g-py-0 g-px-12 g-font-size-18" style={{ color: '#ffffff' }}>Universidad Veracruzana</span>
                </div>
                <UserIcon />
                </div>
            </div>
            <Row className="header-bar d-flex align-items-center justify-content-between">
                <Col md={6} className="back-button">
                    <Button variant="link" onClick={() => navigate(-1)} style={{ color: 'black', fontSize: '30px', marginLeft: '-10px' }}>
                        <i className="bi bi-arrow-left"></i>
                    </Button>
                    <h2 className="header-title">Bitácora</h2>
                </Col>
            </Row>
        <Container className="container-bitacora">
            <Form className="bitacora-form" onSubmit={handleSubmit}>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                isInvalid={!!formErrors.nombre}
                                readOnly
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.nombre}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="grupoFacultad">
                            <Form.Label>Grupo / Facultad</Form.Label>
                            <Form.Control
                                type="text"
                                name="grupoFacultad"
                                value={formData.grupoFacultad}
                                onChange={handleChange}
                                isInvalid={!!formErrors.grupoFacultad}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.grupoFacultad}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="sesion">
                            <Form.Label>Sesión</Form.Label>
                            <Form.Control
                                type="text"
                                name="sesion"
                                value={formData.sesion}
                                onChange={handleChange}
                                isInvalid={!!formErrors.sesion}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.sesion}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="habilidadArea">
                            <Form.Label>Habilidad / Área</Form.Label>
                            <Form.Control
                                type="text"
                                name="habilidadArea"
                                value={formData.habilidadArea}
                                onChange={handleChange}
                                isInvalid={!!formErrors.habilidadArea}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.habilidadArea}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="material">
                            <Form.Label>Material</Form.Label>
                            <Form.Control
                                type="text"
                                name="material"
                                value={formData.material}
                                onChange={handleChange}
                                isInvalid={!!formErrors.material}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.material}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="aprendizaje">
                            <Form.Label>Menciona al menos tres cosas que aprendiste en esta sesión</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="aprendizaje"
                                value={formData.aprendizaje}
                                onChange={handleChange}
                                isInvalid={!!formErrors.aprendizaje}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.aprendizaje}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="evaluacion">
                            <Form.Label>¿Cómo evalúo mi trabajo hoy en CAAFI?</Form.Label>
                            <Form.Control
                                type="range"
                                name="evaluacion"
                                min="0"
                                max="100"
                                value={formData.evaluacion}
                                onChange={handleChange}
                            />
                            <span>{formData.evaluacion}</span>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="duda">
                            <Form.Label>¿Me quedó alguna duda? ¿qué haré para resolverla?</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="duda"
                                value={formData.duda}
                                onChange={handleChange}
                                isInvalid={!!formErrors.duda}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.duda}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4} className="d-flex align-items-center">
                        <Form.Group controlId="asesoria">
                            <Form.Check
                                type="checkbox"
                                label="¿Necesito asesoría?"
                                name="asesoria"
                                checked={formData.asesoria}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group controlId="observacion">
                            <Form.Label>Otras observaciones / sugerencias</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="observacion"
                                value={formData.observacion}
                                onChange={handleChange}
                                isInvalid={!!formErrors.observacion}
                            />
                            <Form.Control.Feedback type="invalid">{formErrors.observacion}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="button" style= {{width:'300px'}} className="btn btn-primary submit-btn" onClick={() => setShowConfirmModal(true)}>Enviar bitácora</Button>
            </Form>


        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar envío</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas enviar la bitácora?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => { handleSubmit(); setShowConfirmModal(false); }}>
                    Enviar
                </Button>
            </Modal.Footer>
        </Modal>


        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registro exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tu registro se ha realizado con éxito.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate("/inicio")}>
            Cerrar
          </Button>
        </Modal.Footer>
        </Modal>
    </Container>
    </div>
    
  );
}
