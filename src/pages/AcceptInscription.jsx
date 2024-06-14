import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/accept-inscription.css";
import Cookies from 'js-cookie';
import UserIcon from "../components/UserIcon";

export default function AcceptInscription() {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://your-api-url/students');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStudents(data.students);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleSelectStudent = (matricula) => {
        setSelectedStudents((prevSelected) => {
            if (prevSelected.includes(matricula)) {
                return prevSelected.filter((id) => id !== matricula);
            } else {
                return [...prevSelected, matricula];
            }
        });
    };

    const handleApproveSelection = async () => {
        try {
            const response = await fetch('http://your-api-url/approve-students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('auth')}`
                },
                body: JSON.stringify({ matriculas: selectedStudents })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchStudents();
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
            <div className="back-button">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <i className="bi bi-arrow-left"></i>
                </button>
                <h2>Solicitudes de inscripción</h2>
            </div>
            <div className="actions">
                <button className="manual-button">Inscripción manual</button>
                <button className="approve-button" onClick={handleApproveSelection}>Aprobar selección</button>
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
                    {students.map((student) => (
                        <tr key={student.matricula}>
                            <td>{student.nombre}</td>
                            <td>{student.apellidos}</td>
                            <td>{student.tipoAlumno}</td>
                            <td>{student.tipoInscripcion}</td>
                            <td>{student.comprobantePago}</td>
                            <td>{student.bitacoraCero}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.includes(student.matricula)}
                                    onChange={() => handleSelectStudent(student.matricula)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
