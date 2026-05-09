import { BarChart3 } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full min-h-[280px] rounded-[10px] text-center px-8"
      style={{
        background: 'var(--black-3)',
        border: '1px dashed rgba(255,255,255,0.10)',
      }}
    >
      <div className="mb-4 text-white-tertiary opacity-40">
        {icon ?? <BarChart3 size={32} strokeWidth={1} />}
      </div>
      <p className="font-body font-[600] text-[13px] text-white-secondary mb-1">{title}</p>
      <p className="font-body text-[12px] text-white-tertiary leading-[1.6] max-w-[240px]">{description}</p>
    </div>
  )
}
