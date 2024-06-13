import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css';
import { Button } from 'react-bootstrap';


export default function Dashboard() {
  const logoUrl = require('../img/background.png');

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src={logoUrl} alt="CAAFI" className="dashboard-logo" />
        <div className="dashboard-user-icon">
          <i className="bi bi-person"></i>
        </div>
      </header>
      <div className="dashboard-content">
        <div className="dashboard-left">
          <p>¡Bienvenido, Juan Pérez González!</p>
          <div className="dashboard-stats">
            <h2>122</h2>
            <p>VISITAS</p>
          </div>
          <div className="dashboard-stats">
            <h2>2</h2>
            <p>SALAS USADAS</p>
          </div>
        </div>
        <div className="dashboard-right">
          <div className="dashboard-btn btn-gray">Registro de personal CAAFI</div>
          <div className="dashboard-btn btn-darkgray">Gestión personal CAAFI</div>
          <div className="dashboard-btn btn-blue">Reportes</div>
          <div className="dashboard-btn btn-lightblue">Historial de bitácoras</div>
          <div className="dashboard-btn btn-green">Historial de reportes</div>
        </div>
      </div>
      <footer className="dashboard-footer">
        <p>© 2024 Universidad Veracruzana. Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
