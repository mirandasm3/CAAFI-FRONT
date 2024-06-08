import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/singup-personal.css";

export default function SingUpPersonal() {
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
  
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
                    <img src="../img/caafi-w.png" id="caafi-logo" alt="logo" />

                    <div className="column-container">
                        <img src="../img/UniversidadVeacruzana-Title" id="uv-title" alt="universidad veracruzana" />
                        <img src="../img/user-icon.png" id="userIconImage" alt="icon" />
                    </div>

                </div>

                
                <h1 className="singup-title">
                    Registro de Personal CAAFI
                </h1>
               
                <div className="singup-form">
                <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="usuario">Usuario:</label>
                            <input
                            type="text"
                            id="usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="nombre">Nombre(s):</label>
                            <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="apellidos">Apellidos:</label>
                            <input
                            type="text"
                            id="apellidos"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="contrasena">Contraseña:</label>
                            <input
                            type="password"
                            id="contrasena"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                            />
                        </div>
                        <div>
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
                        <button type="submit">Registrar</button>
                        </form>
                             </div>
                            </div>
    );
}