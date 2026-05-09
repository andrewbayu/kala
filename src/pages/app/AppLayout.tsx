import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../../lib/auth'
import type { User } from '../../types'

const NAV_ITEMS = [
  {
    href: '/app',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h7v7H3zM14 7h7v7h-7zM3 17h7v4H3zM14 17h7v4h-7z" />
      </svg>
    ),
  },
  {
    href: '/app/filmsim',
    label: 'FilmSim™',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: '/app/cineforge',
    label: 'CineForge™',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    href: '/app/live-ticker',
    label: 'Live Ticker',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    href: '/app/audience-dna',
    label: 'AudienceDNA™',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function AppLayout() {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const u = getCurrentUser()
    if (!u || u.role === 'client') {
      navigate('/login')
      return
    }
    setUser(u)
  }, [navigate])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0C0C14] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#0C0C14] border-r border-[#2A2A3E] flex flex-col fixed top-0 left-0 h-full z-40">
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-[#2A2A3E]">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-crimson live-dot" />
            <span className="font-display font-bold text-base tracking-widest text-[#F2EFE6] uppercase">KALA</span>
          </Link>
          <span className="ml-2 font-mono text-[9px] text-[#5A5655] uppercase tracking-wider mt-0.5">OS</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/app'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm font-body transition-all duration-150 group ${
                  isActive
                    ? 'bg-[rgba(155,28,28,0.12)] text-[#F2EFE6] border-l-2 border-crimson pl-2.5'
                    : 'text-[#B8B5AA] hover:text-[#F2EFE6] hover:bg-[rgba(255,255,255,0.03)]'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* KIE Status */}
        <div className="px-3 py-3 border-t border-[#2A2A3E]">
          <div className="bg-[#1A1A28] border border-[#2A2A3E] px-3 py-2">
            <p className="font-mono text-[9px] uppercase tracking-wider text-[#5A5655] mb-1">KIE Context</p>
            <p className="font-mono text-[10px] text-[#D4A853]">● Garuda di Dadaku</p>
            <p className="font-mono text-[9px] text-[#B8B5AA] mt-0.5">Penonton Keluarga · R=92</p>
          </div>
        </div>

        {/* User */}
        <div className="px-3 py-3 border-t border-[#2A2A3E]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-xs text-[#F2EFE6]">{user.name}</p>
              <p className="font-mono text-[9px] text-[#5A5655] uppercase">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="font-mono text-[10px] text-[#5A5655] hover:text-[#B83A35] transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-56 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
