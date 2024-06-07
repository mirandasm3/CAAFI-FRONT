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

                <div>
                <h1 className="singup-title">
                    Registro de Personal CAAFI
                </h1>
                </div>
                
                <div className="singup-form">
                    
                </div>
        </div>
    );
}