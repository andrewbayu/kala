import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Activity, Film, MessageCircle, Share2, TrendingUp, Users } from 'lucide-react'
import FilmHelix from '../components/FilmHelix'
import { useInView } from '../hooks/useInView'

// Scroll-triggered fade-up wrapper
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Section transition text — narrated bridge between acts
function TransitionText({ text }: { text: string }) {
  const { ref, inView } = useInView({ threshold: 0.4 })
  return (
    <div className="py-28 flex items-center justify-center" ref={ref}>
      <p
        className="font-display font-light text-[22px] md:text-[32px] text-center leading-snug tracking-[-0.01em] max-w-2xl px-6"
        style={{
          color: 'rgba(242, 239, 230, 0.5)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {text}
      </p>
    </div>
  )
}

// Animated number counter
function Counter({ target, suffix = '', inView }: { target: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const duration = 1300
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <>{count}{suffix}</>
}

function ContactForm() {
  const [form, setForm] = useState({ nama: '', film: '', email: '', hp: '', cerita: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  const inputCls = 'w-full bg-[#1A1A28] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-4 py-3 focus:outline-none focus:border-crimson transition-colors placeholder:text-[#5A5655]'
  const labelCls = 'font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A5655] block mb-2'

  if (sent) {
    return (
      <div className="border border-[#2A2A3E] p-8 flex flex-col items-start justify-center min-h-[480px]">
        <div className="w-8 h-8 border border-[#D4A853]/40 flex items-center justify-center mb-6">
          <span className="text-[#D4A853] text-[16px]">✓</span>
        </div>
        <h3 className="font-display font-[300] text-[28px] tracking-[-0.02em] text-[#F2EFE6] mb-4">
          Pesanmu sudah sampai.
        </h3>
        <p className="font-body text-[15px] text-[#A09896] leading-[1.72] mb-6">
          Tim KALA akan menghubungimu dalam 24 jam untuk menjadwalkan sesi konsultasi pertama.<br /><br />
          Laporan Audience Awal akan dikirimkan sebelum sesi berlangsung.
        </p>
        <p className="font-mono text-[10px] text-[#5A5655] tracking-wide">hello@kala.id · +62 21 xxxx xxxx</p>
      </div>
    )
  }

  return (
    <div className="border border-[#2A2A3E] p-7">
      <div className="mb-7">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#5A5655] mb-1">Mulai dari sini</p>
        <h3 className="font-display font-[300] text-[22px] tracking-[-0.02em] text-[#F2EFE6]">
          Ceritakan filmmu.
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nama</label>
            <input
              type="text"
              value={form.nama}
              onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
              className={inputCls}
              placeholder="Nama kamu"
              required
            />
          </div>
          <div>
            <label className={labelCls}>Judul Film</label>
            <input
              type="text"
              value={form.film}
              onChange={e => setForm(f => ({ ...f, film: e.target.value }))}
              className={inputCls}
              placeholder="Judul / kode proyek"
              required
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className={inputCls}
            placeholder="kamu@studio.com"
            required
          />
        </div>

        <div>
          <label className={labelCls}>No. HP <span className="normal-case text-[#5A5655]/60">(opsional)</span></label>
          <input
            type="tel"
            value={form.hp}
            onChange={e => setForm(f => ({ ...f, hp: e.target.value }))}
            className={inputCls}
            placeholder="+62 8xx xxxx xxxx"
          />
        </div>

        <div>
          <label className={labelCls}>Ceritakan filmmu</label>
          <textarea
            value={form.cerita}
            onChange={e => setForm(f => ({ ...f, cerita: e.target.value }))}
            className={`${inputCls} resize-none`}
            rows={4}
            placeholder="Genre, tahap produksi, target rilis, atau apa pun yang kamu anggap penting..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-crimson hover:bg-crimson-rich text-[#F2EFE6] font-body font-medium text-[14px] py-3.5 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? 'Mengirim...' : 'Kirim & Dapatkan Konsultasi Gratis →'}
        </button>
      </form>

      <p className="font-mono text-[9px] text-[#5A5655] text-center mt-4 leading-snug">
        Termasuk Laporan Audience Awal gratis · Tidak ada komitmen
      </p>
    </div>
  )
}

export default function Landing() {
  const [heroVisible, setHeroVisible] = useState(false)
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2 })

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const heroLine = (delay: number) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(100%)',
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  })

  const heroFade = (delay: number) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  })

  return (
    <div className="bg-[#0C0C14]">

      {/* ─── ACT 1: RECOGNITION ──────────────────────────────────────────────── */}

      {/* HERO */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden grain-overlay">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] -translate-y-1/2 opacity-[0.055]"
            style={{ background: 'radial-gradient(circle, #D4A853 0%, transparent 65%)' }} />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">

            {/* Left — copy */}
            <div className="max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-10" style={heroFade(0)}>
                Film Marketing Intelligence · Indonesia
              </p>

              <div className="mb-8">
                {[
                  { text: 'Ada yang salah', delay: 120, crimson: false },
                  { text: 'dengan cara film', delay: 240, crimson: false },
                  { text: 'dipasarkan di sini.', delay: 360, crimson: true },
                ].map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <span
                      className={`block font-display leading-[1.0] tracking-[-0.03em] text-[52px] md:text-[68px] lg:text-[76px] ${
                        line.crimson ? 'font-[700] italic text-crimson' : 'font-[300] text-[#F2EFE6]'
                      }`}
                      style={heroLine(line.delay)}
                    >
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-body font-[400] text-[16px] md:text-[17px] text-[#A09896] leading-[1.78] mb-10" style={heroFade(700)}>
                Bukan karena filmnya kurang bagus.<br />
                Tapi karena tidak ada yang tahu pasti<br />
                siapa yang harus menontonnya —<br />
                dan bagaimana cara menemukannya.
              </p>

              <div className="flex flex-wrap gap-4 mb-10" style={heroFade(880)}>
                <a href="#kontak" className="font-body font-medium text-[14px] bg-crimson hover:bg-crimson-rich text-[#F2EFE6] px-7 py-3.5 transition-colors duration-200">
                  Ceritakan Film Kamu →
                </a>
                <a href="#cara-kerja" className="font-body font-medium text-[14px] border border-[rgba(255,255,255,0.14)] text-[#A09896] hover:text-[#F2EFE6] hover:border-[rgba(255,255,255,0.28)] px-7 py-3.5 transition-all duration-200">
                  Lihat Cara Kerjanya
                </a>
              </div>

              <p
                className="font-mono text-[10px] text-[#5A5655] tracking-wide"
                style={{ ...heroFade(1060), opacity: heroVisible ? 0.65 : 0 }}
              >
                Full-service · AI-powered · Khusus film Indonesia · Respon 24 jam
              </p>
            </div>

            {/* Right — FilmHelix + live panel */}
            <div className="hidden lg:flex flex-col items-center gap-6 relative">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 280, height: 440, background: 'radial-gradient(ellipse, rgba(212,168,83,0.07) 0%, transparent 68%)' }}
              />

              <FilmHelix />

              <div
                className="w-[280px] border border-[#2A2A3E] bg-[rgba(18,18,30,0.85)] backdrop-blur-sm p-4"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateX(0)' : 'translateX(28px)',
                  transition: 'opacity 800ms cubic-bezier(0.22,1,0.36,1) 640ms, transform 800ms cubic-bezier(0.22,1,0.36,1) 640ms',
                }}
              >
                <div className="flex items-center gap-2 pb-3 border-b border-[#2A2A3E] mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson live-dot" />
                  <span className="font-mono text-[9px] text-[#5A5655] uppercase tracking-wider">KALA LIVE</span>
                </div>

                <div className="mb-3 pb-3 border-b border-[#2A2A3E]">
                  <p className="font-mono text-[8px] text-[#5A5655] uppercase tracking-wider mb-1.5">CAMPAIGN AKTIF</p>
                  <p className="font-body text-[11px] font-semibold text-[#F2EFE6]">[Confidential — NDA]</p>
                  <p className="font-mono text-[9px] text-[#5A5655] mb-2">Thriller · Minggu ke-4</p>
                  <p className="font-display font-semibold text-[24px] text-[#F2EFE6] leading-none">1.2 juta</p>
                  <p className="font-mono text-[9px] text-[#A09896] mt-0.5">jangkauan minggu ini</p>
                  <p className="font-mono text-[9px] text-[#D4A853] mt-1.5">↑ 34% dari minggu lalu</p>
                </div>

                <div className="mb-3 pb-3 border-b border-[#2A2A3E]">
                  <p className="font-mono text-[8px] text-[#B83A35] uppercase tracking-wider mb-1.5">PERINGATAN</p>
                  <p className="font-body text-[11px] font-semibold text-[#F2EFE6]">[Confidential — NDA]</p>
                  <p className="font-mono text-[9px] text-[#5A5655] mb-2">Drama · 21 hari sebelum rilis</p>
                  <p className="font-display font-semibold text-[24px] text-[#E07B39] leading-none">64 ribu</p>
                  <p className="font-mono text-[9px] text-[#A09896] mt-1 leading-snug">
                    Kesenjangan awareness terdeteksi —<br />segmen utama belum terjangkau
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[8px] text-[#5A5655] uppercase tracking-wider mb-2">Sentimen publik hari ini</p>
                  <div className="flex gap-0.5 mb-1.5 h-1">
                    <div className="bg-[#4A7B4A]" style={{ width: '62%' }} />
                    <div className="bg-[#5A5655]" style={{ width: '22%' }} />
                    <div className="bg-[#B83A35]" style={{ width: '16%' }} />
                  </div>
                  <p className="font-mono text-[8px] text-[#5A5655] leading-snug">62% positif · 22% netral · 16% negatif</p>
                  <p className="font-mono text-[8px] text-[#5A5655]">324.000 percakapan dalam Bahasa Indonesia</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <TransitionText text="Dan kita punya datanya." />

      {/* STATS STRIP */}
      <section className="border-y border-[#2A2A3E]">
        <div ref={statsRef} className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#2A2A3E]">
            {[
              {
                stat: <Counter target={278} suffix="+" inView={statsInView} />,
                label: 'film Indonesia tayang di bioskop setiap tahun.',
                source: 'Badan Perfilman Indonesia, 2024',
                delay: 0,
              },
              {
                stat: '< 3%',
                label: 'budget produksi yang masuk ke marketing.',
                source: 'Sementara Hollywood mengalokasikan 15–30%.',
                delay: 100,
              },
              {
                stat: '0',
                label: 'agency marketing berbasis data yang fokus di film Indonesia.',
                source: 'Sampai sekarang.',
                delay: 200,
              },
              {
                stat: '#2',
                label: 'pasar TikTok terbesar di dunia.',
                source: 'Ini Indonesia. 126 juta pengguna aktif.',
                delay: 300,
              },
            ].map((item, i) => (
              <Reveal key={i} delay={item.delay}>
                <div className="px-8 py-12">
                  <p className="font-display font-[300] text-[52px] lg:text-[60px] tracking-[-0.03em] text-[#F2EFE6] leading-none mb-4">
                    {item.stat}
                  </p>
                  <p className="font-body text-[13px] text-[#A09896] leading-snug mb-2">{item.label}</p>
                  <p className="font-mono text-[10px] text-[#5A5655]">{item.source}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACT 2: TENSION ──────────────────────────────────────────────────── */}

      <TransitionText text="Lalu kenapa masih banyak film bagus yang pulang dengan tangan kosong?" />

      {/* PROBLEM */}
      <section id="masalah" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-7">Kenapa ini terjadi</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display font-[300] text-[42px] md:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.03em] text-[#F2EFE6] mb-4">
              Bukan masalah<br />
              <span className="font-[700] italic text-crimson">kreativitas.</span><br />
              Masalah informasi.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body font-[400] text-[16px] text-[#A09896] leading-[1.78] max-w-xl mt-7 mb-20">
              Hampir semua orang di industri film Indonesia tahu ada yang tidak beres dengan cara marketing bekerja.
              Tapi tidak banyak yang tahu persis di mana letak masalahnya.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                heading: 'Penonton ada.\nDatanya tidak.',
                body: 'Jaringan bioskop menyimpan data penonton untuk kepentingan mereka sendiri. Itu hak mereka. Tapi konsekuensinya: setiap film baru mulai dari nol.\n\nSiapa yang datang minggu lalu? Dari mana mereka tahu? Mengapa mereka memilih film itu, bukan yang lain? Tidak ada yang tahu pasti.',
                delay: 0,
              },
              {
                heading: '278 film.\nSatu kalender.',
                body: 'Setiap tahun, ratusan film bersaing di bioskop yang sama, di bulan-bulan yang sama.\n\nTiming rilis bisa membuat atau menghancurkan sebuah film jauh sebelum penonton sempat memberikan pendapat. Dan mayoritas keputusan timing itu masih dibuat berdasarkan perkiraan, bukan perhitungan.',
                delay: 150,
              },
              {
                heading: 'Budget keluar.\nHasilnya tidak jelas.',
                body: 'KOL sudah dibayar. Iklan sudah tayang. Tapi berapa tiket yang terjual karena itu? Tidak ada yang bisa menjawab dengan pasti.\n\nKalau tidak bisa diukur, tidak bisa diperbaiki. Dan siklus yang sama berulang dari film ke film.',
                delay: 300,
              },
            ].map((card, i) => (
              <Reveal key={i} delay={card.delay}>
                <div className="border border-[#2A2A3E] p-7 h-full transition-all duration-300 hover:border-crimson/35 hover:bg-[rgba(155,28,28,0.025)] cursor-default">
                  <h3 className="font-display font-[600] text-[19px] leading-tight tracking-[-0.02em] text-[#F2EFE6] mb-5 whitespace-pre-line">
                    {card.heading}
                  </h3>
                  <p className="font-body text-[14px] text-[#A09896] leading-[1.72] whitespace-pre-line">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACT 3: REVELATION ───────────────────────────────────────────────── */}

      <TransitionText text="Kami membangun cara lain." />

      {/* TECHNOLOGY */}
      <section id="teknologi" className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(155,28,28,0.5) 50%, transparent 90%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-20">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-7">Cara KALA bekerja</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-[300] text-[42px] md:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.03em] text-[#F2EFE6] mb-10">
                Enam alat.<br />
                Satu sistem.<br />
                <span className="font-[700] italic text-crimson">Satu tujuan.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body font-[400] text-[16px] text-[#A09896] leading-[1.78] mb-4">
                Selama ini, alat-alat seperti ini hanya ada di Hollywood. Studio besar punya data scientist,
                prediction engine, dan sistem kreatif yang terintegrasi.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="font-body font-[400] text-[16px] text-[#A09896] leading-[1.78] mb-4">Produser Indonesia tidak.</p>
            </Reveal>
            <Reveal delay={360}>
              <p className="font-body font-[400] text-[16px] text-[#A09896] leading-[1.78]">
                Kami membangun versi Indonesia dari semua itu — dan menyatukannya dalam satu platform
                yang bisa digunakan sejak hari pertama produksi.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: '01', name: 'AudienceDNA™', Icon: Users,
                label: 'Kenali penontonmu sebelum satu rupiah dikeluarkan.',
                body: 'Menganalisis jutaan percakapan online dalam Bahasa Indonesia untuk memetakan siapa penonton filmmu dan apa yang menggerakkan mereka beli tiket. Bukan asumsi — data nyata.',
              },
              {
                num: '02', name: 'BoxPredict™', Icon: TrendingUp,
                label: 'Prediksi, bukan perkiraan.',
                body: 'Melihat kompetitor, momen budaya, dan kapasitas bioskop per kota untuk menghasilkan tiga skenario yang jujur — pesimis, realistis, optimis — dengan asumsi yang transparan.',
              },
              {
                num: '03', name: 'CineForge™', Icon: Film,
                label: 'Materi kreatif yang dirancang untuk bekerja, bukan untuk terlihat bagus di rapat.',
                body: 'Merancang dan menguji trailer, poster, caption, dan konten TikTok berdasarkan data resonansi penonton. Keputusan kreatif yang bisa dipertanggungjawabkan.',
              },
              {
                num: '04', name: 'StarGraph™', Icon: Share2,
                label: 'KOL yang tepat — bukan yang paling terkenal.',
                body: 'Memetakan 12.000+ kreator Indonesia dan mencocokkan mereka dengan profil penontonmu — bukan berdasarkan follower, tapi berdasarkan pengaruh nyata.',
              },
              {
                num: '05', name: 'FanConvo™', Icon: MessageCircle,
                label: 'Menjawab setiap pertanyaan tentang filmmu, 24 jam sehari.',
                body: 'AI yang berbicara sebagai karakter filmmu — menjawab pertanyaan, menggoda plot, dan mengarahkan ke pembelian tiket dalam Bahasa Indonesia yang terdengar manusiawi.',
              },
              {
                num: '06', name: 'Live Ticker', Icon: Activity,
                label: 'Tahu performa filmmu hari ini — bukan seminggu kemudian.',
                body: 'Memantau ketersediaan kursi bioskop sepanjang hari dan mengubahnya menjadi sinyal nyata: naik atau turun, kota mana yang merespons, kapan perlu realokasi budget.',
              },
            ].map((tool, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="border border-[#2A2A3E] p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(155,28,28,0.38)] hover:bg-[rgba(155,28,28,0.018)] cursor-default">
                  {/* Icon */}
                  <div className="mb-5 w-10 h-10 border border-[#2A2A3E] flex items-center justify-center text-[#D4A853] shrink-0">
                    <tool.Icon size={17} strokeWidth={1.5} />
                  </div>
                  <p className="font-mono text-[9px] text-[#5A5655] tracking-widest mb-3">{tool.num}</p>
                  <h3 className="font-display font-[600] text-[17px] tracking-[-0.01em] text-[#F2EFE6] mb-2">{tool.name}</h3>
                  <p className="font-body text-[12px] font-medium text-[#D4A853] mb-4 leading-snug">{tool.label}</p>
                  <p className="font-body text-[13px] text-[#A09896] leading-[1.66] mt-auto">{tool.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TransitionText text="Semua ini bekerja bersama — dari hari pertama sampai tiket terakhir terjual." />

      {/* HOW IT WORKS */}
      <section id="cara-kerja" className="py-24 md:py-36 border-t border-[#2A2A3E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-xl mb-20">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-7">Bagaimana kami bekerja</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-[300] text-[42px] md:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.03em] text-[#F2EFE6]">
                Dari brief pertama —<br />
                sampai bioskop<br />
                <span className="font-[700] italic text-crimson">penuh.</span>
              </h2>
            </Reveal>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-3 top-0 bottom-0 w-px bg-[#2A2A3E]" />

            {[
              {
                num: '01', title: 'Dengarkan dulu.',
                body: 'Tidak ada template. Tidak ada asumsi.\nKami pelajari filmmu dari awal — cerita, cast, genre, posisi di pasar, dan apa yang sudah pernah dicoba sebelumnya.\n\nDua minggu pertama adalah tentang memahami, bukan langsung memberikan solusi.',
                delay: 0,
              },
              {
                num: '02', title: 'Rancang bersama.',
                body: 'Dari data yang terkumpul, kami susun satu rencana: kapan rilis, siapa yang ditarget, pesan apa yang paling kuat, dan di mana setiap rupiah paling efisien digunakan.\n\nSemua dibahas bersama. Bukan diserahkan begitu saja.',
                delay: 150,
              },
              {
                num: '03', title: 'Jalankan — dan sesuaikan setiap hari.',
                body: 'Kampanye berjalan. Data masuk terus.\nKalau sesuatu tidak bekerja, kami tahu dalam 48 jam. Dan kami bergerak — bukan menunggu laporan bulanan.',
                delay: 300,
              },
              {
                num: '04', title: 'Pertanggungjawaban penuh.',
                body: 'Setelah film rilis, ada satu laporan yang jujur: apa yang berhasil, apa yang tidak, dan kenapa.\n\nBukan untuk membenarkan pekerjaan kami. Tapi karena pelajaran dari film ini adalah modal untuk film berikutnya.',
                delay: 450,
              },
            ].map((step, i) => (
              <Reveal key={i} delay={step.delay}>
                <div className="md:pl-14 py-12 border-b border-[#2A2A3E] last:border-0 relative group">
                  <div className="hidden md:block absolute left-0 top-14 -translate-y-1/2">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full border border-[#2A2A3E] bg-[#0C0C14] group-hover:border-crimson group-hover:bg-crimson/20 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="flex gap-8 items-start">
                    <span className="font-mono text-[11px] text-[#5A5655] tracking-widest shrink-0 mt-1.5">{step.num}</span>
                    <div>
                      <h3 className="font-display font-[600] text-[22px] md:text-[28px] tracking-[-0.02em] text-[#F2EFE6] mb-5">{step.title}</h3>
                      <p className="font-body text-[15px] text-[#A09896] leading-[1.72] max-w-2xl whitespace-pre-line">{step.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACT 4: INVITATION ───────────────────────────────────────────────── */}

      <TransitionText text="Filmmu sudah ada. Penontonnya juga." />

      {/* CTA + CONTACT FORM */}
      <section id="kontak" className="py-24 md:py-36 border-t border-[#2A2A3E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — headline + perks */}
            <div>
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-10">Langkah pertama</p>
              </Reveal>

              {['Tinggal', 'mempertemukan', 'keduanya.'].map((line, i) => (
                <Reveal key={i} delay={i * 150}>
                  <div className="overflow-hidden">
                    <span
                      className={`block font-display leading-[1.0] tracking-[-0.03em] text-[52px] md:text-[64px] lg:text-[80px] ${
                        i === 2 ? 'font-[700] italic text-crimson' : 'font-[300] text-[#F2EFE6]'
                      }`}
                    >
                      {line}
                    </span>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={420}>
                <p className="font-body font-[400] text-[16px] text-[#A09896] leading-[1.78] mt-10 mb-10">
                  Kamu cerita tentang filmmu.<br />
                  Kami dengarkan, lalu cerita apa yang realistis bisa dilakukan.<br />
                  Kalau cocok, kita lanjut. Kalau tidak, tidak apa-apa.
                </p>
              </Reveal>

              {/* Free perks */}
              <Reveal delay={520}>
                <div className="space-y-3">
                  {[
                    {
                      tag: 'GRATIS',
                      title: 'Konsultasi pertama',
                      desc: '45 menit. Tanpa agenda. Kita bicara tentang filmmu.',
                    },
                    {
                      tag: 'GRATIS',
                      title: 'Laporan Audience Awal',
                      desc: 'Analisis siapa calon penonton filmmu — senilai Rp 5 juta, tanpa bayar.',
                    },
                  ].map((perk, i) => (
                    <div key={i} className="flex gap-4 border border-[#2A2A3E] p-4">
                      <span className="font-mono text-[9px] text-[#D4A853] bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.2)] px-2 py-1 h-fit tracking-widest shrink-0">
                        {perk.tag}
                      </span>
                      <div>
                        <p className="font-display font-[600] text-[14px] text-[#F2EFE6] mb-0.5">{perk.title}</p>
                        <p className="font-body text-[13px] text-[#A09896]">{perk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={640}>
                <p className="font-mono text-[10px] text-[#5A5655] tracking-wide mt-8">
                  Respon dalam 24 jam · Bahasa Indonesia · Jakarta & Remote
                </p>
              </Reveal>
            </div>

            {/* Right — contact form */}
            <Reveal delay={200}>
              <ContactForm />
            </Reveal>

          </div>
        </div>
      </section>

    </div>
  )
}
