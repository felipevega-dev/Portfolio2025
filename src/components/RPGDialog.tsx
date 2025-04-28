import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface RPGDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  name: string;
  icon: React.ElementType;
  iconColor: string;
}

const RPGDialog: React.FC<RPGDialogProps> = ({ 
  isOpen, 
  onClose, 
  message, 
  name, 
  icon: Icon, 
  iconColor 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const textRef = useRef<HTMLParagraphElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
  const activeTimersRef = useRef<number[]>([]);
  
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
    
    let index = 0;
    const messageLength = message.length;
    
    // Resetear el texto cuando se abre
    setDisplayedText('');
    
    // Función para animar la escritura
    const typeWriter = () => {
      // Iniciar el sonido al comienzo de la animación
      if (index === 0) {
        startTypingSound();
        // Mostrar la primera letra inmediatamente
        setDisplayedText(message.charAt(0));
        index = 1; // Comenzar desde la segunda letra en la próxima iteración
      }
      
      if (index < messageLength) {
        setDisplayedText(prev => prev + message.charAt(index));
        index++;
        
        // Velocidad variable para que se sienta natural
        const nextSpeed = Math.random() * 30 + 30; // 30-60ms
        const timerId = window.setTimeout(typeWriter, nextSpeed);
        activeTimersRef.current.push(timerId);
      } else {
        setIsTyping(false);
        stopTypingSound();
      }
    };
    
    // Comenzar animación
    const timerId = window.setTimeout(() => {
      typeWriter();
    }, 500);
    activeTimersRef.current.push(timerId);
    
    return () => {
      clearAllTimers();
    };
  }, [isOpen, message]);
  
  // Completar el texto inmediatamente al hacer clic
  const completeText = () => {
    if (isTyping) {
      // Detener la animación de escritura
      clearAllTimers();
      setDisplayedText(message);
      setIsTyping(false);
      stopTypingSound();
    } else {
      onClose();
    }
  };
  
  // Manejador de click fuera del diálogo
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
              <h3 className="font-medium text-lg">{name}</h3>
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
                    className={`text-sm text-gray-800 dark:text-gray-200 font-pixel min-h-[80px] ${isTyping ? 'typing' : ''}`}
                  >
                    {displayedText}
                  </p>
                  
                  {/* Indicador para continuar */}
                  {!isTyping && (
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