import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Activity, Film, MessageCircle, Share2, TrendingUp, Users } from 'lucide-react'
import FilmHelix from '../components/FilmHelix'
import { useInView } from '../hooks/useInView'
import { useLang } from '../contexts/LangContext'

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  en: {
    heroEyebrow: '● KALA · Film Marketing Intelligence · Indonesia',
    heroLines: [
      { text: 'Something is wrong', crimson: false },
      { text: 'with how films are', crimson: false },
      { text: 'marketed here.', crimson: true },
    ],
    heroSub: "Not because the films aren't good enough. But because no one knows exactly who needs to watch them — and how to reach them.",
    heroCta1: 'Tell Us About Your Film →',
    heroCta2: 'See How It Works',
    heroFootnote: 'Full-service · AI-powered · Indonesia only · 24hr response',
    scrollDown: 'SCROLL DOWN',
    t1: 'And we have the data.',
    statsData: [
      { stat: null, num: 278, suffix: '+', label: 'Indonesian films released in cinemas every year.', source: 'Badan Perfilman Indonesia, 2024' },
      { stat: '< 3%', label: 'of production budgets go to marketing.', source: 'Hollywood allocates 15–30%.' },
      { stat: '0', label: 'data-driven agencies focused on Indonesian film.', source: 'Until now.' },
      { stat: '#2', label: 'largest TikTok market in the world.', source: 'Indonesia. 126M active users.' },
    ],
    t2: 'So why do so many great films still come home empty-handed?',
    problemEyebrow: 'Why this happens',
    problemHeadline: ['Not a creativity', 'problem.', 'An information problem.'],
    problemCrimson: 1,
    problemLead: 'Almost everyone in the Indonesian film industry knows something is broken in how marketing works. But few know exactly where the problem lies.',
    problemCards: [
      { heading: 'The audience exists.\nThe data doesn\'t.', body: 'Cinema chains keep audience data for their own purposes. That\'s their right. But the consequence: every new film starts from zero.\n\nWho came last week? How did they hear about it? Why that film over another? Nobody knows for sure.' },
      { heading: '278 films.\nOne calendar.', body: 'Every year, hundreds of films compete in the same cinemas, in the same months.\n\nRelease timing can make or break a film before audiences get a chance to weigh in. Most timing decisions are still made on intuition, not calculation.' },
      { heading: 'Budget spent.\nResults unclear.', body: 'KOLs are paid. Ads are running. But how many tickets were sold because of that? Nobody can answer with certainty.\n\nIf you can\'t measure it, you can\'t improve it. The same cycle repeats film after film.' },
    ],
    t3: 'We built a different way.',
    techEyebrow: 'How KALA works',
    techHeadline: ['Six features.', 'One system.', 'One goal.'],
    techCrimson: 2,
    techIntro: [
      'Until now, tools like these only existed in Hollywood. Major studios have data scientists, prediction engines, and integrated creative systems.',
      'Indonesian producers don\'t.',
      'We built the Indonesian version of all of that — unified into one platform you can use from day one of production.',
    ],
    tools: [
      { num: '01', name: 'AudienceDNA™', label: 'Know your audience before spending a single rupiah.', body: 'Analyzes millions of online conversations in Bahasa Indonesia to map who your audience is and what drives them to buy tickets. Not assumptions — real data.' },
      { num: '02', name: 'BoxPredict™', label: 'Predictions, not guesses.', body: 'Looks at competitors, cultural moments, and cinema capacity per city to produce three honest scenarios — pessimistic, realistic, optimistic — with transparent assumptions.' },
      { num: '03', name: 'CineForge™', label: 'Creative assets designed to work, not just look good in meetings.', body: 'Designs and tests trailers, posters, captions, and TikTok content against audience resonance data. Creative decisions you can defend.' },
      { num: '04', name: 'StarGraph™', label: 'The right KOLs — not just the most famous ones.', body: 'Maps 12,000+ Indonesian creators and matches them to your audience profile — not by follower count, but by actual influence.' },
      { num: '05', name: 'FanConvo™', label: 'Someone answering every question about your film, 24 hours a day.', body: 'AI that speaks as a character from your film — answering questions, teasing the plot, and directing people to buy tickets in natural Bahasa Indonesia.' },
      { num: '06', name: 'Live Ticker', label: "Know your film's performance today — not next week.", body: 'Monitors cinema seat availability throughout the day and turns it into real signals: rising or falling, which cities are responding, when to reallocate budget.' },
    ],
    t4: 'All of this works together — from day one to the last ticket sold.',
    howEyebrow: 'How we work',
    howHeadline: ['From the first brief —', 'until the cinema', 'is full.'],
    howCrimson: 2,
    howSteps: [
      { num: '01', title: 'Listen first.', body: 'No templates. No assumptions.\nWe learn your film from scratch — story, cast, genre, market position, and what\'s been tried before.\n\nThe first two weeks are about understanding, not jumping straight to solutions.' },
      { num: '02', title: 'Plan together.', body: 'From the data collected, we build one plan: when to release, who to target, which message is strongest, and where every rupiah is most efficiently spent.\n\nEverything is discussed together. Not just handed over.' },
      { num: '03', title: 'Run — and adjust daily.', body: 'The campaign runs. Data keeps coming in.\nIf something isn\'t working, we know within 48 hours. And we move — not wait for a monthly report.' },
      { num: '04', title: 'Full accountability.', body: 'After the film releases, there\'s one honest report: what worked, what didn\'t, and why.\n\nNot to justify our work. But because the lessons from this film are capital for the next one.' },
    ],
    t5: 'Your film exists. So does its audience.',
    ctaEyebrow: 'First step',
    ctaLines: [
      { text: 'Just a matter', crimson: false },
      { text: 'of bringing them', crimson: false },
      { text: 'together.', crimson: true },
    ],
    ctaBody: "First conversation is free and without agenda.\nYou tell us about your film.\nWe listen, then tell you what's realistically possible.\n\nIf it fits, we move forward. If not, that's okay.",
    ctaFootnote: '24hr response · Bahasa Indonesia · Jakarta & Remote',
    perks: [
      { title: 'Free first consultation', desc: '45 minutes. No agenda. We talk about your film.' },
      { title: 'Free Audience Report', desc: 'An analysis of who your potential audience is — valued at Rp 5 million, at no cost.' },
    ],
    form: {
      title: 'Tell us about your film.',
      fNama: 'Name', fFilm: 'Film Title', fEmail: 'Email', fHp: 'Phone', fHpOpt: '(optional)',
      fCerita: 'Tell us about your film',
      pNama: 'Your name', pFilm: 'Title / project code', pEmail: 'you@studio.com',
      pHp: '+62 8xx xxxx xxxx',
      pCerita: 'Genre, production stage, target release, or anything else you think is important...',
      submit: 'Send & Get Free Consultation →',
      sending: 'Sending...',
      note: 'Includes free Audience Report · No commitment',
      successTitle: 'Your message has been received.',
      successBody: 'The KALA team will contact you within 24 hours to schedule your first consultation.\n\nThe Audience Report will be sent before the session.',
    },
  },
  id: {
    heroEyebrow: '● KALA · Film Marketing Intelligence · Indonesia',
    heroLines: [
      { text: 'Ada yang salah', crimson: false },
      { text: 'dengan cara film', crimson: false },
      { text: 'dipasarkan di sini.', crimson: true },
    ],
    heroSub: 'Bukan karena filmnya kurang bagus. Tapi karena tidak ada yang tahu pasti siapa yang harus menontonnya — dan bagaimana cara menemukannya.',
    heroCta1: 'Ceritakan Film Kamu →',
    heroCta2: 'Lihat Cara Kerjanya',
    heroFootnote: 'Full-service · AI-powered · Khusus film Indonesia · Respon 24 jam',
    scrollDown: 'SCROLL DOWN',
    t1: 'Dan kita punya datanya.',
    statsData: [
      { stat: null, num: 278, suffix: '+', label: 'film Indonesia tayang di bioskop setiap tahun.', source: 'Badan Perfilman Indonesia, 2024' },
      { stat: '< 3%', label: 'budget produksi yang masuk ke marketing.', source: 'Sementara Hollywood mengalokasikan 15–30%.' },
      { stat: '0', label: 'agency marketing berbasis data yang fokus di film Indonesia.', source: 'Sampai sekarang.' },
      { stat: '#2', label: 'pasar TikTok terbesar di dunia.', source: 'Ini Indonesia. 126 juta pengguna aktif.' },
    ],
    t2: 'Lalu kenapa masih banyak film bagus yang pulang dengan tangan kosong?',
    problemEyebrow: 'Kenapa ini terjadi',
    problemHeadline: ['Bukan masalah', 'kreativitas.', 'Masalah informasi.'],
    problemCrimson: 1,
    problemLead: 'Hampir semua orang di industri film Indonesia tahu ada yang tidak beres dengan cara marketing bekerja. Tapi tidak banyak yang tahu persis di mana letak masalahnya.',
    problemCards: [
      { heading: 'Penonton ada.\nDatanya tidak.', body: 'Jaringan bioskop menyimpan data penonton untuk kepentingan mereka sendiri. Itu hak mereka. Tapi konsekuensinya: setiap film baru mulai dari nol.\n\nSiapa yang datang minggu lalu? Dari mana mereka tahu? Mengapa memilih film itu, bukan yang lain? Tidak ada yang tahu pasti.' },
      { heading: '278 film.\nSatu kalender.', body: 'Setiap tahun, ratusan film bersaing di bioskop yang sama, di bulan-bulan yang sama.\n\nTiming rilis bisa membuat atau menghancurkan sebuah film jauh sebelum penonton sempat memberikan pendapat. Dan mayoritas keputusan timing itu masih dibuat berdasarkan perkiraan, bukan perhitungan.' },
      { heading: 'Budget keluar.\nHasilnya tidak jelas.', body: 'KOL sudah dibayar. Iklan sudah tayang. Tapi berapa tiket yang terjual karena itu? Tidak ada yang bisa menjawab dengan pasti.\n\nKalau tidak bisa diukur, tidak bisa diperbaiki. Dan siklus yang sama berulang dari film ke film.' },
    ],
    t3: 'Kami membangun cara lain.',
    techEyebrow: 'Cara KALA bekerja',
    techHeadline: ['Enam fitur.', 'Satu sistem.', 'Satu tujuan.'],
    techCrimson: 2,
    techIntro: [
      'Selama ini, alat-alat seperti ini hanya ada di Hollywood. Studio besar punya data scientist, prediction engine, dan sistem kreatif yang terintegrasi.',
      'Produser Indonesia tidak.',
      'Kami membangun versi Indonesia dari semua itu — dan menyatukannya dalam satu platform yang bisa digunakan sejak hari pertama produksi.',
    ],
    tools: [
      { num: '01', name: 'AudienceDNA™', label: 'Kenali penontonmu sebelum satu rupiah dikeluarkan.', body: 'Menganalisis jutaan percakapan online dalam Bahasa Indonesia untuk memetakan siapa penonton filmmu dan apa yang menggerakkan mereka beli tiket. Bukan asumsi — data nyata.' },
      { num: '02', name: 'BoxPredict™', label: 'Prediksi, bukan perkiraan.', body: 'Melihat kompetitor, momen budaya, dan kapasitas bioskop per kota untuk menghasilkan tiga skenario yang jujur — pesimis, realistis, optimis — dengan asumsi yang transparan.' },
      { num: '03', name: 'CineForge™', label: 'Materi kreatif yang dirancang untuk bekerja, bukan untuk terlihat bagus di rapat.', body: 'Merancang dan menguji trailer, poster, caption, dan konten TikTok berdasarkan data resonansi penonton. Keputusan kreatif yang bisa dipertanggungjawabkan.' },
      { num: '04', name: 'StarGraph™', label: 'KOL yang tepat — bukan yang paling terkenal.', body: 'Memetakan 12.000+ kreator Indonesia dan mencocokkan mereka dengan profil penontonmu — bukan berdasarkan follower, tapi berdasarkan pengaruh nyata.' },
      { num: '05', name: 'FanConvo™', label: 'Menjawab setiap pertanyaan tentang filmmu, 24 jam sehari.', body: 'AI yang berbicara sebagai karakter filmmu — menjawab pertanyaan, menggoda plot, dan mengarahkan ke pembelian tiket dalam Bahasa Indonesia yang terdengar manusiawi.' },
      { num: '06', name: 'Live Ticker', label: 'Tahu performa filmmu hari ini — bukan seminggu kemudian.', body: 'Memantau ketersediaan kursi bioskop sepanjang hari dan mengubahnya menjadi sinyal nyata: naik atau turun, kota mana yang merespons, kapan perlu realokasi budget.' },
    ],
    t4: 'Semua ini bekerja bersama — dari hari pertama sampai tiket terakhir terjual.',
    howEyebrow: 'Bagaimana kami bekerja',
    howHeadline: ['Dari brief pertama —', 'sampai bioskop', 'penuh.'],
    howCrimson: 2,
    howSteps: [
      { num: '01', title: 'Dengarkan dulu.', body: 'Tidak ada template. Tidak ada asumsi.\nKami pelajari filmmu dari awal — cerita, cast, genre, posisi di pasar, dan apa yang sudah pernah dicoba sebelumnya.\n\nDua minggu pertama adalah tentang memahami, bukan langsung memberikan solusi.' },
      { num: '02', title: 'Rancang bersama.', body: 'Dari data yang terkumpul, kami susun satu rencana: kapan rilis, siapa yang ditarget, pesan apa yang paling kuat, dan di mana setiap rupiah paling efisien digunakan.\n\nSemua dibahas bersama. Bukan diserahkan begitu saja.' },
      { num: '03', title: 'Jalankan — dan sesuaikan setiap hari.', body: 'Kampanye berjalan. Data masuk terus.\nKalau sesuatu tidak bekerja, kami tahu dalam 48 jam. Dan kami bergerak — bukan menunggu laporan bulanan.' },
      { num: '04', title: 'Pertanggungjawaban penuh.', body: 'Setelah film rilis, ada satu laporan yang jujur: apa yang berhasil, apa yang tidak, dan kenapa.\n\nBukan untuk membenarkan pekerjaan kami. Tapi karena pelajaran dari film ini adalah modal untuk film berikutnya.' },
    ],
    t5: 'Filmmu sudah ada. Penontonnya juga.',
    ctaEyebrow: 'Langkah pertama',
    ctaLines: [
      { text: 'Tinggal', crimson: false },
      { text: 'mempertemukan', crimson: false },
      { text: 'keduanya.', crimson: true },
    ],
    ctaBody: 'Obrolan pertama gratis dan tanpa agenda.\nKamu cerita tentang filmmu.\nKami dengarkan, lalu cerita apa yang realistis bisa dilakukan.\n\nKalau cocok, kita lanjut. Kalau tidak, tidak apa-apa.',
    ctaFootnote: 'Respon dalam 24 jam · Bahasa Indonesia · Jakarta & Remote',
    perks: [
      { title: 'Konsultasi pertama gratis', desc: '45 menit. Tanpa agenda. Kita bicara tentang filmmu.' },
      { title: 'Laporan Audience Awal gratis', desc: 'Analisis siapa calon penonton filmmu — senilai Rp 5 juta, tanpa bayar.' },
    ],
    form: {
      title: 'Ceritakan filmmu.',
      fNama: 'Nama', fFilm: 'Judul Film', fEmail: 'Email', fHp: 'No. HP', fHpOpt: '(opsional)',
      fCerita: 'Ceritakan filmmu',
      pNama: 'Nama kamu', pFilm: 'Judul / kode proyek', pEmail: 'kamu@studio.com',
      pHp: '+62 8xx xxxx xxxx',
      pCerita: 'Genre, tahap produksi, target rilis, atau apa pun yang kamu anggap penting...',
      submit: 'Kirim & Dapatkan Konsultasi Gratis →',
      sending: 'Mengirim...',
      note: 'Termasuk Laporan Audience Awal gratis · Tidak ada komitmen',
      successTitle: 'Pesanmu sudah sampai.',
      successBody: 'Tim KALA akan menghubungimu dalam 24 jam untuk menjadwalkan sesi konsultasi pertama.\n\nLaporan Audience Awal akan dikirimkan sebelum sesi berlangsung.',
    },
  },
} as const

