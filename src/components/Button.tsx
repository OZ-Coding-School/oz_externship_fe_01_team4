import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'register' | 'delete' | 'cancel'
  className?: string
}

const baseStyle = 'px-4 py-2 rounded font-semibold focus:outline-none '

const variantStyles = {
  register: 'bg-blue-500 hover:bg-blue-600 text-white',
  delete: 'bg-red-500 hover:bg-red-600 text-white',
  cancel: 'bg-gray-300 hover:bg-gray-400 text-black',
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'register',
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyles[variant]} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
