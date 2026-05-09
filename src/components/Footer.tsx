export default function Footer() {
  return (
    <footer id="kontak-footer" className="bg-[#080810] border-t border-[#2A2A3E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-crimson" />
              <span className="font-display font-[800] text-[17px] tracking-[0.14em] text-[#F2EFE6] uppercase">KALA</span>
            </div>
            <p className="font-body font-[400] text-[13px] text-[#5A5655] leading-relaxed mb-1">
              The operating system for film marketing.
            </p>
            <p className="font-mono text-[11px] text-[#5A5655]">
              Kata.ai × Samara Group · Indonesia · Est. 2026
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-[0.14em] text-[#5A5655] mb-5">Platform</h4>
            <ul className="space-y-3">
              {[
                'AudienceDNA™',
                'BoxPredict™',
                'CineForge™',
                'StarGraph™',
                'FanConvo™',
                'Live Ticker',
              ].map(item => (
                <li key={item}>
                  <span className="font-body font-[400] text-[14px] text-[#A09896] hover:text-[#F2EFE6] transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-[0.14em] text-[#5A5655] mb-5">Perusahaan</h4>
            <ul className="space-y-3">
              {[
                'Cara Kerja',
                'Tentang Kami',
                'Tulisan & Insight',
                'Kontak',
              ].map(item => (
                <li key={item}>
                  <span className="font-body font-[400] text-[14px] text-[#A09896] hover:text-[#F2EFE6] transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
              <li className="pt-2">
                <a href="mailto:hello@kala.id" className="font-mono text-[12px] text-[#A09896] hover:text-[#F2EFE6] transition-colors">
                  hello@kala.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A2A3E] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-mono text-xs text-[#5A5655]">© 2026 KALA. Hak cipta dilindungi.</p>
          <p className="font-mono text-xs text-[#5A5655]">Khusus film Indonesia.</p>
        </div>
      </div>
    </footer>
  )
}
