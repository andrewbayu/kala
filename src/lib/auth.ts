import type { User } from '../types'

const TEAM_USERS: User[] = [
  { id: 'u1', email: 'team@kala.id', role: 'team', name: 'KALA Team' },
  { id: 'u2', email: 'admin@kala.id', role: 'admin', name: 'Admin KALA' },
]

const CLIENT_USERS: User[] = [
  { id: 'c1', email: 'client@baseentertainment.id', role: 'client', name: 'BASE Entertainment', clientId: 'base-entertainment' },
  { id: 'c2', email: 'visinema@visinema.co.id', role: 'client', name: 'Visinema Pictures', clientId: 'visinema' },
]

const TEAM_PASSWORD = 'kala2026'
const CLIENT_PASSWORD = 'client2026'

const STORAGE_KEY = 'kala_user'

export function login(email: string, password: string): User | null {
  const teamUser = TEAM_USERS.find(u => u.email === email)
  if (teamUser && password === TEAM_PASSWORD) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teamUser))
    return teamUser
  }

  const clientUser = CLIENT_USERS.find(u => u.email === email)
  if (clientUser && password === CLIENT_PASSWORD) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clientUser))
    return clientUser
  }

  return null
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as User
  } catch {
    return null
  }
}

export function isTeamUser(user: User | null): boolean {
  return user?.role === 'team' || user?.role === 'admin'
}

export function isClientUser(user: User | null): boolean {
  return user?.role === 'client'
}
