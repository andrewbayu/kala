import { useState } from 'react'
import { mockFilms, mockFilmSimResults } from '../../data/mockData'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1 bg-[#2A2A3E] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            value >= 70 ? 'bg-[#4ade80]' : value >= 50 ? 'bg-[#D4A853]' : 'bg-[#B83A35]'
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="font-mono text-xs text-[#B8B5AA] w-8">{value}%</span>
    </div>
  )
}

function ImpactBar({ impact }: { impact: 'high' | 'medium' | 'low' }) {
  const w = impact === 'high' ? '80%' : impact === 'medium' ? '50%' : '25%'
  const color = impact === 'high' ? 'bg-crimson' : impact === 'medium' ? 'bg-[#D4A853]' : 'bg-[#5A5655]'
  return (
    <div className="w-20 h-1.5 bg-[#2A2A3E] rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: w }} />
    </div>
  )
}

export default function FilmSim() {
  const [selectedFilm, setSelectedFilm] = useState(mockFilms[0].id)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(mockFilmSimResults['film-garuda'])

  function runSim() {
    setRunning(true)
    setResult(null as any)
    setTimeout(() => {
      setResult(mockFilmSimResults[selectedFilm] ?? mockFilmSimResults['film-garuda'])
      setRunning(false)
    }, 2000)
  }

  const film = mockFilms.find(f => f.id === selectedFilm)

  function fmt(n: number) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
    return String(n)
  }

  function fmtRp(n: number) {
    return `Rp ${(n / 1000000000).toFixed(1)}M`
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1">KALA OS · FilmSim™</p>
        <h1 className="font-display text-2xl font-light text-[#F2EFE6] mb-1">FilmSim™ · Predictive Intelligence</h1>
        <p className="font-body text-sm text-[#B8B5AA]">BoxPredict Engine — Bear / Base / Bull admissions scenarios.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input panel */}
        <div className="border border-[#2A2A3E] bg-[#1A1A28] p-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-5">Film Profile Input</p>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] block mb-2">Pilih Film</label>
              <select
                value={selectedFilm}
                onChange={e => setSelectedFilm(e.target.value)}
                className="w-full bg-[#0C0C14] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-3 py-2.5 focus:outline-none focus:border-crimson"
              >
                {mockFilms.map(f => (
                  <option key={f.id} value={f.id}>{f.title}</option>
                ))}
              </select>
            </div>

            {film && (
              <div className="space-y-3 pt-2">
                {[
                  { label: 'Genre', value: `${film.genre}${film.subGenre ? ' · ' + film.subGenre : ''}` },
                  { label: 'Director', value: film.director },
                  { label: 'IP Type', value: film.ipType },
                  { label: 'Budget Tier', value: film.budgetTier },
                  { label: 'Release Window', value: film.releaseWindow },
                  { label: 'Target Market', value: film.targetMarket },
                  { label: 'Est. Screens', value: String(film.estimatedScreens) },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-start border-b border-[rgba(255,255,255,0.04)] pb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">{row.label}</span>
                    <span className="font-body text-xs text-[#F2EFE6] text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-3">Logline</p>
              <p className="font-body text-xs text-[#B8B5AA] leading-relaxed italic">{film?.logline}</p>
            </div>

            <Button onClick={runSim} loading={running} className="w-full mt-4">
              {running ? 'Menjalankan simulasi...' : 'Jalankan FilmSim™'}
            </Button>

            <p className="font-mono text-[9px] text-[#5A5655] text-center">
              Monte Carlo N=1,000 · KIE-calibrated
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {running && (
            <div className="border border-[#2A2A3E] bg-[#1A1A28] p-8 flex flex-col items-center justify-center min-h-48">
              <div className="w-8 h-8 border-2 border-[#2A2A3E] border-t-crimson rounded-full animate-spin mb-4" />
              <p className="font-mono text-xs text-[#5A5655]">Menjalankan Monte Carlo simulation (N=1,000)...</p>
            </div>
          )}

          {!running && result && (
            <>
              {/* Bear/Base/Bull */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'BEAR', sub: 'P25 · Pessimistik', color: 'text-[#B83A35]', bg: 'border-[rgba(184,58,53,0.25)] bg-[rgba(184,58,53,0.05)]', admissions: result.bear.admissions, rev: result.bear.revenue },
                  { label: 'BASE', sub: 'P50 · Most Likely', color: 'text-[#D4A853]', bg: 'border-[rgba(212,168,83,0.3)] bg-[rgba(212,168,83,0.06)]', admissions: result.base.admissions, rev: result.base.revenue },
                  { label: 'BULL', sub: 'P75 · Optimistik', color: 'text-[#4ade80]', bg: 'border-[rgba(74,222,128,0.25)] bg-[rgba(74,222,128,0.04)]', admissions: result.bull.admissions, rev: result.bull.revenue },
                ].map(s => (
                  <div key={s.label} className={`border ${s.bg} p-4 text-center`}>
                    <p className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${s.color}`}>{s.label}</p>
                    <p className={`font-display text-3xl font-light mb-1 ${s.color}`}>{fmt(s.admissions)}</p>
                    <p className="font-mono text-[10px] text-[#5A5655]">admisi</p>
                    <p className="font-mono text-[11px] text-[#B8B5AA] mt-2">{fmtRp(s.rev)}</p>
                  </div>
                ))}
              </div>

              {/* Confidence */}
              <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">Model Confidence</p>
                  <span className="font-mono text-xs text-[#B8B5AA]">{result.confidence}%</span>
                </div>
                <ConfidenceBar value={result.confidence} />
                <p className="font-body text-xs text-[#5A5655] mt-3">
                  {result.confidence >= 70
                    ? 'Confidence tinggi — data film cukup lengkap untuk proyeksi akurat.'
                    : result.confidence >= 50
                    ? 'Confidence sedang — beberapa variabel masih belum tersedia (trailer, pre-sale).'
                    : 'Confidence rendah — data pra-rilis belum tersedia. Range lebar adalah sinyal, bukan kegagalan model.'}
                </p>
              </div>

              {/* Recommended window + break-even */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#2A2A3E] bg-[#1A1A28] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-2">Window Rilis Rekomendasi</p>
                  <p className="font-body text-sm text-[#F2EFE6]">{result.recommendedWindow}</p>
                </div>
                <div className="border border-[#2A2A3E] bg-[#1A1A28] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-2">Break-even Admisi</p>
                  <p className="font-display text-2xl font-light text-[#D4A853]">{fmt(result.breakEven)}</p>
                  <p className="font-mono text-[10px] text-[#5A5655]">minimum untuk balik modal</p>
                </div>
              </div>

              {/* Sensitivity */}
              <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Sensitivity Analysis</p>
                <div className="space-y-3">
                  {result.sensitivityTable.map((row, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <p className="font-body text-xs text-[#B8B5AA] flex-1">{row.dimension}</p>
                      <div className="flex items-center gap-3">
                        <ImpactBar impact={row.impact} />
                        <span className="font-mono text-xs text-[#F2EFE6] w-6 text-right">{row.score}</span>
                        <Badge variant={row.impact === 'high' ? 'danger' : row.impact === 'medium' ? 'gold' : 'default'} size="sm">
                          {row.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable steps */}
              <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Langkah Actionable untuk mencapai Base Scenario</p>
                <ul className="space-y-2.5">
                  {result.actionableSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-mono text-[10px] text-crimson mt-0.5 shrink-0">0{i + 1}</span>
                      <p className="font-body text-sm text-[#B8B5AA]">{step}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risk flags */}
              {result.riskFlags.length > 0 && (
                <div className="border border-[rgba(184,58,53,0.2)] bg-[rgba(184,58,53,0.04)] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#B83A35] mb-3">⚠ Risk Flags</p>
                  <ul className="space-y-2">
                    {result.riskFlags.map((flag, i) => (
                      <li key={i} className="font-body text-sm text-[#B8B5AA] flex items-start gap-2">
                        <span className="text-[#B83A35] shrink-0">—</span>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {!running && !result && (
            <div className="border border-[#2A2A3E] bg-[#1A1A28] p-8 text-center">
              <p className="font-mono text-xs text-[#5A5655]">Pilih film dan jalankan FilmSim™ untuk melihat proyeksi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
