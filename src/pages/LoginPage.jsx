import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Modal, Button } from 'react-bootstrap';
import "../styles/login.css";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [formUserError, setFormUError] = useState("");
    const [formPassError, setFormPError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userInputIsInvalid, setUserInputIsInvalid] = useState(false);
    const [passwordInputIsInvalid, setPasswordInputIsInvalid] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const logoUrl = require('../img/caafi.png');
    const uv = require('../img/Universidad-Veracruzana-Title.png');

    const checkFormFields = () => {
        setFormUError("");
        setFormPError("");
        setUserInputIsInvalid(false);
        setPasswordInputIsInvalid(false);
        if(user === "") {
            setFormUError("Usuario requerido");
            setUserInputIsInvalid(true);
            return;
        }
        if (!/^(s|S)\d{8}$|^[a-z]+$/.test(user)) {
            setFormUError("Usuario inválido");
            setUserInputIsInvalid(true);
            return;
        }        
        if(password === "") {
            setFormPError("Contraseña requerida");
            setPasswordInputIsInvalid(true);
            return;
        }
        logIn();
    }

    const logIn = () => {
        fetch(`${"http://localhost:9000"}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user, password})
        })
        .then(async r => {
            switch(r.status) {
                case 200: {
                    let responseBody = await r.json();
                    const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 3);
                    Cookies.set('auth', responseBody.token, { expires: expirationTime });
                    Cookies.set('user', JSON.stringify(responseBody.user), { expires: expirationTime });
                    Cookies.set('auth-type', "account", { expires: expirationTime });
                    navigate("/alumnos-caafi");
                    break;
                }
                case 401: {
                    setFormPError("Credenciales inválidas");
                    break;
                }
                case 429: {
                    setFormPError("Demasiados intentos");
                    break;
                }
                default: {
                    setFormPError("Error desconocido");
                    break;
                }
            }
        })
    }

    return (
        <div className="login-background">
            <div className="d-flex align-items-center justify-content-center vh-100">
                <form autoComplete="off">
                    <div className="cardo mx-auto login-form">
                        <div className="cardo-body">
                            <div className="m-login__head" style={{ position: 'absolute', top: '0', left: '0', backgroundColor: '#0D47A1', zIndex: '1000', padding: '10px' }}>
                                <span className="g-font-weight-400 g-py-0 g-px-12 g-font-size-18" style={{ color: '#ffffff' }}>Universidad Veracruzana</span>
                            </div>
                            <div className="logo">
                                <img src={logoUrl} alt="Logo CAAFI" />
                                <h4>Inicio de sesión</h4>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input-user" className="form-label">{"Usuario"}</label>
                                <input 
                                    type="text" 
                                    className={!userInputIsInvalid ? "form-control" : "form-control is-invalid"} 
                                    id="input-user" 
                                    name="noautocomplete-user"
                                    value={user} 
                                    onChange={ev => setUser(ev.target.value)} 
                                    placeholder="Matrícula o cuenta" 
                                    autoComplete="off"
                                />
                                <span className="error-message text-danger card-text">{formUserError}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input-password" className="form-label">{"Contraseña"}</label>
                                <div className="input-group">
                                    <input 
                                        type={passwordVisible ? "text" : "password"} 
                                        className={!passwordInputIsInvalid ? "form-control" : "form-control is-invalid"} 
                                        id="input-password" 
                                        name="noautocomplete-password"
                                        value={password} 
                                        onChange={ev => setPassword(ev.target.value)} 
                                        autoComplete="off"
                                    />
                                    <span className="input-group-text" onClick={() => setPasswordVisible(!passwordVisible)} style={{cursor: "pointer"}}>
                                        <i className={!passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                                    </span>
                                </div>
                                <span className="error-message text-danger card-text">{formPassError}</span>
                            </div>
                            <div className="d-flex flex-row-reverse align-items-center justify-content-center">
                                <button 
                                    type="button" 
                                    className="btn btn-success" 
                                    style={{ width: "100%", maxWidth: "calc(100% - 5px)" }} 
                                    onClick={checkFormFields}
                                >
                                    {"Iniciar sesión"}
                                </button>
                            </div>
                            <p className="align-items-center justify-content-center">o</p>
                            <div className="text-end">
                                <a className="ar-text" onClick={() => navigate("/registro")}>{"Solicita tu inscripción AQUÍ"}</a>
                                <br/><br/>
                                <a className="rp-text" href="#" onClick={(e) => {e.preventDefault();setShowModal(true);}}>{"¿Olvidaste tu contraseña?"}</a>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="footer-text">
                    © 2024 Universidad Veracruzana. Todos los derechos reservados
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Recuperar contraseña</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Para realizar un cambio de contraseña, visita CAAFI y solicita ayuda al técnico de cabina en turno.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
