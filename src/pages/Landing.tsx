import { useState } from 'react'

// ── HERO ──────────────────────────────────────────────────────────────────
function HeroDataPanel() {
  return (
    <div className="bg-[#111111] border border-[rgba(255,255,255,0.10)] p-5 font-mono text-xs w-full max-w-sm">
      {/* Panel header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(255,255,255,0.08)]">
        <span className="text-[#5A5655] uppercase tracking-wider">KALA INTELLIGENCE · LIVE</span>
        <span className="flex items-center gap-1.5 text-[#4ade80]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] live-dot" />
          LIVE
        </span>
      </div>

      {/* Film card 1 */}
      <div className="mb-4 p-3 bg-[#0A0A0A] border border-[rgba(255,255,255,0.06)]">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[#F5F0EB] text-xs font-medium">Project Garuda</p>
            <p className="text-[#5A5655] text-[10px]">Horror · Week 5 Campaign</p>
          </div>
          <span className="text-[#4ade80] text-[10px]">↑ 34% wow</span>
        </div>
        <p className="text-[#D4A853] text-lg font-medium mb-2">1.2M <span className="text-[#5A5655] text-xs font-normal">impressions</span></p>
        <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-crimson to-crimson-rich rounded-full" style={{ width: '78%' }} />
        </div>
        <p className="text-[#5A5655] text-[10px] mt-1">78% campaign progress</p>
      </div>

      {/* Film card 2 */}
      <div className="mb-4 p-3 bg-[#0A0A0A] border border-[rgba(155,28,28,0.25)]">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[#F5F0EB] text-xs font-medium">Sayap Patah</p>
            <p className="text-[#5A5655] text-[10px]">Drama Romantis · Pre-release</p>
          </div>
          <span className="text-[#B83A35] text-[10px]">⚠ Gap</span>
        </div>
        <p className="text-[#E07B39] text-lg font-medium mb-2">64K <span className="text-[#5A5655] text-xs font-normal">awareness</span></p>
        <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <div className="h-full bg-[#B83A35] rounded-full" style={{ width: '31%' }} />
        </div>
        <p className="text-[#B83A35] text-[10px] mt-1">Awareness gap detected · 31%</p>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.06)] pt-3 mb-3">
        <p className="text-[#5A5655] text-[10px] mb-2">Sentimen Publik — Bahasa Indonesia NLP</p>
        <div className="flex h-2 rounded-full overflow-hidden gap-0.5 mb-1">
          <div className="bg-[#4ade80]" style={{ width: '62%' }} />
          <div className="bg-[#A09896]" style={{ width: '22%' }} />
          <div className="bg-[#B83A35]" style={{ width: '16%' }} />
        </div>
        <div className="flex justify-between">
          <span className="text-[#4ade80] text-[10px]">62% pos</span>
          <span className="text-[#5A5655] text-[10px]">22% netral</span>
          <span className="text-[#B83A35] text-[10px]">16% neg</span>
        </div>
        <p className="text-[#5A5655] text-[10px] mt-1">324K posts · 89% model accuracy</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['TikTok', 'IG', 'X'].map(p => (
            <span key={p} className="text-[10px] text-[#5A5655] bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5">{p}</span>
          ))}
        </div>
        <span className="text-[10px] text-[#5A5655]">IndoBERT · Real-time</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="min-h-screen bg-[#0A0A0A] grain-overlay flex items-center pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#5A5655] mb-8">
              Film Marketing Intelligence · Indonesia · Est. 2026
            </p>
            <h1 className="font-display text-[64px] md:text-[80px] lg:text-[88px] leading-[1.0] font-light text-[#F5F0EB] mb-8">
              Film kamu
              <br />
              layak
              <br />
              <em className="text-crimson font-light not-italic italic">ditonton.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-[#A09896] leading-relaxed max-w-xl mb-10">
              Kami tidak menebak siapa audiensmu. Kami menemukannya —
              dengan analisis sentimen Bahasa Indonesia, segmentasi penonton berbasis AI,
              dan strategi rilis yang diprediksi, bukan diasumsikan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#kontak"
                className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium bg-crimson hover:bg-crimson-rich text-[#F5F0EB] px-7 py-3.5 transition-all duration-200"
              >
                Mulai Konsultasi
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#cara-kerja"
                className="inline-flex items-center justify-center font-body text-sm text-[#A09896] hover:text-[#F5F0EB] border border-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.25)] px-7 py-3.5 transition-all duration-200"
              >
                Lihat Cara Kerjanya
              </a>
            </div>
            <p className="font-mono text-xs text-[#5A5655]">
              Full-service · AI-powered · Film Indonesia only · Response 24 jam
            </p>
          </div>

          {/* Right */}
          <div className="flex justify-center lg:justify-end">
            <HeroDataPanel />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── STATS STRIP ──────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { number: '278+', label: 'Film Indonesia dirilis setiap tahun', source: 'Badan Perfilman Indonesia, 2024' },
    { number: '<3%', label: 'Budget produksi untuk marketing', source: 'vs. 15–30% standar Hollywood' },
    { number: '0', label: 'Agency film marketing berbasis data di Indonesia', source: 'Gap yang nyata. Pasar yang menunggu.' },
    { number: '2nd', label: 'Pasar TikTok terbesar di dunia', source: 'Indonesia · 126 juta pengguna aktif' },
  ]

  return (
    <section className="bg-[#050505] border-y border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(255,255,255,0.06)]">
          {stats.map((stat, i) => (
            <div key={i} className="px-8 py-10">
              <p className="font-display text-4xl md:text-5xl font-light text-[#E07B39] mb-3">{stat.number}</p>
              <p className="font-body text-sm text-[#F5F0EB] mb-2 leading-snug">{stat.label}</p>
              <p className="font-mono text-[10px] text-[#5A5655]">{stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PROBLEM ──────────────────────────────────────────────────────────────
function Problem() {
  const cards = [
    {
      tag: '01 — DATA VACUUM',
      title: 'Data penonton tidak bisa diakses',
      body: 'Cinema 21, CGV, dan Cinemaxx memegang data penonton. Produser tidak mendapat akses. Kamu tidak tahu siapa yang datang, dari mana, dan mengapa mereka memilih filmmu. Keputusan marketing dibuat dalam kegelapan.',
    },
    {
      tag: '02 — RELEASE CONGESTION',
      title: 'Perang rilis tanpa strategi timing',
      body: 'Ratusan film bersaing di kalender yang padat. Tanpa prediksi box office dan analisis kompetitor, kamu memilih tanggal rilis berdasarkan perkiraan — bukan kalkulasi. Satu keputusan salah bisa memangkas 40% potensi.',
    },
    {
      tag: '03 — INTUITION MARKETING',
      title: 'Budget marketing yang tidak bisa dipertanggungjawabkan',
      body: 'Endorsement KOL dibayar tanpa attribution yang jelas. Trailer dipilih berdasarkan selera, bukan data. Tidak ada A/B testing. Tidak ada ROI nyata. Uang keluar, hasilnya tidak terukur.',
    },
  ]

  return (
    <section className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-[#5A5655] mb-6">Masalah yang ada</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0EB] mb-8 max-w-2xl leading-tight">
          Film Indonesia bagus.
          <br />
          Marketingnya tertinggal.
        </h2>
        <p className="font-body text-base md:text-lg text-[#A09896] max-w-2xl mb-16 leading-relaxed">
          Produser film terbaik Indonesia masih memasarkan filmnya dengan cara yang sama
          seperti 20 tahun lalu. Intuisi. Relasi. Dan berharap viral sendiri.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 hover:border-[rgba(155,28,28,0.4)] transition-all duration-300 group"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#5A5655] mb-4 group-hover:text-crimson transition-colors">
                {card.tag}
              </p>
              <h3 className="font-display text-xl font-light text-[#F5F0EB] mb-4 leading-snug">{card.title}</h3>
              <p className="font-body text-sm text-[#A09896] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SERVICES ──────────────────────────────────────────────────────────────
function Services() {
  const [activeIdx, setActiveIdx] = useState(0)

  const services = [
    {
      nav: 'Audience Intelligence',
      brief: 'Pemetaan penonton berbasis data dan NLP Bahasa Indonesia',
      tag: 'Service 01',
      title: 'Audience Intelligence',
      body: 'Kami membangun profil penonton potensial filmmu dari nol menggunakan analisis sentimen Bahasa Indonesia berbasis IndoBERT, social listening lintas platform, dan clustering demografis. Bukan asumsi — data nyata dari lebih dari 100 juta konversasi digital.',
      deliverables: [
        'Audience Persona Report: siapa, di mana, perilaku digital mereka',
        'Sentiment Baseline Report: tonalitas publik terhadap genre dan cast',
        'Competitive Landscape Map: posisi filmmu vs kompetitor di bulan rilis',
        'Platform Affinity Score: di mana audiensmu paling aktif dan responsive',
      ],
    },
    {
      nav: 'Campaign Strategy & Execution',
      brief: 'Kampanye digital terpadu dari pre-production hingga post-release',
      tag: 'Service 02',
      title: 'Campaign Strategy & Execution',
      body: 'Kampanye film yang terstruktur — dari momen pertama teaser bocor hingga seminggu setelah rilis. Setiap phase dirancang dengan tujuan conversion yang terukur, bukan sekadar awareness yang tidak bisa diuangkan.',
      deliverables: [
        '12-week Campaign Roadmap dengan KPI per phase',
        'Meta Ads & Google Ads management dengan creative A/B testing',
        'Social media content calendar dan eksekusi harian',
        'Weekly performance report dengan rekomendasi optimasi real-time',
      ],
    },
    {
      nav: 'KOL & TikTok Operations',
      brief: 'Strategi konten dan KOL berbasis data virality',
      tag: 'Service 03',
      title: 'KOL & TikTok Operations',
      body: 'Indonesia adalah pasar TikTok terbesar ke-2 di dunia. Kami tidak sekadar menggunakan KOL — kami mengidentifikasi KOL spesifik yang audiensnya paling overlap dengan target penonton filmmu, lalu mengukur dampaknya secara granular. Bukan popularitas. Relevansi.',
      deliverables: [
        'KOL matching berbasis audience overlap analysis',
        'TikTok content strategy dan creative brief untuk setiap kreator',
        'Virality prediction sebelum konten dipublikasikan',
        'Attribution model: KOL mana yang benar-benar drive pembelian tiket?',
      ],
    },
    {
      nav: 'Release Timing & Box Office Forecast',
      brief: 'Prediksi performa dan optimasi jadwal rilis',
      tag: 'Service 04',
      title: 'Release Timing & Box Office Forecast',
      body: 'Memilih tanggal rilis adalah salah satu keputusan paling mahal dalam distribusi film. Kami memodelkan kompetisi, seasonality, dan market demand untuk merekomendasikan window rilis optimal — dan memprediksikan range box office dengan rentang kepercayaan yang jelas.',
      deliverables: [
        'Release window analysis dengan skenario kompetitif (Bear/Base/Bull)',
        'Box office projection model: P25 / P50 / P75 range',
        'Holiday dan event calendar mapping untuk 12 bulan ke depan',
        'Cinema capacity modeling per tier kota: Jakarta, Surabaya, Bandung, dll.',
      ],
    },
    {
      nav: 'Creative Production',
      brief: 'Trailer, poster, konten sosial yang dioptimasi dengan data',
      tag: 'Service 05',
      title: 'Creative Production',
      body: 'Trailer yang salah framing bisa membunuh film yang bagus sebelum bioskop sempat memberikan kesempatan. Kami memproduksi materi kreatif yang dioptimasi dengan data — dari A/B testing thumbnail hingga frame-by-frame trailer analysis menggunakan AI vision.',
      deliverables: [
        'Trailer cut optimization: hook timing, emotional arc, attention analysis',
        'Social-first content production: Reels, TikTok, YouTube Shorts',
        'Key art dan poster concept testing berdasarkan eye-tracking model',
        'Copywriting semua platform dalam Bahasa Indonesia yang akurat secara kultural',
      ],
    },
  ]

  return (
    <section id="layanan" className="bg-[#050505] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-[#5A5655] mb-6">Layanan</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0EB] mb-16 leading-tight">
          Satu ekosistem.
          <br />
          Semua yang dibutuhkan.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Nav */}
          <div className="flex flex-col gap-1">
            {services.map((svc, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`text-left px-4 py-3 border transition-all duration-200 ${
                  activeIdx === i
                    ? 'border-crimson bg-[rgba(155,28,28,0.08)] text-[#F5F0EB]'
                    : 'border-transparent text-[#A09896] hover:text-[#F5F0EB] hover:border-[rgba(255,255,255,0.08)]'
                }`}
              >
                <p className="font-body text-sm font-medium">{svc.nav}</p>
                <p className="font-mono text-[10px] text-[#5A5655] mt-0.5">{svc.brief}</p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2 border border-[rgba(255,255,255,0.08)] bg-[#111111] p-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-crimson mb-4">
              {services[activeIdx].tag}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-light text-[#F5F0EB] mb-6">
              {services[activeIdx].title}
            </h3>
            <p className="font-body text-sm text-[#A09896] leading-relaxed mb-8">
              {services[activeIdx].body}
            </p>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-3">Deliverables</p>
              <ul className="space-y-2">
                {services[activeIdx].deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-sm text-[#A09896]">
                    <span className="text-crimson mt-0.5 shrink-0">→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── HOW IT WORKS ──────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Discovery & Intelligence',
      body: 'Audit naskah, cast, genre, dan posisi kompetitor. Build baseline data dari social listening dan sentiment scan Bahasa Indonesia selama 2 minggu.',
    },
    {
      n: '02',
      title: 'Strategy Architecture',
      body: 'Desain campaign roadmap, pilih release window optimal, tentukan audience target yang spesifik, dan buat content pillars yang selaras dengan identitas film.',
    },
    {
      n: '03',
      title: 'Execute & Optimize',
      body: 'Jalankan kampanye dengan monitoring real-time. Setiap keputusan kreatif dan media buying didorong data — budget direalokasi setiap minggu berdasarkan performa.',
    },
    {
      n: '04',
      title: 'Report & Refine',
      body: 'Post-campaign full attribution report. Lessons learned menjadi proprietary data untuk campaign filmmu berikutnya — KALA makin tajam dari proyek ke proyek.',
    },
  ]

  return (
    <section id="cara-kerja" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-[#5A5655] mb-6">Cara Kerja</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0EB] mb-16 leading-tight">
          Dari brief
          <br />
          hingga bioskop penuh.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 relative overflow-hidden group hover:border-[rgba(155,28,28,0.3)] transition-all duration-300"
            >
              <p className="font-display text-6xl font-light text-[rgba(255,255,255,0.04)] absolute top-3 right-4 leading-none group-hover:text-[rgba(155,28,28,0.08)] transition-colors">
                {step.n}
              </p>
              <p className="font-mono text-xs text-crimson mb-4">Step {step.n}</p>
              <h3 className="font-display text-lg font-light text-[#F5F0EB] mb-3 leading-snug">{step.title}</h3>
              <p className="font-body text-sm text-[#A09896] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── WHY KALA ─────────────────────────────────────────────────────────────
function WhyKala() {
  const points = [
    {
      title: 'Spesialis film, bukan generalis',
      body: 'Kami tidak melayani brand kosmetik atau startup fintech di waktu yang sama. Film Indonesia adalah satu-satunya fokus kami — ini bukan tagline, ini struktur bisnis kami.',
    },
    {
      title: 'Data Bahasa Indonesia yang nyata',
      body: 'NLP engine kami dilatih untuk memahami Bahasa Indonesia, slang Betawi, Jawa, Sunda — bukan terjemahan dari model Inggris yang tidak mengerti konteks "film ini bikin baper."',
    },
    {
      title: 'Pertanggungjawaban berbasis angka',
      body: 'Kami tidak hanya laporan views dan likes. Setiap rupiah marketing bisa di-trace ke dampaknya terhadap penjualan tiket. Kalau tidak bisa diukur, kami tidak akan jual.',
    },
    {
      title: 'Proprietary data yang makin kuat setiap proyek',
      body: 'Setiap campaign menambah kekuatan database kami. Klien KALA mendapat keuntungan dari akumulasi data industri yang tidak bisa dibeli atau disaingi.',
    },
  ]

  const tableRows = [
    { cap: 'Spesialisasi film', agency: '✕ Generalis', kala: 'Film only' },
    { cap: 'Bahasa Indonesia NLP', agency: '✕ Tidak ada', kala: 'IndoBERT-powered' },
    { cap: 'Box office forecasting', agency: '✕ Tidak tersedia', kala: 'Predictive model' },
    { cap: 'KOL attribution tracking', agency: '~ Terbatas', kala: 'Full attribution' },
    { cap: 'Release timing strategy', agency: '✕ Tidak ada', kala: 'Data-modeled' },
    { cap: 'Proprietary audience data', agency: '✕ Tidak ada', kala: 'Grows per project' },
  ]

  return (
    <section id="mengapa-kala" className="bg-[#050505] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-[#5A5655] mb-6">Mengapa KALA</p>

        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0EB] leading-tight">
            Film bagus yang{' '}
            <span className="line-through text-[#5A5655]">gagal</span> di bioskop
            <br />
            bukan{' '}
            <em className="text-crimson not-italic italic">takdir.</em>
            <br />
            <span className="text-[#A09896]">Itu konsekuensi dari marketing</span>
            <br />
            <span className="text-[#A09896]">yang salah.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {points.map((pt, i) => (
            <div key={i} className="border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 hover:border-[rgba(155,28,28,0.25)] transition-all duration-300">
              <h3 className="font-display text-xl font-light text-[#F5F0EB] mb-3">{pt.title}</h3>
              <p className="font-body text-sm text-[#A09896] leading-relaxed">{pt.body}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.08)]">
                <th className="text-left font-mono text-[10px] uppercase tracking-wider text-[#5A5655] py-3 pr-4 w-1/2">Kapabilitas</th>
                <th className="text-left font-mono text-[10px] uppercase tracking-wider text-[#5A5655] py-3 pr-4 w-1/4">Agency PR / Digital Biasa</th>
                <th className="text-left font-mono text-[10px] uppercase tracking-wider text-crimson py-3 w-1/4">KALA</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)]">
                  <td className="font-body text-sm text-[#F5F0EB] py-3 pr-4">{row.cap}</td>
                  <td className="font-body text-sm text-[#5A5655] py-3 pr-4">{row.agency}</td>
                  <td className="font-body text-sm text-[#4ade80] py-3">{row.kala}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.06)] py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[#5A5655] mb-8">Mulai Sekarang</p>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-[#F5F0EB] leading-[1.05] mb-8">
          Film kamu
          <br />
          sudah siap.
          <br />
          <em className="text-crimson not-italic italic">Marketingnya?</em>
        </h2>
        <p className="font-body text-base md:text-lg text-[#A09896] leading-relaxed mb-10 max-w-xl mx-auto">
          Konsultasi pertama gratis. Kami analisis posisi filmmu dan berikan
          assessment awal — tanpa komitmen, tanpa hard sell, tanpa basa-basi.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a
            href="mailto:hello@kala.id"
            className="inline-flex items-center justify-center gap-2 font-body text-base font-medium bg-crimson hover:bg-crimson-rich text-[#F5F0EB] px-8 py-4 transition-all duration-200"
          >
            Jadwalkan Konsultasi
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <button className="inline-flex items-center justify-center font-body text-base text-[#A09896] hover:text-[#F5F0EB] border border-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.25)] px-8 py-4 transition-all duration-200">
            Lihat Case Study
          </button>
        </div>
        <p className="font-mono text-xs text-[#5A5655]">
          Response dalam 24 jam · Bahasa Indonesia · Jakarta & Remote
        </p>
      </div>
    </section>
  )
}

// ── LANDING PAGE ─────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="bg-[#0A0A0A]">
      <Hero />
      <StatsStrip />
      <Problem />
      <Services />
      <HowItWorks />
      <WhyKala />
      <CTA />
    </div>
  )
}
