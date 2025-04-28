import { motion, useAnimation, Reorder } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, 
  SiTailwindcss, SiReact, SiNodedotjs, SiNextdotjs, 
  SiPython, SiPostgresql, SiFirebase, SiDocker,
  SiGit, SiVite, SiSupabase, SiLaragon, SiPhp, SiWordpress
} from 'react-icons/si'

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

  const handleMouseEnter = (techId: string) => {
    const timer = window.setTimeout(() => {
      setHoveredTech(techId)
    }, 800) // Mostrar tooltip después de 800ms
    setHoverTimer(timer)
  }

  const handleMouseLeave = () => {
    if (hoverTimer) {
      window.clearTimeout(hoverTimer)
    }
    setHoveredTech(null)
  }

  const handleClick = (tech: Technology) => {
    if (hoveredTech === tech.id) {
      setShowMessage(tech.id)
      setTimeout(() => setShowMessage(null), 8000) // Ocultar mensaje después de 5 segundos
    }
  }

  const [items, setItems] = useState<Technology[]>([
    { 
      id: '1', 
      name: 'HTML', 
      icon: SiHtml5, 
      color: 'rgb(227, 79, 38)', 
      darkColor: 'rgb(255, 122, 89)',
      message: "¡Hola! Soy HTML, el esqueleto de la web. Sin mí, las páginas web serían como libros sin páginas. Me encanta organizar el contenido y darle estructura a todo. ¡Soy el mejor amigo de los desarrolladores desde 1993! 🏗️"
    },
    { 
      id: '2', 
      name: 'CSS', 
      icon: SiCss3, 
      color: 'rgb(21, 114, 182)', 
      darkColor: 'rgb(41, 160, 255)',
      message: "¡Qué tal! Soy CSS, la artista de la web. Me encargo de que todo se vea hermoso y responda a tus acciones. Sin mí, la web sería tan aburrida como un documento en blanco y negro. ¡Amo los gradientes y las animaciones! 🎨"
    },
    { 
      id: '3', 
      name: 'JavaScript', 
      icon: SiJavascript, 
      color: 'rgb(247, 223, 30)', 
      darkColor: 'rgb(255, 238, 88)',
      message: "¡Hey! Soy JavaScript, el alma de la interactividad web. Puedo hacer cualquier cosa: desde validar formularios hasta crear juegos completos. ¡Soy el lenguaje más versátil que conocerás! ⚡"
    },
    { 
      id: '4', 
      name: 'TypeScript', 
      icon: SiTypescript, 
      color: 'rgb(49, 120, 198)', 
      darkColor: 'rgb(78, 176, 255)',
      message: "Saludos, soy TypeScript. Soy como JavaScript pero con superpoderes. Me aseguro de que todo esté bien tipado y organizado. ¡Detecto errores antes de que sucedan! 🛡️"
    },
    { 
      id: '5', 
      name: 'Tailwind', 
      icon: SiTailwindcss, 
      color: 'rgb(6, 182, 212)', 
      darkColor: 'rgb(34, 211, 238)',
      message: "¡Hola! Soy Tailwind, el framework CSS que hace tu vida más fácil. ¿Clases utilitarias? ¡Son mi especialidad! Hago que el diseño sea rápido y consistente. 🌪️"
    },
    { 
      id: '6', 
      name: 'PHP', 
      icon: SiPhp, 
      color: 'rgb(71, 82, 107)', 
      darkColor: 'rgb(255, 123, 211)',
      message: "¡Hola mundo! Soy PHP, el veterano del backend. He estado alimentando la web desde 1995. WordPress me ama, y yo amo los arrays asociativos. ¿Sabías que el 78% de la web me usa? 🐘"
    },
    { 
      id: '7', 
      name: 'React', 
      icon: SiReact, 
      color: 'rgb(97, 218, 251)', 
      darkColor: 'rgb(139, 228, 255)',
      message: "¡Hola! Soy React, la biblioteca que revolucionó la web. Me encanta ser componente y reutilizable. ¡Y mi hook useState es el más popular de todos! ⚛️"
    },
    { 
      id: '8', 
      name: 'Node.js', 
      icon: SiNodedotjs, 
      color: 'rgb(51, 153, 51)', 
      darkColor: 'rgb(83, 207, 83)',
      message: "¡Hey! Soy Node.js, llevo JavaScript al servidor. Soy rápido, asíncrono y tengo miles de paquetes en npm. ¡El mundo del backend nunca fue tan divertido! 🚀"
    },
    { 
      id: '9', 
      name: 'Next.js', 
      icon: SiNextdotjs, 
      color: 'rgb(50, 50, 50)', 
      darkColor: 'rgb(255, 255, 255)',
      message: "¡Saludos! Soy Next.js, el framework que hace que React brille aún más. SSR, SSG, ISR... ¡tengo todas las siglas que necesitas! 🌟"
    },
    { 
      id: '10', 
      name: 'Wordpress', 
      icon: SiWordpress, 
      color: 'rgb(71, 132, 143)', 
      darkColor: 'rgb(102, 189, 204)',
      message: "¡Hola! Soy WordPress, el CMS más popular del mundo. ¡Impulso el 43% de la web! Plugins, temas... ¡tengo de todo! 📝"
    },
    { 
      id: '11', 
      name: 'Python', 
      icon: SiPython, 
      color: 'rgb(48, 105, 152)', 
      darkColor: 'rgb(78, 154, 221)',
      message: "¡Hola! Soy Python, el lenguaje más amigable que conocerás. Me encanta la IA, el análisis de datos y la simplicidad. ¡Incluso las serpientes reales me tienen envidia! 🐍"
    },
    { 
      id: '12', 
      name: 'Firebase', 
      icon: SiFirebase, 
      color: 'rgb(255, 202, 40)', 
      darkColor: 'rgb(255, 213, 79)',
      message: "¡Hola! Soy Firebase, tu backend en la nube. Autenticación, base de datos en tiempo real, hosting... ¡Lo hago todo! ¡Y en tiempo real! 🔥"
    },
    { 
      id: '13', 
      name: 'Docker', 
      icon: SiDocker, 
      color: 'rgb(23, 117, 205)', 
      darkColor: 'rgb(35, 151, 240)',
      message: "¡Ahoy! Soy Docker, el rey de los contenedores. Empaqueto aplicaciones con todo lo que necesitan. ¡Funciona en mi máquina y en todas las demás! 🐳"
    },
    { 
      id: '14', 
      name: 'Git', 
      icon: SiGit, 
      color: 'rgb(220, 70, 50)', 
      darkColor: 'rgb(255, 122, 89)',
      message: "¡Hola! Soy Git, el guardián del código. Guardo cada cambio que haces y puedo viajar en el tiempo. ¡Nunca perderás tu código conmigo! 🌳"
    },
    { 
      id: '15', 
      name: 'Vite', 
      icon: SiVite, 
      color: 'rgb(63, 184, 204)', 
      darkColor: 'rgb(102, 219, 240)',
      message: "¡Hola! Soy Vite, el build tool más rápido del oeste. HMR instantáneo y builds ultrarrápidos son mi especialidad. ¡Soy veloz como un rayo! ⚡"
    },
    { 
      id: '16', 
      name: 'Supabase', 
      icon: SiSupabase, 
      color: 'rgb(23, 117, 205)', 
      darkColor: 'rgb(35, 151, 240)',
      message: "¡Hey! Soy Supabase, la alternativa open source a Firebase. PostgreSQL, autenticación, y APIs en tiempo real. ¡Y todo con SQL! 🚀"
    },
    { 
      id: '17', 
      name: 'Laragon', 
      icon: SiLaragon, 
      color: 'rgb(23, 117, 205)', 
      darkColor: 'rgb(35, 151, 240)',
      message: "¡Hola! Soy Laragon, el entorno de desarrollo más amigable para Windows. Apache, MySQL, PHP... ¡todo en un solo click! 🎯"
    },
    { 
      id: '18', 
      name: 'PostgreSQL', 
      icon: SiPostgresql, 
      color: 'rgb(51, 103, 145)', 
      darkColor: 'rgb(81, 163, 229)',
      message: "¡Saludos! Soy PostgreSQL, la base de datos relacional más avanzada. ACID, JSON nativo, y extensiones poderosas. ¡Soy el elefante que nunca olvida tus datos! 🐘"
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

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fondo animado */}
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

        <Reorder.Group 
          values={items} 
          onReorder={setItems}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 relative p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl"
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
                className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center group relative isolate overflow-visible cursor-move shadow-lg border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 1.05, cursor: "grabbing" }}
                drag
                dragConstraints={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}
                dragElastic={0.1}
                dragMomentum={false}
                layout
                onMouseEnter={() => handleMouseEnter(tech.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(tech)}
              >
                {/* RPG Tooltip */}
                {hoveredTech === tech.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap z-50 pointer-events-none"
                  >
                    Click para más info
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-8 border-transparent border-t-black" />
                  </motion.div>
                )}

                {/* RPG Message */}
                {showMessage === tech.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl text-sm w-64 shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-700 rotate-45" />
                    {tech.message}
                  </motion.div>
                )}

                {/* Enhanced Spotlight effect */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/40 group-hover:via-purple-600/20 group-hover:to-purple-600/5 dark:group-hover:from-purple-400/30 dark:group-hover:via-purple-400/10 dark:group-hover:to-purple-400/0 transition-all duration-500 rounded-xl blur-2xl scale-110" />
                </div>

                {/* Enhanced Card glow effect */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/0 via-transparent to-transparent group-hover:from-purple-600/30 dark:group-hover:from-purple-400/20 rounded-xl transition-all duration-500"
                />

                {/* Enhanced Content shadow */}
                <div className="absolute inset-0 -z-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-purple-600/0 group-hover:shadow-purple-600/40 dark:group-hover:shadow-purple-400/30 transition-all duration-500" />

                {/* Shine effect */}
                <div className="absolute inset-0 translate-x-full group-hover:translate-x-[-250%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out -z-10" />

                <motion.div 
                  className="relative w-16 h-16 mb-4 flex items-center justify-center"
                  animate={floatingAnimation(index)}
                >
                  <Icon 
                    className="w-12 h-12 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(147,51,234,0.7)] dark:group-hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.5)]" 
                    style={{ 
                      color: tech.color,
                      filter: 'var(--tw-prose-invert, none) var(--tw-prose-body, brightness(1.3))'
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
    </section>
  )
}

export default Technologies 