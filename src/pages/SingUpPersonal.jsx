import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../styles/singup-personal.css";
import UserIcon from "../components/UserIcon.jsx";

export default function SingUpPersonal() {
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');

 const navigate = useNavigate();
    const logoURL = require('../img/caafi-w.png');
    const uvTitleURL = require('../img/Universidad-Veracruzana-Title.png');

    const validateUsuario = (value) => {
        return /^[a-zA-Z0-9]+$/.test(value);
      };
    
    const validateApellidosNombre = (value) => {
        return /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(value);
    };

    const mostrarMensajeExito = () => {
        var registroExitoso;
        if (registroExitoso) {
            alert( '¡Registro exitoso! El registro del personal ha sido guardado correctamente.');
        }
        return null; 
      };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log({
        usuario,
        nombre,
        apellidos,
        contrasena,
        tipoUsuario
      });
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
                
            <div style={{ display:'flex', alignItems: 'left' }}>
              <Button variant="link" onClick={() => navigate("/inicio")} style={{ color: 'black', fontSize: '30px', marginLeft:'-150px'}}>
                <i className="bi bi-arrow-left"></i>
              </Button>
            </div>

                <h1 className="singup-title">Registro de Personal CAAFI</h1>
                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="usuario">Usuario:</label>
                        <input
                          type="text"
                          id="usuario"
                          value={usuario}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (validateUsuario(newValue)) {
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
                            if (validateApellidosNombre(newValue)) {
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
                            if (validateApellidosNombre(newValue)) {
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
                          onChange={(e) => setTipoUsuario(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar tipo</option>
                          <option value="estudiante">Estudiante</option>
                          <option value="profesor">Profesor</option>
                          <option value="administrativo">Administrativo</option>
                        </select>
                      </div>
                      <button type="submit" className="submit-button">
                        Registrar
                      </button>
                  </form>
            </div> 
      </div>
    );
}

