import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslations from './locales/en.json'
import esTranslations from './locales/es.json'
import techDialogsEs from './locales/tech-dialogs-es.json'
import techDialogsEn from './locales/tech-dialogs-en.json'
import projectsEs from './locales/projects-es.json'
import projectsEn from './locales/projects-en.json'

// Combinar los diálogos con las traducciones principales
const resources = {
  en: {
    translation: {
      ...enTranslations,
      technologies: {
        ...enTranslations.technologies,
        ...techDialogsEn.technologies
      },
      projectDetails: {
        ...projectsEn
      }
    },
  },
  es: {
    translation: {
      ...esTranslations,
      technologies: {
        ...esTranslations.technologies,
        ...techDialogsEs.technologies
      },
      projectDetails: {
        ...projectsEs
      }
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'es', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n 