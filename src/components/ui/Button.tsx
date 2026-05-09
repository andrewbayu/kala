import { type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          // Variants
          'bg-crimson hover:bg-crimson-rich text-[#F5F0EB] border border-crimson-dark': variant === 'primary',
          'bg-transparent border border-[rgba(255,255,255,0.18)] text-[#F5F0EB] hover:border-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.04)]': variant === 'secondary',
          'bg-transparent text-[#A09896] hover:text-[#F5F0EB] border-0 px-0': variant === 'ghost',
          'bg-[#B83A35] hover:bg-[#9B2D2A] text-white border border-[#7a1f1e]': variant === 'danger',
          // Sizes
          'text-xs px-3 py-1.5 tracking-wide': size === 'sm',
          'text-sm px-5 py-2.5 tracking-wide': size === 'md',
          'text-base px-7 py-3.5 tracking-wide': size === 'lg',
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
