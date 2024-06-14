import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/accept-inscription.css";
import Cookies from 'js-cookie';
import UserIcon from "../components/UserIcon";
import config from '../Config';
import { Modal, Button } from 'react-bootstrap';

export default function AcceptInscription() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const getFileDownloadLink = (student, file) => {
        const byteArray = new Uint8Array(file.data);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        return URL.createObjectURL(blob);
    }

    const getRequest = () => {
        fetch(`${config.apiUrl}/inscripcion`)
            .then(response => response.json())
            .then(data => setStudents(data.map(student => ({
                idPersona: student.idPersona,
                matricula: student.matricula,
                nombre: student.nombre,
                apellidos: student.apellidos,
                tipo: student.tipo,
                inscripcion: student.inscripcion,
                comprobante1: student.comprobante1,
                comprobante2: student.comprobante2,
                status: student.status
            }))))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        getRequest();
    }, []);

    const filteredStudents = students.filter(student =>
        student.status.toLowerCase() === 'pendiente' &&
        (student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricula.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSelectStudent = (personaId) => {
        if (selectedStudent === personaId) {
            setSelectedStudent(null);
        } else {
            setSelectedStudent(personaId);
        }
    };

    const handleApproveSelection = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/inscripcion/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('auth')}`
                },
                body: JSON.stringify({ idPersona: selectedStudent })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setShowSuccessModal(true);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className='container-accept'>
            <div className="inscriptions-header">
                <div className="inscriptions-logo">
                    <img src={require('../img/caafi-w.png')} alt="Logo CAAFI" />
                </div>
                <div className="m-login__head" style={{ position: 'absolute', top: '0', right: '10px', backgroundColor: '#0D47A1', zIndex: '1000', padding: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                    <span className="g-font-weight-400 g-py-0 g-px-12 g-font-size-18" style={{ color: '#ffffff' }}>Universidad Veracruzana</span>
                </div>
                <UserIcon />
            </div>
            <div className="header-bar">
                <div className="back-button">
                    <button className="back-btn" onClick={() => navigate('/inicio')}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <h2>Solicitudes de inscripción</h2>
                </div>
                <div className="actions">
                    <button className="manual-button" onClick={() => navigate('/registro-manual')}>Inscripción manual</button>
                    <button className="approve-button" onClick={() => setShowConfirmModal(true)} disabled={!selectedStudent}>Aprobar selección</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Alumno</th>
                        <th>Inscripción</th>
                        <th>Comprobante de pago</th>
                        <th>Bitácora cero</th>
                        <th>Aprobar inscripción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student.idPersona}>
                            <td>{student.nombre}</td>
                            <td>{student.apellidos}</td>
                            <td>{student.tipo}</td>
                            <td>{student.inscripcion}</td>
                            <td><a href={getFileDownloadLink(student, student.comprobante1)} download={`${student.matricula}-comprobante.pdf`}>Descargar</a></td>
                            <td>{student.comprobante2 != null ? <a href={getFileDownloadLink(student, student.comprobante2)} download={`${student.matricula}-bitacora.pdf`}>Descargar</a> : "N/A"}</td>
                            <td>
                                <input
                                    type="radio"
                                    name="selectStudent"
                                    checked={selectedStudent === student.idPersona}
                                    onChange={() => handleSelectStudent(student.idPersona)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Aprobación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Deseas confirmar la aprobación de inscripción de los alumnos seleccionados?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => { setShowConfirmModal(false); handleApproveSelection(); }}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro Exitoso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    El registro de alumnos ha sido guardado.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { setShowSuccessModal(false); getRequest() }}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
