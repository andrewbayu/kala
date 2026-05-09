import {
  AVG_TICKET_PRICE_IDR,
  ID_COMPARABLES,
  IdComparable,
  IdGenre,
  IdRating,
  IdReleaseWindow,
  admissionsToIDR,
} from '../data/idComparables'

export interface ForecastInput {
  title: string
  genre: IdGenre
  releaseWindow: IdReleaseWindow
  rating: IdRating
  ipType: 'original' | 'sequel' | 'remake' | 'novel' | 'true-story' | 'franchise'
  budgetTier: 'indie' | 'mid' | 'major'
  runtimeMinutes: number
  screensOpening: number // # bioskop screen at opening
  starPower: number // 0-100, blended director + cast
  buzzScore: number // 0-100, social/trailer/pre-sales
  marketingSpendIDR: number // 0+
  earlyScoreOutOf100?: number // optional, 0-100 (early screening reception)
}

export interface ForecastOutput {
  base: ScenarioForecast
  bear: ScenarioForecast
  bull: ScenarioForecast
  weeklyAdmissions: { week: number; admissions: number }[]
  closestComparables: { film: IdComparable; similarity: number }[]
  riskFlags: { level: 'low' | 'medium' | 'high'; message: string }[]
  driverBreakdown: { driver: string; multiplier: number; weight: number }[]
  audienceScore: number // 0-100 forecast
  confidence: number // 0-100
}

export interface ScenarioForecast {
  totalAdmissions: number
  openingWeekAdmissions: number
  totalGrossIDR: number
  openingWeekGrossIDR: number
  weeksInTheaters: number
}

// ---- Multipliers ---- //
// Weights tuned against the comparables. Tweakable in UI later.

const GENRE_BASELINE_ADMISSIONS: Record<IdGenre, number> = {
  horror: 2_500_000,
  comedy: 2_000_000,
  drama: 1_400_000,
  action: 1_200_000,
  romance: 1_500_000,
  family: 800_000,
  animation: 600_000,
  religious: 1_500_000,
  thriller: 1_000_000,
  biopic: 1_300_000,
}

const RELEASE_WINDOW_MULT: Record<IdReleaseWindow, number> = {
  lebaran: 1.55,
  nataru: 1.35,
  'school-holiday': 1.20,
  'long-weekend': 1.15,
  ramadan: 0.70, // film attendance dips during fasting nights for non-religious
  regular: 1.00,
}

const RATING_REACH_MULT: Record<IdRating, number> = {
  SU: 1.10, // widest audience but family-only ceiling
  'R 13+': 1.05,
  'D 17+': 1.00,
  'D 21+': 0.78,
}

const IP_TYPE_MULT: Record<ForecastInput['ipType'], number> = {
  franchise: 1.45,
  sequel: 1.30,
  novel: 1.15,
  'true-story': 1.20,
  remake: 1.10,
  original: 1.00,
}

const BUDGET_TIER_MULT: Record<ForecastInput['budgetTier'], number> = {
  major: 1.25,
  mid: 1.00,
  indie: 0.55,
}

// Diminishing-returns curve: x is 0-100, returns ~0.7..1.4
function softMult(x: number, low = 0.75, high = 1.4): number {
  const t = Math.max(0, Math.min(100, x)) / 100
  return low + (high - low) * (1 - Math.exp(-2.2 * t)) / (1 - Math.exp(-2.2))
}

// Marketing spend → mult. Indonesia indie ~Rp 500jt, major tentpole ~Rp 5-15M.
// 0 → 0.7, 1M IDR → 1.0, 5M IDR → 1.25, 15M IDR → 1.4 (saturating)
function marketingMult(spendIDR: number): number {
  const m = spendIDR / 1_000_000_000 // in milyar
  return 0.7 + 0.7 * (1 - Math.exp(-m / 4))
}

// Screens have heavy effect at low end, saturating at ~1000
function screensMult(screens: number): number {
  const s = Math.max(0, screens)
  return 0.45 + 0.7 * (1 - Math.exp(-s / 450))
}