// ── Shared components ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={`reveal ${inView ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

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
          transition: 'opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {text}
      </p>
    </div>
  )
}

function Counter({ target, suffix = '', inView }: { target: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const duration = 1300
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <>{count}{suffix}</>
}

const TOOL_ICONS = [Users, TrendingUp, Film, Share2, MessageCircle, Activity]

// ── Contact form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const { lang } = useLang()
  const f = T[lang].form
  const [form, setForm] = useState({ nama: '', film: '', email: '', hp: '', cerita: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }

  const inp = 'w-full bg-[#1A1A28] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-4 py-3 focus:outline-none focus:border-crimson transition-colors placeholder:text-[#5A5655]'
  const lbl = 'font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A5655] block mb-2'

  if (sent) {
    return (
      <div className="border border-[#2A2A3E] p-8 flex flex-col items-start justify-center min-h-[480px]">
        <div className="w-8 h-8 border border-[#D4A853]/40 flex items-center justify-center mb-6">
          <span className="text-[#D4A853] text-[16px]">✓</span>
        </div>
        <h3 className="font-display font-[300] text-[28px] tracking-[-0.02em] text-[#F2EFE6] mb-4">{f.successTitle}</h3>
        <p className="font-body text-[15px] text-[#A09896] leading-[1.72] mb-6 whitespace-pre-line">{f.successBody}</p>
        <p className="font-mono text-[10px] text-[#5A5655] tracking-wide">hello@kala.id</p>
      </div>
    )
  }

  return (
    <div className="border border-[#2A2A3E] p-7">
      <div className="mb-7">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#5A5655] mb-1">{lang === 'en' ? 'Start here' : 'Mulai dari sini'}</p>
        <h3 className="font-display font-[300] text-[22px] tracking-[-0.02em] text-[#F2EFE6]">{f.title}</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={lbl}>{f.fNama}</label>
            <input type="text" value={form.nama} onChange={e => setForm(v => ({ ...v, nama: e.target.value }))} className={inp} placeholder={f.pNama} required />
          </div>
          <div>
            <label className={lbl}>{f.fFilm}</label>
            <input type="text" value={form.film} onChange={e => setForm(v => ({ ...v, film: e.target.value }))} className={inp} placeholder={f.pFilm} required />
          </div>
        </div>
        <div>
          <label className={lbl}>{f.fEmail}</label>
          <input type="email" value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} className={inp} placeholder={f.pEmail} required />
        </div>
        <div>
          <label className={lbl}>{f.fHp} <span className="normal-case text-[#5A5655]/60">{f.fHpOpt}</span></label>
          <input type="tel" value={form.hp} onChange={e => setForm(v => ({ ...v, hp: e.target.value }))} className={inp} placeholder={f.pHp} />
        </div>
        <div>
          <label className={lbl}>{f.fCerita}</label>
          <textarea value={form.cerita} onChange={e => setForm(v => ({ ...v, cerita: e.target.value }))} className={`${inp} resize-none`} rows={4} placeholder={f.pCerita} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-crimson hover:bg-crimson-rich text-[#F2EFE6] font-body font-medium text-[14px] py-3.5 transition-all duration-200 disabled:opacity-50">
          {loading ? f.sending : f.submit}
        </button>
      </form>
      <p className="font-mono text-[9px] text-[#5A5655] text-center mt-4 leading-snug">{f.note}</p>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Landing() {
  const { lang } = useLang()
  const c = T[lang]
  const [heroVisible, setHeroVisible] = useState(false)
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2 })

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t) }, [])

  // reset hero animation on lang change
  useEffect(() => { setHeroVisible(false); const t = setTimeout(() => setHeroVisible(true), 50); return () => clearTimeout(t) }, [lang])

  const hLine = (d: number) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(110%)',
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${d}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${d}ms`,
  })
  const hFade = (d: number) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${d}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${d}ms`,
  })

  return (
    <div className="bg-[#0C0C14]">

      {/* ── HERO — centered, JCTrader-style ──────────────────────────────────── */}
      <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden grain-overlay">

        {/* Background: vertical pillar beams */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: `${(i + 1) * 12.5}%`,
              width: 80,
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(155,28,28,0.025) 40%, rgba(212,168,83,0.015) 60%, transparent 100%)',
            }}
          />
        ))}

        {/* Background: upward glow orb */}
        <div
          className="absolute bottom-0 left-1/2 pointer-events-none"
          style={{
            width: 780,
            height: 780,
            transform: 'translateX(-50%) translateY(42%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 38%, rgba(155,28,28,0.22) 0%, rgba(155,28,28,0.10) 30%, rgba(212,168,83,0.04) 60%, transparent 75%)',
            boxShadow: '0 -30px 80px rgba(155,28,28,0.12)',
          }}
        />

        {/* Background: FilmHelix large, centered bottom */}
        <div
          className="absolute bottom-0 left-1/2 pointer-events-none"
          style={{ transform: 'translateX(-50%) translateY(38%)', zIndex: 1, opacity: 0.85 }}
        >
          <FilmHelix size={1.9} />
        </div>

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-32 max-w-4xl mx-auto w-full">

          {/* Eyebrow badge */}
          <div style={hFade(0)}>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-10 border border-[#2A2A3E] px-4 py-2">
              {c.heroEyebrow}
            </span>
          </div>

          {/* Headline */}
          <div className="mb-7">
            {c.heroLines.map((line, i) => (
              <div key={`${lang}-${i}`} className="overflow-hidden">
                <span
                  className={`block font-display leading-[1.0] tracking-[-0.03em] text-[52px] md:text-[72px] lg:text-[88px] ${
                    line.crimson ? 'font-[700] italic text-crimson' : 'font-[300] text-[#F2EFE6]'
                  }`}
                  style={hLine(120 + i * 130)}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </div>

          {/* Sub */}
          <p
            className="font-body font-[400] text-[16px] md:text-[17px] text-[#A09896] leading-[1.72] max-w-lg mb-10"
            style={hFade(600)}
          >
            {c.heroSub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-10" style={hFade(760)}>
            <a href="#kontak" className="font-body font-medium text-[14px] bg-crimson hover:bg-crimson-rich text-[#F2EFE6] px-8 py-3.5 transition-colors duration-200">
              {c.heroCta1}
            </a>
            <a href="#cara-kerja" className="font-body font-medium text-[14px] border border-[rgba(255,255,255,0.14)] text-[#A09896] hover:text-[#F2EFE6] hover:border-[rgba(255,255,255,0.28)] px-8 py-3.5 transition-all duration-200">
              {c.heroCta2}
            </a>
          </div>

          {/* Footnote */}
          <p className="font-mono text-[10px] text-[#5A5655] tracking-wide" style={{ ...hFade(920), opacity: heroVisible ? 0.6 : 0 }}>
            {c.heroFootnote}
          </p>
        </div>

        {/* Bottom-right: scroll indicator */}
        <div
          className="absolute bottom-8 right-8 md:right-12 flex items-center gap-3 z-10"
          style={hFade(1100)}
        >
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#5A5655]">{c.scrollDown}</span>
          <div className="w-7 h-7 rounded-full border border-[#2A2A3E] flex items-center justify-center text-[#5A5655]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <TransitionText text={c.t1} />

      <section className="border-y border-[#2A2A3E]">
        <div ref={statsRef} className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#2A2A3E]">
            {c.statsData.map((item, i) => (
              <Reveal key={`${lang}-${i}`} delay={i * 100}>
                <div className="px-8 py-12">
                  <p className="font-display font-[300] text-[52px] lg:text-[60px] tracking-[-0.03em] text-[#F2EFE6] leading-none mb-4">
                    {'num' in item && item.num != null
                      ? <Counter target={item.num} suffix={item.suffix} inView={statsInView} />
                      : item.stat}
                  </p>
                  <p className="font-body text-[13px] text-[#A09896] leading-snug mb-2">{item.label}</p>
                  <p className="font-mono text-[10px] text-[#5A5655]">{item.source}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────────── */}
      <TransitionText text={c.t2} />

      <section id="masalah" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-7">{c.problemEyebrow}</p></Reveal>
          <Reveal delay={100}>
            <h2 className="font-display font-[300] text-[42px] md:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.03em] text-[#F2EFE6] mb-4">
              {c.problemHeadline.map((line, i) => (
                <span key={i}>
                  {i === c.problemCrimson ? <span className="font-[700] italic text-crimson">{line}</span> : line}
                  {i < c.problemHeadline.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={200}><p className="font-body font-[400] text-[16px] text-[#A09896] leading-[1.78] max-w-xl mt-7 mb-20">{c.problemLead}</p></Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {c.problemCards.map((card, i) => (
              <Reveal key={`${lang}-${i}`} delay={i * 150}>
                <div className="border border-[#2A2A3E] p-7 h-full transition-all duration-300 hover:border-crimson/35 hover:bg-[rgba(155,28,28,0.025)] cursor-default">
                  <h3 className="font-display font-[600] text-[19px] leading-tight tracking-[-0.02em] text-[#F2EFE6] mb-5 whitespace-pre-line">{card.heading}</h3>
                  <p className="font-body text-[14px] text-[#A09896] leading-[1.72] whitespace-pre-line">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────────────────────────────── */}
      <TransitionText text={c.t3} />

      <section id="teknologi" className="py-24 md:py-36 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(155,28,28,0.5) 50%, transparent 90%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-20">
            <Reveal><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-7">{c.techEyebrow}</p></Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-[300] text-[42px] md:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.03em] text-[#F2EFE6] mb-10">
                {c.techHeadline.map((line, i) => (
                  <span key={i}>
                    {i === c.techCrimson ? <span className="font-[700] italic text-crimson">{line}</span> : line}
                    {i < c.techHeadline.length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </Reveal>
            {c.techIntro.map((p, i) => (
              <Reveal key={i} delay={200 + i * 80}><p className="font-body font-[400] text-[16px] text-[#A09896] leading-[1.78] mb-4">{p}</p></Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.tools.map((tool, i) => {
              const Icon = TOOL_ICONS[i]
              return (
                <Reveal key={`${lang}-${i}`} delay={i * 80}>
                  <div className="border border-[#2A2A3E] p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(155,28,28,0.38)] hover:bg-[rgba(155,28,28,0.018)] cursor-default">
                    <div className="mb-5 w-10 h-10 border border-[#2A2A3E] flex items-center justify-center text-[#D4A853] shrink-0">
                      <Icon size={17} strokeWidth={1.5} />
                    </div>
                    <p className="font-mono text-[9px] text-[#5A5655] tracking-widest mb-3">{tool.num}</p>
                    <h3 className="font-display font-[600] text-[17px] tracking-[-0.01em] text-[#F2EFE6] mb-2">{tool.name}</h3>
                    <p className="font-body text-[12px] font-medium text-[#D4A853] mb-4 leading-snug">{tool.label}</p>
                    <p className="font-body text-[13px] text-[#A09896] leading-[1.66] mt-auto">{tool.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <TransitionText text={c.t4} />

      <section id="cara-kerja" className="py-24 md:py-36 border-t border-[#2A2A3E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-xl mb-20">
            <Reveal><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-7">{c.howEyebrow}</p></Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-[300] text-[42px] md:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.03em] text-[#F2EFE6]">
                {c.howHeadline.map((line, i) => (
                  <span key={i}>
                    {i === c.howCrimson ? <span className="font-[700] italic text-crimson">{line}</span> : line}
                    {i < c.howHeadline.length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-3 top-0 bottom-0 w-px bg-[#2A2A3E]" />
            {c.howSteps.map((step, i) => (
              <Reveal key={`${lang}-${i}`} delay={i * 150}>
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

      {/* ── CTA + FORM ───────────────────────────────────────────────────────── */}
      <TransitionText text={c.t5} />

      <section id="kontak" className="py-24 md:py-36 border-t border-[#2A2A3E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            <div>
              <Reveal><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5655] mb-10">{c.ctaEyebrow}</p></Reveal>
              {c.ctaLines.map((line, i) => (
                <Reveal key={`${lang}-${i}`} delay={i * 150}>
                  <div className="overflow-hidden">
                    <span className={`block font-display leading-[1.0] tracking-[-0.03em] text-[52px] md:text-[64px] lg:text-[80px] ${line.crimson ? 'font-[700] italic text-crimson' : 'font-[300] text-[#F2EFE6]'}`}>
                      {line.text}
                    </span>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={420}>
                <p className="font-body font-[400] text-[16px] text-[#A09896] leading-[1.78] mt-10 mb-10 whitespace-pre-line">{c.ctaBody}</p>
              </Reveal>

              <Reveal delay={520}>
                <div className="space-y-3">
                  {c.perks.map((perk, i) => (
                    <div key={i} className="flex gap-4 border border-[#2A2A3E] p-4">
                      <span className="font-mono text-[9px] text-[#D4A853] bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.2)] px-2 py-1 h-fit tracking-widest shrink-0">
                        {lang === 'en' ? 'FREE' : 'GRATIS'}
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
                <p className="font-mono text-[10px] text-[#5A5655] tracking-wide mt-8">{c.ctaFootnote}</p>
              </Reveal>
            </div>

            <Reveal delay={200}><ContactForm /></Reveal>
          </div>
        </div>
      </section>

    </div>
  )
}
