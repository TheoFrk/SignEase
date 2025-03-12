const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

// Benutzerprofil abrufen
router.get('/profile', authMiddleware, userController.getProfile);

// Benutzerprofil aktualisieren
router.put(
  '/profile',
  authMiddleware,
  [
    body('name').optional(),
    body('email').optional().isEmail().withMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
    body('phone').optional(),
    body('company').optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.updateProfile
);

// Passwort ändern
router.put(
  '/password',
  authMiddleware,
  [
    body('currentPassword').notEmpty().withMessage('Aktuelles Passwort ist erforderlich'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('Das neue Passwort muss mindestens 8 Zeichen lang sein')
      .matches(/\d/)
      .withMessage('Das neue Passwort muss mindestens eine Zahl enthalten'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.changePassword
);

// Kontakte des Benutzers abrufen
router.get('/contacts', authMiddleware, userController.getContacts);

// Neuen Kontakt hinzufügen
router.post(
  '/contacts',
  authMiddleware,
  [
    body('name').notEmpty().withMessage('Name ist erforderlich'),
    body('email').isEmail().withMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
    body('company').optional(),
    body('phone').optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.addContact
);

// Kontakt aktualisieren
router.put(
  '/contacts/:id',
  authMiddleware,
  [
    body('name').optional(),
    body('email').optional().isEmail().withMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
    body('company').optional(),
    body('phone').optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.updateContact
);

// Kontakt löschen
router.delete('/contacts/:id', authMiddleware, userController.deleteContact);

module.exports = router;