function runtimeMult(minutes: number): number {
  // Sweet spot 95-115 min, penalty over 140
  if (minutes < 80) return 0.85
  if (minutes <= 115) return 1.05
  if (minutes <= 130) return 1.0
  if (minutes <= 145) return 0.93
  return 0.85
}

// Similarity between input and a comparable: 0..1
function similarity(input: ForecastInput, c: IdComparable): number {
  let s = 0
  if (c.genre === input.genre) s += 0.35
  if (c.releaseWindow === input.releaseWindow) s += 0.15
  if (c.rating === input.rating) s += 0.10
  if (c.ipType === input.ipType) s += 0.15
  if (c.budgetTier === input.budgetTier) s += 0.15
  // recency bias
  const yearsAgo = Math.max(0, 2025 - c.year)
  s += Math.max(0, 0.10 - yearsAgo * 0.012)
  return s
}

// Weekly decay curve: returns array of fractional admissions per week summing to ~1.
// Horror decays fastest; family/drama have legs.
function weeklyDecayProfile(genre: IdGenre, audienceScore: number): number[] {
  const halfLife: Record<IdGenre, number> = {
    horror: 1.4,
    action: 1.6,
    thriller: 1.6,
    comedy: 1.8,
    romance: 1.8,
    animation: 2.2,
    family: 2.4,
    drama: 2.2,
    religious: 2.0,
    biopic: 2.0,
  }
  const wordOfMouthBoost = (audienceScore - 60) / 100 // -0.6..0.4
  const hl = Math.max(1.0, halfLife[genre] + wordOfMouthBoost)
  const weeks: number[] = []
  let total = 0
  for (let w = 0; w < 10; w++) {
    const v = Math.pow(0.5, w / hl)
    weeks.push(v)
    total += v
  }
  return weeks.map(w => w / total)
}

