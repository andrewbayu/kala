import clsx from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'crimson' | 'gold'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-mono uppercase tracking-wider',
        {
          'text-xs px-2 py-0.5': size === 'sm',
          'text-sm px-3 py-1': size === 'md',
          'bg-[rgba(255,255,255,0.06)] text-[#A09896] border border-[rgba(255,255,255,0.10)]': variant === 'default',
          'bg-[rgba(74,222,128,0.1)] text-[#4ade80] border border-[rgba(74,222,128,0.2)]': variant === 'success',
          'bg-[rgba(224,123,57,0.1)] text-[#E07B39] border border-[rgba(224,123,57,0.2)]': variant === 'warning',
          'bg-[rgba(184,58,53,0.1)] text-[#B83A35] border border-[rgba(184,58,53,0.2)]': variant === 'danger',
          'bg-[rgba(107,103,212,0.1)] text-[#6B67D4] border border-[rgba(107,103,212,0.2)]': variant === 'info',
          'bg-[rgba(155,28,28,0.12)] text-[#B22222] border border-[rgba(155,28,28,0.25)]': variant === 'crimson',
          'bg-[rgba(212,168,83,0.1)] text-[#D4A853] border border-[rgba(212,168,83,0.2)]': variant === 'gold',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
