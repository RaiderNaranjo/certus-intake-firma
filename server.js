const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, 'public')));

// CORS para requests cross-origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'Certus Intake & Firma',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz - sirve intake.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'intake.html'));
});

// Ruta para descargar firma
app.get('/firma', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'FIRMA_DE_CORREO_CERTUS.png'));
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'No encontrado' });
});

app.listen(PORT, () => {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🚀 CERTUS INTAKE & FIRMA`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`📄 Intake: http://localhost:${PORT}`);
  console.log(`🖼️  Firma: http://localhost:${PORT}/firma`);
  console.log(`${'═'.repeat(60)}\n`);
});