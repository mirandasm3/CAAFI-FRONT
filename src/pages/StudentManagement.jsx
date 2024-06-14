import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/student-management.css';
import UserIcon from '../components/UserIcon';

export default function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://8kzxktht-3000.usw3.devtunnels.ms/alumnos')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredStudents = students.filter(student =>
        student.status.toLowerCase() === 'aprobado' &&
        (student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricula.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
            <div className="back-button">
                <button className="back-btn" onClick={() => navigate(-1)}>&larr;</button>
            </div>
            <h2>Alumnos CAAFI</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
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
                        <tr key={student.matricula}>
                            <td>{student.matricula}</td>
                            <td>{student.nombre}</td>
                            <td>{student.apellidos}</td>
                            <td>{student.tipo}</td>
                            <td>
                                <button className="view-btn">Ver</button>
                                <button className="edit-btn">Editar</button>
                                <button className="delete-btn">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
