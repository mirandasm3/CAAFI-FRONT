import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

export default function VisitsReports() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [visitsCount, setVisitsCount] = useState(0);

    const fetchReportData = async (startDate, endDate) => {
        try {
            const response = await fetch(`http://your-api-url/reports/visits?startDate=${startDate}&endDate=${endDate}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setVisitsCount(data.visitsCount);
            return data.visitsCount;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return 0;
        }
    };

    const generatePDF = async () => {
        const visitsCount = await fetchReportData(startDate, endDate);

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();

        page.drawText('Reporte de Visitas', {
            x: 50,
            y: height - 50,
            size: 20,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Fecha Inicio: ${startDate}`, {
            x: 50,
            y: height - 80,
            size: 15,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Fecha Fin: ${endDate}`, {
            x: 50,
            y: height - 110,
            size: 15,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Conteo de Visitas: ${visitsCount}`, {
            x: 50,
            y: height - 140,
            size: 15,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'reporte_visitas.pdf';
        link.click();
    };

    return (
        <div>
            <div>
                <label>Fecha Inicio:</label>
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                />
            </div>
            <div>
                <label>Fecha Fin:</label>
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                />
            </div>
            <div>
                <label>Conteo de Visitas:</label>
                <input 
                    type="number" 
                    value={visitsCount} 
                    onChange={(e) => setVisitsCount(parseInt(e.target.value, 10))} 
                    readOnly
                />
            </div>
            <button onClick={generatePDF}>Descargar reporte</button>
        </div>
    );
}