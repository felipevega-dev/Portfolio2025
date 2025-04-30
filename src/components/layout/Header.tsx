import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme, useLanguage } from '../../context'
import { Link } from 'react-router-dom'
import { useSoundContext } from '../../context/SoundContext'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useTranslation()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { currentLanguage, changeLanguage } = useLanguage()
  const { play } = useSoundContext()

  // Detectar scroll para cambiar la apariencia del header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Añadir evento de scroll
    window.addEventListener('scroll', handleScroll)
    
    // Limpieza del evento al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const menuItems = [
    { label: t('nav.welcome'), href: '#hero' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('technologies.title'), href: '#technologies' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' }
  ]

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (!element) return

    const header = document.querySelector('header')
    const headerHeight = header?.offsetHeight || 0
    
    // Añadir un pequeño offset para no quedar exactamente al borde del elemento
    const scrollOffset = 20
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerHeight - scrollOffset

    // Usar animación más suave
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  const handleMobileMenuClick = (elementId: string) => {
    play()
    setIsOpen(false)
    setTimeout(() => smoothScrollTo(elementId), 300)
  }

  const toggleMenu = () => {
    play()
    setIsOpen(prev => !prev)
  }

  const closeMenu = () => {
    play()
    setIsOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm py-2' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4'
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => smoothScrollTo('hero')}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
            whileHover={{ scale: 1.05 }}
          >
            Felipe.dev
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => smoothScrollTo(item.href.slice(1))}
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors relative overflow-hidden group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}

            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <motion.div
                className="flex items-center space-x-1 p-1 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                <motion.button
                  onClick={() => changeLanguage(currentLanguage === 'en' ? 'es' : 'en')}
                  className={`px-2 py-1 rounded-full transition-all ${
                    currentLanguage === 'es' 
                      ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ES
                </motion.button>
                <motion.button
                  onClick={() => changeLanguage(currentLanguage === 'es' ? 'en' : 'es')}
                  className={`px-2 py-1 rounded-full transition-all ${
                    currentLanguage === 'en'
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
                onClick={toggleDarkMode}
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
              onClick={toggleDarkMode}
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
                onClick={() => changeLanguage(currentLanguage === 'en' ? 'es' : 'en')}
                className={`px-2 py-1 rounded-full transition-all ${
                  currentLanguage === 'es' 
                    ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ES
              </motion.button>
              <motion.button
                onClick={() => changeLanguage(currentLanguage === 'es' ? 'en' : 'es')}
                className={`px-2 py-1 rounded-full transition-all ${
                  currentLanguage === 'en'
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
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`} />
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`} />
                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`} />
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
          <div className="py-4 space-y-4">
            {menuItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => handleMobileMenuClick(item.href.slice(1))}
                className="block w-full text-left px-6 py-2 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </header>
  )
}

export default Header 