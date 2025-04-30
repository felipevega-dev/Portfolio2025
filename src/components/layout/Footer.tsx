import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  // Función para formatear las redes sociales
  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/felipevega-dev', name: 'GitHub' },
    { icon: FaLinkedin, url: 'https://linkedin.com/in/felipevega-dev', name: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com/felipevega_dev', name: 'Twitter' }
  ]

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Felipe.dev
              </h3>
              <p className="text-gray-400 mb-4">
                {t('hero.description')}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                    whileHover={{ y: -3 }}
                    aria-label={link.name}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-white">
                {t('nav.home')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#hero" className="text-gray-400 hover:text-indigo-400 transition-colors">
                    {t('nav.welcome')}
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-400 hover:text-indigo-400 transition-colors">
                    {t('nav.skills')}
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-indigo-400 transition-colors">
                    {t('nav.projects')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-indigo-400 transition-colors">
                    {t('nav.contact')}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contacto */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-white">
                {t('contact.title')}
              </h4>
              <p className="text-gray-400 mb-4">
                {t('contact.getInTouch')}
              </p>
              <a 
                href="#contact" 
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors inline-block"
              >
                {t('contact.form.send')}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              {t('footer.rights')}
            </p>
            <p className="text-gray-500 text-sm">
              {t('footer.builtWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 