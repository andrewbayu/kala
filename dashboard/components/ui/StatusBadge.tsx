import type { CampaignStatus } from '@/lib/types'

const config: Record<CampaignStatus, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-green-400/10 text-green-400 border border-green-400/20',
  },
  'pre-release': {
    label: 'Pre-release',
    className: 'bg-orange-400/10 text-orange-400 border border-orange-400/20',
  },
  post: {
    label: 'Post',
    className: 'bg-white-tertiary/10 text-white-tertiary border border-white-tertiary/20',
  },
}

export default function StatusBadge({ status }: { status: CampaignStatus }) {
  const { label, className } = config[status]
  return (
    <span className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-badge ${className}`}>
      {label}
    </span>
  )
}
