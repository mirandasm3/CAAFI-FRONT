import React, { useState } from 'react';
import EnrollmentReports from './Reports/Enrollments';
import VisitsReports from './Reports/Visits';
import RoomsReports from './Reports/Rooms';
import IdiomsReports from './Reports/Idioms';
import "../styles/reports.css";


export default function StatsReports() {
    const [activeTab, setActiveTab] = useState('visits');

    return (
        <div className='container'>
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
                {activeTab === 'rooms' && <RoomsReports/>}
                {activeTab === 'idioms' && <IdiomsReports />}
            </div>
        </div>
    );
}