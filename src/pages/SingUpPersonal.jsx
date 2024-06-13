import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/singup-personal.css";

export default function SingUpPersonal() {
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');

    const logoURL = require('../img/caafi-w.png');
    const uvTitleURL = require('../img/Universidad-Veracruzana-Title.png');
    const userIconURL = require('../img/user-icon.png');
  
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
                        <img src={userIconURL} id="userIconImage" alt="icon" />
                    </div>
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
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                             />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos:</label>
                            <input
                                type="text"
                                id="apellidos"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
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
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipoUsuario">Puesto:</label>
                            <select
                                id="tipoUsuario"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                                required>
                                //opciones solo de ejemplo para probar
                                <option value="">Seleccionar tipo</option>
                                <option value="estudiante">Estudiante</option>
                                <option value="profesor">Profesor</option>
                                <option value="administrativo">Administrativo</option>
                            </select>
                    </div>
                    <button type="submit" className="submit-button">Registrar</button>
                 </form>
            </div> 
        </div>
    );
}

