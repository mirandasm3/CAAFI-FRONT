import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "../styles/login.css"

export default function Login() {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [userInputIsInvalid, setUserInputIsInvalid] = useState(false)
    const [passwordInputIsInvalid, setPasswordInputIsInvalid] = useState(false)
    
    const navigate = useNavigate();

    const logoUrl = "https://cdn.discordapp.com/attachments/1159345719749136386/1244803015295107082/descargar-removebg-preview.png?ex=665670a6&is=66551f26&hm=efa58b1d61082a9f2278796c335d9c4cf89e68c3f46901eac26b3585ae1951a0&";

    const checkFormFields = () => {
        setFormError("");
        setUserInputIsInvalid(false);
        setPasswordInputIsInvalid(false);
        if(user === "") {
            setFormError("Usuario requerido");
            setUserInputIsInvalid(true);
            return;
        }
        if (!/^(s|S)\d{8}$|^[a-z]+$/.test(user)) {
            setFormError("Usuario inválido");
            setUserInputIsInvalid(true);
            return;
        }        
        if(password === "") {
            setFormError("Contraseña requerida");
            setPasswordInputIsInvalid(true);
            return;
        }
        logIn();
    }

    const logIn = () => {
        fetch(`${"localhost:9000"}/auth/login`, {
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
                    setFormError("Credenciales inválidas");
                    break;
                }
                case 429: {
                    setFormError("Demasiados intentos");
                    break;
                }
                default: {
                    setFormError("Error desconocido");
                    break;
                }
            }
        })
    }

    return <div className="d-flex align-items-center justify-content-center vh-100">
        <form>
            <div className="cardo mx-auto login-form">
                <div className="cardo-body">
                    <div className="logo">
                        <img src={logoUrl} alt="Logo CAAFI"/>
                        <h4>Inicio de sesión</h4>
                    </div>
                    <div className="mb-3">
                        <label for="input-user" className="form-label">{"Usuario"}</label>
                        <input type="user" className={!userInputIsInvalid ? "form-control" : "form-control is-invalid"} id="input-user" value={user} onChange={ev => setUser(ev.target.value)} placeholder="Matrícula o cuenta"/>
                        <span className="error-message text-danger card-text">{formError}</span>
                    </div>
                    <div className="mb-3">
                        <label for="input-password" className="form-label">{"Contraseña"}</label>
                        <div className="input-group">
                            <input type={passwordVisible ? "text" : "password"} className={!passwordInputIsInvalid ? "form-control" : "form-control is-invalid"} id="input-password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                            <span className="input-group-text" onClick={() => setPasswordVisible(!passwordVisible)} style={{cursor: "pointer"}}>
                                <i className={!passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"} id="togglePassword"></i>
                            </span>
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse align-items-center justify-content-center">
                        <button type="button" className="btn btn-success" style={{ width: "100%", maxWidth: "calc(100% - 5px)" }} onClick={checkFormFields}>{"Iniciar sesión"}</button>
                    </div>

                    <p className="align-items-center justify-content-center">o</p>
                    <div className="text-end w-100 align-items-center justify-content-center">
                        <a className="ar-text" onClick={() => navigate("/solicitar-registo")}>{"Solicita tu inscripción AQUÍ"}</a>
                        <br></br>
                        <a className="rp-text" onClick={() => navigate("/recuperar-cuenta")}>{"¿Olvidaste tu contraseña?"}</a>
                    </div>
                </div>
            </div>
        </form>
        <div className="footer-text">
                © 2024 Universidad Veracruzana. Todos los derechos reservados
        </div>
    </div>
}
