import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useState, useRef } from 'react'

interface SkillCardProps {
  icon: string
  title: string
  description: string
  technologies: string[]
}

const SkillCard = ({ icon, title, description, technologies }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Mouse move 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const springConfig = { damping: 25, stiffness: 300 }
  const springX = useSpring(rotateX, springConfig)
  const springY = useSpring(rotateY, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    
    const xPct = ((mouseX - width / 2) / width) * 100
    const yPct = ((mouseY - height / 2) / height) * 100
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className="relative bg-white dark:bg-gray-800 rounded-xl p-6 transition-shadow duration-300"
      style={{
        transformStyle: "preserve-3d",
        rotateX: springX,
        rotateY: springY,
        boxShadow: isHovered 
          ? "0 20px 40px rgba(0,0,0,0.2)" 
          : "0 10px 20px rgba(0,0,0,0.1)"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient Border */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: "linear-gradient(45deg, #4F46E5, #EC4899)",
          opacity: 0,
          zIndex: -1
        }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon with floating animation */}
      <motion.div 
        className="w-12 h-12 mb-6"
        animate={{
          y: isHovered ? [-5, 5] : 0
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <img 
          src={icon} 
          alt={title} 
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Content */}
      <motion.h3 
        className="text-xl font-bold mb-3 text-gray-900 dark:text-white"
        style={{ transform: "translateZ(20px)" }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-600 dark:text-gray-300 mb-4"
        style={{ transform: "translateZ(10px)" }}
      >
        {description}
      </motion.p>

      {/* Technologies with staggered animation */}
      <motion.div 
        className="flex flex-wrap gap-2"
        style={{ transform: "translateZ(30px)" }}
      >
        {technologies.map((tech, index) => (
          <motion.span
            key={tech}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#4F46E5",
              color: "#FFFFFF"
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          opacity: 0,
          backgroundSize: "200% 100%",
          backgroundPosition: "100% 0",
          mixBlendMode: "overlay"
        }}
        animate={{
          opacity: isHovered ? [0, 0.1, 0] : 0,
          backgroundPosition: isHovered ? ["100% 0", "0% 0"] : "100% 0"
        }}
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}

export default SkillCard 