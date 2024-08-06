import React, { useEffect, useState } from 'react';
import '../styles/binnacle-history.css';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import config from "../Config";
import { useNavigate } from "react-router-dom";
import UserIcon from '../components/UserIcon';
import Cookies from 'js-cookie';

export default function BinnacleHistory() {
  const [bitacoras, setBitacoras] = useState([]);
  const logoUrl = require('../img/caafi-w.png');
  const navigate = useNavigate();

  useEffect(() => {
    const idAlumno = Cookies.get('user-idPersona') || "";
    fetchBitacoras(idAlumno);
  }, []);

  const fetchBitacoras = (idAlumno) => {
    fetch(`${config.apiUrl}/bitacora/${idAlumno}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos de la API:', data);
        setBitacoras(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDownload = async (bitacora) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    page.drawText('BITÁCORA', {
        x: width / 2 - 30,
        y: height - 30,
        size: 20,
        font,
    });

    page.drawText(`Nombre: ${bitacora.nombre}`, { x: 50, y: height - 60, size: fontSize, font });
    page.drawText(`Grupo / Facultad: ${bitacora.grupoFacultad}`, { x: 50, y: height - 80, size: fontSize, font });
    page.drawText(`Sesión: ${bitacora.sesion}`, { x: 300, y: height - 80, size: fontSize, font });
    page.drawText(`Hora de entrada: ${bitacora.horaInicio || '_______________'}`, { x: 50, y: height - 100, size: fontSize, font });
    page.drawText(`Hora de salida: ${bitacora.horaFin || '_______________'}`, { x: 300, y: height - 100, size: fontSize, font });
    
    page.drawText('Habilidad/Área:', { x: 50, y: height - 150, size: fontSize, font });
    page.drawText(bitacora.habilidadArea || '_______________', { x: 50, y: height - 180, size: fontSize, font });

    page.drawText('Material: Codificación / Referencia', { x: 50, y: height - 210, size: fontSize, font });
    page.drawText(bitacora.material || '_______________', { x: 50, y: height - 240, size: fontSize, font });

    page.drawText('Menciona al menos tres cosas que aprendiste en esta sesión', { x: 50, y: height - 270, size: fontSize, font });
    page.drawText(bitacora.aprendizaje || '_______________', { x: 50, y: height - 300, size: fontSize, font });

    page.drawText('¿Cómo evalúo mi trabajo de hoy en el Centro de Auto Acceso?', { x: 50, y: height - 330, size: fontSize, font });
    page.drawText(bitacora.evaluacion || '_______________', { x: 50, y: height - 360, size: fontSize, font });

    page.drawText('¿Me quedó alguna duda? ¿Qué haré para resolverla?', { x: 50, y: height - 390, size: fontSize, font });
    page.drawText(bitacora.duda || '_______________', { x: 50, y: height - 420, size: fontSize, font });

    page.drawText('¿Necesito asesoría?', { x: 50, y: height - 450, size: fontSize, font });
    page.drawText(bitacora.asesoria ? 'Sí' : 'No', { x: 200, y: height - 480, size: fontSize, font });

    page.drawText('Otras observaciones / sugerencias', { x: 50, y: height - 510, size: fontSize, font });
    page.drawText(bitacora.observacion || '_______________', { x: 50, y: height - 530, size: fontSize, font });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bitacora_${bitacora.nombre}.pdf`;
    link.click();
};

  return (
    <div className="bitacoras-container">
      <div className="headerBitacoras">
        <div className="logo">
            <img src={require('../img/caafi-w.png')} alt="Logo CAAFI" />
        </div>
        <div className="m-login__head" style={{ position: 'absolute', top: '0', right: '10px', backgroundColor: '#0D47A1', zIndex: '1000', padding: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                    <span className="g-font-weight-400 g-py-0 g-px-12 g-font-size-18" style={{ color: '#ffffff' }}>Universidad Veracruzana</span>
        </div>
        <UserIcon />
      </div>
      <div className="bitacoras-content">
        <div className="bitacoras-back">
          <div className="back-button">
            <button className="back-btn" onClick={() => navigate("/inicio")}>&larr;</button>
          </div>
          <span>Bitácoras</span>
        </div>
        <input type="text" placeholder="Buscar..." className="bitacoras-search" />
        <table className="bitacoras-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Sesión</th>
              <th>Habilidad/Área</th>
              <th>Estado</th>
              <th>Descargar</th>
            </tr>
          </thead>
          <tbody>
            {bitacoras.map((bitacora, index) => (
              <tr key={index}>
                <td>{bitacora.nombre}</td>
                <td>{bitacora.horaInicio}</td>
                <td>{bitacora.sesion}</td>
                <td>{bitacora.habilidadArea}</td>
                <td>{bitacora.firmaElectronica ? 'Firmada' : 'Pendiente de firma'}</td>
                <td><button className="bitacoras-button" onClick={() => handleDownload(bitacora)}>Descargar</button></td>
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
