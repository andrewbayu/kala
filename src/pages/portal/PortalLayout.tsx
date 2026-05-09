import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../../lib/auth'
import type { User } from '../../types'

export default function PortalLayout() {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const u = getCurrentUser()
    if (!u || u.role !== 'client') {
      navigate('/portal/login')
      return
    }
    setUser(u)
  }, [navigate])

  function handleLogout() {
    logout()
    navigate('/portal/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0C0C14] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#0C0C14] border-r border-[#2A2A3E] flex flex-col fixed top-0 left-0 h-full z-40">
        <div className="h-14 flex items-center px-5 border-b border-[#2A2A3E]">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-crimson" />
            <span className="font-display font-[800] text-[15px] tracking-[0.14em] text-[#F2EFE6] uppercase">KALA</span>
          </Link>
          <span className="ml-2 font-body font-semibold text-[9px] text-[#5A5655] uppercase tracking-[0.12em] mt-0.5">Client</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {[
            { href: '/portal', label: 'Campaign Overview', end: true },
            { href: '/portal/reports', label: 'Laporan & Deliverables', end: false },
            { href: '/portal/performance', label: 'Live Performance', end: false },
          ].map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 text-sm font-body transition-all duration-150 ${
                  isActive
                    ? 'bg-[rgba(155,28,28,0.12)] text-[#F2EFE6] border-l-2 border-crimson pl-2.5'
                    : 'text-[#B8B5AA] hover:text-[#F2EFE6] hover:bg-[rgba(255,255,255,0.03)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-[#2A2A3E]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-xs text-[#F2EFE6]">{user.name}</p>
              <p className="font-mono text-[9px] text-[#5A5655] uppercase">Client Portal</p>
            </div>
            <button onClick={handleLogout} className="font-mono text-[10px] text-[#5A5655] hover:text-[#B83A35] transition-colors">
              Keluar
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-56 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
