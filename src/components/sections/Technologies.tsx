import { motion, useAnimation, Reorder } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, 
  SiTailwindcss, SiReact, SiNodedotjs, SiNextdotjs, 
  SiPython, SiPostgresql, SiFirebase, SiDocker,
  SiGit, SiVite, SiSupabase, SiLaragon, SiPhp, SiWordpress
} from 'react-icons/si'
import { useEffect } from 'react'

interface Technology {
  id: string
  name: string
  icon: React.ElementType
  color: string
  darkColor: string
}

const Technologies = () => {
  const { t } = useTranslation()
  const [items, setItems] = useState<Technology[]>([
    { id: '1', name: 'HTML', icon: SiHtml5, color: 'rgb(227, 79, 38)', darkColor: 'rgb(255, 122, 89)' },
    { id: '2', name: 'CSS', icon: SiCss3, color: 'rgb(21, 114, 182)', darkColor: 'rgb(41, 160, 255)' },
    { id: '3', name: 'JavaScript', icon: SiJavascript, color: 'rgb(247, 223, 30)', darkColor: 'rgb(255, 238, 88)' },
    { id: '4', name: 'TypeScript', icon: SiTypescript, color: 'rgb(49, 120, 198)', darkColor: 'rgb(78, 176, 255)' },
    { id: '5', name: 'Tailwind', icon: SiTailwindcss, color: 'rgb(6, 182, 212)', darkColor: 'rgb(34, 211, 238)' },
    { id: '6', name: 'PHP', icon: SiPhp, color: 'rgb(71, 82, 107)', darkColor: 'rgb(255, 123, 211)' },
    { id: '7', name: 'React', icon: SiReact, color: 'rgb(97, 218, 251)', darkColor: 'rgb(139, 228, 255)' },
    { id: '8', name: 'Node.js', icon: SiNodedotjs, color: 'rgb(51, 153, 51)', darkColor: 'rgb(83, 207, 83)' },
    { id: '9', name: 'Next.js', icon: SiNextdotjs, color: 'rgb(50, 50, 50)', darkColor: 'rgb(255, 255, 255)' },
    { id: '10', name: 'Wordpress', icon: SiWordpress, color: 'rgb(71, 132, 143)', darkColor: 'rgb(102, 189, 204)' },
    { id: '11', name: 'Python', icon: SiPython, color: 'rgb(48, 105, 152)', darkColor: 'rgb(78, 154, 221)' },
    { id: '12', name: 'Firebase', icon: SiFirebase, color: 'rgb(255, 202, 40)', darkColor: 'rgb(255, 213, 79)' },
    { id: '13', name: 'Docker', icon: SiDocker, color: 'rgb(23, 117, 205)', darkColor: 'rgb(35, 151, 240)' },
    { id: '14', name: 'Git', icon: SiGit, color: 'rgb(220, 70, 50)', darkColor: 'rgb(255, 122, 89)' },
    { id: '15', name: 'Vite', icon: SiVite, color: 'rgb(63, 184, 204)', darkColor: 'rgb(102, 219, 240)' },
    { id: '16', name: 'Supabase', icon: SiSupabase, color: 'rgb(23, 117, 205)', darkColor: 'rgb(35, 151, 240)' },
    { id: '17', name: 'Laragon', icon: SiLaragon, color: 'rgb(23, 117, 205)', darkColor: 'rgb(35, 151, 240)' },
    { id: '18', name: 'PostgreSQL', icon: SiPostgresql, color: 'rgb(51, 103, 145)', darkColor: 'rgb(81, 163, 229)' }
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 relative"
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
                className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center group relative isolate overflow-hidden cursor-move"
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
              >
                {/* Enhanced Spotlight effect - más visible en modo claro */}
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