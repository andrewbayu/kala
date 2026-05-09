import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Badge from '../../components/ui/Badge'
import {
  AVG_TICKET_PRICE_IDR,
  formatIDR,
  formatPenonton,
  IdGenre,
  IdRating,
  IdReleaseWindow,
} from '../../data/idComparables'
import { forecast, ForecastInput } from '../../lib/forecast'
import {
  defaultStarPower,
  getMovieDetail,
  inferIdRating,
  isTmdbConfigured,
  searchMovies,
  TmdbSearchResult,
  tmdbBuzzScore,
  tmdbToIdGenre,
} from '../../lib/tmdb'

const GENRES: { value: IdGenre; label: string }[] = [
  { value: 'horror', label: 'Horor' },
  { value: 'drama', label: 'Drama' },
  { value: 'comedy', label: 'Komedi' },
  { value: 'action', label: 'Aksi' },
  { value: 'romance', label: 'Romansa' },
  { value: 'family', label: 'Keluarga' },
  { value: 'animation', label: 'Animasi' },
  { value: 'religious', label: 'Religi' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'biopic', label: 'Biopik' },
]

const WINDOWS: { value: IdReleaseWindow; label: string }[] = [
  { value: 'lebaran', label: 'Lebaran' },
  { value: 'nataru', label: 'Nataru' },
  { value: 'school-holiday', label: 'Libur Sekolah' },
  { value: 'long-weekend', label: 'Long Weekend' },
  { value: 'ramadan', label: 'Ramadan' },
  { value: 'regular', label: 'Reguler' },
]

const RATINGS: { value: IdRating; label: string }[] = [
  { value: 'SU', label: 'SU (Semua Umur)' },
  { value: 'R 13+', label: 'R 13+' },
  { value: 'D 17+', label: 'D 17+' },
  { value: 'D 21+', label: 'D 21+' },
]

const IP_TYPES: { value: ForecastInput['ipType']; label: string }[] = [
  { value: 'original', label: 'Original' },
  { value: 'sequel', label: 'Sekuel' },
  { value: 'remake', label: 'Remake' },
  { value: 'novel', label: 'Adaptasi Novel' },
  { value: 'true-story', label: 'Kisah Nyata' },
  { value: 'franchise', label: 'Franchise / IP' },
]

const BUDGET_TIERS: { value: ForecastInput['budgetTier']; label: string }[] = [
  { value: 'indie', label: 'Indie (< Rp 5 M)' },
  { value: 'mid', label: 'Mid (Rp 5–25 M)' },
  { value: 'major', label: 'Major (> Rp 25 M)' },
]

const PRESETS: Record<string, Partial<ForecastInput>> = {
  'Horor Tentpole Lebaran': {
    genre: 'horror',
    releaseWindow: 'lebaran',
    rating: 'D 17+',
    ipType: 'sequel',
    budgetTier: 'mid',
    runtimeMinutes: 100,
    screensOpening: 800,
    starPower: 70,
    buzzScore: 75,
    marketingSpendIDR: 4_000_000_000,
  },
  'Drama Indie': {
    genre: 'drama',
    releaseWindow: 'regular',
    rating: 'R 13+',
    ipType: 'original',
    budgetTier: 'indie',
    runtimeMinutes: 105,
    screensOpening: 120,
    starPower: 35,
    buzzScore: 30,
    marketingSpendIDR: 200_000_000,
  },
  'Animasi Keluarga': {
    genre: 'animation',
    releaseWindow: 'school-holiday',
    rating: 'SU',
    ipType: 'original',
    budgetTier: 'major',
    runtimeMinutes: 95,
    screensOpening: 700,
    starPower: 55,
    buzzScore: 60,
    marketingSpendIDR: 5_000_000_000,
  },
  'Komedi Lebaran': {
    genre: 'comedy',
    releaseWindow: 'lebaran',
    rating: 'R 13+',
    ipType: 'original',
    budgetTier: 'mid',
    runtimeMinutes: 110,
    screensOpening: 700,
    starPower: 75,
    buzzScore: 70,
    marketingSpendIDR: 3_500_000_000,
  },
}

