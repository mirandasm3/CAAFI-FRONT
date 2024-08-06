import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnrollmentReports from './Reports/Enrollments';
import VisitsReports from './Reports/Visits';
import RoomsReports from './Reports/Rooms';
import IdiomsReports from './Reports/Idioms';
import UserIcon from "../components/UserIcon";
import "../styles/reports.css";
import { Button } from 'react-bootstrap';

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
            <div style={{ display:'flex', alignItems: 'flex-start', marginTop: '20px', marginBottom: '20px' }}>
                <Button variant="link" onClick={() => navigate(-1)} style={{ color: 'black', fontSize: '30px', marginLeft:'-150px'}}>
                    <i className="bi bi-arrow-left"></i>
                </Button>
                <h2 style={{ marginBottom: '2px', marginLeft: '-35%' }}>Reportes de estadísticas</h2>
            </div>


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
            </div>
            <div className="tab-content">
                {activeTab === 'visits' && <VisitsReports />}
                {activeTab === 'enrollments' && <EnrollmentReports />}
                {activeTab === 'rooms' && <RoomsReports />}
            </div>
        </div>
    );
}
