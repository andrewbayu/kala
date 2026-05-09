// Curated Indonesian theatrical comparables (penonton / admissions).
// Figures are public-domain headline numbers reported by filmindonesia.or.id and
// trade press (e.g. Antara, Kompas, CNN Indonesia). Used as anchor points for
// the heuristic forecast model — not authoritative box office records.

export type IdGenre =
  | 'horror'
  | 'drama'
  | 'comedy'
  | 'action'
  | 'romance'
  | 'family'
  | 'animation'
  | 'religious'
  | 'thriller'
  | 'biopic'

export type IdReleaseWindow =
  | 'lebaran'
  | 'nataru'
  | 'long-weekend'
  | 'regular'
  | 'ramadan'
  | 'school-holiday'

export type IdRating = 'SU' | 'R 13+' | 'D 17+' | 'D 21+'

export interface IdComparable {
  title: string
  year: number
  genre: IdGenre
  releaseWindow: IdReleaseWindow
  rating: IdRating
  ipType: 'original' | 'sequel' | 'remake' | 'novel' | 'true-story' | 'franchise'
  budgetTier: 'indie' | 'mid' | 'major'
  admissions: number // total penonton
  openingWeekAdmissions: number
  screensOpening: number
}

// Anchored to widely-reported figures. Where exact opening week is uncertain,
// approximated as ~35-50% of total for tentpoles, higher for horror.
export const ID_COMPARABLES: IdComparable[] = [
  // Mega-tentpoles
  { title: 'KKN di Desa Penari', year: 2022, genre: 'horror', releaseWindow: 'regular', rating: 'D 17+', ipType: 'novel', budgetTier: 'mid', admissions: 9_233_847, openingWeekAdmissions: 2_500_000, screensOpening: 700 },
  { title: 'Agak Laen', year: 2024, genre: 'comedy', releaseWindow: 'regular', rating: 'R 13+', ipType: 'original', budgetTier: 'mid', admissions: 9_138_000, openingWeekAdmissions: 2_100_000, screensOpening: 650 },
  { title: 'Pengabdi Setan 2: Communion', year: 2022, genre: 'horror', releaseWindow: 'regular', rating: 'D 17+', ipType: 'sequel', budgetTier: 'mid', admissions: 6_390_000, openingWeekAdmissions: 1_800_000, screensOpening: 750 },
  { title: 'Warkop DKI Reborn', year: 2016, genre: 'comedy', releaseWindow: 'regular', rating: 'R 13+', ipType: 'remake', budgetTier: 'mid', admissions: 6_858_000, openingWeekAdmissions: 1_900_000, screensOpening: 600 },
  { title: 'Dilan 1990', year: 2018, genre: 'romance', releaseWindow: 'regular', rating: 'R 13+', ipType: 'novel', budgetTier: 'mid', admissions: 6_315_000, openingWeekAdmissions: 1_700_000, screensOpening: 500 },
  { title: 'Ayat-Ayat Cinta', year: 2008, genre: 'religious', releaseWindow: 'regular', rating: 'R 13+', ipType: 'novel', budgetTier: 'mid', admissions: 3_676_000, openingWeekAdmissions: 950_000, screensOpening: 450 },
  { title: 'Laskar Pelangi', year: 2008, genre: 'drama', releaseWindow: 'regular', rating: 'SU', ipType: 'novel', budgetTier: 'mid', admissions: 4_606_000, openingWeekAdmissions: 1_100_000, screensOpening: 400 },

  // Strong recent
  { title: 'Sewu Dino', year: 2023, genre: 'horror', releaseWindow: 'lebaran', rating: 'D 17+', ipType: 'novel', budgetTier: 'mid', admissions: 4_800_000, openingWeekAdmissions: 1_500_000, screensOpening: 700 },
  { title: 'Siksa Kubur', year: 2024, genre: 'horror', releaseWindow: 'lebaran', rating: 'D 17+', ipType: 'original', budgetTier: 'mid', admissions: 4_300_000, openingWeekAdmissions: 1_400_000, screensOpening: 750 },
  { title: 'Badarawuhi di Desa Penari', year: 2024, genre: 'horror', releaseWindow: 'lebaran', rating: 'D 17+', ipType: 'sequel', budgetTier: 'mid', admissions: 6_300_000, openingWeekAdmissions: 1_900_000, screensOpening: 850 },
  { title: 'Mencuri Raden Saleh', year: 2022, genre: 'action', releaseWindow: 'regular', rating: 'R 13+', ipType: 'original', budgetTier: 'major', admissions: 2_360_000, openingWeekAdmissions: 800_000, screensOpening: 600 },
  { title: 'Miracle in Cell No. 7', year: 2022, genre: 'drama', releaseWindow: 'regular', rating: 'R 13+', ipType: 'remake', budgetTier: 'mid', admissions: 5_854_000, openingWeekAdmissions: 1_500_000, screensOpening: 600 },
  { title: 'KKN di Desa Penari: Luwih Dowo Luwih Medeni', year: 2023, genre: 'horror', releaseWindow: 'regular', rating: 'D 17+', ipType: 'sequel', budgetTier: 'mid', admissions: 1_650_000, openingWeekAdmissions: 700_000, screensOpening: 600 },
  { title: 'Vina: Sebelum 7 Hari', year: 2024, genre: 'horror', releaseWindow: 'regular', rating: 'D 17+', ipType: 'true-story', budgetTier: 'mid', admissions: 5_750_000, openingWeekAdmissions: 1_700_000, screensOpening: 750 },

  // Mid-tier
  { title: 'My Heart', year: 2006, genre: 'romance', releaseWindow: 'regular', rating: 'R 13+', ipType: 'original', budgetTier: 'mid', admissions: 1_200_000, openingWeekAdmissions: 350_000, screensOpening: 250 },
  { title: 'The Raid: Redemption', year: 2012, genre: 'action', releaseWindow: 'regular', rating: 'D 21+', ipType: 'original', budgetTier: 'mid', admissions: 1_840_000, openingWeekAdmissions: 600_000, screensOpening: 350 },
  { title: 'The Raid 2: Berandal', year: 2014, genre: 'action', releaseWindow: 'regular', rating: 'D 21+', ipType: 'sequel', budgetTier: 'major', admissions: 1_900_000, openingWeekAdmissions: 650_000, screensOpening: 400 },
  { title: 'Habibie & Ainun', year: 2012, genre: 'biopic', releaseWindow: 'regular', rating: 'R 13+', ipType: 'true-story', budgetTier: 'mid', admissions: 4_585_000, openingWeekAdmissions: 1_200_000, screensOpening: 450 },
  { title: 'Dua Garis Biru', year: 2019, genre: 'drama', releaseWindow: 'regular', rating: 'R 13+', ipType: 'original', budgetTier: 'mid', admissions: 2_538_000, openingWeekAdmissions: 750_000, screensOpening: 400 },
  { title: 'Tilik', year: 2020, genre: 'drama', releaseWindow: 'regular', rating: 'R 13+', ipType: 'original', budgetTier: 'indie', admissions: 80_000, openingWeekAdmissions: 30_000, screensOpening: 50 },
  { title: 'Yowis Ben', year: 2018, genre: 'comedy', releaseWindow: 'regular', rating: 'R 13+', ipType: 'original', budgetTier: 'mid', admissions: 940_000, openingWeekAdmissions: 280_000, screensOpening: 300 },
  { title: 'Imperfect', year: 2019, genre: 'comedy', releaseWindow: 'regular', rating: 'R 13+', ipType: 'novel', budgetTier: 'mid', admissions: 2_650_000, openingWeekAdmissions: 800_000, screensOpening: 400 },
  { title: 'Garuda di Dadaku', year: 2009, genre: 'family', releaseWindow: 'school-holiday', rating: 'SU', ipType: 'original', budgetTier: 'mid', admissions: 1_371_000, openingWeekAdmissions: 380_000, screensOpening: 250 },
  { title: 'Petualangan Sherina 2', year: 2023, genre: 'family', releaseWindow: 'school-holiday', rating: 'SU', ipType: 'sequel', budgetTier: 'major', admissions: 1_300_000, openingWeekAdmissions: 400_000, screensOpening: 500 },

  // Animation
  { title: 'Battle of Surabaya', year: 2015, genre: 'animation', releaseWindow: 'regular', rating: 'R 13+', ipType: 'original', budgetTier: 'major', admissions: 100_000, openingWeekAdmissions: 35_000, screensOpening: 150 },
  { title: 'Si Juki the Movie', year: 2017, genre: 'animation', releaseWindow: 'school-holiday', rating: 'SU', ipType: 'original', budgetTier: 'mid', admissions: 600_000, openingWeekAdmissions: 200_000, screensOpening: 300 },
  { title: 'Knight Kris', year: 2017, genre: 'animation', releaseWindow: 'school-holiday', rating: 'SU', ipType: 'original', budgetTier: 'mid', admissions: 70_000, openingWeekAdmissions: 25_000, screensOpening: 120 },
  { title: 'Jumbo', year: 2025, genre: 'animation', releaseWindow: 'lebaran', rating: 'SU', ipType: 'original', budgetTier: 'major', admissions: 8_000_000, openingWeekAdmissions: 2_000_000, screensOpening: 800 },

  // Religious / Lebaran tentpoles
  { title: 'Hafalan Shalat Delisa', year: 2011, genre: 'religious', releaseWindow: 'regular', rating: 'SU', ipType: 'novel', budgetTier: 'mid', admissions: 720_000, openingWeekAdmissions: 220_000, screensOpening: 300 },
  { title: 'Mariposa', year: 2020, genre: 'romance', releaseWindow: 'regular', rating: 'R 13+', ipType: 'novel', budgetTier: 'mid', admissions: 707_000, openingWeekAdmissions: 280_000, screensOpening: 350 },
  { title: 'Ipar Adalah Maut', year: 2024, genre: 'drama', releaseWindow: 'regular', rating: 'D 17+', ipType: 'true-story', budgetTier: 'mid', admissions: 4_700_000, openingWeekAdmissions: 1_400_000, screensOpening: 700 },
]

// Average ticket price in IDR (national blended). Source: GPBSI/filmindonesia commentary.
export const AVG_TICKET_PRICE_IDR = 45_000

export function admissionsToIDR(admissions: number, ticketPrice = AVG_TICKET_PRICE_IDR): number {
  return admissions * ticketPrice
}

export function formatIDR(amount: number): string {
  if (amount >= 1_000_000_000_000) return `Rp ${(amount / 1_000_000_000_000).toFixed(2)} T`
  if (amount >= 1_000_000_000) return `Rp ${(amount / 1_000_000_000).toFixed(2)} M`
  if (amount >= 1_000_000) return `Rp ${(amount / 1_000_000).toFixed(1)} Jt`
  return `Rp ${amount.toLocaleString('id-ID')}`
}

export function formatPenonton(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} Jt`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} rb`
  return n.toLocaleString('id-ID')
}
