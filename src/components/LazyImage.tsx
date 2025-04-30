import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholderColor?: string
  effect?: 'blur' | 'fade' | 'none'
  wrapperClassName?: string
  onClick?: () => void
}

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderColor = '#f3f4f6',
  effect = 'blur',
  wrapperClassName = '',
  onClick
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Configurar el Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          // Una vez que la imagen está en vista, el observer ya no es necesario
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin: '100px', // Cargar las imágenes un poco antes de que entren en la vista
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const wrapperStyles = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholderColor
  } as React.CSSProperties

  // Variantes para los efectos de carga
  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.4, 
        ease: 'easeOut' 
      }
    }
  }

  return (
    <div 
      className={wrapperClassName} 
      style={wrapperStyles}
      onClick={onClick}
    >
      <motion.img
        ref={imgRef}
        src={isInView ? src : ''}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={imageVariants}
        style={{
          filter: effect === 'blur' && !isLoaded ? 'blur(10px)' : 'none',
          transition: 'filter 0.4s ease-out',
          opacity: effect === 'none' ? 1 : undefined
        }}
      />
      
      {/* Placeholder mientras carga */}
      {!isLoaded && (
        <div 
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: placeholderColor,
          }}
        />
      )}
    </div>
  )
}

export default LazyImage 