export default function Footer() {
  return (
    <footer id="kontak" className="bg-[#050505] border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-crimson" />
              <span className="font-display font-[800] text-[17px] tracking-[0.14em] text-[#F5F0EB] uppercase">KALA</span>
            </div>
            <p className="font-body font-[400] text-[13px] text-[#5A5655] leading-relaxed mb-2">
              The operating system for film marketing.
            </p>
            <p className="font-mono text-[11px] text-[#5A5655]">
              Intelligence Platform · Indonesia · Est. 2026
            </p>
            <p className="font-mono text-[11px] text-[#5A5655] mt-1">
              A joint venture: Kata.ai × Samara Group
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-[0.14em] text-[#5A5655] mb-4">Layanan</h4>
            <ul className="space-y-2.5">
              {[
                'Audience Intelligence',
                'Campaign Strategy & Execution',
                'KOL & TikTok Operations',
                'Box Office Forecast',
                'Creative Production',
              ].map(item => (
                <li key={item}>
                  <span className="font-body font-[400] text-[14px] text-[#A09896] hover:text-[#F5F0EB] transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-[0.14em] text-[#5A5655] mb-4">Tentang</h4>
            <ul className="space-y-2.5">
              {[
                'Tim & Founders',
                'Teknologi',
                'Case Studies',
                'Blog & Insight',
              ].map(item => (
                <li key={item}>
                  <span className="font-body font-[400] text-[14px] text-[#A09896] hover:text-[#F5F0EB] transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-[0.14em] text-[#5A5655] mb-4">Kontak</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:hello@kala.id" className="font-body text-sm text-[#A09896] hover:text-[#F5F0EB] transition-colors">
                  hello@kala.id
                </a>
              </li>
              {['LinkedIn', 'Instagram', 'Jadwalkan Konsultasi'].map(item => (
                <li key={item}>
                  <span className="font-body font-[400] text-[14px] text-[#A09896] hover:text-[#F5F0EB] transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-mono text-xs text-[#5A5655]">
            © 2026 KALA. Hak cipta dilindungi.
          </p>
          <p className="font-mono text-xs text-[#5A5655]">
            Indonesia · Data-Driven · Film Only
          </p>
        </div>
      </div>
    </footer>
  )
}
