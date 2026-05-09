import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { CityMetric } from '@/lib/types'

const TrendIcon = ({ trend }: { trend: CityMetric['trend'] }) => {
  if (trend === 'up')     return <TrendingUp size={11} className="text-green-400" />
  if (trend === 'down')   return <TrendingDown size={11} style={{ color: '#E07B39' }} />
  return <Minus size={11} className="text-white-tertiary" />
}

export default function CityBar({ city }: { city: CityMetric }) {
  const pctColor = city.alert
    ? 'text-orange-400'
    : city.pct >= 70
    ? 'text-green-400'
    : 'text-white-primary'

  return (
    <div className="flex items-center gap-4 py-3 border-b border-subtle last:border-0">
      <span className="font-body font-[500] text-[13px] text-white-primary w-[96px] shrink-0">{city.name}</span>
      <div className="flex-1 h-[4px] rounded-[2px] bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-[2px] transition-all duration-500"
          style={{ width: `${city.pct}%`, background: city.alert ? '#E07B39' : '#9B1C1C' }}
        />
      </div>
      <span className={`font-mono text-[11px] w-9 text-right shrink-0 ${pctColor}`}>
        {city.pct}%
      </span>
      <TrendIcon trend={city.trend} />
      {city.alert && (
        <span className="font-mono text-[9px] tracking-wide" style={{ color: '#E07B39' }}>perhatian</span>
      )}
    </div>
  )
}
