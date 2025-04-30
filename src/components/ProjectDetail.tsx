import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import projects from '../data/projects'
import SEOHead from './SEOHead'
import LazyImage from './LazyImage'
import { useSoundContext } from '../context/SoundContext'
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from 'react-icons/fa'

// Define extended project data for detailed pages
interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  imageUrl: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  codeUrl?: string;
  screenshots?: string[];
  videoUrl?: string;
  documentation?: string;
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

// Componente de imagen ampliable con modal
const ImageModal = ({ 
  isOpen, 
  onClose, 
  src, 
  alt 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  src: string; 
  alt: string;
}) => {
  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.button
        className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaTimes className="w-6 h-6" />
      </motion.button>
      
      <motion.div
        className="relative max-w-full max-h-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[90vh] rounded-lg object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

// Carrusel mejorado de imágenes
const ImageCarousel = ({ images, projectTitle }: { images: string[], projectTitle: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { play } = useSoundContext();

  const prevImage = () => {
    play();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    play();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const openModal = () => {
    play();
    setModalOpen(true);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border-2 border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-gray-900/30 shadow-lg">
      {/* RPG Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5 z-10"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5 z-10"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5 z-10"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5 z-10"></div>
      
      {/* Imagen principal */}
      <div className="relative aspect-video">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${projectTitle} - imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Controles */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
            onClick={prevImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
            onClick={nextImage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
        
        {/* Botón para ampliar */}
        <motion.button
          className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
          onClick={openModal}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaExpand className="w-5 h-5" />
        </motion.button>
      </div>
      
      {/* Indicadores de imagen */}
      <div className="flex justify-center gap-2 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index
                ? 'bg-indigo-600 dark:bg-indigo-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => {
              play();
              setCurrentIndex(index);
            }}
            aria-label={`Ver imagen ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Miniaturas */}
      <div className="grid grid-cols-4 gap-2 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        {images.map((image, index) => (
          <button
            key={index}
            className={`rounded-md overflow-hidden border-2 transition-colors ${
              currentIndex === index
                ? 'border-indigo-600 dark:border-indigo-400'
                : 'border-transparent'
            }`}
            onClick={() => {
              play();
              setCurrentIndex(index);
            }}
          >
            <img
              src={image}
              alt={`${projectTitle} thumbnail ${index + 1}`}
              className="w-full h-full object-cover aspect-video"
            />
          </button>
        ))}
      </div>
      
      {/* Modal para vista ampliada */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={images[currentIndex]}
        alt={`${projectTitle} - imagen ${currentIndex + 1}`}
      />
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { play } = useSoundContext()
  
  // Find the project data directly from projects.ts
  const project = projects.find(project => project.id === id)
  
  if (!project) return null
  
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
        description={project.fullDescription || project.description}
        image={project.imageUrl}
        article={true}
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
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

          {/* Título y sección principal */}
          <motion.h1 
            className="text-4xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.title}
          </motion.h1>

          {/* Contenedor principal con estilo RPG */}
          <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-6 shadow-lg border-2 border-indigo-100 dark:border-indigo-900/50 relative mb-12">
            {/* RPG Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5"></div>
            
            {/* Video de demostración (si existe) */}
            {project.videoUrl && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center mr-2 relative">
                    {/* Mini RPG corners */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Demostración
                </h2>
                <motion.div
                  className="rounded-lg overflow-hidden shadow-lg border-2 border-indigo-200 dark:border-indigo-800 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* RPG Corners */}
                  <RPGCorner position="top-left" />
                  <RPGCorner position="top-right" />
                  <RPGCorner position="bottom-left" />
                  <RPGCorner position="bottom-right" />
                  
                  <div className="aspect-video">
                    <iframe 
                      src={project.videoUrl} 
                      className="w-full h-full"
                      title={`${project.title} demo video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* Galería de imágenes */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center mr-2 relative">
                    {/* Mini RPG corners */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Galería
                </h2>
                
                <ImageCarousel 
                  images={project.screenshots} 
                  projectTitle={project.title} 
                />
              </div>
            )}

            {/* Sección de información */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <motion.div
                  className="bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md mb-8 relative border-2 border-indigo-200 dark:border-indigo-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <RPGCorner position="top-left" />
                  <RPGCorner position="top-right" />
                  <RPGCorner position="bottom-left" />
                  <RPGCorner position="bottom-right" />
                  
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center mr-2 relative">
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Acerca del proyecto
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.fullDescription || project.description}
                  </p>
                </motion.div>

                <motion.div 
                  className="mb-8 bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md relative border-2 border-indigo-200 dark:border-indigo-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <RPGCorner position="top-left" />
                  <RPGCorner position="top-right" />
                  <RPGCorner position="bottom-left" />
                  <RPGCorner position="bottom-right" />
                  
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center mr-2 relative">
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
                    {project.tags.map(tech => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm border border-indigo-100 dark:border-indigo-900/50 relative"
                      >
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-[1px] border-l-[1px] border-indigo-400/50 dark:border-indigo-400/50 -translate-x-0.5 -translate-y-0.5 rounded-tl-full"></div>
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-[1px] border-r-[1px] border-indigo-400/50 dark:border-indigo-400/50 translate-x-0.5 -translate-y-0.5 rounded-tr-full"></div>
                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-[1px] border-l-[1px] border-indigo-400/50 dark:border-indigo-400/50 -translate-x-0.5 translate-y-0.5 rounded-bl-full"></div>
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-[1px] border-r-[1px] border-indigo-400/50 dark:border-indigo-400/50 translate-x-0.5 translate-y-0.5 rounded-br-full"></div>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div>
                {project.features && project.features.length > 0 && (
                  <motion.div 
                    className="mb-8 bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md relative border-2 border-indigo-200 dark:border-indigo-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <RPGCorner position="top-left" />
                    <RPGCorner position="top-right" />
                    <RPGCorner position="bottom-left" />
                    <RPGCorner position="bottom-right" />
                    
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <span className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center mr-2 relative">
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

                {/* Documentation section */}
                {project.documentation && (
                  <motion.div 
                    className="mb-8 bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md relative border-2 border-indigo-200 dark:border-indigo-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <RPGCorner position="top-left" />
                    <RPGCorner position="top-right" />
                    <RPGCorner position="bottom-left" />
                    <RPGCorner position="bottom-right" />
                    
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <span className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-md flex items-center justify-center mr-2 relative">
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      Documentación
                    </h2>
                    <div className="prose prose-indigo dark:prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: project.documentation }} />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Enlaces */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-8"
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
            
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-indigo-600 transition-colors relative"
                onClick={handleLinkClick}
              >
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
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail 