import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default function StudentDashboard() {
    const navigate = useNavigate();

    const userName = Cookies.get('user') ? JSON.parse(Cookies.get('user')).name : '';

    const handleLogOut = () => {
        Cookies.remove('auth');
        Cookies.remove('user');
        Cookies.remove('auth-type');
        navigate("/caafi");
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card mx-auto dashboard-form shadow-lg">
                <div className="card-body">
                    <h4>Bienvenido {userName}</h4>
                    <div className="mt-4">
                        <button type="button" className="btn btn-student 1" onClick={() => navigate("/bitacoras")}>Bitácoras</button>
                        <button type="button" className="btn btn-student 2" onClick={() => navigate("/visitas")}>Visitas</button>
                        <button type="button" className="btn btn-cabin 1" onClick={() => navigate("/visitas")}>Visitas</button>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-end">
                    <button type="button" className="btn btn-danger" onClick={handleLogOut}>Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
}
