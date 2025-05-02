import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { getProjectsByTechnology } from '../data/projects';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useSoundContext } from '../context/SoundContext';

interface RPGDialogProps {
  isOpen: boolean;
  onClose: () => void;
  technology: string;
  icon: React.ElementType;
  iconColor: string;
}

type DialogStage = 'initial' | 'options' | 'whyCaptured' | 'tellMeMore' | 'didntAsk';

const RPGDialog: React.FC<RPGDialogProps> = ({ 
  isOpen, 
  onClose, 
  technology, 
  icon: Icon, 
  iconColor 
}) => {
  const { t } = useTranslation();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [dialogStage, setDialogStage] = useState<DialogStage>('initial');
  const textRef = useRef<HTMLParagraphElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
  const { play } = useSoundContext();
  const activeTimersRef = useRef<number[]>([]);
  const relatedProjects = getProjectsByTechnology(technology);
  
  // Obtener el texto actual basado en la etapa del diálogo
  const getCurrentText = () => {
    const path = `technologies.${technology}`;
    
    switch (dialogStage) {
      case 'initial':
        return t(`${path}.initial`);
      case 'whyCaptured': {
        let text = t(`${path}.whyCaptured`);
        
        // Solo agregamos el texto de proyectos si hay proyectos relacionados
        if (relatedProjects.length > 0) {
          text += '\n\n' + t('dialog.projects.usedIn');
        }
        
        return text;
      }
      case 'tellMeMore':
        return t(`${path}.tellMeMore`);
      case 'didntAsk':
        return t(`${path}.didntAsk`);
      default:
        return '';
    }
  };
  
  // Limpiar todos los timers activos
  const clearAllTimers = () => {
    activeTimersRef.current.forEach(timer => window.clearTimeout(timer));
    activeTimersRef.current = [];
  };
  
  // Reproducir sonido de selección usando el contexto global
  const playSelectSound = () => {
    play();
  };
  
  // Crear el elemento de audio cuando el componente se monta
  useEffect(() => {
    audioRef.current = new Audio('/sounds/typing.MP3');
    audioRef.current.volume = 0.10;
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
        // Mostrar la primera letra correctamente
        setDisplayedText(message.charAt(0));
        index = 1;
        
        // Continuar con la siguiente letra inmediatamente
        const timerId = window.setTimeout(() => {
          if (index < messageLength) {
            setDisplayedText(prev => prev + message.charAt(index));
            index++;
            
            // Velocidad más rápida para la animación
            const nextSpeed = Math.random() * 10 + 10;
            const nextTimerId = window.setTimeout(typeWriter, nextSpeed);
            activeTimersRef.current.push(nextTimerId);
          } else {
            setIsTyping(false);
            stopTypingSound();
            
            // Si estamos en el mensaje inicial, mostrar opciones después de completar
            if (dialogStage === 'initial') {
              const optionsTimerId = window.setTimeout(() => {
                setDialogStage('options');
              }, 300);
              activeTimersRef.current.push(optionsTimerId);
            }
          }
        }, 10);
        
        activeTimersRef.current.push(timerId);
        return;
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
          }, 300);
          activeTimersRef.current.push(timerId);
        }
      }
    };
    
    // Comenzar animación
    const timerId = window.setTimeout(() => {
      typeWriter();
    }, 300);
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
        }, 300);
        activeTimersRef.current.push(timerId);
      }
    } else if (dialogStage === 'didntAsk') {
      // Si es "didntAsk" y ya terminó de escribir, cerramos el diálogo
      onClose();
    } else if (dialogStage !== 'options') {
      // Si no estamos mostrando opciones, volver a opciones
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
    // Reproducir sonido de selección
    playSelectSound();
    
    if (option === 'options') {
      // Reset to initial message when going back to options
      setDialogStage(option);
      setDisplayedText(t(`technologies.${technology}.initial`));
    } else {
      setDialogStage(option);
    }
  };
  
  // Renderizar proyectos relacionados
  const renderRelatedProjects = () => {
    if (relatedProjects.length === 0) {
      return (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            {t('dialog.projects.notAvailable')}
          </p>
        </div>
      );
    }

    return (
      <div className="mt-4">
        <p className="mb-3 text-indigo-600 dark:text-indigo-400 font-medium">
          {t('dialog.projects.available', { count: relatedProjects.length })}
        </p>
        <div className="flex flex-col gap-3">
          {relatedProjects.map(project => (
            <motion.a 
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 flex-1">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm">{t(`projectDetails.${project.id}.title`, { defaultValue: project.title })}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">{t(`projectDetails.${project.id}.description`, { defaultValue: project.description })}</p>
                  
                  <div className="flex justify-end gap-2 mt-1">
                    {project.codeUrl && (
                      <a 
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        title={t('projects.viewCode')}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub size={14} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        title={t('projects.viewDemo')}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    );
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
      <button 
        onClick={() => handleOptionClick('didntAsk')}
        className="text-left px-3 py-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-800/50 rounded-md text-red-700 dark:text-red-300 transition-colors text-sm font-medium"
      >
        {t('dialog.options.didntAsk')}
      </button>
    </div>
  );
  
  // Formatear el texto para mostrar saltos de línea
  const formatDisplayedText = () => {
    if (!displayedText) return '';
    
    return displayedText.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < displayedText.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };
  
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
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 p-1"
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
                    className="w-6 h-6"
                    style={{ color: iconColor }}
                  />
                </motion.div>
                <h3 className="font-medium text-lg">{technology}</h3>
              </div>
              <button 
                onClick={onClose}
                className="rounded-full p-1 hover:bg-white/20 transition-colors"
                aria-label="Cerrar"
              >
                <IoClose size={24} />
              </button>
            </div>
            
            {/* Contenido del diálogo - ahora a ancho completo */}
            <div className="p-6">
              <div 
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 relative cursor-pointer"
                onClick={completeText}
              >
                <p 
                  ref={textRef}
                  className={`text-sm text-gray-800 dark:text-gray-200 min-h-[80px] ${isTyping ? 'typing' : ''}`}
                >
                  {formatDisplayedText()}
                </p>
                
                {/* Proyectos relacionados (solo se muestran en whyCaptured y después de terminar de escribir) */}
                {!isTyping && dialogStage === 'whyCaptured' && relatedProjects.length > 0 && (
                  renderRelatedProjects()
                )}
                
                {/* Botón de volver al inicio (visible después de cada diálogo excepto en options) */}
                {!isTyping && dialogStage !== 'options' && dialogStage !== 'initial' && dialogStage !== 'didntAsk' && (
                  <button 
                    onClick={() => handleOptionClick('options')}
                    className="mt-4 text-center w-full px-3 py-2 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-md text-indigo-700 dark:text-indigo-300 transition-colors text-sm font-medium"
                  >
                    {t('dialog.backToOptions')}
                  </button>
                )}
                
                {/* Opciones o indicador para continuar */}
                {!isTyping && dialogStage === 'options' ? (
                  renderOptions()
                ) : !isTyping && dialogStage !== 'whyCaptured' && (
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RPGDialog; 