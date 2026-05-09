// TMDB API integration. Provides search + metadata autofill for the BoxPredict page.
//
// Setup:
//   1. Get a free API Read Access Token at https://www.themoviedb.org/settings/api
//   2. Create .env.local in repo root and add:
//        VITE_TMDB_API_KEY=your_token_here
//   3. On Netlify, add the same env var in Site Settings → Environment.
//
// Without a token, isTmdbConfigured() returns false and the page falls back to
// manual entry mode (no autofill).

import type { IdGenre, IdRating } from '../data/idComparables'

const TMDB_BASE = 'https://api.themoviedb.org/3'

export function isTmdbConfigured(): boolean {
  return Boolean(import.meta.env.VITE_TMDB_API_KEY)
}

function authHeaders(): HeadersInit {
  const key = import.meta.env.VITE_TMDB_API_KEY as string | undefined
  if (!key) throw new Error('TMDB API key not configured')
  // TMDB v4 read-access tokens are bearer tokens. v3 keys are query-string.
  // Heuristic: v4 tokens are JWT-like (long, contains dots).
  if (key.includes('.')) {
    return { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  }
  return { 'Content-Type': 'application/json' }
}

function withApiKey(url: string): string {
  const key = import.meta.env.VITE_TMDB_API_KEY as string | undefined
  if (!key || key.includes('.')) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}api_key=${key}`
}

export interface TmdbSearchResult {
  id: number
  title: string
  releaseDate: string
  posterPath: string | null
  popularity: number
  voteAverage: number
  voteCount: number
  overview: string
}

export interface TmdbMovieDetail {
  id: number
  title: string
  originalLanguage: string
  releaseDate: string
  runtime: number
  budget: number
  genres: { id: number; name: string }[]
  popularity: number
  voteAverage: number
  voteCount: number
  productionCountries: { iso_3166_1: string; name: string }[]
}

export async function searchMovies(query: string): Promise<TmdbSearchResult[]> {
  if (!isTmdbConfigured()) return []
  const url = withApiKey(
    `${TMDB_BASE}/search/movie?query=${encodeURIComponent(query)}&language=id-ID&include_adult=false`,
  )
  const res = await fetch(url, { headers: authHeaders() })
  if (!res.ok) throw new Error(`TMDB search failed: ${res.status}`)
  const data = await res.json()
  return (data.results ?? []).slice(0, 8).map((r: any) => ({
    id: r.id,
    title: r.title,
    releaseDate: r.release_date ?? '',
    posterPath: r.poster_path,
    popularity: r.popularity ?? 0,
    voteAverage: r.vote_average ?? 0,
    voteCount: r.vote_count ?? 0,
    overview: r.overview ?? '',
  }))
}

export async function getMovieDetail(id: number): Promise<TmdbMovieDetail> {
  if (!isTmdbConfigured()) throw new Error('TMDB API key not configured')
  const url = withApiKey(`${TMDB_BASE}/movie/${id}?language=id-ID`)
  const res = await fetch(url, { headers: authHeaders() })
  if (!res.ok) throw new Error(`TMDB detail failed: ${res.status}`)
  const data = await res.json()
  return {
    id: data.id,
    title: data.title,
    originalLanguage: data.original_language,
    releaseDate: data.release_date ?? '',
    runtime: data.runtime ?? 0,
    budget: data.budget ?? 0,
    genres: data.genres ?? [],
    popularity: data.popularity ?? 0,
    voteAverage: data.vote_average ?? 0,
    voteCount: data.vote_count ?? 0,
    productionCountries: data.production_countries ?? [],
  }
}

// TMDB → our Indonesian genre taxonomy (lossy)
const TMDB_GENRE_MAP: Record<string, IdGenre> = {
  Horror: 'horror',
  Thriller: 'thriller',
  Action: 'action',
  Adventure: 'action',
  Drama: 'drama',
  Romance: 'romance',
  Comedy: 'comedy',
  Family: 'family',
  Animation: 'animation',
  History: 'biopic',
  Documentary: 'biopic',
}

export function tmdbToIdGenre(genres: { name: string }[]): IdGenre {
  for (const g of genres) {
    const mapped = TMDB_GENRE_MAP[g.name]
    if (mapped) return mapped
  }
  return 'drama'
}

// TMDB doesn't carry LSF rating. Heuristic from genre.
export function inferIdRating(genre: IdGenre): IdRating {
  if (genre === 'horror' || genre === 'thriller') return 'D 17+'
  if (genre === 'animation' || genre === 'family') return 'SU'
  return 'R 13+'
}

// Buzz proxy from TMDB popularity + vote count. Caps at 100.
export function tmdbBuzzScore(popularity: number, voteCount: number): number {
  const popPart = Math.min(60, popularity * 1.2)
  const votePart = Math.min(40, Math.log10(Math.max(1, voteCount)) * 12)
  return Math.round(popPart + votePart)
}

// Star power proxy: hard to derive from TMDB without person endpoints. Default
// to budget-tier nudge — caller can override.
export function defaultStarPower(budgetUsd: number): number {
  if (budgetUsd > 50_000_000) return 78
  if (budgetUsd > 10_000_000) return 62
  if (budgetUsd > 1_000_000) return 50
  return 40
}
