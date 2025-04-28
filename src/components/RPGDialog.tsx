import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { getProjectsByTechnology } from '../data/projects';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface RPGDialogProps {
  isOpen: boolean;
  onClose: () => void;
  technology: string;
  icon: React.ElementType;
  iconColor: string;
}

type DialogStage = 'initial' | 'options' | 'whyCaptured' | 'tellMeMore' | 'didntAsk' | 'relatedProjects';

const RPGDialog: React.FC<RPGDialogProps> = ({ 
  isOpen, 
  onClose, 
  technology, 
  icon: Icon, 
  iconColor 
}) => {
  const { t, i18n } = useTranslation();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [dialogStage, setDialogStage] = useState<DialogStage>('initial');
  const textRef = useRef<HTMLParagraphElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
  const activeTimersRef = useRef<number[]>([]);
  const relatedProjects = getProjectsByTechnology(technology);
  
  // Obtener el texto actual basado en la etapa del diálogo
  const getCurrentText = () => {
    const path = `technologies.${technology}`;
    
    switch (dialogStage) {
      case 'initial':
        return t(`${path}.initial`);
      case 'whyCaptured':
        return t(`${path}.whyCaptured`);
      case 'tellMeMore':
        return t(`${path}.tellMeMore`);
      case 'didntAsk':
        return t(`${path}.didntAsk`);
      case 'relatedProjects':
        return relatedProjects.length > 0 
          ? t('dialog.projects.available', { count: relatedProjects.length })
          : t('dialog.projects.notAvailable');
      default:
        return '';
    }
  };
  
  // Limpiar todos los timers activos
  const clearAllTimers = () => {
    activeTimersRef.current.forEach(timer => window.clearTimeout(timer));
    activeTimersRef.current = [];
  };
  
  // Crear el elemento de audio cuando el componente se monta
  useEffect(() => {
    audioRef.current = new Audio('/sounds/typing.MP3');
    audioRef.current.volume = 0.15;
    audioRef.current.playbackRate = 1.2;
    // Comenzar desde el segundo 2, solo reproducir hasta el segundo 5 y luego repetir
    audioRef.current.currentTime = 2;
    
    // Limpiar cuando se desmonta
    return () => {
      clearAllTimers();
      if (typingSoundRef.current) {
        typingSoundRef.current.pause();
        typingSoundRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Reiniciar el diálogo cuando se abre
  useEffect(() => {
    if (isOpen) {
      setDialogStage('initial');
      setIsTyping(true);
    }
  }, [isOpen]);
  
  // Gestionar el sonido de tipeo
  const startTypingSound = () => {
    if (!audioRef.current) return;
    
    // Crear un único sonido que usaremos para toda la animación
    if (!typingSoundRef.current) {
      typingSoundRef.current = audioRef.current.cloneNode() as HTMLAudioElement;
      typingSoundRef.current.loop = true;
      typingSoundRef.current.volume = 0.1;
      // Comenzar desde el segundo 2
      typingSoundRef.current.currentTime = 2;
      
      // Configurar evento para reiniciar en el segundo 5 (3 segundos después)
      typingSoundRef.current.addEventListener('timeupdate', () => {
        if (typingSoundRef.current && typingSoundRef.current.currentTime > 5) {
          typingSoundRef.current.currentTime = 2;
        }
      });
      
      typingSoundRef.current.play().catch(e => console.log('Error playing sound', e));
    }
  };
  
  const stopTypingSound = () => {
    if (typingSoundRef.current) {
      // Fade out suave
      const fadeOut = setInterval(() => {
        if (!typingSoundRef.current) {
          clearInterval(fadeOut);
          return;
        }
        
        if (typingSoundRef.current.volume > 0.01) {
          typingSoundRef.current.volume -= 0.01;
        } else {
          typingSoundRef.current.pause();
          typingSoundRef.current = null;
          clearInterval(fadeOut);
        }
      }, 50);
    }
  };
  
  // Efecto para la animación de escritura
  useEffect(() => {
    if (!isOpen) {
      setDisplayedText('');
      setIsTyping(true);
      stopTypingSound();
      clearAllTimers();
      return;
    }
    
    const message = getCurrentText();
    if (!message) return;
    
    let index = 0;
    const messageLength = message.length;
    
    // Resetear el texto cuando cambia el mensaje
    setDisplayedText('');
    setIsTyping(true);
    
    // Función para animar la escritura
    const typeWriter = () => {
      // Iniciar el sonido al comienzo de la animación
      if (index === 0) {
        startTypingSound();
        setDisplayedText(message.charAt(0)); // Mostrar la primera letra inmediatamente
        index = 1; // Comenzar desde la segunda letra en la próxima iteración
      }
      
      if (index < messageLength) {
        setDisplayedText(prev => prev + message.charAt(index));
        index++;
        
        // Velocidad más rápida para la animación (10-20ms en lugar de 30-60ms)
        const nextSpeed = Math.random() * 10 + 10;
        const timerId = window.setTimeout(typeWriter, nextSpeed);
        activeTimersRef.current.push(timerId);
      } else {
        setIsTyping(false);
        stopTypingSound();
        
        // Si estamos en el mensaje inicial, mostrar opciones después de completar
        if (dialogStage === 'initial') {
          const timerId = window.setTimeout(() => {
            setDialogStage('options');
          }, 300); // Reducido de 500ms a 300ms
          activeTimersRef.current.push(timerId);
        }
        
        // Si estamos en el mensaje "didntAsk", cerrar el diálogo después de 1 segundo
        if (dialogStage === 'didntAsk') {
          const timerId = window.setTimeout(() => {
            onClose();
          }, 1000);
          activeTimersRef.current.push(timerId);
        }
      }
    };
    
    // Comenzar animación
    const timerId = window.setTimeout(() => {
      typeWriter();
    }, 300); // Reducido de 500ms a 300ms
    activeTimersRef.current.push(timerId);
    
    return () => {
      clearAllTimers();
    };
  }, [isOpen, dialogStage]);
  
  // Completar el texto inmediatamente al hacer clic
  const completeText = () => {
    if (isTyping) {
      // Detener la animación de escritura
      clearAllTimers();
      setDisplayedText(getCurrentText());
      setIsTyping(false);
      stopTypingSound();
      
      // Si estamos en el mensaje inicial, mostrar opciones después de completar
      if (dialogStage === 'initial') {
        const timerId = window.setTimeout(() => {
          setDialogStage('options');
        }, 300); // Reducido de 500ms a 300ms
        activeTimersRef.current.push(timerId);
      }
      
      // Si estamos en el mensaje "didntAsk", cerrar el diálogo después de 1 segundo
      if (dialogStage === 'didntAsk') {
        const timerId = window.setTimeout(() => {
          onClose();
        }, 1000);
        activeTimersRef.current.push(timerId);
      }
    } else if (dialogStage !== 'options' && dialogStage !== 'relatedProjects') {
      // Si no estamos mostrando opciones o proyectos, volver a opciones
      setDialogStage('options');
    } else if (dialogStage === 'relatedProjects') {
      // Si estamos en proyectos, volver a opciones
      setDialogStage('options');
    }
  };
  
  // Manejador de click fuera del diálogo
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Manejar selección de opción
  const handleOptionClick = (option: DialogStage) => {
    setDialogStage(option);
  };
  
  // Renderizar opciones de diálogo
  const renderOptions = () => (
    <div className="mt-4 flex flex-col gap-2">
      <button 
        onClick={() => handleOptionClick('whyCaptured')}
        className="text-left px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 rounded-md text-indigo-700 dark:text-indigo-300 transition-colors text-sm font-medium"
      >
        {t('dialog.options.whyCaptured')}
      </button>
      <button 
        onClick={() => handleOptionClick('tellMeMore')}
        className="text-left px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 rounded-md text-indigo-700 dark:text-indigo-300 transition-colors text-sm font-medium"
      >
        {t('dialog.options.tellMeMore')}
      </button>
      {relatedProjects.length > 0 && (
        <button 
          onClick={() => handleOptionClick('relatedProjects')}
          className="text-left px-3 py-2 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 rounded-md text-indigo-700 dark:text-indigo-300 transition-colors text-sm font-medium"
        >
          {t('dialog.options.relatedProjects', { count: relatedProjects.length })}
        </button>
      )}
      <button 
        onClick={() => handleOptionClick('didntAsk')}
        className="text-left px-3 py-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-800/50 rounded-md text-red-700 dark:text-red-300 transition-colors text-sm font-medium"
      >
        {t('dialog.options.didntAsk')}
      </button>
    </div>
  );
  
  // Renderizar proyectos relacionados
  const renderRelatedProjects = () => (
    <div className="mt-4 flex flex-col gap-3">
      {relatedProjects.map(project => (
        <div 
          key={project.id}
          className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden"
        >
          <div className="p-3">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">{project.title}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{project.description}</p>
            <div className="flex justify-end gap-2 mt-2">
              {project.codeUrl && (
                <a 
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  title={t('projects.viewCode')}
                >
                  <FaGithub size={16} />
                </a>
              )}
              {project.demoUrl && (
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  title={t('projects.viewDemo')}
                >
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={() => setDialogStage('options')}
        className="self-center mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300 transition-colors text-xs font-medium"
      >
        {t('dialog.backToOptions')}
      </button>
    </div>
  );
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-[90%] max-w-md mx-auto overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header con nombre y botón de cerrar */}
            <div className="bg-indigo-600 dark:bg-indigo-800 text-white p-4 flex justify-between items-center">
              <h3 className="font-medium text-lg">{technology}</h3>
              <button 
                onClick={onClose}
                className="rounded-full p-1 hover:bg-white/20 transition-colors"
                aria-label="Cerrar"
              >
                <IoClose size={24} />
              </button>
            </div>
            
            {/* Contenido del diálogo */}
            <div className="p-6">
              <div className="flex gap-6">
                {/* Avatar con animación */}
                <div className="flex-shrink-0">
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-2"
                    animate={{
                      scale: isTyping ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      repeat: isTyping ? Infinity : 0,
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon 
                      className="w-12 h-12"
                      style={{ color: iconColor }}
                    />
                  </motion.div>
                </div>
                
                {/* Texto del mensaje con estilo RPG */}
                <div 
                  className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 relative cursor-pointer"
                  onClick={completeText}
                >
                  <p 
                    ref={textRef}
                    className={`text-sm text-gray-800 dark:text-gray-200 min-h-[80px] ${isTyping ? 'typing' : ''}`}
                  >
                    {displayedText}
                  </p>
                  
                  {/* Opciones, proyectos o indicador para continuar */}
                  {!isTyping && dialogStage === 'options' ? (
                    renderOptions()
                  ) : !isTyping && dialogStage === 'relatedProjects' ? (
                    renderRelatedProjects()
                  ) : !isTyping && (
                    <motion.div
                      className="absolute bottom-2 right-2"
                      animate={{ y: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[12px] border-t-indigo-500 border-r-[8px] border-r-transparent" />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RPGDialog; 