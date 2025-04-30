import { handleContactForm } from './contact';

// Este archivo sirve como punto central para las funciones de API
// En un entorno serverless, cada función puede mapearse a un endpoint

export const api = {
  contact: {
    sendMessage: handleContactForm
  }
}

// En un entorno Next.js o similar, se pueden implementar las rutas API en /pages/api/
// o usando los nuevos App Router handlers 