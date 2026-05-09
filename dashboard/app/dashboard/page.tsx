import Topbar from '@/components/layout/Topbar'
import MetricCard from '@/components/ui/MetricCard'
import AlertBanner from '@/components/ui/AlertBanner'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import { mockFilms, overviewMetrics } from '@/lib/mockData'

export default function OverviewPage() {
  const alertFilm = mockFilms.find(f => f.alert)

  return (
    <>
      <Topbar title="Overview" />

      <main className="flex-1 p-6 space-y-6 fade-in">
        {/* Metric cards */}
        <div className="grid grid-cols-4 gap-4">
          {overviewMetrics.map(m => (
            <MetricCard key={m.label} label={m.label} value={m.value} sub={m.sub} subColor={m.subColor} />
          ))}
        </div>

        {/* Alert banner */}
        {alertFilm?.alert && (
          <AlertBanner
            filmTitle={alertFilm.title}
            message={`${alertFilm.alert}. T-${alertFilm.daysToRelease} hari sebelum rilis.`}
          />
        )}

        {/* Campaign table */}
        <div className="card !p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <p className="font-body font-[600] text-[14px] text-white-primary">Active Campaigns</p>
              <p className="font-mono text-[10px] mt-0.5 text-white-tertiary">{mockFilms.length} film dalam monitoring</p>
            </div>
            <a href="/dashboard/campaigns" className="font-mono text-[10px] tracking-wide text-crimson hover:text-crimson-rich transition-colors">
              Lihat semua →
            </a>
          </div>

          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {['Film / Klien', 'Fase', 'Reach', 'Status', 'Progress'].map(col => (
                  <th
                    key={col}
                    className="text-left px-5 py-3"
                    style={{ fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--white-tertiary)', fontWeight: 400 }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockFilms.map(film => (
                <tr
                  key={film.id}
                  className="hover:bg-white/[0.02] transition-colors duration-100 cursor-pointer"
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
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
                  <td className="px-5 py-4 w-[140px]">
                    <div className="flex items-center gap-2.5">
                      <ProgressBar value={film.progress} className="flex-1" />
                      <span className="font-mono text-[10px] text-white-tertiary w-8 text-right">{film.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
