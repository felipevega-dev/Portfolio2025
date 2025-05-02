import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import projects from '../data/projects'
import SEOHead from './SEOHead'
import { useSoundContext } from '../context/SoundContext'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand, FaMoon, FaSun, FaGlobe, FaArrowLeft } from 'react-icons/fa'

// Función para ocultar el header en la página de detalle
const useHideHeader = () => {
  useEffect(() => {
    // Ocultar el header
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }
    
    // Ocultar el footer
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    // Restaurar al desmontar
    return () => {
      if (header) {
        header.style.display = '';
      }
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);
};

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
  alt,
  images,
  currentIndex,
  setCurrentIndex
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  src: string; 
  alt: string;
  images: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [imageBounds, setImageBounds] = useState({ width: 0, height: 0 });
  const [containerBounds, setContainerBounds] = useState({ width: 0, height: 0 });
  const { play } = useSoundContext();

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) {
        // Reset position when zooming out to normal
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      
      // Capturar las dimensiones actuales de la imagen y el contenedor
      const imgElement = e.currentTarget.querySelector('img');
      const container = e.currentTarget;
      
      if (imgElement && container) {
        const imgRect = imgElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        setImageBounds({
          width: imgRect.width * scale,
          height: imgRect.height * scale
        });
        
        setContainerBounds({
          width: containerRect.width,
          height: containerRect.height
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      // Calcular la nueva posición
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      
      // Calcular los límites máximos de arrastre (la mitad de la diferencia entre el tamaño de la imagen escalada y el contenedor)
      const maxX = Math.max(0, (imageBounds.width - containerBounds.width) / 2);
      const maxY = Math.max(0, (imageBounds.height - containerBounds.height) / 2);
      
      // Limitar la posición dentro de los bordes
      const limitedX = Math.min(Math.max(newX, -maxX), maxX);
      const limitedY = Math.min(Math.max(newY, -maxY), maxY);
      
      setPosition({
        x: limitedX,
        y: limitedY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
      
      // Capturar las dimensiones actuales de la imagen y el contenedor
      const imgElement = e.currentTarget.querySelector('img');
      const container = e.currentTarget;
      
      if (imgElement && container) {
        const imgRect = imgElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        setImageBounds({
          width: imgRect.width * scale,
          height: imgRect.height * scale
        });
        
        setContainerBounds({
          width: containerRect.width,
          height: containerRect.height
        });
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && scale > 1) {
      // Calcular la nueva posición
      const newX = e.touches[0].clientX - startPosition.x;
      const newY = e.touches[0].clientY - startPosition.y;
      
      // Calcular los límites máximos de arrastre
      const maxX = Math.max(0, (imageBounds.width - containerBounds.width) / 2);
      const maxY = Math.max(0, (imageBounds.height - containerBounds.height) / 2);
      
      // Limitar la posición dentro de los bordes
      const limitedX = Math.min(Math.max(newX, -maxX), maxX);
      const limitedY = Math.min(Math.max(newY, -maxY), maxY);
      
      setPosition({
        x: limitedX,
        y: limitedY
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const prevImage = () => {
    play();
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    play();
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Control bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-sm" onClick={e => e.stopPropagation()}>
        <div className="flex items-center space-x-3">
          <button 
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            onClick={handleZoomIn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            onClick={handleZoomOut}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            onClick={handleReset}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <motion.button
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTimes className="w-5 h-5" />
        </motion.button>
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10" onClick={e => e.stopPropagation()}>
        <motion.button
          className="p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
          onClick={prevImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft className="w-5 h-5" />
        </motion.button>
      </div>
      
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10" onClick={e => e.stopPropagation()}>
        <motion.button
          className="p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
          onClick={nextImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
      
      {/* Image container */}
      <motion.div
        className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: scale > 1 ? 'grab' : 'default' }}
      >
        <img 
          src={images[currentIndex]} 
          alt={`${alt} - imagen ${currentIndex + 1}`} 
          className="max-w-full max-h-full object-contain select-none"
          style={{ 
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s',
          }}
          draggable="false"
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
          className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800/40"
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
      <div className="flex justify-center gap-2 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
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
      
      {/* Miniaturas - diseño horizontal compacto */}
      <div className="flex overflow-x-auto hide-scrollbar space-x-2 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        {images.map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
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
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Modal para vista ampliada */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={images[currentIndex]}
        alt={projectTitle}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { play } = useSoundContext()
  const { toggleDarkMode, isDarkMode } = useTheme()
  const { currentLanguage, changeLanguage } = useLanguage()
  const [showVideo, setShowVideo] = useState(false)
  
  // Ocultar header al montar este componente
  useHideHeader();
  
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

  const handleThemeToggle = () => {
    play()
    toggleDarkMode()
  }

  const handleLanguageToggle = () => {
    play()
    changeLanguage(currentLanguage === 'es' ? 'en' : 'es')
  }

  return (
    <div className="min-h-screen py-4">
      <SEOHead 
        title={`${t(`projectDetails.${project.id}.title`, { defaultValue: project.title })} | Felipe Vega`}
        description={project.fullDescription || project.description}
        image={project.imageUrl}
        article={true}
      />
      
      {/* Control bar with back button, theme toggle and language selector */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.button
            onClick={handleBackClick}
            className="flex items-center px-3 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaArrowLeft className="mr-2" />
            {t('projects.backToProjects')}
          </motion.button>
          
          <div className="text-xl font-bold truncate mx-4 text-center hidden sm:block">
            {t(`projectDetails.${project.id}.title`, { defaultValue: project.title })}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <motion.button
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? 
                <FaSun className="h-5 w-5 text-yellow-400" /> : 
                <FaMoon className="h-5 w-5 text-gray-600" />
              }
            </motion.button>
            
            {/* Language toggle */}
            <motion.button
              onClick={handleLanguageToggle}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle language"
            >
              <div className="flex items-center">
                <FaGlobe className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-1" />
                <span className="text-sm font-medium uppercase">{currentLanguage}</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 xl:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl 2xl:max-w-screen-2xl mx-auto"
        >
          {/* Título y sección principal */}
          <motion.h1 
            className="text-4xl font-bold mb-6 text-center sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t(`projectDetails.${project.id}.title`, { defaultValue: project.title })}
          </motion.h1>

          {/* Reorganized layout to use full screen width */}
          <div className="bg-white/50 dark:bg-gray-900/30 rounded-xl p-4 md:p-6 shadow-lg border-2 border-indigo-100 dark:border-indigo-900/50 relative mb-12">
            {/* RPG Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5"></div>
            
            {/* Main grid layout: left features, right images */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {/* Left side: Features (vertical) */}
              <div className="lg:col-span-1">
                {project.features && project.features.length > 0 && (
                  <motion.div 
                    className="bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md relative border-2 border-indigo-200 dark:border-indigo-800 h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <RPGCorner position="top-left" />
                    <RPGCorner position="top-right" />
                    <RPGCorner position="bottom-left" />
                    <RPGCorner position="bottom-right" />
                    
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
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
                    <ul className="space-y-3">
                      {(t(`projectDetails.${project.id}.features`, { returnObjects: true }) as string[] || project.features).map((feature, index) => (
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
              </div>
              
              {/* Right side: Media (larger size) - Combined Video and Gallery */}
              <div className="lg:col-span-3">
                {/* Combined media section with toggle */}
                <div>
                  {/* Action buttons - Ahora van arriba en móvil */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4 sm:hidden">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors relative whitespace-nowrap flex-grow-0"
                        onClick={handleLinkClick}
                      >
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                        {t('projects.viewLive')}
                        <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border-2 border-gray-300 text-xs rounded-lg hover:border-indigo-600 transition-colors relative whitespace-nowrap flex-grow-0"
                        onClick={handleLinkClick}
                      >
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-[0.5px] border-l-[0.5px] border-indigo-400/20"></div>
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-[0.5px] border-r-[0.5px] border-indigo-400/20"></div>
                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-[0.5px] border-l-[0.5px] border-indigo-400/20"></div>
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-[0.5px] border-r-[0.5px] border-indigo-400/20"></div>
                        {t('projects.viewCode')}
                        <svg className="w-3 h-3 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                    <div className="flex items-center space-x-4 justify-center sm:justify-start w-full sm:w-auto">
                      {/* Gallery toggle button */}
                      <button 
                        className={`text-lg sm:text-2xl font-bold flex items-center relative ${!showVideo ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                        onClick={() => {
                          play();
                          setShowVideo(false);
                        }}
                      >
                        <span className={`w-5 h-5 sm:w-6 sm:h-6 ${!showVideo ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-400 dark:bg-gray-600'} rounded-md flex items-center justify-center mr-2 relative transition-colors`}>
                          {/* Mini RPG corners */}
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </span>
                        {t('projects.gallery')}
                      </button>
                      
                      {/* Video toggle button - only show if video exists */}
                      {project.videoUrl && (
                        <button 
                          className={`text-lg sm:text-2xl font-bold flex items-center relative ${showVideo ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
                          onClick={() => {
                            play();
                            setShowVideo(true);
                          }}
                        >
                          <span className={`w-5 h-5 sm:w-6 sm:h-6 ${showVideo ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-400 dark:bg-gray-600'} rounded-md flex items-center justify-center mr-2 relative transition-colors`}>
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
                          {t('projects.demo')}
                        </button>
                      )}
                    </div>
                    
                    {/* Action buttons para desktop */}
                    <div className="hidden sm:flex flex-wrap gap-2 mt-3 sm:mt-0 justify-center sm:justify-end">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors relative whitespace-nowrap flex-grow-0"
                          onClick={handleLinkClick}
                        >
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30"></div>
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30"></div>
                          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30"></div>
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30"></div>
                          {t('projects.viewLive')}
                          <svg className="w-3 h-3 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border-2 border-gray-300 text-sm rounded-lg hover:border-indigo-600 transition-colors relative whitespace-nowrap flex-grow-0"
                          onClick={handleLinkClick}
                        >
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-[0.5px] border-l-[0.5px] border-indigo-400/20"></div>
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-[0.5px] border-r-[0.5px] border-indigo-400/20"></div>
                          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-[0.5px] border-l-[0.5px] border-indigo-400/20"></div>
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-[0.5px] border-r-[0.5px] border-indigo-400/20"></div>
                          {t('projects.viewCode')}
                          <svg className="w-3 h-3 ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Conditional rendering based on toggle */}
                  {showVideo && project.videoUrl ? (
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg border-2 border-indigo-200 dark:border-indigo-800 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
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
                          title={`${t(`projectDetails.${project.id}.title`, { defaultValue: project.title })} demo video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </motion.div>
                  ) : project.screenshots && project.screenshots.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageCarousel 
                        images={project.screenshots} 
                        projectTitle={t(`projectDetails.${project.id}.title`, { defaultValue: project.title })} 
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bottom section: About project and Technologies - con columnas ajustadas */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-4">
              {/* Project description - más ancho */}
              <motion.div
                className="lg:col-span-3 bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md relative border-2 border-indigo-200 dark:border-indigo-800"
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
                  {t('projects.about')}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {t(`projectDetails.${project.id}.fullDescription`, { defaultValue: project.fullDescription || project.description })}
                </p>
              </motion.div>

              {/* Technologies - más estrecho */}
              <motion.div 
                className="lg:col-span-2 bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md relative border-2 border-indigo-200 dark:border-indigo-800"
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Agregar al final del archivo, justo antes de `export default`
const styles = document.createElement('style');
styles.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @media (max-width: 640px) {
    .container.mx-auto.px-4.mt-16 {
      margin-top: 4rem;
    }
  }
  
  @media (min-width: 1920px) {
    .container.mx-auto {
      max-width: 1800px;
    }
  }
`;
document.head.appendChild(styles);

export default ProjectDetail