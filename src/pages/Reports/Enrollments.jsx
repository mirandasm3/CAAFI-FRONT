import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import "../../styles/reports.css";

export default function EnrollmentReports() {
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [periods, setPeriods] = useState([]);
    const [enrollmentsCount, setEnrollmentsCount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPeriods();
    }, []);

    const fetchPeriods = async () => {
        try {
            const response = await fetch('https://8kzxktht-3000.usw3.devtunnels.ms/utils/periodo');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setPeriods(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const fetchReportData = async (period) => {
        try {
            const response = await fetch(`https://8kzxktht-3000.usw3.devtunnels.ms/reporte`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEnrollmentsCount(data.enrollmentsCount);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const generatePDF = async () => {
        const enrollmentsCount = await fetchReportData(selectedPeriod);

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();

        page.drawText('Reporte de Inscripciones', {
            x: 50,
            y: height - 50,
            size: 20,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Periodo Escolar: ${selectedPeriod}`, {
            x: 50,
            y: height - 80,
            size: 15,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Conteo de Inscripciones: ${enrollmentsCount}`, {
            x: 50,
            y: height - 110,
            size: 15,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'reporte_inscripciones.pdf';
        link.click();
    };

    const handleConsultClick = () => {
        if (!selectedPeriod) {
            setError('Por favor, selecciona un periodo escolar.');
            return;
        }
        setError('');
        fetchReportData(selectedPeriod);
    };

    return (
        <div>
            <div className="report-container">
                <div className="inline-container">
                    <label>Periodo Escolar:</label>
                    <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                        <option value="">Selecciona un periodo</option>
                        {periods.map((period) => (
                            <option key={period.identificador} value={period.identificador}>
                                {period.identificador}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleConsultClick} className="consult-button">Consultar</button>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div>
                    <label>Conteo de Inscripciones:</label>
                    <input 
                        type="number" 
                        value={enrollmentsCount} 
                        readOnly 
                    />
                </div>
                <div className="footer">
                    <button onClick={() => window.history.back()} className="cancel-button">Cancelar</button>
                    <button onClick={generatePDF} className="download-button">Descargar reporte</button>
                </div>
            </div>
        </div>
    );
}