const INITIAL: ForecastInput = {
  title: '',
  genre: 'horror',
  releaseWindow: 'regular',
  rating: 'D 17+',
  ipType: 'original',
  budgetTier: 'mid',
  runtimeMinutes: 100,
  screensOpening: 500,
  starPower: 60,
  buzzScore: 55,
  marketingSpendIDR: 2_000_000_000,
}

export default function BoxPredict() {
  const [input, setInput] = useState<ForecastInput>(INITIAL)
  const [tmdbQuery, setTmdbQuery] = useState('')
  const [tmdbResults, setTmdbResults] = useState<TmdbSearchResult[]>([])
  const [tmdbLoading, setTmdbLoading] = useState(false)
  const [tmdbError, setTmdbError] = useState<string | null>(null)
  const [autofillNote, setAutofillNote] = useState<string | null>(null)
  const tmdbReady = isTmdbConfigured()

  const result = useMemo(() => forecast(input), [input])

  function update<K extends keyof ForecastInput>(key: K, value: ForecastInput[K]) {
    setInput(prev => ({ ...prev, [key]: value }))
  }

  function applyPreset(name: string) {
    const p = PRESETS[name]
    if (p) setInput(prev => ({ ...prev, ...p }))
  }

  // Debounced TMDB search
  useEffect(() => {
    if (!tmdbReady || tmdbQuery.trim().length < 2) {
      setTmdbResults([])
      return
    }
    const t = setTimeout(async () => {
      setTmdbLoading(true)
      setTmdbError(null)
      try {
        const r = await searchMovies(tmdbQuery)
        setTmdbResults(r)
      } catch (e) {
        setTmdbError((e as Error).message)
      } finally {
        setTmdbLoading(false)
      }
    }, 350)
    return () => clearTimeout(t)
  }, [tmdbQuery, tmdbReady])

  async function pickTmdbMovie(r: TmdbSearchResult) {
    setTmdbResults([])
    setTmdbQuery(r.title)
    try {
      const detail = await getMovieDetail(r.id)
      const genre = tmdbToIdGenre(detail.genres)
      const rating = inferIdRating(genre)
      setInput(prev => ({
        ...prev,
        title: detail.title,
        genre,
        rating,
        runtimeMinutes: detail.runtime || prev.runtimeMinutes,
        starPower: defaultStarPower(detail.budget),
        buzzScore: tmdbBuzzScore(detail.popularity, detail.voteCount),
      }))
      const isIndo = detail.productionCountries.some(c => c.iso_3166_1 === 'ID')
      setAutofillNote(
        isIndo
          ? `Autofill dari TMDB · "${detail.title}" (produksi Indonesia)`
          : `Autofill dari TMDB · "${detail.title}" — catatan: produksi non-Indonesia, sesuaikan rating LSF & layar manual.`,
      )
    } catch (e) {
      setTmdbError((e as Error).message)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1">KALA OS · BoxPredict</p>
          <h1 className="font-display text-2xl font-light text-[#F2EFE6]">Forecast Penonton & Box Office</h1>
          <p className="font-body text-xs text-[#B8B5AA] mt-1">
            Estimasi penonton bioskop & pendapatan kotor untuk pasar Indonesia, berbasis komparable historis & faktor produksi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={tmdbReady ? 'success' : 'default'}>{tmdbReady ? 'TMDB Connected' : 'TMDB Not Configured'}</Badge>
          <Badge variant={result.confidence >= 70 ? 'success' : result.confidence >= 50 ? 'warning' : 'danger'}>
            Confidence {result.confidence}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* INPUT COLUMN */}
        <div className="lg:col-span-5 space-y-4">
          {/* TMDB autofill */}
          <Section title="Autofill TMDB">
            {!tmdbReady && (
              <p className="font-mono text-[10px] text-[#5A5655] mb-2">
                Set <span className="text-[#D4A853]">VITE_TMDB_API_KEY</span> di <code>.env.local</code> untuk aktifkan
                pencarian. Manual entry tetap berfungsi.
              </p>
            )}
            <input
              type="text"
              value={tmdbQuery}
              onChange={e => setTmdbQuery(e.target.value)}
              disabled={!tmdbReady}
              placeholder={tmdbReady ? 'Cari judul film di TMDB...' : 'TMDB tidak aktif — entry manual'}
              className="w-full bg-[#0C0C14] border border-[#2A2A3E] px-3 py-2 font-body text-sm text-[#F2EFE6] placeholder-[#5A5655] focus:outline-none focus:border-crimson disabled:opacity-50"
            />
            {tmdbLoading && <p className="font-mono text-[10px] text-[#5A5655] mt-2">Mencari…</p>}
            {tmdbError && <p className="font-mono text-[10px] text-[#B83A35] mt-2">{tmdbError}</p>}
            {autofillNote && <p className="font-mono text-[10px] text-[#D4A853] mt-2">{autofillNote}</p>}
            {tmdbResults.length > 0 && (
              <ul className="mt-2 max-h-48 overflow-y-auto border border-[#2A2A3E] divide-y divide-[#2A2A3E]">
                {tmdbResults.map(r => (
                  <li key={r.id}>
                    <button
                      onClick={() => pickTmdbMovie(r)}
                      className="w-full text-left px-3 py-2 hover:bg-[rgba(255,255,255,0.03)]"
                    >
                      <p className="font-body text-sm text-[#F2EFE6]">{r.title}</p>
                      <p className="font-mono text-[10px] text-[#5A5655]">
                        {r.releaseDate || 'Tanggal —'} · ⭐ {r.voteAverage.toFixed(1)} · {r.voteCount} votes
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="Preset Skenario">
            <div className="flex flex-wrap gap-2">
              {Object.keys(PRESETS).map(name => (
                <button
                  key={name}
                  onClick={() => applyPreset(name)}
                  className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border border-[#2A2A3E] text-[#B8B5AA] hover:border-crimson hover:text-crimson transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Identitas Film">
            <Field label="Judul">
              <input
                type="text"
                value={input.title}
                onChange={e => update('title', e.target.value)}
                placeholder="Judul film…"
                className="w-full bg-[#0C0C14] border border-[#2A2A3E] px-3 py-2 font-body text-sm text-[#F2EFE6] placeholder-[#5A5655] focus:outline-none focus:border-crimson"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Genre">
                <Select value={input.genre} onChange={v => update('genre', v as IdGenre)} options={GENRES} />
              </Field>
              <Field label="Window Rilis">
                <Select value={input.releaseWindow} onChange={v => update('releaseWindow', v as IdReleaseWindow)} options={WINDOWS} />
              </Field>
              <Field label="Rating LSF">
                <Select value={input.rating} onChange={v => update('rating', v as IdRating)} options={RATINGS} />
              </Field>
              <Field label="Tipe IP">
                <Select value={input.ipType} onChange={v => update('ipType', v as ForecastInput['ipType'])} options={IP_TYPES} />
              </Field>
            </div>
          </Section>

          <Section title="Skala Produksi & Distribusi">
            <Field label="Tier Budget">
              <Select value={input.budgetTier} onChange={v => update('budgetTier', v as ForecastInput['budgetTier'])} options={BUDGET_TIERS} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={`Runtime · ${input.runtimeMinutes} menit`}>
                <input
                  type="range"
                  min={70}
                  max={180}
                  step={1}
                  value={input.runtimeMinutes}
                  onChange={e => update('runtimeMinutes', +e.target.value)}
                  className="w-full accent-[#9B1C1C]"
                />
              </Field>
              <Field label={`Layar Bioskop · ${input.screensOpening}`}>
                <input
                  type="range"
                  min={20}
                  max={1200}
                  step={10}
                  value={input.screensOpening}
                  onChange={e => update('screensOpening', +e.target.value)}
                  className="w-full accent-[#9B1C1C]"
                />
              </Field>
            </div>
            <Field label={`Marketing Spend · ${formatIDR(input.marketingSpendIDR)}`}>
              <input
                type="range"
                min={0}
                max={15_000_000_000}
                step={100_000_000}
                value={input.marketingSpendIDR}
                onChange={e => update('marketingSpendIDR', +e.target.value)}
                className="w-full accent-[#9B1C1C]"
              />
            </Field>
          </Section>

          <Section title="Sinyal Audiens">
            <Field label={`Star Power · ${input.starPower}/100`}>
              <input
                type="range"
                min={0}
                max={100}
                value={input.starPower}
                onChange={e => update('starPower', +e.target.value)}
                className="w-full accent-[#9B1C1C]"
              />
            </Field>
            <Field label={`Buzz / Pre-sales · ${input.buzzScore}/100`}>
              <input
                type="range"
                min={0}
                max={100}
                value={input.buzzScore}
                onChange={e => update('buzzScore', +e.target.value)}
                className="w-full accent-[#9B1C1C]"
              />
            </Field>
            <Field label={`Skor Screening Awal · ${input.earlyScoreOutOf100 ?? '—'}/100 (opsional)`}>
              <input
                type="range"
                min={0}
                max={100}
                value={input.earlyScoreOutOf100 ?? 0}
                onChange={e => update('earlyScoreOutOf100', +e.target.value || undefined)}
                className="w-full accent-[#D4A853]"
              />
            </Field>
          </Section>
        </div>

        {/* RESULT COLUMN */}
        <div className="lg:col-span-7 space-y-4">
          {/* Headline KPIs — admissions and IDR equally weighted */}
          <div className="grid grid-cols-2 gap-3">
            <KPICard
              label="Total Penonton (Base)"
              value={formatPenonton(result.base.totalAdmissions)}
              sub={`Bear ${formatPenonton(result.bear.totalAdmissions)} · Bull ${formatPenonton(result.bull.totalAdmissions)}`}
              accent
            />
            <KPICard
              label="Total Gross (Base)"
              value={formatIDR(result.base.totalGrossIDR)}
              sub={`Bear ${formatIDR(result.bear.totalGrossIDR)} · Bull ${formatIDR(result.bull.totalGrossIDR)}`}
              accent
            />
            <KPICard
              label="Penonton Minggu 1"
              value={formatPenonton(result.base.openingWeekAdmissions)}
              sub={`${((result.base.openingWeekAdmissions / Math.max(1, result.base.totalAdmissions)) * 100).toFixed(0)}% dari total`}
            />
            <KPICard
              label="Gross Minggu 1"
              value={formatIDR(result.base.openingWeekGrossIDR)}
              sub={`Avg ticket ${formatIDR(AVG_TICKET_PRICE_IDR)}`}
            />
          </div>

          {/* Weekly admissions chart */}
          <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">Kurva Penonton Mingguan · {result.base.weeksInTheaters} minggu</p>
              <Badge variant="info">Base Scenario</Badge>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={result.weeklyAdmissions}>
                <defs>
                  <linearGradient id="gradAdm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9B1C1C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#9B1C1C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="week"
                  tick={{ fill: '#5A5655', fontSize: 10, fontFamily: 'DM Mono' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `M${v}`}
                />
                <YAxis
                  tick={{ fill: '#5A5655', fontSize: 10, fontFamily: 'DM Mono' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => formatPenonton(v)}
                />
                <Tooltip
                  contentStyle={{ background: '#0C0C14', border: '1px solid #2A2A3E', fontSize: 11, fontFamily: 'DM Mono', color: '#F2EFE6' }}
                  formatter={(v: number) => [formatPenonton(v), 'Penonton']}
                  labelFormatter={l => `Minggu ${l}`}
                />
                <Area type="monotone" dataKey="admissions" stroke="#9B1C1C" strokeWidth={2} fill="url(#gradAdm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Driver breakdown */}
          <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Driver Breakdown</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={result.driverBreakdown
                  .filter(d => d.driver !== 'Genre baseline')
                  .map(d => ({ ...d, delta: (d.multiplier - 1) * 100 }))}
                layout="vertical"
                margin={{ left: 100 }}
              >
                <XAxis
                  type="number"
                  tick={{ fill: '#5A5655', fontSize: 10, fontFamily: 'DM Mono' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `${v > 0 ? '+' : ''}${v.toFixed(0)}%`}
                />
                <YAxis
                  type="category"
                  dataKey="driver"
                  tick={{ fill: '#B8B5AA', fontSize: 11, fontFamily: 'DM Mono' }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{ background: '#0C0C14', border: '1px solid #2A2A3E', fontSize: 11, fontFamily: 'DM Mono', color: '#F2EFE6' }}
                  formatter={(v: number) => [`${v > 0 ? '+' : ''}${v.toFixed(1)}%`, 'Efek']}
                />
                <Bar dataKey="delta" fill="#D4A853" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk flags */}
          <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-3">Risk Flags & Skor Audiens</p>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] text-[#5A5655]">Forecast skor audiens:</span>
              <span className="font-display text-xl text-[#D4A853]">{result.audienceScore}/100</span>
            </div>
            {result.riskFlags.length === 0 ? (
              <p className="font-body text-xs text-[#4ade80]">Tidak ada flag signifikan terdeteksi.</p>
            ) : (
              <ul className="space-y-2">
                {result.riskFlags.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Badge
                      variant={f.level === 'high' ? 'danger' : f.level === 'medium' ? 'warning' : 'default'}
                    >
                      {f.level}
                    </Badge>
                    <p className="font-body text-xs text-[#B8B5AA]">{f.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Comparables */}
          <div className="border border-[#2A2A3E] bg-[#1A1A28]">
            <div className="px-5 py-3 border-b border-[#2A2A3E]">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">Komparable Indonesia · Top 5</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2A3E]">
                  {['Film', 'Tahun', 'Genre', 'Penonton', 'Mirip'].map(h => (
                    <th key={h} className="text-left font-mono text-[9px] uppercase tracking-wider text-[#5A5655] px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.closestComparables.map(c => (
                  <tr key={c.film.title} className="border-b border-[#2A2A3E] last:border-0 hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="px-5 py-2.5 font-body text-sm text-[#F2EFE6]">{c.film.title}</td>
                    <td className="px-5 py-2.5 font-mono text-xs text-[#B8B5AA]">{c.film.year}</td>
                    <td className="px-5 py-2.5 font-body text-xs text-[#B8B5AA] capitalize">{c.film.genre}</td>
                    <td className="px-5 py-2.5 font-mono text-xs text-[#D4A853]">{formatPenonton(c.film.admissions)}</td>
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#2A2A3E] overflow-hidden">
                          <div className="h-full bg-crimson" style={{ width: `${Math.min(100, c.similarity * 100)}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-[#5A5655]">{(c.similarity * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-mono text-[9px] text-[#5A5655] leading-relaxed">
            Estimasi heuristik berbasis dataset komparable filmindonesia.or.id + faktor produksi. Bukan prediksi machine-learning
            terkalibrasi — gunakan sebagai skenario perencanaan, bukan jaminan performa. Avg ticket price {formatIDR(AVG_TICKET_PRICE_IDR)}.
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
      <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-3">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Select<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as T)}
      className="w-full bg-[#0C0C14] border border-[#2A2A3E] px-3 py-2 font-body text-sm text-[#F2EFE6] focus:outline-none focus:border-crimson"
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

function KPICard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string
  value: string
  sub: string
  accent?: boolean
}) {
  return (
    <div className={`border p-5 ${accent ? 'border-[rgba(155,28,28,0.3)] bg-[rgba(155,28,28,0.06)]' : 'border-[#2A2A3E] bg-[#1A1A28]'}`}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-2">{label}</p>
      <p className={`font-display text-3xl font-light mb-1 ${accent ? 'text-crimson' : 'text-[#F2EFE6]'}`}>{value}</p>
      <p className="font-mono text-[10px] text-[#B8B5AA]">{sub}</p>
    </div>
  )
}
