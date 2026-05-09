import type { AudienceSegment } from '@/lib/types'

export default function SegmentCard({ segment }: { segment: AudienceSegment }) {
  return (
    <div
      className="rounded-[10px] p-4 flex flex-col gap-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-[rgba(155,28,28,0.3)]"
      style={{ background: 'var(--black-3)', border: '1px solid var(--border-subtle)' }}
    >
      <div>
        <p className="font-body font-[600] text-[13px] text-white-primary">{segment.name}</p>
        <p className="font-mono text-[10px] text-white-tertiary mt-0.5">{segment.ageRange} tahun</p>
      </div>
      <div className="flex flex-wrap gap-1">
        {segment.traits.map(trait => (
          <span
            key={trait}
            className="font-mono text-[9px] px-2 py-0.5 rounded-badge"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
              color: 'var(--white-secondary)',
            }}
          >
            {trait}
          </span>
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="eyebrow">Resonance</p>
          <span className="font-mono text-[10px] text-white-secondary">{segment.resonance}%</span>
        </div>
        <div className="h-[3px] rounded-[2px] bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-[2px] transition-all duration-700"
            style={{ width: `${segment.resonance}%`, background: 'var(--crimson)' }}
          />
        </div>
      </div>
    </div>
  )
}
