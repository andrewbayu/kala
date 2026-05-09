'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import AlertBanner from '@/components/ui/AlertBanner'
import { mockFilms } from '@/lib/mockData'
import type { CampaignStatus, Film } from '@/lib/types'

type FilterTab = 'all' | CampaignStatus

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'all',         label: 'Semua' },
  { key: 'active',      label: 'Active' },
  { key: 'pre-release', label: 'Pre-release' },
  { key: 'post',        label: 'Post-release' },
]

export default function CampaignsPage() {
  const [filter, setFilter]   = useState<FilterTab>('all')
  const [search, setSearch]   = useState('')
  const [selected, setSelected] = useState<Film | null>(null)

  const filtered = mockFilms.filter(f => {
    const matchFilter = filter === 'all' || f.status === filter
    const matchSearch = f.title.toLowerCase().includes(search.toLowerCase()) ||
                        f.client.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const alertFilms = mockFilms.filter(f => f.alert)

  return (
    <>
      <Topbar title="Campaigns" />

      <main className="flex-1 p-6 space-y-5 fade-in">
        {/* Alerts */}
        {alertFilms.map(f => (
          f.alert && (
            <AlertBanner
              key={f.id}
              filmTitle={f.title}
              message={`${f.alert}. T-${f.daysToRelease} hari sebelum rilis.`}
            />
          )
        ))}

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          {/* Filter tabs */}
          <div className="flex items-center gap-1" style={{ background: 'var(--black-3)', borderRadius: 8, padding: 3, border: '1px solid var(--border-subtle)' }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="font-body text-[12px] font-[500] px-3 py-1.5 rounded-[6px] transition-all duration-150"
                style={{
                  background: filter === tab.key ? 'var(--black-4)' : 'transparent',
                  color: filter === tab.key ? 'var(--white-primary)' : 'var(--white-tertiary)',
                  border: filter === tab.key ? '1px solid var(--border-subtle)' : '1px solid transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--white-tertiary)' }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari film atau klien..."
                className="form-input pl-8 text-[13px] w-[220px]"
                style={{ height: 36 }}
              />
            </div>

            {/* New campaign */}
            <button
              className="flex items-center gap-2 font-body font-[600] text-[13px] text-white-primary px-4 py-2 rounded-btn transition-all duration-150 hover:-translate-y-px"
              style={{ background: 'var(--crimson)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--crimson-rich)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--crimson)')}
            >
              <Plus size={14} />
              Campaign Baru
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card !p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {['Film / Genre / Klien', 'Fase', 'Reach', 'Status', 'Progress', ''].map((col, i) => (
                  <th
                    key={i}
                    className="text-left px-5 py-3"
                    style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white-tertiary)', fontWeight: 400 }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    <p className="font-body text-[13px] text-white-tertiary">Tidak ada kampanye ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filtered.map(film => (
                  <tr
                    key={film.id}
                    className="cursor-pointer transition-colors duration-100"
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                    onClick={() => setSelected(film)}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-4">
                      <p className="font-body font-[600] text-[13px] text-white-primary">{film.title}</p>
                      <p className="font-mono text-[10px] text-white-tertiary mt-0.5">{film.genre} · {film.client}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-[11px] text-white-secondary">{film.phase}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-[11px] text-white-primary">{film.reach}</span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={film.status} />
                    </td>
                    <td className="px-5 py-4 w-[160px]">
                      <div className="flex items-center gap-2.5">
                        <ProgressBar value={film.progress} className="flex-1" />
                        <span className="font-mono text-[10px] text-white-tertiary w-8 text-right">{film.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-[10px] text-white-tertiary hover:text-crimson transition-colors">Detail →</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="font-mono text-[10px] text-white-tertiary text-right">
          {filtered.length} dari {mockFilms.length} campaign ditampilkan
        </p>
      </main>

      {/* Detail modal placeholder */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="fade-in rounded-[12px] p-8 min-w-[420px] max-w-[560px]"
            style={{ background: 'var(--black-3)', border: '1px solid var(--border-default)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="eyebrow mb-1">{selected.genre} · {selected.client}</p>
                <h2 className="font-body font-[700] text-[20px] text-white-primary">{selected.title}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="font-mono text-[18px] text-white-tertiary hover:text-white-primary transition-colors leading-none mt-0.5">×</button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Fase', value: selected.phase },
                { label: 'Reach', value: selected.reach },
                { label: 'Status', value: selected.status },
                { label: 'Progress', value: `${selected.progress}%` },
              ].map(item => (
                <div key={item.label} className="rounded-[8px] p-3" style={{ background: 'var(--black-4)', border: '1px solid var(--border-subtle)' }}>
                  <p className="eyebrow mb-1">{item.label}</p>
                  <p className="font-body font-[600] text-[13px] text-white-primary">{item.value}</p>
                </div>
              ))}
            </div>

            {selected.alert && (
              <AlertBanner filmTitle={selected.title} message={selected.alert} />
            )}

            <p className="font-mono text-[10px] text-white-tertiary text-center mt-6">
              Detail campaign penuh akan tersedia di versi berikutnya.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
