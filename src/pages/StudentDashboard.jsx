import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function StudentDashboard() {
    const navigate = useNavigate();

    // Obtener el nombre del usuario de las cookies
    const userName = Cookies.get('user') ? JSON.parse(Cookies.get('user')).name : '';

    const handleLogOut = () => {
        // Eliminar las cookies de autenticación al cerrar sesión
        Cookies.remove('auth');
        Cookies.remove('user');
        Cookies.remove('auth-type');
        navigate("/login"); // Redirigir al usuario a la página de inicio de sesión al cerrar sesión
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card mx-auto dashboard-form shadow-lg">
                <div className="card-body">
                    <h4>Bienvenido {userName}</h4>
                    <div className="mt-4">
                        <button type="button" className="btn btn-primary me-3" onClick={() => navigate("/bitacoras")}>Bitácoras</button>
                        <button type="button" className="btn btn-primary" onClick={() => navigate("/visitas")}>Visitas</button>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-end">
                    <button type="button" className="btn btn-danger" onClick={handleLogOut}>Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
}
