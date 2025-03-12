import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignatureWorkflow from './pages/SignatureWorkflow';
import DocumentViewer from './pages/DocumentViewer';
import Login from './pages/Login';

function App() {
  // Für die Demo überspringen wir die Authentifizierungsprüfung
  // In einer echten App würde hier geprüft werden, ob der Benutzer angemeldet ist
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/signature" element={<SignatureWorkflow />} />
        <Route path="/document/:id" element={<DocumentViewer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;