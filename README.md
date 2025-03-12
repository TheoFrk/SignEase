# SignEase - Digitale Signaturlösung

SignEase ist eine benutzerfreundliche, rechtssichere und effiziente digitale Signaturlösung, die es Unternehmen und Privatpersonen ermöglicht, Dokumente schnell und papierlos zu unterzeichnen.

## Features

- **Digitale Unterschriften**: Erstellung, Versand und rechtssichere Speicherung elektronischer Unterschriften
- **Dokumentenmanagement**: Übersichtliche Verwaltung aller signierten Dokumente mit Suchfunktion
- **Identitätsprüfung**: Authentifizierung über E-Mail, SMS, Zwei-Faktor-Authentifizierung (2FA)
- **Automatisierte Workflows**: Anpassbare Signaturabläufe für mehrere Beteiligte mit Benachrichtigungen
- **Integrationen**: Schnittstellen zu gängigen Cloud-Anbietern und CRM/ERP-Systemen

## Technologie-Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js mit Express
- JWT für Authentifizierung
- Multer für Datei-Uploads

### Infrastruktur
- Docker & Docker Compose
- MongoDB (vorbereitet für zukünftige Implementierung)

## Erste Schritte

### Voraussetzungen
- Node.js (v16+)
- npm
- Docker & Docker Compose (für Containerisierung)

### Installation und Start

1. Repository klonen
```
git clone https://github.com/yourusername/signease.git
cd signease
```

2. Mit Docker starten (empfohlen)
```
./start.sh
```

3. Oder manuell starten

Frontend:
```
cd frontend
npm install
npm start
```

Backend:
```
cd backend
npm install
npm run dev
```

4. Anwendung im Browser öffnen:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/api

### Demo-Anmeldedaten

- E-Mail: user@example.com
- Passwort: password123

## Projektstruktur

```
signease/
├── frontend/             # React Frontend
│   ├── public/           # Statische Dateien
│   └── src/              # Quellcode
│       ├── components/   # UI-Komponenten
│       ├── pages/        # Seiten/Views
│       ├── contexts/     # React Contexts
│       └── hooks/        # Custom Hooks
│
├── backend/              # Node.js Backend
│   └── src/              # Quellcode
│       ├── controllers/  # API Controller
│       ├── models/       # Datenmodelle
│       ├── routes/       # API-Routen
│       ├── middleware/   # Middlewares
│       └── services/     # Geschäftslogik
│
├── uploads/              # Hochgeladene Dateien
└── docker-compose.yml    # Docker-Konfiguration
```

## Lizenz

Dieses Projekt ist urheberrechtlich geschützt.