export function forecast(input: ForecastInput): ForecastOutput {
  const base = GENRE_BASELINE_ADMISSIONS[input.genre]
  const driverBreakdown = [
    { driver: 'Genre baseline', multiplier: 1, weight: base },
    { driver: 'Window rilis', multiplier: RELEASE_WINDOW_MULT[input.releaseWindow], weight: 0.18 },
    { driver: 'Rating LSF', multiplier: RATING_REACH_MULT[input.rating], weight: 0.08 },
    { driver: 'Tipe IP', multiplier: IP_TYPE_MULT[input.ipType], weight: 0.15 },
    { driver: 'Tier budget', multiplier: BUDGET_TIER_MULT[input.budgetTier], weight: 0.10 },
    { driver: 'Star power', multiplier: softMult(input.starPower, 0.75, 1.35), weight: 0.10 },
    { driver: 'Buzz / pre-sales', multiplier: softMult(input.buzzScore, 0.70, 1.45), weight: 0.15 },
    { driver: 'Marketing spend', multiplier: marketingMult(input.marketingSpendIDR), weight: 0.10 },
    { driver: 'Layar bioskop', multiplier: screensMult(input.screensOpening), weight: 0.10 },
    { driver: 'Runtime', multiplier: runtimeMult(input.runtimeMinutes), weight: 0.04 },
  ]

  const totalMult = driverBreakdown.reduce(
    (acc, d) => (d.driver === 'Genre baseline' ? acc : acc * d.multiplier),
    1,
  )

  // Audience score forecast: based on early score if provided, else inferred
  // from buzz + budget tier.
  const audienceScore = input.earlyScoreOutOf100
    ?? Math.min(95, Math.round(45 + input.buzzScore * 0.35 + (input.budgetTier === 'major' ? 8 : 0)))

  // Anchor with closest comparables
  const ranked = [...ID_COMPARABLES]
    .map(c => ({ film: c, similarity: similarity(input, c) }))
    .sort((a, b) => b.similarity - a.similarity)
  const top = ranked.slice(0, 5)
  const compsWeight = top.reduce((s, x) => s + x.similarity, 0)
  const compsAvg = compsWeight > 0
    ? top.reduce((s, x) => s + x.film.admissions * x.similarity, 0) / compsWeight
    : base

  // Blend heuristic baseline*mult with comparable average. More weight on comps
  // when similarity is strong.
  const heuristicAdmissions = base * totalMult
  const blendWeight = Math.min(0.6, compsWeight / 2.5)
  const baseAdmissions = Math.round(
    heuristicAdmissions * (1 - blendWeight) + compsAvg * blendWeight,
  )

  const decay = weeklyDecayProfile(input.genre, audienceScore)
  const weeksInTheaters = Math.max(2, decay.findIndex(v => v < 0.05) > 0
    ? decay.findIndex(v => v < 0.05) + 1
    : decay.length)

  function buildScenario(adm: number, openShare: number): ScenarioForecast {
    return {
      totalAdmissions: Math.round(adm),
      openingWeekAdmissions: Math.round(adm * openShare),
      totalGrossIDR: Math.round(admissionsToIDR(adm)),
      openingWeekGrossIDR: Math.round(admissionsToIDR(adm * openShare)),
      weeksInTheaters,
    }
  }

  // Opening week share: horror & high-buzz films front-load.
  const openShareBase = decay[0]
  const openShareBear = openShareBase * 1.05
  const openShareBull = openShareBase * 0.95

  const baseOut = buildScenario(baseAdmissions, openShareBase)
  const bearOut = buildScenario(baseAdmissions * 0.55, openShareBear)
  const bullOut = buildScenario(baseAdmissions * 1.55, openShareBull)

  const weeklyAdmissions = decay.map((frac, i) => ({
    week: i + 1,
    admissions: Math.round(baseAdmissions * frac),
  }))

  // Risk flags
  const flags: ForecastOutput['riskFlags'] = []
  if (input.runtimeMinutes > 145) {
    flags.push({ level: 'medium', message: `Runtime ${input.runtimeMinutes}m memotong showings/hari → kapasitas tiket turun.` })
  }
  if (input.screensOpening < 200 && input.budgetTier !== 'indie') {
    flags.push({ level: 'high', message: `Hanya ${input.screensOpening} layar — di bawah ekspektasi tier ${input.budgetTier}.` })
  }
  if (input.releaseWindow === 'ramadan' && input.genre !== 'religious') {
    flags.push({ level: 'medium', message: 'Window Ramadan menekan trafik bioskop untuk genre non-religi.' })
  }
  if (input.rating === 'D 21+' && input.budgetTier === 'major') {
    flags.push({ level: 'medium', message: 'Rating D 21+ membatasi reach untuk film tier major.' })
  }
  if (input.buzzScore < 30) {
    flags.push({ level: 'high', message: 'Buzz pra-rilis rendah (<30). Pertimbangkan booster campaign 4 minggu sebelum tayang.' })
  }
  if (input.marketingSpendIDR < 500_000_000 && input.budgetTier === 'major') {
    flags.push({ level: 'high', message: 'Marketing spend < Rp 500jt untuk film tier major — undermarketed.' })
  }
  if (compsWeight < 0.6) {
    flags.push({ level: 'low', message: 'Sedikit komparable mirip di dataset — confidence forecast lebih rendah.' })
  }

  // Confidence: how much we trust this forecast (0-100)
  const confidence = Math.round(
    50 + Math.min(35, compsWeight * 18) + (input.earlyScoreOutOf100 != null ? 10 : 0) - flags.filter(f => f.level === 'high').length * 6,
  )

  return {
    base: baseOut,
    bear: bearOut,
    bull: bullOut,
    weeklyAdmissions,
    closestComparables: top,
    riskFlags: flags,
    driverBreakdown,
    audienceScore,
    confidence: Math.max(20, Math.min(95, confidence)),
  }
}

export const TICKET_PRICE = AVG_TICKET_PRICE_IDR
