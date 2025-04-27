import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
}

const projects: Project[] = [
  {
    id: 'project1',
    title: 'Portfolio 2024',
    description: 'Portfolio 2024',
    image: '/images/projects/portfolio.png',
    technologies: ['React', 'Node.js', 'MongoDB']
  },
  // Aquí puedes agregar más proyectos
]

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden rounded-lg aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-200 mb-4">{project.description}</p>
          <div className="flex gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-white/20 rounded text-sm text-white">
                {tech}
              </span>
            ))}
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Ver Detalles
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const { t } = useTranslation()

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('projects.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 