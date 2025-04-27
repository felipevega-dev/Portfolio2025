import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  gradient: string
}

const ServiceCard = ({ title, description, icon, gradient }: ServiceCardProps) => {
  return (
    <motion.div
      className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Gradient Border */}
      <div className={`absolute inset-0 rounded-2xl ${gradient} opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl`} />
      
      {/* Icon */}
      <div className="mb-6 relative w-16 h-16">
        <div className={`absolute inset-0 ${gradient} opacity-20 rounded-2xl`} />
        <div className="relative h-full flex items-center justify-center text-3xl">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  )
}

export default ServiceCard 