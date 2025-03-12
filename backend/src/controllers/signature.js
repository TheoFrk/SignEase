// Beispiel-Signaturanfragen für Demo-Zwecke
const signatureRequests = [
  {
    id: 1,
    documentId: 1,
    status: 'pending',
    createdAt: '2025-03-01T10:30:00Z',
    updatedAt: '2025-03-01T10:30:00Z',
    createdBy: 'user123',
    recipients: [
      { id: 1, name: 'Max Mustermann', email: 'max@example.com', role: 'Unterzeichner', status: 'signed', signedAt: '2025-03-01T10:32:00Z' },
      { id: 2, name: 'Anna Schmidt', email: 'anna@example.com', role: 'Unterzeichner', status: 'pending' }
    ],
    signatureFields: [
      { id: 1, recipientId: 1, type: 'signature', page: 3, x: 100, y: 500, width: 200, height: 50 },
      { id: 2, recipientId: 2, type: 'signature', page: 3, x: 400, y: 500, width: 200, height: 50 }
    ]
  }
];

// Signaturanfrage erstellen
exports.createSignatureRequest = async (req, res) => {
  try {
    const { documentId, recipients, signatureFields, message } = req.body;
    
    // In einer echten Anwendung: Signaturanfrage in der Datenbank speichern
    // Für diesen Prototyp: Erfolgreiche Erstellung simulieren
    const newSignatureRequest = {
      id: signatureRequests.length + 1,
      documentId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: req.user.id,  // In einer echten App: User-ID aus JWT
      recipients: recipients.map((recipient, index) => ({
        id: index + 1,
        ...recipient,
        status: 'pending'
      })),
      signatureFields: signatureFields || [],
      message
    };
    
    // Signaturanfrage zum Array hinzufügen (nur für Demo)
    signatureRequests.push(newSignatureRequest);
    
    // In einer echten Anwendung: E-Mail-Benachrichtigungen an Empfänger senden
    
    res.status(201).json({
      success: true,
      message: 'Signaturanfrage erfolgreich erstellt',
      data: newSignatureRequest
    });
  } catch (error) {
    console.error('Create signature request error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Signaturanfragen eines Benutzers abrufen
exports.getSignatureRequests = async (req, res) => {
  try {
    // In einer echten Anwendung: Signaturanfragen aus der Datenbank abrufen
    // Für diesen Prototyp: Statische Daten zurückgeben
    
    res.status(200).json({
      success: true,
      data: signatureRequests
    });
  } catch (error) {
    console.error('Get signature requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Eine bestimmte Signaturanfrage abrufen
exports.getSignatureRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // In einer echten Anwendung: Signaturanfrage aus der Datenbank abrufen
    // Für diesen Prototyp: Signaturanfrage aus Array suchen
    const signatureRequest = signatureRequests.find(req => req.id === parseInt(id));
    
    if (!signatureRequest) {
      return res.status(404).json({
        success: false,
        message: 'Signaturanfrage nicht gefunden'
      });
    }
    
    res.status(200).json({
      success: true,
      data: signatureRequest
    });
  } catch (error) {
    console.error('Get signature request by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Dokument signieren
exports.signDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { signature, token } = req.body;
    
    // In einer echten Anwendung: Token überprüfen und Signatur in der Datenbank speichern
    // Für diesen Prototyp: Erfolgreiche Signierung simulieren
    
    // Signaturanfrage finden
    const signatureRequestIndex = signatureRequests.findIndex(req => req.id === parseInt(id));
    
    if (signatureRequestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Signaturanfrage nicht gefunden'
      });
    }
    
    // Beispielhafter Empfänger (in echter App: Empfänger basierend auf Token ermitteln)
    const recipientIndex = signatureRequests[signatureRequestIndex].recipients.findIndex(
      recipient => recipient.status === 'pending'
    );
    
    if (recipientIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'Keine ausstehenden Empfänger für diese Signaturanfrage gefunden'
      });
    }
    
    // Empfänger als 'signiert' markieren
    signatureRequests[signatureRequestIndex].recipients[recipientIndex].status = 'signed';
    signatureRequests[signatureRequestIndex].recipients[recipientIndex].signedAt = new Date().toISOString();
    
    // Prüfen, ob alle Empfänger signiert haben
    const allSigned = signatureRequests[signatureRequestIndex].recipients.every(
      recipient => recipient.status === 'signed'
    );
    
    if (allSigned) {
      signatureRequests[signatureRequestIndex].status = 'completed';
    }
    
    signatureRequests[signatureRequestIndex].updatedAt = new Date().toISOString();
    
    res.status(200).json({
      success: true,
      message: 'Dokument erfolgreich signiert',
      data: signatureRequests[signatureRequestIndex]
    });
  } catch (error) {
    console.error('Sign document error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Signaturanfrage ablehnen
exports.declineSignatureRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, token } = req.body;
    
    // In einer echten Anwendung: Token überprüfen und Ablehnung in der Datenbank speichern
    // Für diesen Prototyp: Erfolgreiche Ablehnung simulieren
    
    // Signaturanfrage finden
    const signatureRequestIndex = signatureRequests.findIndex(req => req.id === parseInt(id));
    
    if (signatureRequestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Signaturanfrage nicht gefunden'
      });
    }
    
    // Beispielhafter Empfänger (in echter App: Empfänger basierend auf Token ermitteln)
    const recipientIndex = signatureRequests[signatureRequestIndex].recipients.findIndex(
      recipient => recipient.status === 'pending'
    );
    
    if (recipientIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'Keine ausstehenden Empfänger für diese Signaturanfrage gefunden'
      });
    }
    
    // Empfänger als 'abgelehnt' markieren
    signatureRequests[signatureRequestIndex].recipients[recipientIndex].status = 'declined';
    signatureRequests[signatureRequestIndex].recipients[recipientIndex].declinedAt = new Date().toISOString();
    signatureRequests[signatureRequestIndex].recipients[recipientIndex].declineReason = reason;
    
    // Signaturanfrage als abgelehnt markieren
    signatureRequests[signatureRequestIndex].status = 'declined';
    signatureRequests[signatureRequestIndex].updatedAt = new Date().toISOString();
    
    res.status(200).json({
      success: true,
      message: 'Signaturanfrage erfolgreich abgelehnt',
      data: signatureRequests[signatureRequestIndex]
    });
  } catch (error) {
    console.error('Decline signature request error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};

// Signaturanfrage löschen
exports.deleteSignatureRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    // In einer echten Anwendung: Signaturanfrage aus der Datenbank löschen
    // Für diesen Prototyp: Signaturanfrage aus Array entfernen
    const signatureRequestIndex = signatureRequests.findIndex(req => req.id === parseInt(id));
    
    if (signatureRequestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Signaturanfrage nicht gefunden'
      });
    }
    
    signatureRequests.splice(signatureRequestIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Signaturanfrage erfolgreich gelöscht'
    });
  } catch (error) {
    console.error('Delete signature request error:', error);
    res.status(500).json({
      success: false,
      message: 'Interner Serverfehler'
    });
  }
};
