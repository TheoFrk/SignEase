const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const documentController = require('../controllers/document');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer-Konfiguration für Datei-Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Ungültiger Dateityp. Erlaubt sind: PDF, DOCX, JPG, PNG'));
    }
  },
});

// Alle Dokumente eines Benutzers abrufen
router.get('/', authMiddleware, documentController.getAllDocuments);

// Ein bestimmtes Dokument abrufen
router.get('/:id', authMiddleware, param('id').notEmpty(), documentController.getDocumentById);

// Neues Dokument hochladen
router.post(
  '/',
  authMiddleware,
  upload.single('document'),
  [body('title').notEmpty().withMessage('Titel ist erforderlich')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Keine Datei hochgeladen' });
    }
    next();
  },
  documentController.uploadDocument
);

// Dokument aktualisieren
router.put(
  '/:id',
  authMiddleware,
  param('id').notEmpty(),
  [body('title').optional()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  documentController.updateDocument
);

// Dokument löschen
router.delete('/:id', authMiddleware, param('id').notEmpty(), documentController.deleteDocument);

module.exports = router;
