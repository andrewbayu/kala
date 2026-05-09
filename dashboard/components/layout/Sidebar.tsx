'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Film, Users, TrendingUp, Activity,
  Clapperboard, Star, MessageCircle, Settings,
} from 'lucide-react'

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  badge?: string
  disabled?: boolean
}

function NavItem({ href, icon, label, badge, disabled }: NavItemProps) {
  const pathname = usePathname()
  const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

  if (disabled) {
    return (
      <div className="nav-item disabled flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          {icon}
          <span>{label}</span>
        </span>
        {badge && (
          <span
            className="font-mono text-[8px] tracking-widest uppercase px-1.5 py-0.5 rounded-badge"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--white-tertiary)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {badge}
          </span>
        )}
      </div>
    )
  }

  return (
    <Link href={href} className={`nav-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </Link>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[9px] tracking-[0.16em] uppercase px-3 mt-5 mb-1.5" style={{ color: 'var(--white-tertiary)' }}>
      {children}
    </p>
  )
}

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 bottom-0 flex flex-col z-40"
      style={{
        width: 220,
        background: 'var(--black-3)',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2.5">
          {/* Logomark */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 22,
              height: 22,
              border: '1.5px solid var(--crimson)',
              borderRadius: 5,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--crimson)',
                boxShadow: '0 0 6px rgba(155,28,28,0.8)',
              }}
            />
          </div>
          <div>
            <p className="font-body font-[800] text-[15px] tracking-[0.12em] text-white-primary uppercase leading-none">
              KALA
            </p>
            <p className="font-mono text-[9px] mt-0.5" style={{ color: 'var(--white-tertiary)' }}>
              Internal · v0.1
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <SectionLabel>Workspace</SectionLabel>
        <NavItem href="/dashboard"        icon={<LayoutDashboard size={14} strokeWidth={1.5} />} label="Overview" />
        <NavItem href="/dashboard/campaigns" icon={<Film size={14} strokeWidth={1.5} />}           label="Campaigns" />

        <SectionLabel>Intelligence Tools</SectionLabel>
        <NavItem href="/dashboard/audience-dna"  icon={<Users size={14} strokeWidth={1.5} />}       label="AudienceDNA™" />
        <NavItem href="/dashboard/box-predict"   icon={<TrendingUp size={14} strokeWidth={1.5} />}  label="BoxPredict™" />
        <NavItem href="/dashboard/live-ticker"   icon={<Activity size={14} strokeWidth={1.5} />}    label="Live Ticker" />

        <SectionLabel>Production</SectionLabel>
        <NavItem href="/dashboard/cineforge"  icon={<Clapperboard size={14} strokeWidth={1.5} />}  label="CineForge™"  badge="soon" disabled />
        <NavItem href="/dashboard/stargraph"  icon={<Star size={14} strokeWidth={1.5} />}           label="StarGraph™"  badge="soon" disabled />
        <NavItem href="/dashboard/fanconvo"   icon={<MessageCircle size={14} strokeWidth={1.5} />}  label="FanConvo™"   badge="soon" disabled />
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t pt-3" style={{ borderColor: 'var(--border-subtle)' }}>
        {/* Active film badge */}
        <div
          className="px-3 py-2.5 rounded-[8px] mb-3"
          style={{ background: 'var(--black-4)', border: '1px solid var(--border-subtle)' }}
        >
          <p className="font-mono text-[9px] tracking-[0.16em] uppercase mb-1" style={{ color: 'var(--crimson)' }}>
            ● Active Film
          </p>
          <p className="font-body font-[600] text-[12px] text-white-primary leading-tight">Project Garuda</p>
          <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--white-tertiary)' }}>
            Horror · Week 4
          </p>
        </div>

        <NavItem href="/dashboard/settings" icon={<Settings size={14} strokeWidth={1.5} />} label="Pengaturan" />
      </div>
    </aside>
  )
}
