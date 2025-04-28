import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import allProjects from '../../data/projects'
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    demoUrl?: string;
    codeUrl?: string;
  }
  index: number
  featured?: boolean
}

// Badge component for featured projects
const FeaturedBadge = () => (
  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
    Destacado
  </div>
)

const ProjectCard = ({ project, index, featured = false }: ProjectCardProps) => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative group ${featured ? 'md:col-span-2 row-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card with perspective effect */}
      <motion.div 
        className={`h-full overflow-hidden rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${
          featured ? 'shadow-xl' : 'shadow-lg'
        }`}
        whileHover={{ y: -5 }}
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {featured && <FeaturedBadge />}
        
        {/* Image container with overlay */}
        <div className="relative overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6 }}
            />
          </div>
          
          {/* Gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Tech tags floating at the bottom */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-10">
            {project.tags.slice(0, featured ? 6 : 3).map((tech) => (
              <motion.span 
                key={tech} 
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs text-white font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.tags.length > (featured ? 6 : 3) && (
              <motion.span 
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs text-white font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                +{project.tags.length - (featured ? 6 : 3)}
              </motion.span>
            )}
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Action links */}
          <div className="flex items-center justify-between mt-4">
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              {t('projects.viewDetails')}
              <FaArrowRight className="ml-2 text-xs" />
            </Link>
            
            <div className="flex space-x-3">
              {project.codeUrl && (
                <motion.a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  whileHover={{ y: -2 }}
                  title="Ver código"
                >
                  <FaGithub className="w-4 h-4" />
                </motion.a>
              )}
              
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  whileHover={{ y: -2 }}
                  title="Ver demo"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const { t } = useTranslation()
  
  // Animate section elements on view
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            {t('projects.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {allProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              featured={index === 0} // Make the first project featured
            />
          ))}
        </motion.div>
        
        {/* View all projects button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/projects" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
            {t('projects.viewAll')}
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 