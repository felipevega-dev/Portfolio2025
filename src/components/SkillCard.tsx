import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SkillCardProps {
  iconLight: string
  iconDark: string
  title: string
  description: string
  technologies: string[]
}

const SkillCard = ({ iconLight, iconDark, title, description, technologies }: SkillCardProps) => {
  const [isDark, setIsDark] = useState(false)

  // Observa cambios en el modo oscuro
  useEffect(() => {
    const darkModeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const htmlElement = document.documentElement
          setIsDark(htmlElement.classList.contains('dark'))
        }
      })
    })

    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Comprueba el estado inicial
    setIsDark(document.documentElement.classList.contains('dark'))

    return () => darkModeObserver.disconnect()
  }, [])

  return (
    <motion.div
      className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Icon with transition */}
      <motion.div 
        className="relative w-16 h-16 mb-6 mx-auto"
        whileHover={{ scale: 1.1 }}
      >
        <motion.img
          src={isDark ? iconDark : iconLight}
          alt={title}
          className="w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Gradient circle behind icon */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full -z-10 blur-md" />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-bold text-center mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
        {description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 justify-center">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default SkillCard 