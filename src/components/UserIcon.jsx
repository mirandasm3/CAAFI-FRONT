import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaUser } from 'react-icons/fa';

export default function UserIcon() {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('auth');
        Cookies.remove('user');
        Cookies.remove('auth-type');
        Cookies.remove('user-type');
        navigate("/caafi");
    };

    return (
        <div className="user-icon-container">
            <FaUser className="user-icon" onClick={() => setShowMenu(!showMenu)} />
            <div className={`user-menu ${showMenu ? 'show' : ''}`}>
                <div className="user-menu-item" onClick={handleLogout}>
                    Cerrar sesión
                </div>
            </div>
        </div>
    );
}
