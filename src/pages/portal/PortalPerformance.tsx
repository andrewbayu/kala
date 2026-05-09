import { mockLiveTicker, admissionsChartData, sentimentData } from '../../data/mockData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function PortalPerformance() {
  const data = mockLiveTicker

  function fmt(n: number) {
    return n >= 1000000 ? `${(n / 1000000).toFixed(2)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n)
  }

  function fmtRp(n: number) {
    return `Rp ${(n / 1000000000).toFixed(1)} Miliar`
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1">Client Portal · Live Performance</p>
          <h1 className="font-display text-2xl font-light text-[#F2EFE6] mb-1">Performance Real-time</h1>
          <p className="font-body text-sm text-[#B8B5AA]">Data admisi dan sentimen publik — Garuda di Dadaku Animasi.</p>
        </div>
        <div className="flex items-center gap-2 border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.05)] px-4 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] live-dot" />
          <span className="font-mono text-[10px] text-[#4ade80] uppercase tracking-wider">LIVE</span>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Admisi', value: fmt(data.totalAdmissions), sub: `+${data.weeklyVelocity}% mingguan` },
          { label: 'Est. Revenue', value: fmtRp(data.estimatedRevenue), sub: 'berdasarkan avg ticket' },
          { label: 'Avg Occupancy', value: `${data.occupancyRate}%`, sub: `${data.screenCount} layar` },
          { label: 'vs Proyeksi', value: `+${data.vsProjection}%`, sub: 'di atas Base scenario' },
        ].map((m, i) => (
          <div key={i} className="border border-[#2A2A3E] bg-[#1A1A28] p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-2">{m.label}</p>
            <p className="font-display text-2xl font-light text-[#F2EFE6] mb-1">{m.value}</p>
            <p className="font-mono text-[10px] text-[#4ade80]">↑ {m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 border border-[#2A2A3E] bg-[#1A1A28] p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Daily Admissions · 7 Hari Pertama</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={admissionsChartData} barGap={4}>
              <XAxis dataKey="day" tick={{ fill: '#5A5655', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5A5655', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: '#1A1A28', border: '1px solid #2A2A3E', fontSize: 11, fontFamily: 'DM Mono', color: '#F2EFE6' }} />
              <Bar dataKey="projection" fill="rgba(42,42,62,0.8)" name="Proyeksi" radius={[2, 2, 0, 0]} />
              <Bar dataKey="admissions" fill="#9B1C1C" name="Aktual" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-2"><span className="w-3 h-1 bg-crimson inline-block" /><span className="font-mono text-[10px] text-[#5A5655]">Aktual</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-1 bg-[#2A2A3E] inline-block" /><span className="font-mono text-[10px] text-[#5A5655]">Proyeksi P50</span></div>
          </div>
        </div>

        <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Sentimen Publik</p>
          <div className="flex justify-center">
            <PieChart width={160} height={160}>
              <Pie data={sentimentData} cx={75} cy={75} innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                {sentimentData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2 mt-2">
            {sentimentData.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="font-body text-xs text-[#B8B5AA]">{s.name}</span>
                </div>
                <span className="font-mono text-xs text-[#F2EFE6]">{s.value}%</span>
              </div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-[#5A5655] mt-3 text-center">324K posts · IndoBERT NLP</p>
        </div>
      </div>

      {/* City breakdown */}
      <div className="border border-[#2A2A3E] bg-[#1A1A28]">
        <div className="px-5 py-4 border-b border-[#2A2A3E]">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">Admisi per Kota</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-[#2A2A3E]">
          {data.cityBreakdown.map(city => (
            <div key={city.city} className="p-4 text-center">
              <p className="font-body text-xs text-[#B8B5AA] mb-2">{city.city}</p>
              <p className="font-display text-xl font-light text-[#F2EFE6]">{fmt(city.admissions)}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {city.trend === 'up' && <span className="text-[#4ade80] text-xs">↑</span>}
                {city.trend === 'down' && <span className="text-[#B83A35] text-xs">↓</span>}
                {city.trend === 'stable' && <span className="text-[#5A5655] text-xs">→</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
