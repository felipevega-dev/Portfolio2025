import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface SectionHeadingProps {
  title: string
  centered?: boolean
}

const SectionHeading = ({ title, centered = true }: SectionHeadingProps) => {
  const { t } = useTranslation()
  
  return (
    <div className={`space-y-4 mb-10 ${centered ? 'text-center' : ''}`}>
      <motion.h2 
        className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        {t(title) || title}
      </motion.h2>
    </div>
  )
}

export default SectionHeading 