import { ReactNode, forwardRef } from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { useSoundContext } from '../../context/SoundContext'

interface LinkProps extends RouterLinkProps {
  children: ReactNode
  className?: string
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className = '', onClick, ...props }, ref) => {
    const { play } = useSoundContext()

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      play() // Play sound when link is clicked
      if (onClick) {
        onClick(event)
      }
    }

    return (
      <RouterLink
        ref={ref}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </RouterLink>
    )
  }
)

Link.displayName = 'Link'

export default Link 