import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLanding = location.pathname === '/'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isLanding
          ? 'bg-[#0C0C14]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-crimson live-dot" />
          <span className="font-display font-[800] text-[17px] tracking-[0.14em] text-[#F2EFE6] uppercase">KALA</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Cara Kerja', href: '#cara-kerja' },
            { label: 'Teknologi', href: '#teknologi' },
            { label: 'Tentang', href: '#tentang' },
            { label: 'Kontak', href: '#kontak' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              className="font-body font-[500] text-[14px] text-[#A09896] hover:text-[#F2EFE6] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="font-body text-sm text-[#A09896] hover:text-[#F2EFE6] transition-colors px-3 py-1.5"
          >
            Masuk
          </Link>
          <a
            href="#kontak"
            className="relative group font-body font-semibold text-[13px] tracking-[0.03em] bg-crimson hover:bg-crimson-rich text-[#F2EFE6] px-5 py-2 transition-all duration-200"
          >
            Ngobrol Dulu →
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#191919] border border-[rgba(255,255,255,0.10)] text-[#A09896] font-mono text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Gratis. Tanpa agenda. Kita lihat dulu.
            </span>
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#A09896] hover:text-[#F2EFE6] p-1"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0C0C14]/98 border-t border-[rgba(255,255,255,0.06)] px-6 py-4 flex flex-col gap-4">
          {[
            { label: 'Cara Kerja', href: '#cara-kerja' },
            { label: 'Teknologi', href: '#teknologi' },
            { label: 'Tentang', href: '#tentang' },
            { label: 'Kontak', href: '#kontak' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-[#A09896] hover:text-[#F2EFE6] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={() => setMenuOpen(false)}
            className="font-body text-sm font-medium bg-crimson text-[#F2EFE6] px-5 py-2.5 text-center mt-2"
          >
            Ngobrol Dulu →
          </a>
        </div>
      )}
    </nav>
  )
}
