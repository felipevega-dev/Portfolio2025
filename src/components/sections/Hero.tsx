import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'
import StarField from '../effects/StarField'

interface FloatingElementProps {
  children: ReactNode
  delay?: number
}

const FloatingElement = ({ children, delay = 0 }: FloatingElementProps) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
)

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

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
    <section id="hero" className="relative min-h-screen flex items-center bg-white dark:bg-gray-900 overflow-hidden pt-24 lg:pt-0">
      <StarField />

      {/* Background Number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-bold text-gray-100 dark:text-gray-800/50 select-none">
        01
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0}>
          <div className="absolute top-20 left-[20%] w-3 h-3 bg-purple-500/30 dark:bg-purple-500/50 rounded-full blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={1}>
          <div className="absolute top-40 right-[30%] w-3 h-3 bg-indigo-500/30 dark:bg-indigo-500/50 rounded-full blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="absolute bottom-32 left-[40%] w-3 h-3 bg-pink-500/30 dark:bg-pink-500/50 rounded-full blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={3}>
          <div className="absolute top-60 left-[60%] w-2 h-2 bg-blue-500/30 dark:bg-blue-500/50 rounded-full blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={4}>
          <div className="absolute bottom-40 right-[25%] w-2 h-2 bg-violet-500/30 dark:bg-violet-500/50 rounded-full blur-[1px]" />
        </FloatingElement>
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Photo Section - Right side in desktop */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-[300px] lg:max-w-[400px] aspect-square mx-auto lg:ml-auto order-first lg:order-last"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 blur-2xl opacity-30 dark:opacity-40" />
            <motion.div 
              className="relative h-full rounded-full overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/images/profile.png"
                alt="Felipe Vega"
                className="w-full h-full object-cover rounded-full bg-gray-100 dark:bg-gray-800"
              />
            </motion.div>

            {/* Tech Tags - Hidden in mobile */}
            <motion.div
              className="hidden lg:block absolute -left-4 top-8 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.1, x: 10 }}
            >
              <span className="font-mono text-sm text-indigo-600 dark:text-indigo-400">developer</span>
            </motion.div>
            <motion.div
              className="hidden lg:block absolute -right-4 top-1/3 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.1, x: -10 }}
            >
              <span className="font-mono text-sm text-purple-600 dark:text-purple-400">designer</span>
            </motion.div>
            <motion.div
              className="hidden lg:block absolute -left-4 bottom-1/3 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.1, x: 10 }}
            >
              <span className="font-mono text-sm text-pink-600 dark:text-pink-400">creative</span>
            </motion.div>
          </motion.div>

          <div className="max-w-2xl">
            <motion.div variants={itemVariants} className="mb-8 relative z-10">
              <span className="text-lg font-mono text-indigo-600 dark:text-indigo-400">
                {t('hero.welcome')} 
                <span className="inline-block w-12 h-[1px] ml-2 bg-indigo-600 dark:bg-indigo-400 align-middle" />
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              Hola, Soy{' '}
              <div className="mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  Felipe
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                  Vega
                </span>
              </div>
            </motion.h1>

            <motion.h2 
              variants={itemVariants}
              className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-6"
            >
              {t('hero.role')}
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-12 leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="/CV-FelipeVega.pdf"
                className="group relative px-8 py-3 text-white bg-indigo-600 rounded-lg overflow-hidden w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                download
              >
                <span className="relative z-10">{t('hero.downloadCV')}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.button
                onClick={() => smoothScrollTo('contact')}
                className="relative px-8 py-3 text-indigo-600 dark:text-indigo-400 rounded-lg overflow-hidden w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{t('hero.contact')}</span>
                <div className="absolute inset-0 border-2 border-indigo-600 dark:border-indigo-400 rounded-lg" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 