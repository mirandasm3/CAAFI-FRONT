import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "../styles/login.css"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [emailInputIsInvalid, setEmailInputIsInvalid] = useState(false)
    const [passwordInputIsInvalid, setPasswordInputIsInvalid] = useState(false)
    
    const navigate = useNavigate();

    const logoUrl = "https://cdn.discordapp.com/attachments/1159345719749136386/1244803015295107082/descargar-removebg-preview.png?ex=665670a6&is=66551f26&hm=efa58b1d61082a9f2278796c335d9c4cf89e68c3f46901eac26b3585ae1951a0&";

    const checkFormFields = () => {
        setFormError("");
        setEmailInputIsInvalid(false);
        setPasswordInputIsInvalid(false);
        if(email === "") {
            setFormError("Correo requerido");
            setEmailInputIsInvalid(true);
            return;
        }
        if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setFormError("Correo inválido");
            setEmailInputIsInvalid(true);
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
            body: JSON.stringify({email, password})
        })
        .then(async r => {
            switch(r.status) {
                case 200: {
                    let responseBody = await r.json();
                    const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 3);
                    Cookies.set('auth', responseBody.token, { expires: expirationTime });
                    Cookies.set('user', JSON.stringify(responseBody.user), { expires: expirationTime });
                    Cookies.set('auth-type', "account", { expires: expirationTime });
                    navigate("/");
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
            <div className="card mx-auto login-form shadow-lg">
                <div className="card-body">
                    <div className="logo">
                        <img src={logoUrl} alt="" />
                        <h4>Inicio de sesión</h4>
                    </div>
                    <div className="mb-3">
                        <label for="input-email" className="form-label">{"Usuario"}</label>
                        <input type="email" className={!emailInputIsInvalid ? "form-control" : "form-control is-invalid"} id="input-email" value={email} onChange={ev => setEmail(ev.target.value)}/>
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
                    <div className="text-end w-100">
                        <a href="#!" onClick={() => navigate("/recoverpassword")}>{"¿Olvidaste tu contraseña?"}</a>
                    </div>
                </div>

                <div className="card-footer d-flex flex-row-reverse align-items-center justify-content-between">
                    <button type="button" className="btn btn-primary" onClick={checkFormFields}>{"Iniciar sesión"}</button>
                    <span className="error-message text-danger card-text">{formError}</span>
                </div>
            </div>
        </form>
    </div>
}
