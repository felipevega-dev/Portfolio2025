import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SkillCard from '../SkillCard'

const skills = [
  {
    iconLight: '/icons/frontend.png',
    iconDark: '/icons/front-light.png',
    title: 'Frontend Development',
    description: 'Desarrollo de interfaces modernas y responsivas con las últimas tecnologías web.',
    technologies: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Wordpress']
  },
  {
    iconLight: '/icons/backend.png',
    iconDark: '/icons/backend-light.png',
    title: 'Backend Development',
    description: 'Construcción de APIs robustas y escalables con arquitecturas modernas.',
    technologies: ['Node.js', 'PostgreSQL', 'MongoDB', 'REST', 'PHP', 'Laravel']
  },
  {
    iconLight: '/icons/mobile.png',
    iconDark: '/icons/mobile-light.png',
    title: 'Mobile Development',
    description: 'Desarrollo de aplicaciones móviles multiplataforma con tecnologías web.',
    technologies: ['React Native', 'Expo', 'Ionic']
  },
  {
    iconLight: '/icons/tools.png',
    iconDark: '/icons/tools-light.png',
    title: 'Development Tools',
    description: 'Uso de herramientas modernas para optimizar el flujo de desarrollo.',
    technologies: ['Git', 'Docker', 'AWS', 'CI/CD', 'Firebase']
  }
]

const Skills = () => {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
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
      </div>
    </section>
  )
}

export default Skills 