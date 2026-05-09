import type { BoxScenario } from '@/lib/types'

const accentColor: Record<BoxScenario['label'], string> = {
  Bear: '#E07B39',
  Base: '#9B1C1C',
  Bull: '#4ADE80',
}

const bgColor: Record<BoxScenario['label'], string> = {
  Bear: 'rgba(224,123,57,0.04)',
  Base: 'rgba(155,28,28,0.06)',
  Bull: 'rgba(74,222,128,0.04)',
}

export default function ScenarioCard({ scenario }: { scenario: BoxScenario }) {
  const color = accentColor[scenario.label]
  const bg = bgColor[scenario.label]

  return (
    <div
      className="rounded-[10px] p-5 flex flex-col gap-3"
      style={{
        background: bg,
        border: `1px solid ${color}30`,
        borderTop: `2px solid ${color}`,
      }}
    >
      <div>
        <p className="font-body font-[700] text-[15px] text-white-primary">{scenario.label}</p>
        <p className="font-mono text-[10px] mt-0.5" style={{ color }}>{scenario.subtitle}</p>
      </div>
      <div className="h-px bg-white/[0.06]" />
      <div className="space-y-1.5">
        <div>
          <p className="eyebrow mb-1">Est. Admissions</p>
          <p className="font-mono font-[500] text-[22px] text-white-primary tracking-[-0.02em]">
            {scenario.admissions}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-1">Est. Revenue</p>
          <p className="font-mono text-[13px] text-white-secondary">{scenario.revenue}</p>
        </div>
      </div>
    </div>
  )
}
