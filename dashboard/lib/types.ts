export type CampaignStatus = 'active' | 'pre-release' | 'post'
export type Trend = 'up' | 'down' | 'stable'

export interface Film {
  id: string
  title: string
  genre: string
  client: string
  phase: string
  daysToRelease: number
  reach: string
  occupancy: number | null
  status: CampaignStatus
  progress: number
  alert?: string
}

export interface CityMetric {
  name: string
  pct: number
  trend: Trend
  alert: boolean
}

export interface TickerData {
  filmId: string
  lastUpdate: string
  totalAdmission: number
  revenue: number
  avgOccupancy: number
  trend: Trend
  cities: CityMetric[]
}

export interface AudienceSegment {
  name: string
  ageRange: string
  traits: string[]
  resonance: number
}

export interface BoxScenario {
  label: 'Bear' | 'Base' | 'Bull'
  subtitle: string
  admissions: string
  revenue: string
}

export interface SensitivityRow {
  dimension: string
  impact: number
  direction: 'Positif' | 'Negatif'
  level: 'Tinggi' | 'Sedang' | 'Rendah'
}
