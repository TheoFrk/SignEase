const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/auth');

// Anmeldung
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
    body('password').notEmpty().withMessage('Passwort ist erforderlich'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.login
);

// Registrierung
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name ist erforderlich'),
    body('email').isEmail().withMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Das Passwort muss mindestens 8 Zeichen lang sein')
      .matches(/\d/)
      .withMessage('Das Passwort muss mindestens eine Zahl enthalten'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.register
);

// Passwort vergessen
router.post(
  '/forgot-password',
  [
    body('email').isEmail().withMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.forgotPassword
);

// Passwort zurücksetzen
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Token ist erforderlich'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Das Passwort muss mindestens 8 Zeichen lang sein')
      .matches(/\d/)
      .withMessage('Das Passwort muss mindestens eine Zahl enthalten'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.resetPassword
);

module.exports = router;
