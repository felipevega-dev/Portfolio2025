import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const StarField = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; speed: number; opacity: number }>>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Actualizar tamaño de ventana para cálculos de posición
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Generar estrellas aleatorias
  useEffect(() => {
    if (!windowSize.width || !windowSize.height) return

    const starCount = Math.min(150, Math.floor(windowSize.width * windowSize.height / 5000))
    const newStars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      speed: 0.5 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.9
    }))

    setStars(newStars)
  }, [windowSize])

  // Efecto de seguimiento del mouse para paralaje
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (windowSize.width && windowSize.height) {
        // Normalizar la posición del mouse de 0 a 1
        setMousePosition({
          x: e.clientX / windowSize.width,
          y: e.clientY / windowSize.height
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [windowSize])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ perspective: '1000px' }}
    >
      {stars.map((star, i) => {
        // Calcular el efecto de paralaje basado en la posición del mouse
        const parallaxX = star.speed * (mousePosition.x - 0.5) * 20
        const parallaxY = star.speed * (mousePosition.y - 0.5) * 20
        
        return (
          <motion.div 
            key={i}
            className="parallax-star absolute rounded-full bg-white"
            animate={{
              x: `calc(${star.x}% + ${parallaxX}px)`,
              y: `calc(${star.y}% + ${parallaxY}px)`,
              opacity: [star.opacity, star.opacity * 0.5, star.opacity],
              scale: [1, 1.2, 1]
            }}
            transition={{
              x: { duration: 0.5, ease: "easeOut" },
              y: { duration: 0.5, ease: "easeOut" },
              opacity: { 
                duration: 2 + star.speed * 2, 
                repeat: Infinity,
                repeatType: "reverse"
              },
              scale: {
                duration: 3 + star.speed,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            style={{
              width: star.size,
              height: star.size,
              filter: `blur(${star.size <= 2 ? 0 : 0.5}px)`,
              background: `rgba(255, 255, 255, ${star.opacity})`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
              zIndex: Math.floor(star.speed * 10)
            }}
          />
        )
      })}

      {/* Nebulosas de fondo para profundidad */}
      <div className="absolute w-1/3 h-1/3 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[80px] rounded-full top-1/4 left-1/5" />
      <div className="absolute w-1/4 h-1/4 bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full top-1/2 right-1/4" />
      <div className="absolute w-1/5 h-1/5 bg-pink-500/5 dark:bg-pink-500/10 blur-[60px] rounded-full bottom-1/3 right-1/3" />

      {/* Estrellas fugaces ocasionales */}
      <motion.div
        className="absolute w-0.5 h-0.5 bg-white"
        initial={{ 
          x: "-5%", 
          y: "10%", 
          width: "0px", 
          height: "0px", 
          opacity: 0 
        }}
        animate={{ 
          x: "110%", 
          y: "60%", 
          width: "100px", 
          height: "1px", 
          opacity: [0, 1, 0],
          boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.7)"
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 7 + Math.random() * 15
        }}
      />
      
      <motion.div
        className="absolute w-0.5 h-0.5 bg-white"
        initial={{ 
          x: "100%", 
          y: "30%", 
          width: "0px", 
          height: "0px", 
          opacity: 0 
        }}
        animate={{ 
          x: "0%", 
          y: "70%", 
          width: "150px", 
          height: "1px", 
          opacity: [0, 1, 0],
          boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.7)"
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          repeatDelay: 8 + Math.random() * 20
        }}
      />
    </div>
  )
}

export default StarField 