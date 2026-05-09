'use client'

import { useState } from 'react'
import { Users } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import EmptyState from '@/components/ui/EmptyState'
import SegmentCard from '@/components/ui/SegmentCard'
import { mockSegmentsHorror } from '@/lib/mockData'
import type { AudienceSegment } from '@/lib/types'

const genreOptions = [
  'Horror Supernatural', 'Drama Romantis', 'Komedi',
  'Keluarga / Animasi', 'Thriller / Crime', 'Biopic',
]
const budgetOptions = ['Indie (< Rp 5M)', 'Mid (Rp 5–30M)', 'Major (Rp 30M+)']
const windowOptions = ['Lebaran', 'Nataru', 'Long Weekend', 'Regular', 'Ramadan']
const ipOptions = ['Original', 'Adaptasi Novel / Komik', 'Sekuel / Franchise', 'True Story']

export default function AudienceDNAPage() {
  const [form, setForm] = useState({
    judul: '', genre: '', budget: '', window: '', logline: '', cast: '', ip: '',
  })
  const [loading, setLoading]   = useState(false)
  const [segments, setSegments] = useState<AudienceSegment[] | null>(null)

  function handleAnalyze() {
    setLoading(true)
    setTimeout(() => {
      setSegments(mockSegmentsHorror)
      setLoading(false)
    }, 1100)
  }

  function handleReset() {
    setForm({ judul: '', genre: '', budget: '', window: '', logline: '', cast: '', ip: '' })
    setSegments(null)
  }

  const sel = 'form-input text-[13px]'

  return (
    <>
      <Topbar title="AudienceDNA™" />

      <main className="flex-1 p-6 fade-in">
        <div className="grid grid-cols-[320px_1fr] gap-6 h-full">

          {/* LEFT — Input form */}
          <div
            className="rounded-[10px] p-5 overflow-y-auto"
            style={{ background: 'var(--black-3)', border: '1px solid var(--border-subtle)' }}
          >
            <p className="eyebrow mb-4">Input Film</p>

            <div className="space-y-4">
              <div>
                <label className="form-label">Judul Film</label>
                <input
                  type="text"
                  className={sel}
                  placeholder="Judul atau kode proyek"
                  value={form.judul}
                  onChange={e => setForm(v => ({ ...v, judul: e.target.value }))}
                />
              </div>

              <div>
                <label className="form-label">Genre</label>
                <select
                  className={sel}
                  value={form.genre}
                  onChange={e => setForm(v => ({ ...v, genre: e.target.value }))}
                >
                  <option value="">Pilih genre...</option>
                  {genreOptions.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label className="form-label">Budget Tier</label>
                <select
                  className={sel}
                  value={form.budget}
                  onChange={e => setForm(v => ({ ...v, budget: e.target.value }))}
                >
                  <option value="">Pilih tier...</option>
                  {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="form-label">Release Window</label>
                <select
                  className={sel}
                  value={form.window}
                  onChange={e => setForm(v => ({ ...v, window: e.target.value }))}
                >
                  <option value="">Pilih window...</option>
                  {windowOptions.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>

              <div>
                <label className="form-label">Logline</label>
                <textarea
                  className={`${sel} resize-none`}
                  rows={3}
                  placeholder="Ringkasan singkat film..."
                  value={form.logline}
                  onChange={e => setForm(v => ({ ...v, logline: e.target.value }))}
                />
              </div>

              <div>
                <label className="form-label">Lead Cast</label>
                <input
                  type="text"
                  className={sel}
                  placeholder="Nama pemeran utama"
                  value={form.cast}
                  onChange={e => setForm(v => ({ ...v, cast: e.target.value }))}
                />
              </div>

              <div>
                <label className="form-label">IP Type</label>
                <select
                  className={sel}
                  value={form.ip}
                  onChange={e => setForm(v => ({ ...v, ip: e.target.value }))}
                >
                  <option value="">Pilih tipe IP...</option>
                  {ipOptions.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              <div className="pt-1 space-y-2">
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Menganalisis...' : 'Analisis Audiens →'}
                </button>
                <button onClick={handleReset} className="btn-ghost">Reset</button>
              </div>
            </div>
          </div>

          {/* RIGHT — Output */}
          <div className="flex flex-col gap-5">
            {!segments ? (
              <EmptyState
                icon={<Users size={36} strokeWidth={1} />}
                title="Belum ada data audiens"
                description={'Isi form di sebelah kiri dan klik “Analisis Audiens” untuk melihat profil penonton film ini.'}
              />
            ) : (
              <>
                <div>
                  <p className="eyebrow mb-1">Segmen Teridentifikasi</p>
                  <p className="font-body text-[13px] text-white-secondary">{segments.length} segmen penonton ditemukan berdasarkan input film.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {segments.map(seg => (
                    <SegmentCard key={seg.name} segment={seg} />
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 py-2.5 px-4 rounded-btn font-body font-[600] text-[13px] text-white-primary transition-all duration-150 hover:-translate-y-px"
                    style={{ background: 'var(--crimson)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--crimson-rich)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--crimson)')}
                  >
                    Aktivasi Segmen di KIE →
                  </button>
                  <button
                    className="px-5 py-2.5 rounded-btn font-body font-[500] text-[13px] text-white-secondary transition-all duration-150"
                    style={{ border: '1px solid var(--border-default)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-default)')}
                  >
                    Export Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
