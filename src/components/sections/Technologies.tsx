import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useMemo, memo, useRef } from 'react'
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, 
  SiTailwindcss, SiReact, SiNodedotjs, SiNextdotjs, 
  SiPython, SiPostgresql, SiFirebase, SiDocker,
  SiGit, SiVite, SiSupabase, SiLaragon, SiPhp, SiWordpress,
  SiMongodb, SiExpo
} from 'react-icons/si'
import RPGDialog from '../RPGDialog'
import { GiSpellBook, GiScrollUnfurled, GiMagicSwirl } from 'react-icons/gi'
import { useSoundContext } from '../../context/SoundContext'

// Componente para el "pergamino" de título
const SectionTitleScroll = ({ title }: { title: string }) => (
  <div className="relative mb-16">
    <div className="relative bg-cream-50 dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 p-6 rounded-lg shadow-md w-full md:w-1/2 mx-auto text-center">
      {/* Esquinas decorativas */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 -translate-y-0.5"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 -translate-y-0.5"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-500 -translate-x-0.5 translate-y-0.5"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-400 dark:border-indigo-500 translate-x-0.5 translate-y-0.5"></div>
      
      <div className="flex justify-center mb-2">
        <GiScrollUnfurled className="text-3xl text-indigo-600 dark:text-indigo-400" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{title}</h2>
      <div className="h-1 w-24 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto rounded-full"></div>
    </div>
    
    {/* Iconos decorativos */}
    <motion.div 
      className="absolute -top-6 -left-4 text-indigo-500/20 dark:text-indigo-400/20"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <GiMagicSwirl size={40} />
    </motion.div>
    
    <motion.div 
      className="absolute -bottom-6 -right-4 text-purple-500/20 dark:text-purple-400/20"
      animate={{ rotate: -360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <GiMagicSwirl size={40} />
    </motion.div>
  </div>
);

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
  handleClick,  
  handleTouchEnd,
  index
}: { 
  tech: Technology, 
  handleClick: (tech: Technology) => void,
  handleTouchEnd: () => void,
  index: number
}) => {
  const Icon = tech.icon
  const { play } = useSoundContext()
  
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

  const onCardClick = () => {
    play() // Play sound when card is clicked
    handleClick(tech)
  }
  
  return (
    <motion.div
      key={tech.id}
      className="rpg-card bg-cream-50 dark:bg-gray-800/90 rounded-md p-6 flex flex-col items-center group relative isolate overflow-visible cursor-pointer shadow-md border-2 border-indigo-600/30 dark:border-indigo-400/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onCardClick}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative corners for RPG style */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-indigo-600/50 dark:border-indigo-400/50 -translate-x-0.5 -translate-y-0.5"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-indigo-600/50 dark:border-indigo-400/50 translate-x-0.5 -translate-y-0.5"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-indigo-600/50 dark:border-indigo-400/50 -translate-x-0.5 translate-y-0.5"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-indigo-600/50 dark:border-indigo-400/50 translate-x-0.5 translate-y-0.5"></div>

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
    </motion.div>
  )
})

TechCard.displayName = 'TechCard'

