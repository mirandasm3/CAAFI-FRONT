import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../styles/singup-personal.css";
import UserIcon from "../components/UserIcon.jsx";
import config from "../Config.js";

export default function SingUpPersonal() {
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState(1);
    const [tipoPersona, setTipoPersona] = useState('Administrador');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate();
    const logoURL = require('../img/caafi-w.png');
    const uvTitleURL = require('../img/Universidad-Veracruzana-Title.png');

    const validateUsuario = (value) => {
      return /^[a-zA-Z]+$/.test(value);
    };
    
    const validateApellidosNombre = (value) => {
        return /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(value);
    };

    const mostrarMensajeExito = () => {
        var registroExitoso;
        if (registroExitoso) {
            alert('¡Registro exitoso! El registro del personal ha sido guardado correctamente.');
        }
        return null; 
    };

    const handleSubmit = async (event) => {
        try {
            const response = await fetch(`${config.apiUrl}/personal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    matricula: usuario,
                    nombre,
                    apellidos,
                    password: contrasena,
                    puesto: tipoUsuario,
                    tipo: tipoPersona
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                setShowSuccessModal(true);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="d-flex align--center justify-content- vh-100" style={{ flexDirection: 'column' }}>
            <div className="grey-block">
                <img src={logoURL} id="caafi-logo" alt="logo" />
                <div className="column-container">
                    <img src={uvTitleURL} id="uv-title" alt="universidad veracruzana" />
                    <UserIcon id="userIcon"/>
                </div>
            </div>
            <div style={{ display:'flex', alignItems: 'flex-start', marginTop: '20px' }}>
              <Button variant="link" onClick={() => navigate("/inicio")} style={{ color: 'black', fontSize: '30px', marginLeft:'-150px'}}>
                <i className="bi bi-arrow-left"></i>
              </Button>
              <h2 style={{ marginBottom: '2px', marginLeft: '-35%' }}>Registro de Personal CAAFI</h2>
            </div>

            
            <div className="signup-form">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="usuario">Usuario:</label>
                        <input
                            type="text"
                            id="usuario"
                            value={usuario}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if(validateUsuario(newValue) || newValue === '') {
                                    setUsuario(newValue);
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos:</label>
                        <input
                            type="text"
                            id="apellidos"
                            value={apellidos}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (validateApellidosNombre(newValue) || newValue === '') {
                                    setApellidos(newValue);
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contrasena">Contraseña:</label>
                        <input
                            type="password"
                            id="contrasena"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre(s):</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (validateApellidosNombre(newValue) || newValue === '') {
                                    setNombre(newValue);
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipoUsuario">Puesto:</label>
                        <select
                            id="tipoUsuario"
                            value={tipoUsuario}
                            onChange={(e) => {
                                const newTipoUsuario = parseInt(e.target.value);
                                setTipoUsuario(newTipoUsuario);
                                setTipoPersona(newTipoUsuario === 1 ? 'Administrador' : 'Técnico');
                            }}
                            required
                        >
                            <option value="1">Administrador</option>
                            <option value="2">Técnico académico</option>
                        </select>
                    </div>
                    <Button onClick={handleSubmit} className="submit-button">Registrar</Button>
                </div>
            </div> 
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
        </div>
    );
}
