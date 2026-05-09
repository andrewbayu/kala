import { mockCampaigns, mockFilms, campaignChartData, mockFilmSimResults } from '../../data/mockData'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Badge from '../../components/ui/Badge'

function KpiCard({ kpi }: { kpi: { label: string; target: number; current: number; unit: string; trend: 'up' | 'down' | 'stable' } }) {
  const pct = Math.min(100, Math.round((kpi.current / kpi.target) * 100))
  const fmt = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n)

  return (
    <div className="border border-[#2A2A3E] bg-[#1A1A28] p-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-3">{kpi.label}</p>
      <div className="flex items-end justify-between mb-3">
        <p className="font-display text-2xl font-light text-[#F2EFE6]">{fmt(kpi.current)}<span className="font-mono text-xs text-[#5A5655] ml-1">{kpi.unit}</span></p>
        <p className="font-mono text-[10px] text-[#5A5655]">Target: {fmt(kpi.target)}</p>
      </div>
      <div className="h-1.5 bg-[#2A2A3E] rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-700 ${pct >= 80 ? 'bg-[#4ade80]' : pct >= 50 ? 'bg-[#D4A853]' : 'bg-crimson'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#B8B5AA]">{pct}% dari target</span>
        {kpi.trend === 'up' && <span className="font-mono text-[10px] text-[#4ade80]">↑ on track</span>}
        {kpi.trend === 'down' && <span className="font-mono text-[10px] text-[#B83A35]">↓ review needed</span>}
        {kpi.trend === 'stable' && <span className="font-mono text-[10px] text-[#D4A853]">→ monitor</span>}
      </div>
    </div>
  )
}

export default function PortalDashboard() {
  const campaign = mockCampaigns[0]
  const film = mockFilms.find(f => f.id === campaign.filmId)
  const filmSim = mockFilmSimResults[campaign.filmId]

  function fmtRp(n: number) { return `Rp ${(n / 1000000000).toFixed(1)}M` }
  function fmt(n: number) { return n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n) }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1">Client Portal · BASE Entertainment</p>
          <h1 className="font-display text-2xl font-light text-[#F2EFE6] mb-1">{film?.title}</h1>
          <div className="flex items-center gap-3">
            <Badge variant="warning">Pre-Release</Badge>
            <span className="font-mono text-[10px] text-[#5A5655]">
              Rilis {film ? new Date(film.targetReleaseDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
            </span>
          </div>
        </div>
        <div className="border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.05)] px-4 py-2">
          <span className="font-mono text-[10px] text-[#4ade80] uppercase tracking-wider">Campaign Active</span>
        </div>
      </div>

      {/* FilmSim quick view */}
      {filmSim && (
        <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5 mb-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">FilmSim™ Projection · Box Office Forecast</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'BEAR', color: 'text-[#B83A35]', admissions: filmSim.bear.admissions, rev: filmSim.bear.revenue },
              { label: 'BASE', color: 'text-[#D4A853]', admissions: filmSim.base.admissions, rev: filmSim.base.revenue },
              { label: 'BULL', color: 'text-[#4ade80]', admissions: filmSim.bull.admissions, rev: filmSim.bull.revenue },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${s.color}`}>{s.label}</p>
                <p className={`font-display text-2xl font-light ${s.color}`}>{fmt(s.admissions)}</p>
                <p className="font-mono text-[10px] text-[#5A5655]">admisi</p>
                <p className="font-mono text-xs text-[#B8B5AA] mt-1">{fmtRp(s.rev)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#2A2A3E] flex items-center justify-between">
            <p className="font-mono text-[10px] text-[#5A5655]">Window: {filmSim.recommendedWindow}</p>
            <p className="font-mono text-[10px] text-[#5A5655]">Confidence: {filmSim.confidence}%</p>
          </div>
        </div>
      )}

      {/* Campaign timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Timeline Campaign</p>
          <div className="space-y-3">
            {campaign.phases.map((phase, i) => (
              <div key={i} className={`flex items-start gap-3 ${phase.status === 'upcoming' ? 'opacity-40' : ''}`}>
                <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                  phase.status === 'completed' ? 'bg-[#4ade80]' :
                  phase.status === 'active' ? 'bg-crimson live-dot' : 'bg-[#2A2A3E]'
                }`} />
                <div>
                  <p className="font-body text-xs text-[#F2EFE6]">{phase.name}</p>
                  <p className="font-mono text-[9px] text-[#5A5655]">{phase.startDate} → {phase.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance chart */}
        <div className="lg:col-span-2 border border-[#2A2A3E] bg-[#1A1A28] p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Campaign Impressions · Progress</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={campaignChartData}>
              <defs>
                <linearGradient id="gradPortal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9B1C1C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9B1C1C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#5A5655', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5A5655', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ background: '#1A1A28', border: '1px solid #2A2A3E', fontSize: 11, fontFamily: 'DM Mono', color: '#F2EFE6' }} formatter={(v: number) => [`${(v / 1000000).toFixed(1)}M impressions`]} />
              <Area type="monotone" dataKey="impressions" stroke="#9B1C1C" strokeWidth={2} fill="url(#gradPortal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-3">KPI Progress</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {campaign.kpis.map((kpi, i) => (
            <KpiCard key={i} kpi={kpi} />
          ))}
        </div>
      </div>

      {/* Actionable steps visible to client */}
      {filmSim && (
        <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Langkah Kritis — Rekomendasi KALA</p>
          <ul className="space-y-2.5">
            {filmSim.actionableSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="font-mono text-[10px] text-crimson mt-0.5 shrink-0">0{i + 1}</span>
                <p className="font-body text-sm text-[#B8B5AA]">{step}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