// Componente de filtro de categoría estilo RPG
const CategoryButton = ({ 
  label, 
  active, 
  onClick 
}: { 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => {
  const { play } = useSoundContext()

  const handleClick = () => {
    play() // Play sound when category button is clicked
    onClick()
  }

  return (
    <motion.button
      className={`relative px-4 py-2 font-medium transition-all duration-300 ${
        active 
          ? 'text-white' 
          : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
      } focus:outline-none`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {/* Fondo activo */}
      {active && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md -z-10"
          layoutId="categoryBackground"
          initial={false}
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
      
      {/* Bordes decorativos RPG */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-indigo-400/50 dark:border-indigo-400/70"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-indigo-400/50 dark:border-indigo-400/70"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-indigo-400/50 dark:border-indigo-400/70"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-indigo-400/50 dark:border-indigo-400/70"></div>
      
      {/* Texto con efecto de brillo en hover */}
      <span className="relative z-10">{label}</span>
    </motion.button>
  )
}

const Technologies = () => {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeTech, setActiveTech] = useState<Technology | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const sectionRef = useRef<HTMLElement>(null)
  const { play } = useSoundContext()
  
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

  // Efecto para arreglar la navegación al ancla
  useEffect(() => {
    // Función para manejar el evento de hash change
    const handleHashChange = () => {
      if (window.location.hash === '#technologies' && sectionRef.current) {
        const yOffset = -80; // Ajusta esto según el tamaño de tu navbar
        const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    // Verificar el hash inicial cuando se carga la página
    if (window.location.hash === '#technologies') {
      // Pequeño retraso para asegurar que el componente esté renderizado
      setTimeout(handleHashChange, 500);
    }

    // Agregar listener para cambios en el hash
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleClick = (tech: Technology) => {
    // Play sound when the tech is clicked (in addition to the TechCard play)
    setActiveTech(tech);
    setDialogOpen(true);
  }
  
  const handleTouchEnd = () => {
    // Placeholder para compatibilidad con touch devices
  };

  // Agrupación inicial de tecnologías por categoría
  const techList: Technology[] = useMemo(() => [
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
      id: '19', 
      name: 'Expo', 
      icon: SiExpo, 
      color: 'rgb(85, 85, 85)', 
      darkColor: 'rgb(220, 220, 220)',
      message: t('technologies.Expo.initial'),
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
      category: 'backend'
    },
    
    // Herramientas y Bases de datos
    { 
      id: '13', 
      name: 'PostgreSQL', 
      icon: SiPostgresql, 
      color: 'rgb(51, 103, 145)', 
      darkColor: 'rgb(83, 147, 200)',
      message: t('technologies.PostgreSQL.initial'),
      category: 'database'
    },
    { 
      id: '20', 
      name: 'MongoDB', 
      icon: SiMongodb, 
      color: 'rgb(76, 175, 80)', 
      darkColor: 'rgb(102, 204, 102)',
      message: t('technologies.MongoDB.initial'),
      category: 'database'
    },
    { 
      id: '14', 
      name: 'Docker', 
      icon: SiDocker, 
      color: 'rgb(13, 134, 215)', 
      darkColor: 'rgb(47, 166, 246)',
      message: t('technologies.Docker.initial'),
      category: 'tools'
    },
    { 
      id: '15', 
      name: 'Git', 
      icon: SiGit, 
      color: 'rgb(240, 80, 50)', 
      darkColor: 'rgb(255, 110, 80)',
      message: t('technologies.Git.initial'),
      category: 'tools'
    },
    { 
      id: '17', 
      name: 'Vite', 
      icon: SiVite, 
      color: 'rgb(184, 26, 214)', 
      darkColor: 'rgb(220, 61, 251)',
      message: t('technologies.Vite.initial'),
      category: 'tools'
    },
    { 
      id: '18', 
      name: 'Laragon', 
      icon: SiLaragon, 
      color: 'rgb(0, 135, 90)', 
      darkColor: 'rgb(38, 173, 128)',
      message: t('technologies.Laragon.initial'),
      category: 'tools'
    },
  ], [t]);

  // Agrupar tecnologías por categoría
  const techs = useMemo(() => {
    const grouped = {
      all: techList,
      frontend: techList.filter(tech => tech.category === 'frontend'),
      languages: techList.filter(tech => tech.category === 'languages'),
      backend: techList.filter(tech => tech.category === 'backend'),
      tools: techList.filter(tech => tech.category === 'tools'),
      database: techList.filter(tech => tech.category === 'database')
    };
    
    return grouped[activeCategory as keyof typeof grouped] || grouped.all;
  }, [techList, activeCategory]);

  // Categorías para las pestañas
  const categories = [
    { id: 'all', label: t('technologies.categories.all') },
    { id: 'frontend', label: t('technologies.categories.frontend') },
    { id: 'languages', label: t('technologies.categories.languages') },
    { id: 'backend', label: t('technologies.categories.backend') },
    { id: 'tools', label: t('technologies.categories.tools') },
    { id: 'database', label: t('technologies.categories.database') }
  ];

  // Instrucciones móviles
  const MobileInstructions = () => (
    <motion.div 
      className="text-center mb-8 p-4 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span className="inline-block bg-indigo-500 text-white px-2 py-1 rounded-md mb-2">
          <GiSpellBook className="inline-block mr-1" /> {t('technologies.mobileInstructions.tip')}
        </span>
        <br />
        {t('technologies.mobileInstructions.text')}
      </p>
    </motion.div>
  );

  return (
    <section 
      id="technologies" 
      ref={sectionRef}
      className="py-24 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-1/3 h-1/3 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] rounded-full top-0 right-0" />
        <div className="absolute w-1/4 h-1/4 bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full bottom-1/2 left-0" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Título estilo RPG pergamino */}
        <SectionTitleScroll title={t('technologies.title')} />
        
        {/* Filtros de categoría estilo RPG */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <motion.div 
            className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-lg border border-indigo-100 dark:border-indigo-900/40 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category, i) => (
              <CategoryButton
                key={category.id}
                label={category.label}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Instrucciones móviles si es necesario */}
        {isMobile && <MobileInstructions />}
        
        {/* Grid de tecnologías */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {techs.map((tech, index) => (
            <TechCard
              key={tech.id}
              tech={tech}
              handleClick={handleClick}
              handleTouchEnd={handleTouchEnd}
              index={index}
            />
          ))}
        </div>

        {/* Diálogo RPG */}
        {dialogOpen && activeTech && (
          <RPGDialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            technology={activeTech.name}
            icon={activeTech.icon}
            iconColor={activeTech.darkColor}
          />
        )}
      </div>
    </section>
  )
}

export default Technologies 