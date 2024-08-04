import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function TestLogin() {
    const navigate = useNavigate();

    const simulateLogin = (userType) => {
        const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 3);
        Cookies.set('auth', 'fake-token', { expires: expirationTime });
        Cookies.set('user', JSON.stringify({ name: 'Juan Pérez González', type: userType }), { expires: expirationTime });
        Cookies.set('auth-type', "account", { expires: expirationTime });
        Cookies.set('user-type', userType, { expires: expirationTime });
        navigate("/inicio");
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Simular Inicio de Sesión</h1>
            <button onClick={() => simulateLogin('Administrador')}>Iniciar como Administrador</button>
            <button onClick={() => simulateLogin('Técnico')}>Iniciar como Técnico Académico</button>
            <button onClick={() => simulateLogin('Alumno')}>Iniciar como Alumno</button>
        </div>
    );
}
