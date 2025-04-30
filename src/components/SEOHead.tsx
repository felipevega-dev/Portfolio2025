import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  article?: boolean
}

const SEOHead = ({
  title = 'Felipe Vega | Desarrollador de Software',
  description = 'Desarrollador de Software especializado en tecnologías web modernas y aplicaciones móviles. Portafolio de proyectos y habilidades.',
  image = '/images/og-image.png',
  article = false
}: SEOHeadProps) => {
  const { pathname } = useLocation()
  const siteUrl = window.location.origin

  // Actualizar el título de la página
  useEffect(() => {
    document.title = title
  }, [title])

  // Actualizar las meta etiquetas
  useEffect(() => {
    // Actualiza meta básicas
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description
      document.head.appendChild(meta)
    }

    // Actualiza meta tags de Open Graph
    updateMetaTag('og:title', title)
    updateMetaTag('og:description', description)
    updateMetaTag('og:image', `${siteUrl}${image}`)
    updateMetaTag('og:url', `${siteUrl}${pathname}`)
    updateMetaTag('og:type', article ? 'article' : 'website')

    // Actualiza meta tags de Twitter
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', `${siteUrl}${image}`)
  }, [title, description, image, article, pathname, siteUrl])

  // Función auxiliar para actualizar o crear meta tags
  const updateMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[property="${name}"]`) ||
               document.querySelector(`meta[name="${name}"]`)
    
    if (meta) {
      meta.setAttribute('content', content)
    } else {
      meta = document.createElement('meta')
      const isOg = name.startsWith('og:')
      if (isOg) {
        meta.setAttribute('property', name)
      } else {
        meta.setAttribute('name', name)
      }
      meta.setAttribute('content', content)
      document.head.appendChild(meta)
    }
  }

  // Este componente no renderiza nada visible
  return null
}

export default SEOHead 