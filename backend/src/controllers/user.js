// Beispiel-Benutzer für Demo-Zwecke
const user = {
  id: 'user123',
  name: 'Max Mustermann',
  email: 'user@example.com',
  phone: '+49123456789',
  company: 'Musterfirma GmbH',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z'
};

// Beispiel-Kontakte für Demo-Zwecke
const contacts = [
  {
    id: 1,
    name: 'Anna Schmidt',
    email: 'anna.schmidt@example.com',
    phone: '+49987654321',
    company: 'Kunde AG',
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 2,
    name: 'Thomas Weber',
    email: 'thomas.weber@example.com',
    phone: '+49123123123',
    company: 'Partner GmbH',
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2025-02-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Laura Meyer',
    email: 'laura.meyer@example.com',
    phone: '+49321321321',
    company: 'Kunde AG',
    createdAt: '2025-02-15T00:00:00Z',
    updatedAt: '2025-02-15T00:00:00Z'
  }
];

// Benutzerprofil abrufen
exports.getProfile = async (req, res) => {
  try {
    // In einer echten Anwendung: Benutzerprofil aus der Datenbank abrufen
    // Für diesen Prototyp: Statische Daten zurückgeben
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Benutzerprofil aktualisieren
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    
    // In einer echten Anwendung: Benutzerprofil in der Datenbank aktualisieren
    // Für diesen Prototyp: Erfolgreiche Aktualisierung simulieren
    
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Benutzer aktualisieren (nur für Demo)
    Object.assign(user, updatedUser);
    
    res.status(200).json({
      success: true,
      message: 'Profil erfolgreich aktualisiert',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Passwort ändern
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // In einer echten Anwendung: Passwort überprüfen und in der Datenbank aktualisieren
    // Für diesen Prototyp: Erfolgreiche Passwortänderung simulieren
    
    if (currentPassword === 'password123') {
      res.status(200).json({
        success: true,
        message: 'Passwort erfolgreich geändert'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Aktuelles Passwort ist falsch'
      });
    }
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Kontakte des Benutzers abrufen
exports.getContacts = async (req, res) => {
  try {
    // In einer echten Anwendung: Kontakte aus der Datenbank abrufen
    // Für diesen Prototyp: Statische Daten zurückgeben
    
    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Neuen Kontakt hinzufügen
exports.addContact = async (req, res) => {
  try {
    const { name, email, company, phone } = req.body;
    
    // In einer echten Anwendung: Kontakt in der Datenbank speichern
    // Für diesen Prototyp: Erfolgreiche Erstellung simulieren
    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      company,
      phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Kontakt zum Array hinzufügen (nur für Demo)
    contacts.push(newContact);
    
    res.status(201).json({
      success: true,
      message: 'Kontakt erfolgreich hinzugefügt',
      data: newContact
    });
  } catch (error) {
    console.error('Add contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Kontakt aktualisieren
exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // In einer echten Anwendung: Kontakt in der Datenbank aktualisieren
    // Für diesen Prototyp: Kontakt im Array aktualisieren
    const contactIndex = contacts.findIndex(contact => contact.id === parseInt(id));
    
    if (contactIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Kontakt nicht gefunden'
      });
    }
    
    const updatedContact = {
      ...contacts[contactIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    contacts[contactIndex] = updatedContact;
    
    res.status(200).json({
      success: true,
      message: 'Kontakt erfolgreich aktualisiert',
      data: updatedContact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Kontakt löschen
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    // In einer echten Anwendung: Kontakt aus der Datenbank löschen
    // Für diesen Prototyp: Kontakt aus Array entfernen
    const contactIndex = contacts.findIndex(contact => contact.id === parseInt(id));
    
    if (contactIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Kontakt nicht gefunden'
      });
    }
    
    contacts.splice(contactIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Kontakt erfolgreich gelöscht'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};
