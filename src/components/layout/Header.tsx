import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t, i18n } = useTranslation()

  const menuItems = [
    { label: t('nav.welcome'), href: '#hero' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' }
  ]

  // Sistema de modo oscuro automático
  useEffect(() => {
    // Verifica si el usuario tiene preferencia guardada
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      // Si no hay preferencia, usa la del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', prefersDark)
    }

    // Escucha cambios en las preferencias del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark', e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId.slice(1))
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setIsOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              smoothScrollTo('#hero')
            }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
            whileHover={{ scale: 1.05 }}
          >
            Felipe.
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo(item.href)
                }}
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}

            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <motion.div
                className="flex items-center space-x-1 p-1 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                <motion.button
                  onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
                  className={`px-2 py-1 rounded-full transition-all ${
                    i18n.language === 'es' 
                      ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ES
                </motion.button>
                <motion.button
                  onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
                  className={`px-2 py-1 rounded-full transition-all ${
                    i18n.language === 'en'
                      ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EN
                </motion.button>
              </motion.div>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={() => {
                  const isDark = document.documentElement.classList.toggle('dark')
                  localStorage.setItem('theme', isDark ? 'dark' : 'light')
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Toggle dark mode</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    className="hidden dark:block"
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                  <path
                    className="block dark:hidden"
                    fillRule="evenodd"
                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Dark Mode Toggle Mobile */}
            <motion.button
              onClick={() => {
                const isDark = document.documentElement.classList.toggle('dark')
                localStorage.setItem('theme', isDark ? 'dark' : 'light')
              }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Toggle dark mode</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 dark:text-gray-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  className="hidden dark:block"
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
                <path
                  className="block dark:hidden"
                  fillRule="evenodd"
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>

            {/* Mobile Language Toggle */}
            <motion.div
              className="flex items-center space-x-1 p-1 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              <motion.button
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
                className={`px-2 py-1 rounded-full transition-all ${
                  i18n.language === 'es' 
                    ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ES
              </motion.button>
              <motion.button
                onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
                className={`px-2 py-1 rounded-full transition-all ${
                  i18n.language === 'en'
                    ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EN
              </motion.button>
            </motion.div>

            {/* Menu Button */}
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Menu</span>
              <div className="w-6 h-6 flex items-center justify-center">
                <span className={`transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5' : ''
                } block absolute h-0.5 w-6 bg-current`}></span>
                <span className={`transition-opacity duration-300 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                } block absolute h-0.5 w-6 bg-current`}></span>
                <span className={`transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                } block absolute h-0.5 w-6 bg-current`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 pb-3 space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo(item.href)
                }}
                className="block text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>
    </header>
  )
}

export default Header 