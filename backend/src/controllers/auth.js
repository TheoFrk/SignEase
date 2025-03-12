const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');
const { sendEmail } = require('../services/email');

// Hilfsfunktion zum Erstellen eines JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Anmeldung
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // In einer echten Anwendung: Benutzer aus der Datenbank abrufen
    // Für diesen Prototyp: Statische Anmeldedaten
    if (email === 'user@example.com' && password === 'password123') {
      const token = generateToken('user123');
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: 'user123',
          name: 'Max Mustermann',
          email: 'user@example.com',
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Ungültige E-Mail oder Passwort',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler',
    });
  }
};

// Registrierung
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // In einer echten Anwendung: Benutzer in der Datenbank anlegen
    // Für diesen Prototyp: Erfolgreiche Registrierung simulieren
    const userId = 'user' + Date.now();
    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      message: 'Registrierung erfolgreich',
      token,
      user: {
        id: userId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler',
    });
  }
};

// Passwort vergessen
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // In einer echten Anwendung: Benutzer in der Datenbank suchen und Token erstellen
    // Für diesen Prototyp: Erfolgreiche Anfrage simulieren
    
    // Token generieren
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetUrl = `https://example.com/reset-password?token=${resetToken}`;

    // E-Mail mit Passwort-Reset-Link senden (simuliert)
    console.log(`Passwort-Reset-Link würde an ${email} gesendet werden: ${resetUrl}`);

    res.status(200).json({
      success: true,
      message: 'Passwort-Reset-Link wurde an Ihre E-Mail-Adresse gesendet',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler',
    });
  }
};

// Passwort zurücksetzen
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // In einer echten Anwendung: Token überprüfen und Passwort in der Datenbank aktualisieren
    // Für diesen Prototyp: Erfolgreiche Passwortänderung simulieren
    
    res.status(200).json({
      success: true,
      message: 'Passwort wurde erfolgreich zurückgesetzt',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler',
    });
  }
};
