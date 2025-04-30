import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { useSoundContext } from '../../context/SoundContext'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg'
  children: ReactNode
}

const variantStyles = {
  default: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700',
  outline: 'border border-indigo-200 hover:bg-indigo-100 dark:border-indigo-800 dark:hover:bg-indigo-800 text-indigo-600 dark:text-indigo-400',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700',
  ghost: 'hover:bg-indigo-100 dark:hover:bg-indigo-800 dark:text-gray-100 dark:hover:text-white',
  link: 'underline-offset-4 hover:underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300',
}

const sizeStyles = {
  default: 'h-10 py-2 px-4',
  sm: 'h-9 px-3 rounded-md text-sm',
  lg: 'h-11 px-8 rounded-md text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, onClick, ...props }, ref) => {
    const { play } = useSoundContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      play(); // Play sound effect when button is clicked
      if (onClick) {
        onClick(event);
      }
    };

    const combinedClassNames = `
      inline-flex items-center justify-center rounded-md font-medium 
      transition-colors focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
      ${variantStyles[variant]} ${sizeStyles[size]} ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <button
        className={combinedClassNames}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button } 