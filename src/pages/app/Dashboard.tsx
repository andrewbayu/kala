import { Link } from 'react-router-dom'
import { mockFilms, mockCampaigns, campaignChartData } from '../../data/mockData'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Badge from '../../components/ui/Badge'

const statusMap: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'default' | 'danger' }> = {
  'pre-release': { label: 'Pre-Release', variant: 'warning' },
  'production': { label: 'Produksi', variant: 'info' },
  'pre-production': { label: 'Pra-Produksi', variant: 'default' },
  'release': { label: 'Tayang', variant: 'success' },
  'development': { label: 'Pengembangan', variant: 'default' },
}

function StatCard({ label, value, sub, accent = false }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className={`border p-5 ${accent ? 'border-[rgba(155,28,28,0.3)] bg-[rgba(155,28,28,0.06)]' : 'border-[#2A2A3E] bg-[#1A1A28]'}`}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-2">{label}</p>
      <p className={`font-display text-3xl font-light mb-1 ${accent ? 'text-crimson' : 'text-[#F2EFE6]'}`}>{value}</p>
      <p className="font-mono text-[10px] text-[#B8B5AA]">{sub}</p>
    </div>
  )
}

export default function Dashboard() {
  const activeCampaign = mockCampaigns[0]
  const activePhase = activeCampaign.phases.find(p => p.status === 'active')

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1">KALA OS · Dashboard</p>
          <h1 className="font-display text-2xl font-light text-[#F2EFE6]">Overview</h1>
        </div>
        <div className="font-mono text-[10px] text-[#5A5655]">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="Film Aktif" value="3" sub="2 pre-release · 1 produksi" accent />
        <StatCard label="Total Impressions" value="28.4M" sub="↑ 34% dari bulan lalu" />
        <StatCard label="Campaign Running" value="1" sub="Garuda di Dadaku · Phase 3" />
        <StatCard label="KIE Resonance" value="92" sub="Penonton Keluarga · Top segment" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart */}
        <div className="lg:col-span-2 border border-[#2A2A3E] bg-[#1A1A28] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">Campaign Performance · Garuda di Dadaku</p>
            <Badge variant="success">Active</Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={campaignChartData}>
              <defs>
                <linearGradient id="gradCrimson" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9B1C1C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9B1C1C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#5A5655', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5A5655', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ background: '#1A1A28', border: '1px solid #2A2A3E', fontSize: 11, fontFamily: 'DM Mono', color: '#F2EFE6' }}
                formatter={(v: number) => [`${(v / 1000000).toFixed(1)}M`, 'Impressions']}
              />
              <Area type="monotone" dataKey="impressions" stroke="#9B1C1C" strokeWidth={2} fill="url(#gradCrimson)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign phases */}
        <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Campaign Timeline</p>
          <div className="space-y-3">
            {activeCampaign.phases.map((phase, i) => (
              <div key={i} className={`flex items-start gap-3 ${phase.status === 'upcoming' ? 'opacity-40' : ''}`}>
                <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                  phase.status === 'completed' ? 'bg-[#4ade80]' :
                  phase.status === 'active' ? 'bg-crimson live-dot' :
                  'bg-[#2A2A3E]'
                }`} />
                <div>
                  <p className={`font-body text-xs ${phase.status === 'active' ? 'text-[#F2EFE6]' : 'text-[#B8B5AA]'}`}>
                    {phase.name}
                  </p>
                  <p className="font-mono text-[9px] text-[#5A5655]">{phase.objective}</p>
                </div>
              </div>
            ))}
          </div>
          {activePhase && (
            <div className="mt-4 pt-4 border-t border-[#2A2A3E]">
              <p className="font-mono text-[9px] text-[#D4A853] uppercase tracking-wider">Phase Aktif</p>
              <p className="font-body text-xs text-[#F2EFE6] mt-1">{activePhase.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* BoxPredict CTA */}
      <Link
        to="/app/boxpredict"
        className="block border border-[rgba(212,168,83,0.3)] bg-[rgba(212,168,83,0.04)] hover:bg-[rgba(212,168,83,0.08)] transition-colors p-5 mb-6 group"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#D4A853] mb-1">BoxPredict™ · Forecast Tool</p>
            <p className="font-display text-lg font-light text-[#F2EFE6]">Prediksi penonton bioskop & box office Indonesia</p>
            <p className="font-body text-xs text-[#B8B5AA] mt-1">
              Estimasi penonton, gross IDR, kurva mingguan & risk flags berbasis komparable historis filmindonesia.or.id.
            </p>
          </div>
          <span className="font-mono text-xs text-[#D4A853] group-hover:translate-x-1 transition-transform">Buka →</span>
        </div>
      </Link>

      {/* Films table */}
      <div className="border border-[#2A2A3E] bg-[#1A1A28]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A3E]">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">Film Aktif</p>
          <Link to="/app/filmsim" className="font-mono text-[10px] text-crimson hover:text-crimson-rich transition-colors">
            FilmSim →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A3E]">
                {['Film', 'Genre', 'Rilis', 'Status', 'Aksi'].map(h => (
                  <th key={h} className="text-left font-mono text-[9px] uppercase tracking-wider text-[#5A5655] px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockFilms.map(film => (
                <tr key={film.id} className="border-b border-[#2A2A3E] last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="px-5 py-3">
                    <p className="font-body text-sm text-[#F2EFE6]">{film.title}</p>
                    <p className="font-mono text-[10px] text-[#5A5655]">{film.clientId}</p>
                  </td>
                  <td className="px-5 py-3 font-body text-sm text-[#B8B5AA]">{film.genre}</td>
                  <td className="px-5 py-3 font-mono text-xs text-[#B8B5AA]">
                    {new Date(film.targetReleaseDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={statusMap[film.status]?.variant ?? 'default'}>
                      {statusMap[film.status]?.label ?? film.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Link to="/app/filmsim" className="font-mono text-[10px] text-[#5A5655] hover:text-crimson transition-colors">
                      FilmSim →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
