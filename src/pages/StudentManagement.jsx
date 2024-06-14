import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/student-management.css";
import UserIcon from '../components/UserIcon';
import { Modal, Button } from 'react-bootstrap';
import config from '../Config';

export default function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showStudentModal, setShowStudentModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${config.apiUrl}/alumnos`)
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredStudents = students.filter(student => {
        return student.status === 'aprobado' &&
        (student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricula.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    );

    const handleDeleteStudent = async () => {
        if (!selectedStudent) return;

        try {
            console.log(selectedStudent);
            const response = await fetch(`${config.apiUrl}/alumno`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idPersona: selectedStudent.idPersona })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setShowSuccessModal(true);
            setStudents(students.filter(student => student.idPersona !== selectedStudent.idPersona));
            setSelectedStudent(null);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleViewStudent = async (student) => {
        setSelectedStudent(student);
        setShowStudentModal(true);
    };

    return (
        <div className="container-student-management">
            <div className="stu-header">
                <div className="stu-logo">
                    <img src={require('../img/caafi-w.png')} alt="Logo CAAFI" />
                </div>
                <div className="m-login__head" style={{ position: 'absolute', top: '0', right: '10px', backgroundColor: '#0D47A1', zIndex: '1000', padding: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                    <span className="g-font-weight-400 g-py-0 g-px-12 g-font-size-18" style={{ color: '#ffffff' }}>Universidad Veracruzana</span>
                </div>
                <UserIcon />
            </div>
            <div className="header-bar">
                <div className="back-button">
                    <button className="back-btn" onClick={() => navigate(-1)}>&larr;</button>
                </div>
                <h2 className="header-title">Alumnos CAAFI</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Matrícula</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Alumno</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map(student => (
                        <tr key={student.idPersona}>
                            <td>{student.matricula}</td>
                            <td>{student.nombre}</td>
                            <td>{student.apellidos}</td>
                            <td>{student.tipo}</td>
                            <td className='d-flex'>
                                <button className="view-btn" onClick={() => handleViewStudent(student)}>Ver</button>
                                <button className="delete-btn" onClick={() => { setSelectedStudent(student); setShowConfirmModal(true); }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Una vez confirmada la acción no se podrán deshacer los cambios, ¿está seguro de eliminar el registro del alumno?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => { setShowConfirmModal(false); handleDeleteStudent(); }}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registro Eliminado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    El registro del alumno ha sido eliminado.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showStudentModal} onHide={() => setShowStudentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStudent && (
                        <div>
                            <p style={{ textAlign: "left" }}><strong>Matrícula:</strong> {selectedStudent.matricula}</p>
                            <p style={{ textAlign: "left" }}><strong>Nombre:</strong> {selectedStudent.nombre}</p>
                            <p style={{ textAlign: "left" }}><strong>Apellidos:</strong> {selectedStudent.apellidos}</p>
                            <p style={{ textAlign: "left" }}><strong>Tipo:</strong> {selectedStudent.tipo}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowStudentModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
