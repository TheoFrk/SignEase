// In einer echten Anwendung würde hier der E-Mail-Versand implementiert werden
// Für diesen Prototyp nur eine Konsolen-Ausgabe

exports.sendEmail = async (to, subject, html) => {
  console.log(`E-Mail würde gesendet werden an: ${to}`);
  console.log(`Betreff: ${subject}`);
  console.log(`Inhalt: ${html}`);
  
  return true;
};
