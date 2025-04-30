import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import projects from '../data/projects'
import SEOHead from './SEOHead'
import LazyImage from './LazyImage'
import { useSoundContext } from '../context/SoundContext'

// Define extended project data for detailed pages
interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  codeUrl?: string;
  screenshots: string[];
}

// Componente para las esquinas RPG
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

// Extended data for project details
const projectDetails: Record<string, Partial<ProjectDetail>> = {
  "portfolio-2025": {
    fullDescription: "Portfolio personal construido con React, Next.js y Tailwind CSS. Este sitio muestra mis proyectos, habilidades y experiencia como desarrollador de software. Implementa un diseño moderno con animaciones fluidas usando Framer Motion y un sistema de internacionalización completo.",
    features: [
      "Diseño completamente responsive optimizado para móviles y desktop",
      "Animaciones fluidas con Framer Motion",
      "Modo claro/oscuro adaptado a las preferencias del sistema",
      "Internacionalización con soporte para inglés y español",
      "Diálogos interactivos tipo RPG para las tecnologías",
      "Optimización SEO y de rendimiento"
    ],
    screenshots: [
      "/images/projects/portfolio/screenshot1.png",
      "/images/projects/portfolio/screenshot2.png"
    ]
  },
  "featuring": {
    fullDescription: "Featuring es una aplicación móvil desarrollada con React Native y Expo, diseñada específicamente para músicos que buscan colaborar. La plataforma permite a los artistas conectarse, compartir contenido musical, realizar colaboraciones y recibir valoraciones de la comunidad. Incluye un completo panel de administración para gestionar el contenido de la plataforma.",
    features: [
      "Sistema de perfiles para artistas con valoraciones y estadísticas",
      "Feed de publicaciones para compartir música y videos cortos",
      "Sistema de match basado en preferencias musicales y filtros",
      "Colaboraciones entre artistas con sistema de valoración mutua",
      "Reproductor de audio y video integrado",
      "Notificaciones push para nuevas interacciones",
      "Panel de administración completo para gestionar contenido",
      "Integración con APIs de divisas para pagos internacionales",
      "Nivel premium con características adicionales",
      "Sistema de reportes y moderación de contenido"
    ],
    screenshots: [
      "/images/projects/featuring/screenshot1.png",
      "/images/projects/featuring/screenshot2.png"
    ]
  },
  "ikintsugi-theme": {
    fullDescription: "Tema personalizado para WordPress desarrollado desde cero para la institución Ikintsugi. Implementado con Sage, un starter theme que utiliza Laravel Blade y modern frontend tooling. El diseño se basó en especificaciones proporcionadas por la diseñadora del cliente, y se implementó con un enfoque en rendimiento, accesibilidad y experiencia de usuario.",
    features: [
      "Implementación exacta del diseño Figma proporcionado por el cliente",
      "Diseño completamente responsive para todas las pantallas",
      "Optimización de rendimiento con puntuación alta en PageSpeed",
      "Animaciones sutiles para mejorar la experiencia de usuario",
      "Configuración de bloques de Gutenberg personalizados",
      "Uso de TailwindCSS para estilos consistentes y mantenibles",
      "Workflow moderno con Vite para desarrollo rápido",
      "Templates Blade organizados y reutilizables",
      "Optimización SEO siguiendo mejores prácticas"
    ],
    screenshots: [
      "/images/projects/ikintsugi/screenshot1.png",
      "/images/projects/ikintsugi/screenshot2.png"
    ],
    demoUrl: "https://ikintsugi.cl"
  },
  "plugin-reservas": {
    fullDescription: "Plugin de WordPress desarrollado para extender WooCommerce, permitiendo a los clientes suscribirse a productos sin stock. El sistema gestiona las notificaciones automáticas cuando el producto vuelve a estar disponible y proporciona un completo panel de administración para analizar las suscripciones y tendencias de productos.",
    features: [
      "Integración con el inventario de WooCommerce",
      "Sistema de suscripción a productos sin stock",
      "Panel de administración con estadísticas y filtros",
      "Notificaciones automáticas por email cuando se repone el stock",
      "Plantillas de email personalizables",
      "Soporte para productos con variaciones (tallas, colores, etc.)",
      "Estadísticas detalladas por producto y variación",
      "Exportación de datos a Excel",
      "Gestión de usuarios y sus suscripciones",
      "Configuración flexible del sistema"
    ],
    screenshots: [
      "/images/projects/plugin-reservas/screenshot1.png",
      "/images/projects/plugin-reservas/screenshot2.png"
    ]
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { play } = useSoundContext()
  
  // Find the base project data
  const baseProject = projects.find(project => project.id === id);
  
  if (!baseProject) return null;
  
  // Get the extended details for this project
  const details = projectDetails[baseProject.id as keyof typeof projectDetails] || {};
  
  // Combine base project with details
  const project = {
    ...baseProject,
    image: baseProject.imageUrl,
    githubUrl: baseProject.codeUrl,
    technologies: baseProject.tags,
    fullDescription: details.fullDescription || baseProject.description,
    features: details.features || [],
    screenshots: details.screenshots || [],
  };

  const handleBackClick = () => {
    play() // Reproducir sonido al hacer clic
    navigate(-1)
  }

  const handleLinkClick = () => {
    play() // Reproducir sonido al hacer clic
  }

  return (
    <div className="min-h-screen py-20">
      <SEOHead 
        title={`${project.title} | Felipe Vega`}
        description={project.fullDescription}
        image={project.image}
        article={true}
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={handleBackClick}
            className="mb-8 flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('projects.backToProjects')}
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <motion.h1 
                className="text-4xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.title}
              </motion.h1>
              
              <motion.div
                className="bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md mb-8 relative border-2 border-indigo-200 dark:border-indigo-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* RPG Corners */}
                <RPGCorner position="top-left" />
                <RPGCorner position="top-right" />
                <RPGCorner position="bottom-left" />
                <RPGCorner position="bottom-right" />
                
                <p className="text-gray-600 dark:text-gray-400">
                  {project.fullDescription}
                </p>
              </motion.div>

              <motion.div 
                className="mb-8 bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md relative border-2 border-indigo-200 dark:border-indigo-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {/* RPG Corners */}
                <RPGCorner position="top-left" />
                <RPGCorner position="top-right" />
                <RPGCorner position="bottom-left" />
                <RPGCorner position="bottom-right" />
                
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center mr-2 relative">
                    {/* Mini RPG corners */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  {t('projects.technologies')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm border border-indigo-100 dark:border-indigo-900/50 relative"
                    >
                      {/* Mini RPG Corners para tech tags */}
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-[1px] border-l-[1px] border-indigo-400/50 dark:border-indigo-400/50 -translate-x-0.5 -translate-y-0.5 rounded-tl-full"></div>
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-[1px] border-r-[1px] border-indigo-400/50 dark:border-indigo-400/50 translate-x-0.5 -translate-y-0.5 rounded-tr-full"></div>
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-[1px] border-l-[1px] border-indigo-400/50 dark:border-indigo-400/50 -translate-x-0.5 translate-y-0.5 rounded-bl-full"></div>
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-[1px] border-r-[1px] border-indigo-400/50 dark:border-indigo-400/50 translate-x-0.5 translate-y-0.5 rounded-br-full"></div>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {project.features.length > 0 && (
                <motion.div 
                  className="mb-8 bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md relative border-2 border-indigo-200 dark:border-indigo-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* RPG Corners */}
                  <RPGCorner position="top-left" />
                  <RPGCorner position="top-right" />
                  <RPGCorner position="bottom-left" />
                  <RPGCorner position="bottom-right" />
                  
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center mr-2 relative">
                      {/* Mini RPG corners */}
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {t('projects.features')}
                  </h2>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mr-2 flex-shrink-0 relative">
                          {/* Mini RPG corners */}
                          <div className="absolute top-0 left-0 w-1 h-1 border-t-[0.5px] border-l-[0.5px] border-green-500/50 -translate-x-0.5 -translate-y-0.5 rounded-tl-full"></div>
                          <div className="absolute top-0 right-0 w-1 h-1 border-t-[0.5px] border-r-[0.5px] border-green-500/50 translate-x-0.5 -translate-y-0.5 rounded-tr-full"></div>
                          <div className="absolute bottom-0 left-0 w-1 h-1 border-b-[0.5px] border-l-[0.5px] border-green-500/50 -translate-x-0.5 translate-y-0.5 rounded-bl-full"></div>
                          <div className="absolute bottom-0 right-0 w-1 h-1 border-b-[0.5px] border-r-[0.5px] border-green-500/50 translate-x-0.5 translate-y-0.5 rounded-br-full"></div>
                          <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors relative"
                    onClick={handleLinkClick}
                  >
                    {/* RPG Button Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30"></div>
                    {t('projects.viewDemo')}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-indigo-600 transition-colors relative"
                    onClick={handleLinkClick}
                  >
                    {/* RPG Button Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-indigo-400/20"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-indigo-400/20"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-indigo-400/20"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-indigo-400/20"></div>
                    {t('projects.viewCode')}
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                className="rounded-lg overflow-hidden shadow-lg border-2 border-indigo-200 dark:border-indigo-800 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* RPG Corners */}
                <RPGCorner position="top-left" />
                <RPGCorner position="top-right" />
                <RPGCorner position="bottom-left" />
                <RPGCorner position="bottom-right" />
                
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto"
                  effect="blur"
                  wrapperClassName="w-full h-auto"
                />
              </motion.div>

              {project.screenshots.length > 0 && (
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.screenshots.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-lg border-2 border-indigo-200 dark:border-indigo-800 relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* RPG Corners */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5"></div>
                      
                      <LazyImage
                        src={screenshot}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-auto"
                        effect="blur" 
                        wrapperClassName="w-full h-auto"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail 