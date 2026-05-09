interface TopbarProps {
  title: string
}

function formatDate() {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 h-14 shrink-0"
      style={{
        background: 'var(--black-2)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <h1 className="font-body font-[700] text-[15px] text-white-primary tracking-[-0.01em]">{title}</h1>

      <div className="flex items-center gap-5">
        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className="live-dot w-2 h-2 rounded-full"
            style={{ background: '#4ADE80', display: 'inline-block' }}
          />
          <span className="font-mono text-[10px] tracking-widest" style={{ color: '#4ADE80' }}>LIVE</span>
        </div>

        {/* Date */}
        <span className="font-mono text-[10px]" style={{ color: 'var(--white-tertiary)' }}>
          {formatDate()}
        </span>

        {/* Avatar */}
        <div
          className="flex items-center justify-center w-7 h-7 rounded-full font-body font-[700] text-[11px] text-white-primary select-none"
          style={{ background: 'var(--crimson-surface)', border: '1px solid rgba(155,28,28,0.3)' }}
        >
          KA
        </div>
      </div>
    </header>
  )
}
