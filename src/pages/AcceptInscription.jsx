import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/accept-inscription.css";
import Cookies from 'js-cookie';
import UserIcon from "../components/UserIcon";
import { Modal, Button } from 'react-bootstrap';

export default function AcceptInscription() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://8kzxktht-3000.usw3.devtunnels.ms/inscripcion')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredStudents = students.filter(student =>
        student.status.toLowerCase() === 'pendiente' &&
        (student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricula.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSelectStudent = (matricula) => {
        if (selectedStudent === matricula) {
            setSelectedStudent(null);
        } else {
            setSelectedStudent(matricula);
        }
    };

    const handleApproveSelection = async () => {
        try {
            const response = await fetch('https://8kzxktht-3000.usw3.devtunnels.ms/inscripcion/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('auth')}`
                },
                body: JSON.stringify({ matricula: selectedStudent })
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
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <h2>Solicitudes de inscripción</h2>
                </div>
                <div className="actions">
                    <button className="manual-button">Inscripción manual</button>
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
                        <tr key={student.matricula}>
                            <td>{student.nombre}</td>
                            <td>{student.apellidos}</td>
                            <td>{student.tipo}</td>
                            <td>{student.inscripcion}</td>
                            <td>{student.comprobante1 || 'N/A'}</td>
                            <td>{student.comprobante2 || 'N/A'}</td>
                            <td>
                                <input
                                    type="radio"
                                    name="selectStudent"
                                    checked={selectedStudent === student.matricula}
                                    onChange={() => handleSelectStudent(student.matricula)}
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
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        Cerrar
                    </Button>
                    <button className="back-btn" onClick={() => navigate("/inicio")}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
