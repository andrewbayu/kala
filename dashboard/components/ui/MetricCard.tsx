interface MetricCardProps {
  label: string
  value: string
  sub: string
  subColor?: string
}

export default function MetricCard({ label, value, sub, subColor = 'text-white-secondary' }: MetricCardProps) {
  return (
    <div className="card hover:border-[rgba(255,255,255,0.12)] transition-all duration-150 hover:-translate-y-0.5">
      <p className="eyebrow mb-3">{label}</p>
      <p
        className="font-body font-[800] text-[28px] tracking-[-0.02em] text-white-primary leading-none mb-2"
        style={{ fontFamily: 'DM Mono, Courier New, monospace' }}
      >
        {value}
      </p>
      <p className={`font-mono text-[10px] ${subColor}`}>{sub}</p>
    </div>
  )
}
