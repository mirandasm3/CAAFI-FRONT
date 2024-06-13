import React, { useEffect, useState } from 'react';
import '../styles/binnacle-history.css';

export default function BinnacleHistory() {
  const [bitacoras, setBitacoras] = useState([]);
  const logoUrl = require('../img/caafi-w.png');

  useEffect(() => {
    
    fetch('') // Aquí pon la url de la API manulate
      .then(response => response.json())
      .then(data => setBitacoras(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="bitacoras-container">
      <header className="bitacoras-header">
        <img src={logoUrl} alt="CAAFI" className="bitacoras-logo" />
        <div className="bitacoras-user-info">
          <span>Universidad Veracruzana</span>
          <i className="bi bi-person"></i>
        </div>
      </header>
      <div className="bitacoras-content">
        <div className="bitacoras-back">
          <i className="bi bi-arrow-left"></i> 
          <span>Bitácoras</span>
        </div>
        <input type="text" placeholder="Buscar..." className="bitacoras-search" />
        <table className="bitacoras-table">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Fecha</th>
              <th>Alumno</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bitacoras.map((bitacora, index) => (
              <tr key={index}>
                <td>{bitacora.matricula}</td>
                <td>{bitacora.nombre}</td>
                <td>{bitacora.apellidos}</td>
                <td>{bitacora.fecha}</td>
                <td>{bitacora.alumno}</td>
                <td><button className="bitacoras-button">Abrir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="bitacoras-footer">
        <p>© 2024 Universidad Veracruzana. Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
