import { AlertTriangle } from 'lucide-react'

interface AlertBannerProps {
  filmTitle: string
  message: string
}

export default function AlertBanner({ filmTitle, message }: AlertBannerProps) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-[8px]"
      style={{
        background: 'rgba(224,123,57,0.08)',
        border: '1px solid rgba(224,123,57,0.2)',
      }}
    >
      <AlertTriangle size={14} className="mt-0.5 shrink-0" style={{ color: '#E07B39' }} />
      <div>
        <p className="font-body font-[600] text-[12px] text-white-primary">
          Awareness gap terdeteksi — {filmTitle}
        </p>
        <p className="font-body text-[12px] text-white-secondary mt-0.5">{message}</p>
      </div>
    </div>
  )
}
