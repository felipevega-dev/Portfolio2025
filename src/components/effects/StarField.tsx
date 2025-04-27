import { useEffect, useRef } from 'react'

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
  const isDark = document.documentElement.classList.contains('dark')

  const lightModeColors = [
    'rgba(99, 102, 241, alpha)', // indigo
    'rgba(168, 85, 247, alpha)', // purple
    'rgba(236, 72, 153, alpha)', // pink
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      stars.current = []
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / (isDark ? 10000 : 3000))
      
      for (let i = 0; i < numStars; i++) {
        const color = isDark 
          ? 'rgba(255, 255, 255, alpha)' 
          : lightModeColors[Math.floor(Math.random() * lightModeColors.length)]
        
        stars.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (isDark ? 1.5 : 3),
          speed: Math.random() * 0.2 + 0.1,
          opacity: Math.random(),
          color
        })
      }
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.current.forEach(star => {
        ctx.beginPath()
        const opacity = isDark ? star.opacity * 0.5 : star.opacity * 0.7
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
    }

    resizeCanvas()
    createStars()
    drawStars()

    const handleThemeChange = () => {
      createStars()
    }

    window.addEventListener('resize', () => {
      resizeCanvas()
      createStars()
    })

    // Observe theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleThemeChange()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      observer.disconnect()
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-60 transition-opacity duration-500"
    />
  )
}

export default StarField 