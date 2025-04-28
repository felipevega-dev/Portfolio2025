import { motion, Reorder, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect, useMemo, memo } from 'react'
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
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'languages' | 'frameworks'
}

// Componente memo para cada tarjeta de tecnología
const TechCard = memo(({ 
  tech, 
  isReordering, 
  hoveredTech,  
  handleMouseEnter, 
  handleMouseLeave, 
  handleClick,  
  handleTouchEnd, 
  handleDragStart,
  handleDragEnd,
  index,
  containerRef
}: { 
  tech: Technology, 
  isReordering: boolean, 
  hoveredTech: string | null, 
  showMessage: string | null,
  handleMouseEnter: (id: string) => void,
  handleMouseLeave: () => void,
  handleClick: (tech: Technology) => void,
  handleTouchEnd: () => void,
  handleDragStart: () => void,
  handleDragEnd: () => void,
  index: number,
  containerRef: React.RefObject<HTMLDivElement>
}) => {
  const Icon = tech.icon
  
  // Animación flotante aleatoria para los iconos
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
      delay: index * 0.2,
    }
  }
  
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
      drag={true}
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
      onTouchEnd={handleTouchEnd}
    >
      {/* RPG Tooltip - solo para desktop */}
      <AnimatePresence>
        {hoveredTech === tech.id && !isReordering && (
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

      <motion.div 
        className="relative w-16 h-16 mb-4 flex items-center justify-center"
        animate={floatingAnimation}
      >
        <Icon 
          className={`w-12 h-12 transition-all duration-300 group-hover:scale-110 ${
            tech.name === 'Next.js' || tech.name === 'PHP' ? 'dark:text-white' : ''
          }`}
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
})

TechCard.displayName = 'TechCard'

