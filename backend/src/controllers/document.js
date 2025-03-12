// Beispiel-Dokumente für Demo-Zwecke
const documents = [
  {
    id: 1,
    title: 'Vertrag_2025-03-01.pdf',
    filename: 'Vertrag_2025-03-01.pdf',
    status: 'Warten auf Signatur',
    createdAt: '2025-03-01T10:25:00Z',
    updatedAt: '2025-03-01T10:25:00Z',
    signers: [
      { id: 1, name: 'Max Mustermann', email: 'max@example.com', status: 'signed' },
      { id: 2, name: 'Anna Schmidt', email: 'anna@example.com', status: 'pending' }
    ]
  },
  {
    id: 2,
    title: 'Angebot_Software_XYZ.pdf',
    filename: 'Angebot_Software_XYZ.pdf',
    status: 'Signiert',
    createdAt: '2025-02-25T14:30:00Z',
    updatedAt: '2025-03-05T09:15:00Z',
    signers: [
      { id: 1, name: 'Max Mustermann', email: 'max@example.com', status: 'signed' },
      { id: 3, name: 'Thomas Weber', email: 'thomas@example.com', status: 'signed' }
    ]
  },
  {
    id: 3,
    title: 'NDA_Projekt_Alpha.pdf',
    filename: 'NDA_Projekt_Alpha.pdf',
    status: 'Abgeschlossen',
    createdAt: '2025-02-20T11:45:00Z',
    updatedAt: '2025-02-28T16:20:00Z',
    signers: [
      { id: 1, name: 'Max Mustermann', email: 'max@example.com', status: 'signed' },
      { id: 3, name: 'Thomas Weber', email: 'thomas@example.com', status: 'signed' },
      { id: 4, name: 'Laura Meyer', email: 'laura@example.com', status: 'signed' }
    ]
  }
];

// Alle Dokumente eines Benutzers abrufen
exports.getAllDocuments = async (req, res) => {
  try {
    // In einer echten Anwendung: Dokumente aus der Datenbank abrufen
    // Für diesen Prototyp: Statische Daten zurückgeben
    
    res.status(200).json({
      success: true,
      data: documents
    });
  } catch (error) {
    console.error('Get all documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Ein bestimmtes Dokument abrufen
exports.getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // In einer echten Anwendung: Dokument aus der Datenbank abrufen
    // Für diesen Prototyp: Dokument aus Array suchen
    const document = documents.find(doc => doc.id === parseInt(id));
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Dokument nicht gefunden'
      });
    }
    
    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Get document by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Neues Dokument hochladen
exports.uploadDocument = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;
    
    // In einer echten Anwendung: Dokument in der Datenbank speichern
    // Für diesen Prototyp: Erfolgreichen Upload simulieren
    const newDocument = {
      id: documents.length + 1,
      title,
      filename: file.filename,
      status: 'Entwurf',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      signers: []
    };
    
    // Dokument zum Array hinzufügen (nur für Demo)
    documents.push(newDocument);
    
    res.status(201).json({
      success: true,
      message: 'Dokument erfolgreich hochgeladen',
      data: newDocument
    });
  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Dokument aktualisieren
exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // In einer echten Anwendung: Dokument in der Datenbank aktualisieren
    // Für diesen Prototyp: Dokument im Array aktualisieren
    const documentIndex = documents.findIndex(doc => doc.id === parseInt(id));
    
    if (documentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Dokument nicht gefunden'
      });
    }
    
    const updatedDocument = {
      ...documents[documentIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    documents[documentIndex] = updatedDocument;
    
    res.status(200).json({
      success: true,
      message: 'Dokument erfolgreich aktualisiert',
      data: updatedDocument
    });
  } catch (error) {
    console.error('Update document error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Dokument löschen
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    
    // In einer echten Anwendung: Dokument aus der Datenbank löschen
    // Für diesen Prototyp: Dokument aus Array entfernen
    const documentIndex = documents.findIndex(doc => doc.id === parseInt(id));
    
    if (documentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Dokument nicht gefunden'
      });
    }
    
    documents.splice(documentIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Dokument erfolgreich gelöscht'
    });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};
