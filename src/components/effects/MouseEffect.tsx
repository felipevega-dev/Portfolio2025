import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MouseEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor */}
          <motion.div
            className="fixed pointer-events-none z-[100] mix-blend-difference"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.1
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              width: "8px",
              height: "8px",
            }}
          >
            <div className="w-full h-full bg-white rounded-full" />
          </motion.div>
          
          {/* Outer ring */}
          <motion.div
            className="fixed pointer-events-none z-[100] mix-blend-difference"
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              mass: 0.1
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              width: "32px",
              height: "32px",
            }}
          >
            <div className="w-full h-full border-2 border-white rounded-full opacity-75" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MouseEffect 