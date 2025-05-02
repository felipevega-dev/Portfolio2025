import { motion } from 'framer-motion'
import { useState } from 'react'
import LazyImage from './LazyImage'
import { useSoundContext } from '../context/SoundContext'

interface Technology {
  name: string
  color: string
}

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: Technology[]
  demoUrl: string
  githubUrl: string
}

// Componente para las esquinas tipo RPG
const RPGCorner = ({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0 -translate-x-0.5 -translate-y-0.5 border-t-2 border-l-2',
    'top-right': 'top-0 right-0 translate-x-0.5 -translate-y-0.5 border-t-2 border-r-2',
    'bottom-left': 'bottom-0 left-0 -translate-x-0.5 translate-y-0.5 border-b-2 border-l-2',
    'bottom-right': 'bottom-0 right-0 translate-x-0.5 translate-y-0.5 border-b-2 border-r-2'
  }

  return (
    <div className={`absolute w-3 h-3 border-indigo-400 dark:border-indigo-500 ${positionClasses[position]}`}></div>
  )
}

const ProjectCard = ({ title, description, image, technologies, demoUrl, githubUrl }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { play } = useSoundContext()

  const handleLinkClick = () => {
    play()
  }
  
  // Función para el enlace de detalles
  const handleDetailsClick = (e: React.MouseEvent) => {
    play()
    // Usamos un pequeño timeout para que el sonido se reproduzca antes de la navegación
    setTimeout(() => {
      window.location.href = `/projects/${title.toLowerCase().replace(/ /g, '-')}`
    }, 100)
    e.preventDefault()
  }

  return (
    <motion.article
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Gradient Border with RPG style */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[2px]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 blur-xl opacity-50 -z-10" />
        <div className="h-full w-full bg-white dark:bg-gray-800 rounded-2xl relative flex flex-col">
          {/* RPG Corners */}
          <RPGCorner position="top-left" />
          <RPGCorner position="top-right" />
          <RPGCorner position="bottom-left" />
          <RPGCorner position="bottom-right" />
          
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden rounded-t-2xl">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <LazyImage
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                effect="blur"
                wrapperClassName="w-full h-full"
              />
            </motion.div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Links */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-4 py-2 text-sm text-white overflow-hidden rounded-lg group/button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLinkClick}
              >
                <span className="relative z-10">Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600">
                  {/* RPG Button Corners */}
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/50"></div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/50"></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/50"></div>
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/50"></div>
                </div>
              </motion.a>
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-4 py-2 text-sm text-white overflow-hidden rounded-lg group/button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLinkClick}
              >
                <span className="relative z-10">GitHub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600">
                  {/* RPG Button Corners */}
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/50"></div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/50"></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/50"></div>
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/50"></div>
                </div>
              </motion.a>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div 
            className="p-5 flex-grow flex flex-col"
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
              {description}
            </p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2 py-0.5 text-xs rounded-full transition-transform hover:scale-105 relative"
                  style={{ 
                    backgroundColor: `${tech.color}20`,
                    color: tech.color 
                  }}
                >
                  {/* Mini RPG corners for tech tags */}
                  <div className="absolute top-0 left-0 w-1 h-1 border-t-[1px] border-l-[1px] border-current opacity-50"></div>
                  <div className="absolute top-0 right-0 w-1 h-1 border-t-[1px] border-r-[1px] border-current opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-1 h-1 border-b-[1px] border-l-[1px] border-current opacity-50"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 border-b-[1px] border-r-[1px] border-current opacity-50"></div>
                  {tech.name}
                </span>
              ))}
            </div>
            
            {/* Ver más enlace con sonido */}
            <motion.div
              className="mt-4 text-center"
              whileHover={{ y: -2 }}
            >
              <a 
                href={`/projects/${title.toLowerCase().replace(/ /g, '-')}`}
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                onClick={handleDetailsClick}
              >
                <span className="mr-1">Ver detalles</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard 