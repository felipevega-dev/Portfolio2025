import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { GB, ES } from 'country-flag-icons/react/3x2'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'en', name: 'English', flag: GB },
    { code: 'es', name: 'Español', flag: ES },
  ]

  const handleLanguageChange = (langCode: string) => {
    // Siempre cambia al otro idioma
    const newLang = i18n.language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(newLang)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm p-1 rounded-full">
        {languages.map(({ code, name, flag: Flag }) => (
          <AnimatePresence key={code} mode="wait">
            <motion.button
              onClick={() => handleLanguageChange(code)}
              className={`relative p-2 rounded-full transition-colors ${
                i18n.language === code 
                  ? 'text-primary-foreground' 
                  : 'hover:text-primary-foreground'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Flag className="w-6 h-6" title={name} />
              {i18n.language === code && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  layoutId="activeLanguage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          </AnimatePresence>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector 