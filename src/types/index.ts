export interface Film {
  id: string
  title: string
  genre: string
  subGenre?: string
  logline: string
  director: string
  leadCast: string[]
  ipType: 'original' | 'novel' | 'sequel' | 'true-story' | 'ip'
  budgetTier: 'indie' | 'mid' | 'major'
  targetReleaseDate: string
  releaseWindow: 'lebaran' | 'nataru' | 'long-weekend' | 'regular' | 'ramadan'
  targetMarket: 'nasional' | 'jawa-bali' | 'jabodetabek'
  estimatedScreens: number
  status: 'development' | 'pre-production' | 'production' | 'pre-release' | 'release' | 'post-release'
  clientId: string
  createdAt: string
  updatedAt: string
}

export interface FilmSimResult {
  filmId: string
  bear: { admissions: number; revenue: number }
  base: { admissions: number; revenue: number }
  bull: { admissions: number; revenue: number }
  recommendedWindow: string
  breakEven: number
  riskFlags: string[]
  actionableSteps: string[]
  sensitivityTable: { dimension: string; impact: 'high' | 'medium' | 'low'; score: number }[]
  confidence: number
  generatedAt: string
}

export interface AudienceSegment {
  id: string
  name: string
  ageRange: string
  profile: string
  keyInsight: string
  resonanceScore: number
  skepticism: number
  knowledge: number
  identity: number
  anxiety: number
  primaryChannels: string[]
}

export interface Campaign {
  id: string
  filmId: string
  clientId: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  startDate: string
  endDate: string
  budget: number
  phases: CampaignPhase[]
  kpis: KPI[]
}

export interface CampaignPhase {
  name: string
  startDate: string
  endDate: string
  objective: string
  status: 'upcoming' | 'active' | 'completed'
}

export interface KPI {
  label: string
  target: number
  current: number
  unit: string
  trend: 'up' | 'down' | 'stable'
}

export interface LiveTickerData {
  filmId: string
  date: string
  totalAdmissions: number
  estimatedRevenue: number
  occupancyRate: number
  screenCount: number
  cityBreakdown: { city: string; admissions: number; trend: 'up' | 'down' | 'stable' }[]
  weeklyVelocity: number
  vsProjection: number
  updatedAt: string
}

export interface GeneratedAsset {
  id: string
  filmId: string
  type: 'tagline' | 'vo-hook' | 'social-caption' | 'press-release' | 'campaign-hook' | 'creator-brief'
  platform?: string
  segment?: string
  content: string
  generatedAt: string
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'team' | 'client'
  name: string
  clientId?: string
}

export interface Client {
  id: string
  name: string
  company: string
  email: string
  films: string[]
}
