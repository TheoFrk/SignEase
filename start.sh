#!/bin/bash

# SignEase Starter Script

echo "SignEase Anwendung wird gestartet..."

# Prüfen ob Docker installiert ist
if ! command -v docker &> /dev/null; then
    echo "Docker ist nicht installiert. Bitte installieren Sie Docker und versuchen Sie es erneut."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose ist nicht installiert. Bitte installieren Sie Docker Compose und versuchen Sie es erneut."
    exit 1
fi

# Container starten
docker-compose up -d

echo ""
echo "SignEase ist gestartet!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:4000/api"
echo ""
echo "Zum Beenden: docker-compose down"