// Componente memo para el fondo de matriz
const MatrixBackground = memo(({ columns }: { columns: Array<{chars: string[], speed: number, color: string}> }) => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
      {columns.map((column, colIndex) => (
        <motion.div 
          key={colIndex}
          className="absolute top-0 text-xs font-mono"
          style={{ 
            left: `${(colIndex / columns.length) * 100}%`,
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
  )
})

MatrixBackground.displayName = 'MatrixBackground'

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
  
  // Crear columnas de Matrix una sola vez
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

  // Agrupación inicial de tecnologías por categoría
  const initialTechList: Technology[] = useMemo(() => [
    // Frontend
    { 
      id: '1', 
      name: 'HTML', 
      icon: SiHtml5, 
      color: 'rgb(227, 79, 38)', 
      darkColor: 'rgb(255, 122, 89)',
      message: t('technologies.HTML.initial'),
      category: 'frontend'
    },
    { 
      id: '2', 
      name: 'CSS', 
      icon: SiCss3, 
      color: 'rgb(21, 114, 182)', 
      darkColor: 'rgb(41, 160, 255)',
      message: t('technologies.CSS.initial'),
      category: 'frontend'
    },
    { 
      id: '5', 
      name: 'Tailwind', 
      icon: SiTailwindcss, 
      color: 'rgb(6, 182, 212)', 
      darkColor: 'rgb(34, 211, 238)',
      message: t('technologies.Tailwind.initial'),
      category: 'frontend'
    },
    { 
      id: '7', 
      name: 'React', 
      icon: SiReact, 
      color: 'rgb(97, 218, 251)', 
      darkColor: 'rgb(139, 228, 255)',
      message: t('technologies.React.initial'),
      category: 'frontend'
    },
    { 
      id: '9', 
      name: 'Next.js', 
      icon: SiNextdotjs, 
      color: 'rgb(50, 50, 50)', 
      darkColor: 'rgb(255, 255, 255)',
      message: t('technologies.Next.js.initial'),
      category: 'frontend'
    },
    
    // Lenguajes
    { 
      id: '3', 
      name: 'JavaScript', 
      icon: SiJavascript, 
      color: 'rgb(247, 223, 30)', 
      darkColor: 'rgb(255, 238, 88)',
      message: t('technologies.JavaScript.initial'),
      category: 'languages'
    },
    { 
      id: '4', 
      name: 'TypeScript', 
      icon: SiTypescript, 
      color: 'rgb(49, 120, 198)', 
      darkColor: 'rgb(78, 176, 255)',
      message: t('technologies.TypeScript.initial'),
      category: 'languages'
    },
    { 
      id: '6', 
      name: 'PHP', 
      icon: SiPhp, 
      color: 'rgb(71, 82, 107)', 
      darkColor: 'rgb(255, 123, 211)',
      message: t('technologies.PHP.initial'),
      category: 'languages'
    },
    { 
      id: '11', 
      name: 'Python', 
      icon: SiPython, 
      color: 'rgb(48, 105, 152)', 
      darkColor: 'rgb(78, 154, 221)',
      message: t('technologies.Python.initial'),
      category: 'languages'
    },
    
    // Backend
    { 
      id: '8', 
      name: 'Node.js', 
      icon: SiNodedotjs, 
      color: 'rgb(51, 153, 51)', 
      darkColor: 'rgb(83, 207, 83)',
      message: t('technologies.Node.js.initial'),
      category: 'backend'
    },
    { 
      id: '10', 
      name: 'Wordpress', 
      icon: SiWordpress, 
      color: 'rgb(71, 132, 143)', 
      darkColor: 'rgb(102, 189, 204)',
      message: t('technologies.Wordpress.initial'),
      category: 'backend'
    },
    { 
      id: '12', 
      name: 'Firebase', 
      icon: SiFirebase, 
      color: 'rgb(255, 202, 40)', 
      darkColor: 'rgb(255, 213, 79)',
      message: t('technologies.Firebase.initial'),
      category: 'backend'
    },
    { 
      id: '16', 
      name: 'Supabase', 
      icon: SiSupabase, 
      color: 'rgb(23, 117, 205)', 
      darkColor: 'rgb(35, 151, 240)',
      message: t('technologies.Supabase.initial'),
      category: 'database'
    },
    
    // Bases de datos
    { 
      id: '18', 
      name: 'PostgreSQL', 
      icon: SiPostgresql, 
      color: 'rgb(51, 103, 145)', 
      darkColor: 'rgb(81, 163, 229)',
      message: t('technologies.PostgreSQL.initial'),
      category: 'database'
    },
    
    // Herramientas
    { 
      id: '13', 
      name: 'Docker', 
      icon: SiDocker, 
      color: 'rgb(23, 117, 205)', 
      darkColor: 'rgb(35, 151, 240)',
      message: t('technologies.Docker.initial'),
      category: 'tools'
    },
    { 
      id: '14', 
      name: 'Git', 
      icon: SiGit, 
      color: 'rgb(220, 70, 50)', 
      darkColor: 'rgb(255, 122, 89)',
      message: t('technologies.Git.initial'),
      category: 'tools'
    },
    { 
      id: '15', 
      name: 'Vite', 
      icon: SiVite, 
      color: 'rgb(63, 184, 204)', 
      darkColor: 'rgb(102, 219, 240)',
      message: t('technologies.Vite.initial'),
      category: 'tools'
    },
    { 
      id: '17', 
      name: 'Laragon', 
      icon: SiLaragon, 
      color: 'rgb(23, 117, 205)', 
      darkColor: 'rgb(35, 151, 240)',
      message: t('technologies.Laragon.initial'),
      category: 'tools'
    },
  ], [t]);

  const [items, setItems] = useState<Technology[]>(initialTechList);

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

  // Botón para restaurar el orden original
  const restoreOriginalOrder = () => {
    setItems(initialTechList);
  };

  // Para optimizar renderizado - solo renderizamos cuando cambian items
  const techGridContent = useMemo(() => (
    <Reorder.Group 
      values={items} 
      onReorder={setItems}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 relative"
      axis="y"
      style={{
        touchAction: "none",
      }}
    >
      {items.map((tech: Technology, index: number) => (
        <TechCard
          key={tech.id}
          tech={tech}
          isReordering={isReordering}
          hoveredTech={hoveredTech}
          showMessage={showMessage}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleClick={handleClick}
          handleTouchEnd={handleTouchEnd}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          index={index}
          containerRef={containerRef}
        />
      ))}
    </Reorder.Group>
  ), [items, isReordering, hoveredTech, showMessage]);

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
          
          {/* Botón para restaurar orden original */}
          <button
            onClick={restoreOriginalOrder}
            className="mt-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium transition-colors"
            title="Restaurar orden original"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </motion.div>

        {isMobile && <MobileInstructions />}

        <div 
          className="relative p-8 rounded-2xl bg-slate-50/70 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
          ref={containerRef}
        >
          {/* Matrix-like animated code background - Memoizado para mejor rendimiento */}
          <MatrixBackground columns={matrixColumns} />
          
          {/* Tecnologías grid - Memoizado para mejor rendimiento */}
          {techGridContent}
        </div>
      </div>
    </section>
  )
}

export default memo(Technologies) 