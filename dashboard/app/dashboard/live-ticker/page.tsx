'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import CityBar from '@/components/ui/CityBar'
import { mockFilms, mockTicker } from '@/lib/mockData'

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

function fmtRupiah(n: number) {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)}M`
  if (n >= 1_000_000)     return `Rp ${(n / 1_000_000).toFixed(0)}Jt`
  return `Rp ${n.toLocaleString('id-ID')}`
}

export default function LiveTickerPage() {
  const [selectedFilmId, setSelectedFilmId] = useState(mockTicker.filmId)
  const ticker = mockTicker

  const activeFilm = mockFilms.find(f => f.id === selectedFilmId) ?? mockFilms[0]

  const metrics = [
    {
      label: 'Est. Total Admission',
      value: fmt(ticker.totalAdmission),
      sub: 'sejak tayang',
      color: 'text-white-primary',
    },
    {
      label: 'Est. Revenue',
      value: fmtRupiah(ticker.revenue),
      sub: 'estimasi gross',
      color: 'text-white-primary',
    },
    {
      label: 'Avg Occupancy',
      value: `${ticker.avgOccupancy}%`,
      sub: 'rata-rata semua kota',
      color: 'text-orange-400',
    },
    {
      label: 'Tren Keseluruhan',
      value: ticker.trend === 'up' ? '↑ Naik' : ticker.trend === 'down' ? '↓ Turun' : '→ Stabil',
      sub: 'vs kemarin',
      color: ticker.trend === 'up' ? 'text-green-400' : ticker.trend === 'down' ? 'text-orange-400' : 'text-white-secondary',
    },
  ]

  return (
    <>
      <Topbar title="Live Ticker" />

      <main className="flex-1 p-6 space-y-6 fade-in">

        {/* Film selector + last update */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <label className="form-label">Film Aktif</label>
              <select
                className="form-input text-[13px] w-[240px]"
                value={selectedFilmId}
                onChange={e => setSelectedFilmId(e.target.value)}
              >
                {mockFilms.filter(f => f.status === 'active').map(f => (
                  <option key={f.id} value={f.id}>{f.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2" style={{ background: 'var(--black-3)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '6px 12px' }}>
            <span className="live-dot w-2 h-2 rounded-full inline-block" style={{ background: '#4ADE80' }} />
            <span className="font-mono text-[10px] tracking-wide" style={{ color: '#4ADE80' }}>UPDATE</span>
            <span className="font-mono text-[10px] text-white-tertiary">{ticker.lastUpdate}</span>
            <RefreshCw size={11} className="text-white-tertiary ml-1 cursor-pointer hover:text-white-primary transition-colors" />
          </div>
        </div>

        {/* Film info banner */}
        <div
          className="flex items-center gap-4 px-4 py-3 rounded-[8px]"
          style={{ background: 'var(--black-4)', border: '1px solid var(--border-subtle)' }}
        >
          <div
            className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0"
            style={{ background: 'var(--crimson-surface)', border: '1px solid rgba(155,28,28,0.2)' }}
          >
            <span className="font-body font-[700] text-[10px] text-crimson">GRD</span>
          </div>
          <div>
            <p className="font-body font-[600] text-[13px] text-white-primary">{activeFilm.title}</p>
            <p className="font-mono text-[10px] text-white-tertiary">{activeFilm.genre} · {activeFilm.client} · {activeFilm.phase}</p>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-4 gap-4">
          {metrics.map(m => (
            <div key={m.label} className="card">
              <p className="eyebrow mb-2">{m.label}</p>
              <p className={`font-mono font-[500] text-[28px] tracking-[-0.02em] leading-none mb-1.5 ${m.color}`}>
                {m.value}
              </p>
              <p className="font-mono text-[10px] text-white-tertiary">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* City breakdown */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-body font-[600] text-[14px] text-white-primary">Breakdown per Kota</p>
              <p className="font-mono text-[10px] text-white-tertiary mt-0.5">Occupancy rate hari ini</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-[3px] rounded inline-block" style={{ background: 'var(--crimson)' }} />
                <span className="font-mono text-[9px] text-white-tertiary">Normal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-[3px] rounded inline-block" style={{ background: '#E07B39' }} />
                <span className="font-mono text-[9px] text-white-tertiary">Perhatian</span>
              </div>
            </div>
          </div>

          <div>
            {/* Column headers */}
            <div className="flex items-center gap-4 pb-2 mb-1" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white-tertiary w-[96px] shrink-0">Kota</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white-tertiary flex-1">Occupancy</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white-tertiary w-9 text-right shrink-0">%</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white-tertiary w-4">↕</span>
            </div>
            {ticker.cities.map(city => (
              <CityBar key={city.name} city={city} />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="font-mono text-[10px] text-right" style={{ color: 'var(--white-tertiary)' }}>
          Data diperbarui setiap 4–6 jam dari TIX ID, M-Tix, CGV. · Update terakhir: {ticker.lastUpdate}
        </p>
      </main>
    </>
  )
}
