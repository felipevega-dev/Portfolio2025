import { motion } from 'framer-motion'
import { useState } from 'react'

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

const ProjectCard = ({ title, description, image, technologies, demoUrl, githubUrl }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
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
            className="relative px-6 py-2 text-white overflow-hidden rounded-lg group/button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
          </motion.a>
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-6 py-2 text-white overflow-hidden rounded-lg group/button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">GitHub</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
          </motion.a>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="p-6"
        animate={{
          y: isHovered ? -10 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1 text-sm rounded-full transition-transform hover:scale-105"
              style={{ 
                backgroundColor: `${tech.color}20`,
                color: tech.color 
              }}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  )
}

export default ProjectCard 