require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import der Routen
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/document');
const signatureRoutes = require('./routes/signature');
const userRoutes = require('./routes/user');

// Express-App initialisieren
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet()); // Sicherheits-Header
app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); // JSON-Parser
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging

// Uploads-Verzeichnis
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate Limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 Minuten
  max: process.env.RATE_LIMIT_MAX || 100, // max 100 Anfragen pro IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// API-Routen
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/signatures', signatureRoutes);
app.use('/api/users', userRoutes);

// 404-Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route nicht gefunden' });
});

// Fehler-Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Interner Serverfehler',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

module.exports = app; // Für Tests
