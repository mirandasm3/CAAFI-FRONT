import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import UserIcon from "../components/UserIcon";

export default function Dashboard() {
    const [userType, setUserType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userTypeFromCookies = Cookies.get('user-type');
        const userFromCookies = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
        if (!userTypeFromCookies) {
            navigate("/caafi");
        } else {
            setUserType(userTypeFromCookies);
        }
    }, [navigate]);

    const renderButtons = () => {
        switch(userType) {
            case "Administrador":
                return (
                    <div className="buttons">
                        <button className="button registro" onClick={() => navigate("/registrar-personal-caafi")}>Registro de personal CAAFI</button>
                        <button className="button gestion" onClick={() => navigate("/gestion-personal")}>Gestión personal CAAFI</button>
                        <button className="button reportes" onClick={() => navigate("/reportes")}>Reportes</button>
                        <button className="button bitacoras" onClick={() => navigate("/historial-bitacoras")}>Historial de bitácoras</button>
                    </div>
                );
            case "Técnico":
                return (
                    <div className="buttons">
                        <button className="button registro" onClick={() => navigate("/inscripciones")}>Inscripciones</button>
                        <button className="button gestion" onClick={() => navigate("/gestion-alumnos")}>Gestión alumnos CAAFI</button>
                        <button className="button reportes" onClick={() => navigate("/reportes")}>Reportes</button>
                        <button className="button bitacoras" onClick={() => navigate("/bitacoras")}>Bitácoras</button>
                        <button className="button bitacoras" onClick={() => navigate("/historial-bitacoras")}>Historial de bitácoras</button>
                    </div>
                );
            case "alumno":
            case "delex":
                return (
                    <div className="buttons">
                        <button className="button bitacoras" onClick={() => navigate("/bitacoras")}>Bitácoras</button>
                        <button className="button gestion" onClick={() => navigate("/visitas")}>Visitas</button>
                        <button className="button bitacoras" onClick={() => navigate("/historial-bitacoras")}>Historial de bitácoras</button>
                    </div>
                );
            default:
                return null;
        }
    };

    const userFromCookies = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

    return (
        <div className="dashboard">
            <div className="headerMenu">
                <div className="logo">
                    <img src={require('../img/caafi-w.png')} alt="Logo CAAFI" />
                </div>
                <UserIcon />
            </div>
            <div className="body">
                <h1>¡Bienvenido, {userFromCookies ? userFromCookies.name : 'Usuario'}!</h1>
                <div>
                    {renderButtons()}
                </div>
                <div className="footer-text">
                    © 2024 Universidad Veracruzana. Todos los derechos reservados
                </div>
                <a className="url-caafi" href="https://www.uv.mx/caidiomas/" target="_blank" rel="noopener noreferrer">https://www.uv.mx/caidiomas/</a>
                
            </div>
        </div>
    );
}