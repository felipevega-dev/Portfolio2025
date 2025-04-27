import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 grid grid-cols-6 gap-2 opacity-5 dark:opacity-10 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="h-full w-full border-r border-gray-200 dark:border-gray-700" />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <motion.p 
            variants={itemVariants}
            className="text-lg text-indigo-600 dark:text-indigo-400 font-medium mb-4"
          >
            {t('hero.welcome')}
          </motion.p>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {t('hero.greeting')}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Felipe Vega
            </span>
          </motion.h1>

          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-medium mb-8"
          >
            {t('hero.role')}
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex gap-4"
          >
            <motion.a
              href="/CV-FelipeVega.pdf"
              className="px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              download
            >
              {t('hero.downloadCV')}
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.contact')}
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 flex items-center gap-8"
          >
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-indigo-600">5+</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Years of<br/>Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-indigo-600">50+</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Projects<br/>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-indigo-600">10+</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Technologies<br/>Mastered</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 