import { motion, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import allProjects, { searchProjects } from '../../data/projects'
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaLaptopCode, FaReact, FaWordpress, FaJsSquare, FaMobileAlt, FaDatabase, FaStar, FaInfoCircle, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import SectionHeading from '../shared/SectionHeading'
import { Button } from '../ui/Button'
import { useSoundContext } from '../../context/SoundContext'

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    demoUrl?: string;
    codeUrl?: string;
    featured?: boolean;
  }
  index: number
  featured?: boolean
}

// Badge component for featured projects
const FeaturedBadge = () => (
  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
    Destacado
  </div>
)

const ProjectCard = ({ project, index, featured = false }: ProjectCardProps) => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const cardRef = useRef<HTMLDivElement>(null)
  const { play } = useSoundContext()

  // Efecto de mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    
    // Cálculo del centro de la tarjeta
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2
    
    // Cálculo de la distancia del mouse al centro
    const mouseX = e.clientX - cardCenterX
    const mouseY = e.clientY - cardCenterY
    
    // Normalizar valores para la rotación (reducir el efecto)
    const rotateY = mouseX * 0.02
    const rotateX = -mouseY * 0.02
    
    controls.start({
      rotateY: rotateY,
      rotateX: rotateX,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    controls.start({
      rotateY: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    })
  }

  // Función para reproducir sonido al hacer clic en "Ver detalles"
  const handleDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    play();
    // Usar setTimeout para dar tiempo a que se escuche el sonido antes de navegar
    setTimeout(() => {
      window.location.href = `/projects/${project.id}`;
    }, 100);
  }

  return (
    <motion.div
      className={`relative project-card overflow-visible ${featured || project.featured ? 'md:col-span-1 lg:col-span-1 xl:col-span-1' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
      {/* Card with perspective effect */}
      <motion.div 
        className={`h-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/95 ${
          featured || project.featured ? 'shadow-xl' : 'shadow-lg'
        }`}
        animate={controls}
        style={{ transformStyle: "preserve-3d" }}
      >
        {(featured || project.featured) && <FeaturedBadge />}
        
        {/* Image container with overlay */}
        <div className="relative overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ 
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.5 }}
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(20px)"  // Efecto 3D sutil
              }}
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
            {project.tags.slice(0, featured || project.featured ? 6 : 3).map((tech, i) => (
              <motion.span 
                key={tech} 
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs text-white font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.7, 
                  y: isHovered ? 0 : 10,
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
              >
                {tech}
              </motion.span>
            ))}
            {project.tags.length > (featured || project.featured ? 6 : 3) && (
              <motion.span 
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs text-white font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                +{project.tags.length - (featured || project.featured ? 6 : 3)}
              </motion.span>
            )}
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
            style={{ 
              transformStyle: "preserve-3d",
              transform: "translateZ(10px)" 
            }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3"
            style={{ 
              transformStyle: "preserve-3d",
              transform: "translateZ(5px)" 
            }}
          >
            {project.description}
          </motion.p>
          
          {/* Action links */}
          <div className="flex items-center justify-between mt-6">
            <motion.div
              whileHover={{ x: 5 }}
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(20px)" 
              }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                onClick={handleDetailsClick}
              >
                {t('projects.viewDetails')}
                <FaArrowRight className="ml-2 text-xs" />
              </Link>
            </motion.div>
            
            <div className="flex space-x-3">
              {project.codeUrl && (
                <motion.a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                  whileHover={{ y: -2, scale: 1.1 }}
                  title={t('projects.viewCode')}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)" 
                  }}
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
                  whileHover={{ y: -2, scale: 1.1 }}
                  title={t('projects.viewDemo')}
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)" 
                  }}
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

// Componente de filtro de categoría mejorado
const FilterButton = ({ 
  label, 
  icon, 
  active, 
  onClick 
}: { 
  label: string, 
  icon: React.ReactNode, 
  active: boolean, 
  onClick: () => void 
}) => {
  const { play } = useSoundContext()
  
  const handleClick = () => {
    play() // Play sound on click
    onClick()
  }

  return (
    <motion.button
      className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
        active 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {/* RPG Corners */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
      
      <span className="flex items-center justify-center w-5 h-5">{icon}</span>
      <span>{label}</span>
    </motion.button>
  )
}

const Projects = () => {
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState('all')
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const projectsPerPage = 3
  const { play } = useSoundContext()
  
  // Filtrar proyectos según la categoría y búsqueda
  const filteredProjects = currentTab === 'all' 
    ? (searchTerm ? searchProjects(searchTerm) : allProjects)
    : (searchTerm 
      ? searchProjects(searchTerm).filter(project => 
        project.tags.some(tag => 
          tag.toLowerCase().includes(currentTab.toLowerCase())
        )
      )
      : allProjects.filter(project => 
        project.tags.some(tag => 
          tag.toLowerCase().includes(currentTab.toLowerCase())
        )
      )
    )
  
  // Obtener proyectos destacados y limitarlos a máximo 3
  const featuredProjects = filteredProjects.filter(project => project.featured).slice(0, 3)
  
  // Obtener el resto de proyectos (no destacados)
  const regularProjects = filteredProjects.filter(project => !project.featured)
  
  // Calcular número de páginas para el carrusel
  const totalPages = Math.ceil(regularProjects.length / projectsPerPage)
  
  // Obtener proyectos para la página actual
  const currentProjects = regularProjects.slice(
    currentPage * projectsPerPage, 
    (currentPage + 1) * projectsPerPage
  )
  
  // Categorías para las pestañas con iconos
  const categories = [
    { id: 'all', label: 'All', icon: <FaLaptopCode className="w-4 h-4" /> },
    { id: 'react', label: 'React', icon: <FaReact className="w-4 h-4" /> },
    { id: 'javascript', label: 'JavaScript', icon: <FaJsSquare className="w-4 h-4" /> }, 
    { id: 'wordpress', label: 'WordPress', icon: <FaWordpress className="w-4 h-4" /> },
    { id: 'mobile', label: 'Mobile', icon: <FaMobileAlt className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend', icon: <FaDatabase className="w-4 h-4" /> }
  ]

  // Controladores de navegación carrusel
  const nextPage = () => {
    play()
    setCurrentPage(prev => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    play()
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
  }

  // Controlador de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(0) // Resetear a primera página al buscar
  }

  const handleLoadMore = () => {
    play() // Play sound
    setVisibleProjects(prev => Math.min(prev + 3, regularProjects.length))
  }

  const handleShowLess = () => {
    play() // Play sound
    setVisibleProjects(6)
  }
  
  // Handler for navigating to all projects page
  const handleViewAllProjects = () => {
    play() // Play sound when clicking
  }

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900/30 dark:to-gray-900/50">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Proyectos"
        />

        {/* Barra de búsqueda con estilo RPG */}
        <div className="relative mb-8 mx-auto max-w-2xl">
          <div className="relative bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-indigo-100 dark:border-indigo-900/50">
            {/* RPG Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5 rounded-tl-full"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5 rounded-tr-full"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5 rounded-bl-full"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5 rounded-br-full"></div>
            
            <div className="flex items-center pl-6 pr-4">
              <FaSearch className="text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Buscar proyectos por nombre, descripción o tecnología..."
                className="w-full py-3 px-4 outline-none bg-transparent text-gray-700 dark:text-gray-300"
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => play()}
              />
            </div>
          </div>
        </div>

        {/* Filtros con efecto visual mejorado */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-12 max-w-4xl mx-auto">
          <motion.div 
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg flex flex-wrap justify-center gap-2 relative border border-indigo-100 dark:border-indigo-900/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* RPG Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5 rounded-tl-full"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5 rounded-tr-full"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5 rounded-bl-full"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5 rounded-br-full"></div>
            
            {categories.map((category, index) => (
              <FilterButton
                key={category.id}
                label={category.label}
                icon={category.icon}
                active={currentTab === category.id}
                onClick={() => setCurrentTab(category.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* Proyectos destacados (si hay) */}
        {featuredProjects.length > 0 && (
          <>
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2 p-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md relative">
                    {/* Mini RPG Corners */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                    <FaStar className="w-4 h-4 text-white" />
                  </span>
                  Proyectos Destacados
                </h3>
                <motion.div 
                  className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center border border-indigo-200 dark:border-indigo-800 py-1 px-3 rounded-full bg-indigo-50 dark:bg-indigo-900/20 relative"
                  whileHover={{ x: 5 }}
                >
                  {/* Mini RPG Corners */}
                  <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-indigo-400/50 -translate-x-0.5 -translate-y-0.5 rounded-tl-full"></div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-indigo-400/50 translate-x-0.5 -translate-y-0.5 rounded-tr-full"></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-indigo-400/50 -translate-x-0.5 translate-y-0.5 rounded-bl-full"></div>
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-indigo-400/50 translate-x-0.5 translate-y-0.5 rounded-br-full"></div>
                  <span className="mr-1">{t('projects.featuredExplanation')}</span>
                  <FaInfoCircle size={12} />
                </motion.div>
              </div>

              {/* Contenedor con estilo RPG para proyectos destacados */}
              <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 shadow-lg border-2 border-indigo-100 dark:border-indigo-900/50 relative">
                {/* RPG Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5"></div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      index={index} 
                      featured={true} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Separador más elegante con estilo RPG */}
            <div className="relative flex items-center justify-center my-16">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-700 to-transparent"></div>
              <div className="absolute bg-white dark:bg-gray-900 px-6 text-gray-500 dark:text-gray-400 text-sm font-medium border-[0.5px] border-indigo-200 dark:border-indigo-800 rounded-full">
                {/* Mini RPG Corners para el texto del separador */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-indigo-400/50 dark:border-indigo-400/50 -translate-x-0.5 -translate-y-0.5 rounded-tl-full"></div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-indigo-400/50 dark:border-indigo-400/50 translate-x-0.5 -translate-y-0.5 rounded-tr-full"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-indigo-400/50 dark:border-indigo-400/50 -translate-x-0.5 translate-y-0.5 rounded-bl-full"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-indigo-400/50 dark:border-indigo-400/50 translate-x-0.5 translate-y-0.5 rounded-br-full"></div>
                Más Proyectos
              </div>
            </div>
          </>
        )}

        {/* Proyectos regulares con carrusel */}
        <motion.div 
          className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 shadow-lg border-2 border-indigo-100 dark:border-indigo-900/50 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* RPG Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5"></div>

          {/* Título y botones de navegación */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <span>Página:</span>
              {regularProjects.length > 0 && (
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                  {currentPage + 1}/{totalPages}
                </span>
              )}
            </h3>

            {totalPages > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={prevPage}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                  aria-label="Página anterior"
                >
                  <FaChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={nextPage}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                  aria-label="Página siguiente"
                >
                  <FaChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}
          </div>
          
          {regularProjects.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentProjects.map((project, index) => (
                <ProjectCard 
                  key={`${project.id}-${currentPage}-${index}`} 
                  project={project} 
                  index={index} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                No se encontraron proyectos que coincidan con tu búsqueda.
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar búsqueda
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 