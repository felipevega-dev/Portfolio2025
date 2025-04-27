import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stars = useRef<Star[]>([])
  const animationFrameId = useRef<number>()

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
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 3000)
      
      for (let i = 0; i < numStars; i++) {
        stars.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random()
        })
      }
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.current.forEach(star => {
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Update star position
        star.y = (star.y + star.speed) % canvas.height
        
        // Twinkle effect
        star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.5 + 0.5
      })

      animationFrameId.current = requestAnimationFrame(drawStars)
    }

    resizeCanvas()
    createStars()
    drawStars()

    window.addEventListener('resize', () => {
      resizeCanvas()
      createStars()
    })

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-100 transition-opacity duration-500"
    />
  )
}

export default StarField 