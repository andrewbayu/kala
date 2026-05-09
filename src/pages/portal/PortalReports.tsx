import Badge from '../../components/ui/Badge'

const REPORTS = [
  {
    name: 'Audience Persona Report',
    desc: 'Siapa penonton targetmu, di mana mereka, dan bagaimana perilaku digital mereka.',
    type: 'Intelligence',
    date: '2026-03-10',
    status: 'ready' as const,
    pages: 24,
  },
  {
    name: 'Sentiment Baseline Report',
    desc: 'Tonalitas publik terhadap genre Animasi dan cast filmmu — pre-campaign baseline.',
    type: 'Intelligence',
    date: '2026-03-15',
    status: 'ready' as const,
    pages: 18,
  },
  {
    name: '12-Week Campaign Roadmap',
    desc: 'Rencana kampanye lengkap: phase, KPI per minggu, channel breakdown, budget allocation.',
    type: 'Strategy',
    date: '2026-04-01',
    status: 'ready' as const,
    pages: 42,
  },
  {
    name: 'KOL Matching Report — Batch 1',
    desc: 'Daftar 40 kreator yang direkomendasikan berdasarkan audience overlap analysis.',
    type: 'KOL',
    date: '2026-04-20',
    status: 'ready' as const,
    pages: 15,
  },
  {
    name: 'Weekly Performance Report — Mei W1',
    desc: 'Performa campaign minggu pertama Mei: impressions, engagement, KOL results.',
    type: 'Reporting',
    date: '2026-05-07',
    status: 'ready' as const,
    pages: 12,
  },
  {
    name: 'Weekly Performance Report — Mei W2',
    desc: 'Performa campaign minggu kedua Mei — akan tersedia Jumat, 16 Mei 2026.',
    type: 'Reporting',
    date: '2026-05-16',
    status: 'upcoming' as const,
    pages: 0,
  },
  {
    name: 'Pre-sale Attribution Report',
    desc: 'Analisis pre-sale TIX ID: traffic source, conversion funnel, KOL attribution.',
    type: 'Attribution',
    date: '2026-06-10',
    status: 'upcoming' as const,
    pages: 0,
  },
  {
    name: 'Post-Campaign Full Attribution',
    desc: 'Full attribution report: setiap rupiah marketing di-trace ke pembelian tiket.',
    type: 'Reporting',
    date: '2026-07-20',
    status: 'upcoming' as const,
    pages: 0,
  },
]

const typeColors: Record<string, 'info' | 'warning' | 'gold' | 'crimson' | 'success' | 'default'> = {
  Intelligence: 'info',
  Strategy: 'gold',
  KOL: 'warning',
  Reporting: 'crimson',
  Attribution: 'success',
}

export default function PortalReports() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1">Client Portal · Laporan</p>
        <h1 className="font-display text-2xl font-light text-[#F2EFE6] mb-1">Laporan & Deliverables</h1>
        <p className="font-body text-sm text-[#B8B5AA]">Semua dokumen campaign Garuda di Dadaku Animasi.</p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">Filter:</span>
        {['Semua', 'Intelligence', 'Strategy', 'KOL', 'Reporting', 'Attribution'].map(f => (
          <button
            key={f}
            className={`font-mono text-[10px] px-3 py-1.5 border transition-all ${
              f === 'Semua' ? 'border-crimson text-[#F2EFE6] bg-[rgba(155,28,28,0.08)]' : 'border-[#2A2A3E] text-[#5A5655] hover:border-[rgba(255,255,255,0.15)]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {REPORTS.map((report, i) => (
          <div
            key={i}
            className={`border bg-[#1A1A28] p-5 flex items-center justify-between gap-4 transition-all ${
              report.status === 'ready'
                ? 'border-[#2A2A3E] hover:border-[rgba(255,255,255,0.15)]'
                : 'border-[rgba(255,255,255,0.04)] opacity-50'
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              <div className={`w-8 h-8 border flex items-center justify-center shrink-0 mt-0.5 ${
                report.status === 'ready' ? 'border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.05)]' : 'border-[#2A2A3E]'
              }`}>
                {report.status === 'ready' ? (
                  <svg className="w-4 h-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-[#5A5655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className={`font-body text-sm ${report.status === 'ready' ? 'text-[#F2EFE6]' : 'text-[#B8B5AA]'}`}>
                    {report.name}
                  </p>
                  <Badge variant={typeColors[report.type] ?? 'default'}>{report.type}</Badge>
                </div>
                <p className="font-body text-xs text-[#5A5655]">{report.desc}</p>
                <p className="font-mono text-[10px] text-[#5A5655] mt-1">
                  {report.status === 'ready'
                    ? `Tersedia ${new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} · ${report.pages} halaman`
                    : `Dijadwalkan ${new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`
                  }
                </p>
              </div>
            </div>

            {report.status === 'ready' && (
              <button className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[#D4A853] border border-[rgba(212,168,83,0.2)] px-3 py-2 hover:bg-[rgba(212,168,83,0.06)] transition-all">
                Download PDF
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-8 border border-[#2A2A3E] bg-[#1A1A28] p-5">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-2">Butuh Sesuatu?</p>
        <p className="font-body text-sm text-[#B8B5AA]">
          Hubungi tim KALA di{' '}
          <a href="mailto:hello@kala.id" className="text-crimson hover:text-crimson-rich transition-colors">
            hello@kala.id
          </a>{' '}
          atau WhatsApp. Response dalam 24 jam pada hari kerja.
        </p>
      </div>
    </div>
  )
}
