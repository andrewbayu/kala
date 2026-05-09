import type { Film, TickerData, AudienceSegment, BoxScenario, SensitivityRow } from './types'

export const mockFilms: Film[] = [
  {
    id: 'garuda',
    title: 'Project Garuda',
    genre: 'Horror Supernatural',
    client: 'MD Pictures',
    phase: 'Week 4',
    daysToRelease: -28,
    reach: '1.2M',
    occupancy: 72,
    status: 'active',
    progress: 72,
  },
  {
    id: 'sayap',
    title: 'Sayap Patah',
    genre: 'Drama Romantis',
    client: 'Visinema',
    phase: 'Pre-release',
    daysToRelease: 14,
    reach: '640K',
    occupancy: null,
    status: 'pre-release',
    progress: 31,
    alert: 'Awareness gap — segmen Penonton Romance belum terjangkau',
  },
  {
    id: 'langit',
    title: 'Langit Ketujuh',
    genre: 'Keluarga',
    client: 'Falcon Pictures',
    phase: 'Post W2',
    daysToRelease: -14,
    reach: '2.3M',
    occupancy: 45,
    status: 'post',
    progress: 100,
  },
]

export const mockTicker: TickerData = {
  filmId: 'garuda',
  lastUpdate: '14 menit lalu',
  totalAdmission: 847000,
  revenue: 12400000000,
  avgOccupancy: 71,
  trend: 'up',
  cities: [
    { name: 'Jakarta',    pct: 82, trend: 'up',     alert: false },
    { name: 'Surabaya',  pct: 63, trend: 'stable',  alert: false },
    { name: 'Bandung',   pct: 71, trend: 'up',      alert: false },
    { name: 'Medan',     pct: 51, trend: 'down',    alert: true  },
    { name: 'Yogyakarta',pct: 44, trend: 'down',    alert: true  },
    { name: 'Makassar',  pct: 38, trend: 'stable',  alert: false },
  ],
}

export const mockSegmentsHorror: AudienceSegment[] = [
  { name: 'Penggemar Horor',        ageRange: '17–25', traits: ['Identity tinggi', 'Skeptis rendah', 'TikTok native'], resonance: 88 },
  { name: 'Remaja Urban',           ageRange: '15–22', traits: ['FOMO driven', 'TikTok native', 'Grup-minded'],        resonance: 76 },
  { name: 'Cinephile Millennial',   ageRange: '26–35', traits: ['Skeptis tinggi', 'Knowledge tinggi', 'Review-driven'],resonance: 61 },
  { name: 'Penonton Premium',       ageRange: '25–40', traits: ['Experience seeker', 'Weekend moviegoer', 'Quality-first'], resonance: 52 },
]

export const mockBoxScenarios: BoxScenario[] = [
  { label: 'Bear',  subtitle: 'Pesimis (P25)',   admissions: '1.2M', revenue: 'Rp 21.6M' },
  { label: 'Base',  subtitle: 'Realistis (P50)', admissions: '2.1M', revenue: 'Rp 37.8M' },
  { label: 'Bull',  subtitle: 'Optimis (P75)',   admissions: '3.4M', revenue: 'Rp 61.2M' },
]

export const mockSensitivity: SensitivityRow[] = [
  { dimension: 'Genre Baseline',   impact: 85, level: 'Tinggi', direction: 'Positif' },
  { dimension: 'Release Window',   impact: 65, level: 'Sedang', direction: 'Positif' },
  { dimension: 'Cast Score',       impact: 58, level: 'Sedang', direction: 'Positif' },
  { dimension: 'IP Score',         impact: 48, level: 'Sedang', direction: 'Positif' },
  { dimension: 'Competition',      impact: 35, level: 'Rendah', direction: 'Negatif' },
  { dimension: 'Marketing Budget', impact: 25, level: 'Rendah', direction: 'Positif' },
]

export const overviewMetrics = [
  {
    label: 'Active Campaigns',
    value: '3',
    sub: '2 pre-release · 1 post',
    subColor: 'text-white-secondary',
  },
  {
    label: 'Total Reach (minggu ini)',
    value: '4.1M',
    sub: '↑ 18% vs minggu lalu',
    subColor: 'text-green-400',
  },
  {
    label: 'Avg Occupancy',
    value: '68%',
    sub: 'Project Garuda',
    subColor: 'text-orange-400',
  },
  {
    label: 'Open Alerts',
    value: '2',
    sub: 'Perlu perhatian',
    subColor: 'text-crimson',
  },
]
