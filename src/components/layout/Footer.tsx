import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaReact, FaCode, FaEnvelope, FaMapMarkerAlt, FaPhone, FaScroll, FaDungeon, FaGem } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { GiSpellBook, GiSwordman, GiWizardStaff } from 'react-icons/gi'

// Componente de pixel art para esquinas del footer
const PixelCorner = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180'
  }

  return (
    <div className={`absolute w-6 h-6 ${positionClasses[position]} pointer-events-none`}>
      <div className="w-2 h-2 absolute top-0 left-0 bg-indigo-400 dark:bg-indigo-500 opacity-80"></div>
      <div className="w-2 h-2 absolute top-0 left-2 bg-indigo-500 dark:bg-indigo-600 opacity-80"></div>
      <div className="w-2 h-2 absolute top-2 left-0 bg-indigo-500 dark:bg-indigo-600 opacity-80"></div>
    </div>
  )
}

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  // Links de redes sociales
  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/felipevega-dev', name: 'GitHub' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/felipevega-dev', name: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com/felipevega_dev', name: 'Twitter' }
  ]

  // Enlaces rápidos para el footer con estilo RPG
  const quickLinks = [
    { label: t('nav.welcome'), href: '#hero', icon: GiSwordman },
    { label: t('nav.skills'), href: '#skills', icon: FaGem },
    { label: t('technologies.title'), href: '#technologies', icon: GiWizardStaff },
    { label: t('nav.projects'), href: '#projects', icon: FaDungeon },
    { label: t('nav.contact'), href: '#contact', icon: FaScroll }
  ]

  // Información de contacto
  const contactInfo = [
    { icon: FaEnvelope, text: 'contacto@felipevega.dev', href: 'mailto:contacto@felipevega.dev' },
    { icon: FaMapMarkerAlt, text: 'Santiago, Chile' },
    { icon: FaPhone, text: '+56 9 1234 5678', href: 'tel:+56912345678' }
  ]

  return (
    <footer className="relative">
      {/* Wave SVG Background - Mejorado */}
      <div className="absolute bottom-full left-0 right-0 h-20 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full h-full text-gray-900 dark:text-gray-900" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path 
            fill="currentColor" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,165.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
          </path>
        </svg>
      </div>

      {/* Estrellas y partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-300 dark:bg-indigo-500"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Main Footer Content con mejor respeto de tema */}
      <div className="bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-white pt-16 pb-8 relative border-t border-indigo-100 dark:border-indigo-900/50">
        <div className="container mx-auto px-6">
          {/* Decoraciones estilo RPG */}
          <PixelCorner position="top-left" />
          <PixelCorner position="top-right" />
          <PixelCorner position="bottom-left" />
          <PixelCorner position="bottom-right" />
          
          {/* Separador estilo pergamino */}
          <div className="relative w-full h-6 mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-600 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex justify-center">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-900 flex items-center justify-center rounded-full">
                <GiSpellBook className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="rpg-frame relative p-6 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg bg-white/50 dark:bg-gray-800/50"
              >
                {/* Decoración de esquinas tipo RPG */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5"></div>
                
                <motion.h3 
                  className="text-2xl font-bold mb-4 inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Felipe.dev
                  </span>
                </motion.h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  {t('hero.description')}
                </p>
                
                <div className="flex space-x-4 mb-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full bg-gray-100 dark:bg-gray-800 p-3 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-indigo-500/20"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={link.name}
                    >
                      <link.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="rpg-frame relative p-6 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg bg-white/50 dark:bg-gray-800/50 h-full"
              >
                {/* Decoración de esquinas tipo RPG */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5"></div>
                
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white border-b border-indigo-200 dark:border-indigo-800 pb-2 flex items-center">
                  <FaScroll className="mr-2 text-indigo-500 dark:text-indigo-400" />
                  {t('footer.quickLinks')}
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => {
                    // Determinar si es un enlace interno o una ruta
                    const isRoute = link.href.startsWith('/')
                    const Icon = link.icon
                    
                    return isRoute ? (
                      <li key={index}>
                        <Link 
                          to={link.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center hover:translate-x-1 transform duration-300"
                        >
                          <Icon className="mr-2 text-sm text-indigo-500 dark:text-indigo-400" />
                          {link.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={index}>
                        <a 
                          href={link.href} 
                          className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center hover:translate-x-1 transform duration-300"
                        >
                          <Icon className="mr-2 text-sm text-indigo-500 dark:text-indigo-400" />
                          {link.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="rpg-frame relative p-6 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg bg-white/50 dark:bg-gray-800/50 h-full"
              >
                {/* Decoración de esquinas tipo RPG */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5"></div>
                
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white border-b border-indigo-200 dark:border-indigo-800 pb-2 flex items-center">
                  <FaScroll className="mr-2 text-indigo-500 dark:text-indigo-400" />
                  {t('contact.title')}
                </h4>
                
                <ul className="space-y-4 mb-6">
                  {contactInfo.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center text-gray-600 dark:text-gray-400"
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                        <item.icon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                      </span>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.a 
                  href="#contact" 
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20 dark:shadow-indigo-500/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('contact.form.send')}
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Divider con gradiente */}
          <div className="mt-12 pt-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-700 to-transparent"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
                <p>
                  &copy; {currentYear} Felipe Vega. {t('footer.rights')}
                </p>
              </div>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <p className="flex items-center">
                  {t('footer.builtWith')} <FaReact className="mx-1 text-blue-400" /> + <FaHeart className="mx-1 text-red-500" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 