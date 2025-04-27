import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const technologies = [
  { name: 'React', icon: '/icons/react.svg', color: '#61DAFB' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178C6' },
  { name: 'Node.js', icon: '/icons/nodejs.svg', color: '#339933' },
  { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#000000' },
  { name: 'TailwindCSS', icon: '/icons/tailwind.svg', color: '#06B6D4' },
  { name: 'Three.js', icon: '/icons/threejs.svg', color: '#000000' },
  // Add more technologies you use
]

const TechStack = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('techStack.title')}
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div 
                className="w-20 h-20 rounded-lg flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg mb-4"
                style={{ borderColor: tech.color }}
              >
                <img src={tech.icon} alt={tech.name} className="w-12 h-12" />
              </div>
              <span className="text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack 