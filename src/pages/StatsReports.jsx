import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnrollmentReports from './Reports/Enrollments';
import VisitsReports from './Reports/Visits';
import RoomsReports from './Reports/Rooms';
import IdiomsReports from './Reports/Idioms';
import UserIcon from "../components/UserIcon";
import "../styles/reports.css";

export default function StatsReports() {
    const [activeTab, setActiveTab] = useState('visits');
    const navigate = useNavigate();

    return (
        <div className="container-stats">
            <div className="report-header">
                <div className="report-logo">
                    <img src={require('../img/caafi-w.png')} alt="Logo CAAFI" />
                </div>
                <UserIcon />
                <div className="m-login__head" style={{ position: 'absolute', top: '0', right: '10px', backgroundColor: '#0D47A1', zIndex: '1000', padding: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                    <span className="g-font-weight-400 g-py-0 g-px-12 g-font-size-18" style={{ color: '#ffffff' }}>Universidad Veracruzana</span>
                </div>
            </div>
            <div className="back-button">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <i className="bi bi-arrow-left"></i>
                </button>
            </div>
            <h2>Reportes de estadísticas</h2>
            <div className="tabs">
                <button className={activeTab === 'visits' ? 'active' : ''} onClick={() => setActiveTab('visits')}>
                    Visitas
                </button>
                <button className={activeTab === 'enrollments' ? 'active' : ''} onClick={() => setActiveTab('enrollments')}>
                    Inscripciones
                </button>
                <button className={activeTab === 'rooms' ? 'active' : ''} onClick={() => setActiveTab('rooms')}>
                    Salas
                </button>
                <button className={activeTab === 'idioms' ? 'active' : ''} onClick={() => setActiveTab('idioms')}>
                    Idiomas
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'visits' && <VisitsReports />}
                {activeTab === 'enrollments' && <EnrollmentReports />}
                {activeTab === 'rooms' && <RoomsReports />}
                {activeTab === 'idioms' && <IdiomsReports />}
            </div>
        </div>
    );
}
