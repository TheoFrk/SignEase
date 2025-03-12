const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Token aus dem Authorization-Header extrahieren
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Keine Authentifizierung bereitgestellt'
      });
    }
    
    // In einer echten Anwendung: Token verifizieren
    // Für diesen Prototyp: Statische User-ID verwenden
    
    // JWT verififzieren (würde in einer echten App mit dem JWT_SECRET überprüft werden)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Benutzer zur Anfrage hinzufügen
    req.user = {
      id: 'user123',
      name: 'Max Mustermann',
      email: 'user@example.com'
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Ungültiger Token'
    });
  }
};
