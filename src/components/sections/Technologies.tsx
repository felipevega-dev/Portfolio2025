import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, 
  SiTailwindcss, SiSocketdotio, SiReact, 
  SiNodedotjs, SiNextdotjs, SiElectron, SiPython
} from 'react-icons/si'

interface Technology {
  name: string
  icon: React.ElementType
  color: string
}

const Technologies = () => {
  const { t } = useTranslation()

  const technologies: Technology[] = [
    { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS', icon: SiCss3, color: '#1572B6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Socket.IO', icon: SiSocketdotio, color: '#010101' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'Electron', icon: SiElectron, color: '#47848F' },
    { name: 'Python', icon: SiPython, color: '#306998' }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Technologies and Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Mi stack tecnológico principal. Un conjunto de herramientas modernas que me permiten crear soluciones web robustas y escalables.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech: Technology, index: number) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={tech.name}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                  <Icon 
                    className="w-12 h-12 transition-transform duration-300 group-hover:scale-110" 
                    style={{ color: tech.color }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">{tech.name}</h3>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Technologies 