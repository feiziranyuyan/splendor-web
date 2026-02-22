interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200'
  
  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-400',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}
