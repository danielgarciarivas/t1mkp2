import React, { useState } from 'react';
import './Reporteria.css';

const Reporteria = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const reportTypes = [
    { id: 'ventas', label: 'Reporte de Ventas', icon: '📊' },
    { id: 'productos', label: 'Reporte de Productos', icon: '📦' },
    { id: 'sellers', label: 'Reporte de Sellers', icon: '🏪' },
    { id: 'comisiones', label: 'Reporte de Comisiones', icon: '💰' },
    { id: 'inventario', label: 'Reporte de Inventario', icon: '📋' }
  ];

  const handleGenerateReport = () => {
    if (!selectedReport) {
      alert('Por favor selecciona un tipo de reporte');
      return;
    }
    console.log('Generando reporte:', selectedReport, dateRange);
  };

  const handleExportReport = (format) => {
    console.log(`Exportando reporte en formato ${format}`);
  };

  return (
    <div className="reporteria">
      <div className="reporteria-header">
        <h1>📈 Reportería</h1>
        <p>Genera y exporta reportes personalizados</p>
      </div>

      <div className="reporteria-content">
        <div className="report-selection">
          <h2>Seleccionar Tipo de Reporte</h2>
          <div className="report-types">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className={`report-type ${selectedReport === report.id ? 'selected' : ''}`}
                onClick={() => setSelectedReport(report.id)}
              >
                <span className="report-icon">{report.icon}</span>
                <span className="report-label">{report.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="report-filters">
          <h2>Filtros</h2>
          <div className="date-range">
            <div className="date-input">
              <label>Fecha Inicio:</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              />
            </div>
            <div className="date-input">
              <label>Fecha Fin:</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="report-actions">
          <button 
            className="btn-generate" 
            onClick={handleGenerateReport}
            disabled={!selectedReport}
          >
            Generar Reporte
          </button>
          
          <div className="export-options">
            <h3>Exportar como:</h3>
            <button 
              className="btn-export" 
              onClick={() => handleExportReport('pdf')}
              disabled={!selectedReport}
            >
              📄 PDF
            </button>
            <button 
              className="btn-export" 
              onClick={() => handleExportReport('excel')}
              disabled={!selectedReport}
            >
              📊 Excel
            </button>
            <button 
              className="btn-export" 
              onClick={() => handleExportReport('csv')}
              disabled={!selectedReport}
            >
              📋 CSV
            </button>
          </div>
        </div>

        {selectedReport && (
          <div className="report-preview">
            <h2>Vista Previa - {reportTypes.find(r => r.id === selectedReport)?.label}</h2>
            <div className="preview-placeholder">
              <p>📊 Aquí se mostrará la vista previa del reporte seleccionado</p>
              <div className="sample-data">
                <table>
                  <thead>
                    <tr>
                      <th>Elemento</th>
                      <th>Cantidad</th>
                      <th>Valor</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ejemplo 1</td>
                      <td>100</td>
                      <td>$1,500.00</td>
                      <td>2024-01-15</td>
                    </tr>
                    <tr>
                      <td>Ejemplo 2</td>
                      <td>75</td>
                      <td>$950.00</td>
                      <td>2024-01-16</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reporteria;