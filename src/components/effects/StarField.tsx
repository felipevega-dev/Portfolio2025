import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../../context'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stars = useRef<Star[]>([])
  const animationFrameId = useRef<number>()
  const { isDarkMode } = useTheme()

  const lightModeColors = [
    'rgba(99, 102, 241, alpha)', // indigo
    'rgba(168, 85, 247, alpha)', // purple
    'rgba(236, 72, 153, alpha)', // pink
  ]

  // Función memoizada para redimensionar el canvas
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  // Función memoizada para crear estrellas
  const createStars = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    stars.current = []
    const numStars = Math.floor((window.innerWidth * window.innerHeight) / (isDarkMode ? 10000 : 3000))
    
    for (let i = 0; i < numStars; i++) {
      const color = isDarkMode 
        ? 'rgba(255, 255, 255, alpha)' 
        : lightModeColors[Math.floor(Math.random() * lightModeColors.length)]
      
      stars.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isDarkMode ? 1.5 : 3),
        speed: Math.random() * 0.2 + 0.1,
        opacity: Math.random(),
        color
      })
    }
  }, [isDarkMode, lightModeColors])

  // Función memoizada para dibujar estrellas
  const drawStars = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    stars.current.forEach(star => {
      ctx.beginPath()
      const opacity = isDarkMode ? star.opacity * 0.5 : star.opacity * 0.7
      ctx.fillStyle = star.color.replace('alpha', opacity.toString())
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fill()

      star.y = (star.y + star.speed) % canvas.height
      star.x += Math.sin(Date.now() * 0.0005 + star.y * 0.05) * 0.1
      if (star.x < 0) star.x = canvas.width
      if (star.x > canvas.width) star.x = 0
      
      star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.3 + 0.7
    })

    animationFrameId.current = requestAnimationFrame(drawStars)
  }, [isDarkMode])

  useEffect(() => {
    resizeCanvas()
    createStars()
    drawStars()

    const handleResize = () => {
      resizeCanvas()
      createStars()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [resizeCanvas, createStars, drawStars])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-60 transition-opacity duration-500"
    />
  )
}

export default StarField 