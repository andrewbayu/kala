interface ProgressBarProps {
  value: number
  className?: string
}

export default function ProgressBar({ value, className = '' }: ProgressBarProps) {
  return (
    <div className={`h-[3px] rounded-[2px] bg-white/[0.06] overflow-hidden ${className}`}>
      <div
        className="h-full rounded-[2px] bg-crimson transition-all duration-500"
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  )
}
