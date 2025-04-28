import { motion, useAnimation, Reorder, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, 
  SiTailwindcss, SiReact, SiNodedotjs, SiNextdotjs, 
  SiPython, SiPostgresql, SiFirebase, SiDocker,
  SiGit, SiVite, SiSupabase, SiLaragon, SiPhp, SiWordpress
} from 'react-icons/si'
import RPGDialog from '../RPGDialog'

interface Technology {
  id: string
  name: string
  icon: React.ElementType
  color: string
  darkColor: string
  message: string
}

const Technologies = () => {
  const { t } = useTranslation()
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState<string | null>(null)
  const [hoverTimer, setHoverTimer] = useState<number | null>(null)
  const [isReordering, setIsReordering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeTech, setActiveTech] = useState<Technology | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Código Matrix - caracteres aleatorios
  const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890123456789/*-+.?:;!@#$%^&*()_+=[]{}|<>";
  
  // Generar columnas de código para el fondo de Matrix
  const [matrixColumns, setMatrixColumns] = useState<Array<{chars: string[], speed: number, color: string}>>([]);
  
  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  useEffect(() => {
    // Crear columnas de códigos con caracteres aleatorios
    const columns = [];
    const numColumns = 30; // Número de columnas
    
    for (let i = 0; i < numColumns; i++) {
      const numChars = 15 + Math.floor(Math.random() * 15); // 15-30 caracteres por columna
      const chars = [];
      
      for (let j = 0; j < numChars; j++) {
        chars.push(matrixChars.charAt(Math.floor(Math.random() * matrixChars.length)));
      }
      
      // Colores tech variados pero discretos
      const colors = [
        'rgba(97, 218, 251, 0.7)', // React
        'rgba(240, 219, 79, 0.7)',  // JS
        'rgba(49, 120, 198, 0.7)',  // TS
        'rgba(227, 79, 38, 0.7)',   // HTML
        'rgba(21, 114, 182, 0.7)',  // CSS
        'rgba(51, 153, 51, 0.7)',   // Node
        'rgba(6, 182, 212, 0.7)',   // Tailwind
      ];
      
      columns.push({
        chars,
        speed: 0.5 + Math.random() * 2, // Velocidad aleatoria
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setMatrixColumns(columns);
  }, []);

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => {
      if (hoverTimer) window.clearTimeout(hoverTimer)
    }
  }, [hoverTimer])

  const handleMouseEnter = (techId: string) => {
    // Cancelar cualquier timer previo
    if (hoverTimer) {
      window.clearTimeout(hoverTimer)
    }
    
    // No mostrar tooltip si estamos reordenando
    if (isReordering) return
    
    const timer = window.setTimeout(() => {
      setHoveredTech(techId)
    }, 800) // Mostrar tooltip después de 800ms
    setHoverTimer(timer)
  }

  const handleMouseLeave = () => {
    if (hoverTimer) {
      window.clearTimeout(hoverTimer)
      setHoverTimer(null)
    }
    setHoveredTech(null)
  }

  const handleClick = (tech: Technology) => {
    // Tanto en móvil como en desktop, abrir el diálogo RPG
    setActiveTech(tech);
    setDialogOpen(true);
  }

  // Para móviles - toque largo (ya no necesario, pero lo mantenemos para compatibilidad)
  const handleTouchStart = (techId: string) => {
    if (isMobile && !isReordering) {
      // Ya no usamos el timer para mostrar el mensaje
      // Solo para compatibilidad con versiones anteriores
    }
  };
  
  const handleTouchEnd = () => {
    if (hoverTimer) {
      window.clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  const handleDragStart = () => {
    setIsReordering(true)
    // Ocultar tooltip y mensaje durante el drag
    setHoveredTech(null)
    setShowMessage(null)
    if (hoverTimer) {
      window.clearTimeout(hoverTimer)
      setHoverTimer(null)
    }
  }

  const handleDragEnd = () => {
    // Pequeño delay para evitar activar tooltips justo después de soltar
    setTimeout(() => {
      setIsReordering(false)
    }, 500)
  }

  const [items, setItems] = useState<Technology[]>([
    { 
      id: '1', 
      name: 'HTML', 
      icon: SiHtml5, 
      color: 'rgb(227, 79, 38)', 
      darkColor: 'rgb(255, 122, 89)',
      message: t('technologies.HTML.initial')
    },
    { 
      id: '2', 
      name: 'CSS', 
      icon: SiCss3, 
      color: 'rgb(21, 114, 182)', 
      darkColor: 'rgb(41, 160, 255)',
      message: t('technologies.CSS.initial')
    },
    { 
      id: '3', 
      name: 'JavaScript', 
      icon: SiJavascript, 
      color: 'rgb(247, 223, 30)', 
      darkColor: 'rgb(255, 238, 88)',
      message: t('technologies.JavaScript.initial')
    },
    { 
      id: '4', 
      name: 'TypeScript', 
      icon: SiTypescript, 
      color: 'rgb(49, 120, 198)', 
      darkColor: 'rgb(78, 176, 255)',
      message: t('technologies.TypeScript.initial')
    },
    { 
      id: '5', 
      name: 'Tailwind', 
      icon: SiTailwindcss, 
      color: 'rgb(6, 182, 212)', 
      darkColor: 'rgb(34, 211, 238)',
      message: t('technologies.Tailwind.initial')
    },
    { 
      id: '6', 
      name: 'PHP', 
      icon: SiPhp, 
      color: 'rgb(71, 82, 107)', 
      darkColor: 'rgb(255, 123, 211)',
      message: t('technologies.PHP.initial')
    },
    { 
      id: '7', 
      name: 'React', 
      icon: SiReact, 
      color: 'rgb(97, 218, 251)', 
      darkColor: 'rgb(139, 228, 255)',
      message: t('technologies.React.initial')
    },
    { 
      id: '8', 
      name: 'Node.js', 
      icon: SiNodedotjs, 
      color: 'rgb(51, 153, 51)', 
      darkColor: 'rgb(83, 207, 83)',
      message: t('technologies.Node.js.initial')
    },
    { 
      id: '9', 
      name: 'Next.js', 
      icon: SiNextdotjs, 
      color: 'rgb(50, 50, 50)', 
      darkColor: 'rgb(255, 255, 255)',
      message: t('technologies.Next.js.initial')
    },
    { 
      id: '10', 
      name: 'Wordpress', 
      icon: SiWordpress, 
      color: 'rgb(71, 132, 143)', 
      darkColor: 'rgb(102, 189, 204)',
      message: t('technologies.Wordpress.initial')
    },
    { 
      id: '11', 
      name: 'Python', 
      icon: SiPython, 
      color: 'rgb(48, 105, 152)', 
      darkColor: 'rgb(78, 154, 221)',
      message: t('technologies.Python.initial')
    },
    { 
      id: '12', 
      name: 'Firebase', 
      icon: SiFirebase, 
      color: 'rgb(255, 202, 40)', 
      darkColor: 'rgb(255, 213, 79)',
      message: t('technologies.Firebase.initial')
    },
    { 
      id: '13', 
      name: 'Docker', 
      icon: SiDocker, 
      color: 'rgb(23, 117, 205)', 
      darkColor: 'rgb(35, 151, 240)',
      message: t('technologies.Docker.initial')
    },
    { 
      id: '14', 
      name: 'Git', 
      icon: SiGit, 
      color: 'rgb(220, 70, 50)', 
      darkColor: 'rgb(255, 122, 89)',
      message: t('technologies.Git.initial')
    },
    { 
      id: '15', 
      name: 'Vite', 
      icon: SiVite, 
      color: 'rgb(63, 184, 204)', 
      darkColor: 'rgb(102, 219, 240)',
      message: t('technologies.Vite.initial')
    },
    { 
      id: '16', 
      name: 'Supabase', 
      icon: SiSupabase, 
      color: 'rgb(23, 117, 205)', 
      darkColor: 'rgb(35, 151, 240)',
      message: t('technologies.Supabase.initial')
    },
    { 
      id: '17', 
      name: 'Laragon', 
      icon: SiLaragon, 
      color: 'rgb(23, 117, 205)', 
      darkColor: 'rgb(35, 151, 240)',
      message: t('technologies.Laragon.initial')
    },
    { 
      id: '18', 
      name: 'PostgreSQL', 
      icon: SiPostgresql, 
      color: 'rgb(51, 103, 145)', 
      darkColor: 'rgb(81, 163, 229)',
      message: t('technologies.PostgreSQL.initial')
    }
  ])

  // Animación flotante aleatoria para los iconos
  const floatingAnimation = (index: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
      delay: index * 0.2,
    }
  })

  // Instrucciones para móviles
  const MobileInstructions = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-sm text-center border border-blue-200 dark:border-blue-800"
    >
      <p className="mb-2 font-medium">✨ ¡Interactúa con tus tecnologías!</p>
      <ul className="text-xs text-gray-600 dark:text-gray-300 flex flex-col gap-1">
        <li>• Toca una tecnología para conocer más sobre ella</li>
        <li>• Arrastra las tecnologías para reorganizarlas a tu gusto</li>
      </ul>
    </motion.div>
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Diálogo RPG */}
      {activeTech && (
        <RPGDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          technology={activeTech.name}
          icon={activeTech.icon}
          iconColor={activeTech.darkColor}
        />
      )}

      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 4,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            {t('technologies.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('technologies.description')}
          </p>
        </motion.div>
        
        {isMobile && <MobileInstructions />}

        <div 
          className="relative p-8 rounded-2xl bg-slate-50/70 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
          ref={containerRef}
        >
          {/* Matrix-like animated code background */}
          <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
            {matrixColumns.map((column, colIndex) => (
              <motion.div 
                key={colIndex}
                className="absolute top-0 text-xs font-mono"
                style={{ 
                  left: `${(colIndex / matrixColumns.length) * 100}%`,
                  color: column.color
                }}
                animate={{
                  y: ["0%", "100%"],
                }}
                transition={{
                  duration: column.speed * 10,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  delay: colIndex * 0.2
                }}
              >
                {column.chars.map((char, i) => (
                  <div key={i} className="opacity-80">
                    {char}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
          
          <Reorder.Group 
            values={items} 
            onReorder={setItems}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 relative"
            axis="y"
            style={{
              touchAction: "none",
            }}
          >
            {items.map((tech: Technology, index: number) => {
              const Icon = tech.icon
              return (
                <Reorder.Item
                  key={tech.id}
                  value={tech}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center group relative isolate overflow-visible cursor-move shadow-lg border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 1.05, cursor: "grabbing" }}
                  drag={!isMobile || (isMobile && !dialogOpen)}
                  dragConstraints={containerRef}
                  dragElastic={0.1}
                  dragMomentum={false}
                  dragSnapToOrigin={false}
                  layout="position"
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onMouseEnter={() => handleMouseEnter(tech.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(tech)}
                  onTouchStart={() => handleTouchStart(tech.id)}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* RPG Tooltip - solo para desktop */}
                  <AnimatePresence>
                    {hoveredTech === tech.id && !isReordering && !isMobile && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black dark:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap z-50 pointer-events-none text-center shadow-lg border border-gray-800 dark:border-gray-600"
                      >
                        Click para más info
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-8 border-transparent border-t-black dark:border-t-gray-900" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* RPG Message */}
                  <AnimatePresence>
                    {showMessage === tech.id && !isReordering && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl text-sm md:w-64 w-[250px] shadow-xl border border-gray-200 dark:border-gray-700 z-50 text-center"
                      >
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-700 rotate-45" />
                        {tech.message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div 
                    className="relative w-16 h-16 mb-4 flex items-center justify-center"
                    animate={floatingAnimation(index)}
                  >
                    <Icon 
                      className="w-12 h-12 transition-all duration-300 group-hover:scale-110" 
                      style={{ 
                        color: tech.color,
                        filter: 'var(--tw-dark) ? brightness(1.2) contrast(1.1) : contrast(0.95) brightness(0.95)'
                      }}
                    />
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {tech.name}
                  </motion.h3>
                </Reorder.Item>
              )
            })}
          </Reorder.Group>
        </div>
      </div>
    </section>
  )
}

export default Technologies 