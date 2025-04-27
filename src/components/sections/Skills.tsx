import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SkillCard from '../SkillCard'

const skills = [
  {
    icon: '/icons/frontend.svg',
    title: 'Frontend Development',
    description: 'Desarrollo de interfaces modernas y responsivas con las últimas tecnologías web.',
    technologies: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Framer Motion']
  },
  {
    icon: '/icons/backend.svg',
    title: 'Backend Development',
    description: 'Construcción de APIs robustas y escalables con arquitecturas modernas.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST', 'GraphQL']
  },
  {
    icon: '/icons/mobile.svg',
    title: 'Mobile Development',
    description: 'Desarrollo de aplicaciones móviles multiplataforma con tecnologías web.',
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux']
  },
  {
    icon: '/icons/tools.svg',
    title: 'Development Tools',
    description: 'Uso de herramientas modernas para optimizar el flujo de desarrollo.',
    technologies: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Cypress']
  }
]

const Skills = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <h3 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              4+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('stats.experience')}
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              50+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('stats.projects')}
            </p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              15+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('stats.technologies')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills 