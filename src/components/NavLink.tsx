import { ReactNode } from 'react'
import { useSoundContext } from '../context/SoundContext'

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

const NavLink = ({ href, children, className = '', onClick }: NavLinkProps) => {
  const { play } = useSoundContext()

  const handleClick = (e: React.MouseEvent) => {
    play() // Play sound when link is clicked
    
    // If href is anchor link, handle smooth scroll
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      // Call provided onClick callback if exists
      if (onClick) onClick()
    }
  }

  return (
    <a 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

export default NavLink 