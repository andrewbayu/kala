'use client'

import { useState } from 'react'
import { TrendingUp, AlertTriangle } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import EmptyState from '@/components/ui/EmptyState'
import ScenarioCard from '@/components/ui/ScenarioCard'
import { mockBoxScenarios, mockSensitivity } from '@/lib/mockData'
import type { BoxScenario, SensitivityRow } from '@/lib/types'

const genreOptions = ['Horror Supernatural', 'Drama Romantis', 'Komedi', 'Keluarga / Animasi', 'Thriller / Crime', 'Biopic']
const windowOptions = ['Lebaran', 'Nataru', 'Long Weekend', 'Regular', 'Ramadan']
const budgetOptions = ['Indie (< Rp 5M)', 'Mid (Rp 5–30M)', 'Major (Rp 30M+)']
const ipOptions = ['Original', 'Adaptasi Novel kecil', 'Adaptasi Novel populer', 'Major IP']

const levelColors: Record<SensitivityRow['level'], string> = {
  Tinggi: '#9B1C1C',
  Sedang: '#E07B39',
  Rendah: 'rgba(255,255,255,0.25)',
}

function SensitivityTable({ rows }: { rows: SensitivityRow[] }) {
  return (
    <div className="rounded-[10px] overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
      <div className="px-4 py-3 border-b" style={{ background: 'var(--black-3)', borderColor: 'var(--border-subtle)' }}>
        <p className="font-body font-[600] text-[13px] text-white-primary">Sensitivity Analysis</p>
      </div>
      <table className="w-full" style={{ background: 'var(--black-4)' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            {['Dimensi', 'Impact', 'Level', 'Arah'].map(col => (
              <th key={col} className="text-left px-4 py-2.5" style={{ fontFamily: 'DM Mono', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white-tertiary)', fontWeight: 400 }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.dimension} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <td className="px-4 py-3">
                <span className="font-body text-[12px] text-white-secondary">{row.dimension}</span>
              </td>
              <td className="px-4 py-3 w-[180px]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-[3px] rounded-[2px] bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-[2px]" style={{ width: `${row.impact}%`, background: levelColors[row.level] }} />
                  </div>
                  <span className="font-mono text-[10px] text-white-tertiary w-7 text-right">{row.impact}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-badge" style={{ color: levelColors[row.level], background: `${levelColors[row.level]}15`, border: `1px solid ${levelColors[row.level]}30` }}>
                  {row.level}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="font-mono text-[10px]" style={{ color: row.direction === 'Positif' ? '#4ADE80' : '#E07B39' }}>
                  {row.direction === 'Positif' ? '↑' : '↓'} {row.direction}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function BoxPredictPage() {
  const [form, setForm] = useState({
    judul: '', genre: '', releaseDate: '', window: '', budget: '',
    screens: '', ip: '', competitor: '',
  })
  const [loading, setLoading]     = useState(false)
  const [scenarios, setScenarios] = useState<BoxScenario[] | null>(null)

  function handleRun() {
    setLoading(true)
    setTimeout(() => {
      setScenarios(mockBoxScenarios)
      setLoading(false)
    }, 1200)
  }

  const inp = 'form-input text-[13px]'

  return (
    <>
      <Topbar title="BoxPredict™" />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto fade-in">

        {/* Input form */}
        <div
          className="rounded-[10px] p-5"
          style={{ background: 'var(--black-3)', border: '1px solid var(--border-subtle)' }}
        >
          <p className="eyebrow mb-4">Parameter Simulasi</p>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="form-label">Judul Film</label>
              <input type="text" className={inp} placeholder="Judul / kode proyek" value={form.judul} onChange={e => setForm(v => ({ ...v, judul: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">Genre</label>
              <select className={inp} value={form.genre} onChange={e => setForm(v => ({ ...v, genre: e.target.value }))}>
                <option value="">Pilih genre...</option>
                {genreOptions.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Release Date</label>
              <input type="date" className={inp} value={form.releaseDate} onChange={e => setForm(v => ({ ...v, releaseDate: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">Release Window</label>
              <select className={inp} value={form.window} onChange={e => setForm(v => ({ ...v, window: e.target.value }))}>
                <option value="">Pilih / auto-detect...</option>
                {windowOptions.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Budget Tier</label>
              <select className={inp} value={form.budget} onChange={e => setForm(v => ({ ...v, budget: e.target.value }))}>
                <option value="">Pilih tier...</option>
                {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Est. Jumlah Layar</label>
              <input type="number" className={inp} placeholder="mis. 400" value={form.screens} onChange={e => setForm(v => ({ ...v, screens: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">IP Score</label>
              <select className={inp} value={form.ip} onChange={e => setForm(v => ({ ...v, ip: e.target.value }))}>
                <option value="">Pilih tipe...</option>
                {ipOptions.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Kompetitor Utama <span style={{ color: 'var(--white-tertiary)', fontFamily: 'DM Mono', fontSize: 9 }}>(opsional)</span></label>
              <input type="text" className={inp} placeholder="Judul kompetitor" value={form.competitor} onChange={e => setForm(v => ({ ...v, competitor: e.target.value }))} />
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleRun}
              disabled={loading}
              className="font-body font-[600] text-[13px] text-white-primary px-6 py-2.5 rounded-btn transition-all duration-150 hover:-translate-y-px disabled:opacity-50"
              style={{ background: 'var(--crimson)' }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = 'var(--crimson-rich)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--crimson)')}
            >
              {loading ? 'Menghitung...' : 'Run Simulation →'}
            </button>
          </div>
        </div>

        {/* Output */}
        {!scenarios ? (
          <EmptyState
            icon={<TrendingUp size={36} strokeWidth={1} />}
            title="Belum ada simulasi"
            description={'Isi parameter di atas dan klik "Run Simulation" untuk melihat skenario proyeksi box office.'}
          />
        ) : (
          <>
            <div>
              <p className="eyebrow mb-1">Proyeksi Skenario</p>
              <p className="font-body text-[13px] text-white-secondary">Tiga skenario dengan asumsi yang transparan berdasarkan parameter input.</p>
            </div>

            {/* Scenario cards */}
            <div className="grid grid-cols-3 gap-5">
              {scenarios.map(s => <ScenarioCard key={s.label} scenario={s} />)}
            </div>

            {/* Sensitivity */}
            <SensitivityTable rows={mockSensitivity} />

            {/* Risk flags */}
            <div
              className="rounded-[10px] p-4 space-y-2.5"
              style={{ background: 'rgba(224,123,57,0.06)', border: '1px solid rgba(224,123,57,0.18)' }}
            >
              <p className="font-body font-[600] text-[12px]" style={{ color: '#E07B39' }}>Risk Flags</p>
              {[
                'Timing bertabrakan dengan film horror lain pada release week yang sama.',
                'Genre saturasi — 3 film horror supernatural rilis dalam 2 bulan terakhir.',
              ].map((flag, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <AlertTriangle size={12} className="mt-0.5 shrink-0" style={{ color: '#E07B39' }} />
                  <p className="font-body text-[12px] text-white-secondary">{flag}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  )
}
