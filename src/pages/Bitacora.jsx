import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import '../styles/bitacora.css';

export default function Bitacora() {
    const [formData, setFormData] = useState({
        nombre: '',
        horaInicio: '',
        horaFin: '',
        session: '',
        aprendizaje: '',
        material: '',
        cosasAprendidas: '',
        evaluacion: 0,
        duda: '',
        asesoria: false,
        observacion: '',
        grupoFacultad: '',
        habilidadArea: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://8kzxktht-3000.usw3.devtunnels.ms/bitacora', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Registro exitoso") {
                setModalMessage("El registro ha sido guardado exitosamente.");
            } else {
                setModalMessage("Hubo un error al registrar la bitácora.");
            }
            setShowModal(true);
        })
        .catch(error => {
            setModalMessage("Error al conectar con el servidor.");
            setShowModal(true);
        });
    };

    return (
        <div className="bitacora-container">
            <h2>Bitácora</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="grupoFacultad">
                    <Form.Label>Grupo / Facultad</Form.Label>
                    <Form.Control
                        type="text"
                        name="grupoFacultad"
                        value={formData.grupoFacultad}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="session">
                    <Form.Label>Sesión</Form.Label>
                    <Form.Control
                        type="text"
                        name="session"
                        value={formData.session}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="habilidadArea">
                    <Form.Label>Habilidad / Área</Form.Label>
                    <Form.Control
                        type="text"
                        name="habilidadArea"
                        value={formData.habilidadArea}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="material">
                    <Form.Label>Material: Codificación / Referencia</Form.Label>
                    <Form.Control
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="cosasAprendidas">
                    <Form.Label>Menciona al menos tres cosas que aprendiste en esta sesión</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="cosasAprendidas"
                        value={formData.cosasAprendidas}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="evaluacion">
                    <Form.Label>¿Cómo evalúo mi trabajo hoy en CAAFI?</Form.Label>
                    <Form.Control
                        type="range"
                        min="0"
                        max="10"
                        name="evaluacion"
                        value={formData.evaluacion}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="duda">
                    <Form.Label>¿Me quedó alguna duda?, ¿qué haré para resolverla?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="duda"
                        value={formData.duda}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="asesoria">
                    <Form.Label>¿Necesito asesoría?</Form.Label>
                    <Form.Check
                        type="switch"
                        name="asesoria"
                        checked={formData.asesoria}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="observacion">
                    <Form.Label>Otras observaciones / sugerencias</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="observacion"
                        value={formData.observacion}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Enviar bitácora
                </Button>
            </Form>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro de Bitácora</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
