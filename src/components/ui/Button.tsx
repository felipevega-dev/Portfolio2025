import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  className?: string
  fullWidth?: boolean
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/30",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800"
  }
  
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-2.5"
  }
  
  const classes = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${className}
  `
  
  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  )
} 