const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const signatureController = require('../controllers/signature');
const authMiddleware = require('../middleware/auth');

// Signaturanfrage erstellen
router.post(
  '/',
  authMiddleware,
  [
    body('documentId').notEmpty().withMessage('Dokument-ID ist erforderlich'),
    body('recipients').isArray().withMessage('Empfänger müssen als Array angegeben werden'),
    body('recipients.*.email').isEmail().withMessage('Bitte geben Sie gültige E-Mail-Adressen ein'),
    body('recipients.*.name').notEmpty().withMessage('Name ist erforderlich'),
    body('recipients.*.role').isIn(['Unterzeichner', 'Kopie', 'Prüfer']).withMessage('Ungültige Rolle'),
    body('signatureFields').optional().isArray(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  signatureController.createSignatureRequest
);

// Signaturanfragen eines Benutzers abrufen
router.get('/', authMiddleware, signatureController.getSignatureRequests);

// Eine bestimmte Signaturanfrage abrufen
router.get('/:id', authMiddleware, param('id').notEmpty(), signatureController.getSignatureRequestById);

// Dokument signieren
router.post(
  '/:id/sign',
  [
    param('id').notEmpty().withMessage('Signaturanfrage-ID ist erforderlich'),
    body('signature').notEmpty().withMessage('Signatur ist erforderlich'),
    body('token').notEmpty().withMessage('Token ist erforderlich'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  signatureController.signDocument
);

// Signaturanfrage ablehnen
router.post(
  '/:id/decline',
  [
    param('id').notEmpty().withMessage('Signaturanfrage-ID ist erforderlich'),
    body('reason').optional(),
    body('token').notEmpty().withMessage('Token ist erforderlich'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  signatureController.declineSignatureRequest
);

// Signaturanfrage löschen
router.delete('/:id', authMiddleware, param('id').notEmpty(), signatureController.deleteSignatureRequest);

module.exports = router;
