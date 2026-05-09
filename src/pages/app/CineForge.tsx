import { useState } from 'react'
import { mockFilms } from '../../data/mockData'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

type AssetType = 'tagline' | 'vo-hook' | 'social-tiktok' | 'social-instagram' | 'press-release' | 'campaign-hook' | 'creator-brief'

const ASSET_TYPES: { id: AssetType; label: string; desc: string; badge: string }[] = [
  { id: 'tagline', label: 'Trailer Tagline', desc: '2–5 kata · Poster & billboard', badge: 'Branding' },
  { id: 'vo-hook', label: 'VO Hook', desc: 'Opening line narrator · 5–15 kata', badge: 'Branding' },
  { id: 'social-tiktok', label: 'TikTok Caption', desc: '150 karakter · Hook viral', badge: 'Social' },
  { id: 'social-instagram', label: 'Instagram Caption', desc: '250 karakter · Feed + Reels', badge: 'Social' },
  { id: 'press-release', label: 'Press Release', desc: '400–600 kata · Journalist-ready', badge: 'PR' },
  { id: 'campaign-hook', label: 'Campaign Hook Set', desc: '5 varian · Segment-calibrated', badge: 'Campaign' },
  { id: 'creator-brief', label: 'Creator Brief', desc: 'Per platform · Per segment', badge: 'KOL' },
]

const SEGMENTS = [
  'Penonton Keluarga',
  'Penggemar Horor',
  'Remaja Urban',
  'Cinephile Millennial',
  'Penonton Romance',
  'Ibu Rumah Tangga',
]

const MOCK_OUTPUTS: Record<AssetType, (film: string, segment: string) => string[]> = {
  'tagline': (film, seg) => [
    `"${film}: Untuk Mereka yang Mencinta."`,
    `"Waktu tidak bisa ditarik kembali."`,
    `"Ketika mimpi menjadi beban. Ketika beban menjadi kekuatan."`,
    `"Satu tiket. Satu momen. Satu keluarga."`,
    `"Ada yang tidak bisa ditukar. Ada yang tidak bisa dilupakan."`,
  ],
  'vo-hook': (film) => [
    `"Ada film yang kamu tonton. Ada film yang mengubahmu. ${film} adalah yang kedua."`,
    `"Dalam setiap keluarga, ada rahasia. Dalam setiap rahasia, ada cinta."`,
    `"Mereka bilang waktu menyembuhkan segalanya. Tapi ada luka yang justru menjadi kenangan."`,
  ],
  'social-tiktok': (_film, seg) => [
    `POV: kamu habis nonton film yang bikin kamu diam di kursi 5 menit setelah credits habis 😶 [${seg} approved] #film #bioskop`,
    `Ini film yang wajib ditonton sama keluarga bulan depan. Jangan tanya kenapa. Tonton aja. #rekomendasifilm #bioskop2026`,
    `Ada yang udah ready nonton? Ini review singkat dari kita 🎬 #filmIndonesia #nonton`,
  ],
  'social-instagram': (film, seg) => [
    `${film} hadir bulan ini di bioskop seluruh Indonesia.\n\nIni bukan sekadar film. Ini cermin dari sesuatu yang semua orang pernah rasakan — tapi tidak semua berani mengakui.\n\nSiapa yang sudah masuk daftar nobar? Tag teman kamu di bawah 👇\n\n#FilmIndonesia #Bioskop2026`,
    `Kami percaya film yang bagus tidak butuh hiperbola. Cukup satu adegan yang tepat untuk membuat penonton menangis, tertawa, atau diam.\n\n${film} punya banyak adegan itu.\n\nLink tiket di bio. Response dalam 24 jam.`,
  ],
  'press-release': (film) => [
    `SIARAN PERS — UNTUK SEGERA DITERBITKAN\n\n${film.toUpperCase()} HADIR DI BIOSKOP SELURUH INDONESIA\n\nJakarta, Mei 2026 — ${film}, film terbaru produksi BASE Entertainment, resmi memasuki tahap akhir produksi dan dijadwalkan tayang di seluruh bioskop Indonesia mulai Juni 2026.\n\nFilm yang disutradarai oleh sineas terkemuka Indonesia ini menghadirkan cerita yang relevan dengan realitas kehidupan keluarga Indonesia modern — sebuah narasi yang menyentuh tanpa manipulasi emosi.\n\n"Kami tidak membuat film tentang keajaiban. Kami membuat film tentang pilihan," ujar sutradara.\n\nDengan distribusi yang mencakup lebih dari 800 layar Cinema XXI, CGV, dan Cinépolis di seluruh nusantara, ${film} ditargetkan menjangkau penonton dari berbagai segmen demografis — dari keluarga muda di Jabodetabek hingga penonton di kota-kota tier dua dan tiga di Jawa dan Sumatera.\n\nPre-sale tiket telah dibuka di TIX ID dan M-Tix. Untuk informasi lebih lanjut, hubungi: press@kala.id\n\n###`,
  ],
  'campaign-hook': (_film, seg) => [
    `[Hook 01 — ${seg}] "Film yang membuat kamu sadar ada momen yang tidak bisa diulang."`,
    `[Hook 02 — ${seg}] "Semua orang punya satu cerita yang tidak berani mereka ceritakan. Film ini tentang itu."`,
    `[Hook 03 — ${seg}] "Kalau kamu pernah merasa terlambat — film ini untuk kamu."`,
    `[Hook 04 — ${seg}] "Rating 8.1/10. Kata penonton: 'Lebih bagus dari ekspektasi.'"`,
    `[Hook 05 — ${seg}] "Masih ada 3 minggu sebelum rilis. Follow akun ini untuk dapat early access."`,
  ],
  'creator-brief': (film, seg) => [
    `CREATOR BRIEF — ${film.toUpperCase()} — ${seg.toUpperCase()}\n\nObjective: Build awareness organik di segment ${seg} melalui konten autentik.\n\nPlatform: TikTok + Instagram Reels\nDurasi: 45–90 detik\nTone: Relatable, personal, tidak terasa endorsement\n\nDO:\n• Ceritakan pengalaman pribadi yang relevan dengan tema film\n• Gunakan scene yang sudah kami approve sebagai background/insert\n• Gunakan caption: "Film yang harus kalian tonton bulan ini..."\n\nDON'T:\n• Sebut harga tiket atau promo\n• Berikan review detail (spoiler risk)\n• Gunakan template caption generik\n\nKPI Target: Engagement rate >5% · View completion >60%\nDeadline content submit: 7 hari sebelum tayang`,
  ],
}

export default function CineForge() {
  const [selectedFilm, setSelectedFilm] = useState(mockFilms[0].id)
  const [selectedType, setSelectedType] = useState<AssetType>('tagline')
  const [selectedSegment, setSelectedSegment] = useState(SEGMENTS[0])
  const [generating, setGenerating] = useState(false)
  const [outputs, setOutputs] = useState<string[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  const film = mockFilms.find(f => f.id === selectedFilm)

  function generate() {
    setGenerating(true)
    setOutputs([])
    setTimeout(() => {
      const results = MOCK_OUTPUTS[selectedType](film?.title ?? 'Film', selectedSegment)
      setOutputs(results)
      setGenerating(false)
    }, 1800)
  }

  function copyToClipboard(text: string, idx: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1">KALA OS · CineForge™</p>
        <h1 className="font-display text-2xl font-light text-[#F2EFE6] mb-1">CineForge™ · Content Asset Generator</h1>
        <p className="font-body text-sm text-[#B8B5AA]">Generative creative studio — KIE-calibrated untuk segment penonton filmmu.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel */}
        <div className="space-y-4">
          {/* Film & segment */}
          <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">KIE Context</p>
            <div className="space-y-3">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] block mb-2">Film</label>
                <select
                  value={selectedFilm}
                  onChange={e => setSelectedFilm(e.target.value)}
                  className="w-full bg-[#0C0C14] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-3 py-2.5 focus:outline-none focus:border-crimson"
                >
                  {mockFilms.map(f => <option key={f.id} value={f.id}>{f.title}</option>)}
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] block mb-2">Audience Segment</label>
                <select
                  value={selectedSegment}
                  onChange={e => setSelectedSegment(e.target.value)}
                  className="w-full bg-[#0C0C14] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-3 py-2.5 focus:outline-none focus:border-crimson"
                >
                  {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Asset type */}
          <div className="border border-[#2A2A3E] bg-[#1A1A28] p-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Tipe Asset</p>
            <div className="space-y-1">
              {ASSET_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full text-left px-3 py-2.5 transition-all duration-150 ${
                    selectedType === type.id
                      ? 'bg-[rgba(155,28,28,0.12)] border-l-2 border-crimson pl-2.5'
                      : 'hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`font-body text-sm ${selectedType === type.id ? 'text-[#F2EFE6]' : 'text-[#B8B5AA]'}`}>
                      {type.label}
                    </p>
                    <Badge variant="default" size="sm">{type.badge}</Badge>
                  </div>
                  <p className="font-mono text-[9px] text-[#5A5655] mt-0.5">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={generate} loading={generating} className="w-full">
            Generate Asset
          </Button>
        </div>

        {/* Output panel */}
        <div className="lg:col-span-2">
          <div className="border border-[#2A2A3E] bg-[#1A1A28] min-h-96">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A3E]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">
                  {ASSET_TYPES.find(t => t.id === selectedType)?.label} · {selectedSegment}
                </p>
                {film && (
                  <p className="font-mono text-[9px] text-[#5A5655] mt-0.5">
                    KIE: {film.title} · {film.genre}
                  </p>
                )}
              </div>
              {outputs.length > 0 && (
                <Badge variant="success">{outputs.length} variants</Badge>
              )}
            </div>

            <div className="p-5">
              {generating && (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-8 h-8 border-2 border-[#2A2A3E] border-t-crimson rounded-full animate-spin mb-4" />
                  <p className="font-mono text-xs text-[#5A5655]">Generating dengan KIE context...</p>
                  <p className="font-mono text-[10px] text-[#5A5655] mt-1">{film?.title} · {selectedSegment}</p>
                </div>
              )}

              {!generating && outputs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="font-mono text-xs text-[#5A5655] mb-2">Pilih tipe asset dan klik Generate.</p>
                  <p className="font-mono text-[10px] text-[#5A5655]">Output dikalibrasi otomatis untuk segment aktif.</p>
                </div>
              )}

              {!generating && outputs.length > 0 && (
                <div className="space-y-4">
                  {outputs.map((output, idx) => (
                    <div key={idx} className="border border-[#2A2A3E] bg-[#0C0C14] p-4 group relative">
                      <div className="flex items-start justify-between gap-4">
                        <pre className="font-body text-sm text-[#F2EFE6] whitespace-pre-wrap leading-relaxed flex-1">
                          {output}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(output, idx)}
                          className="shrink-0 font-mono text-[10px] text-[#5A5655] hover:text-[#D4A853] transition-colors opacity-0 group-hover:opacity-100 mt-0.5"
                        >
                          {copied === idx ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                        <span className="font-mono text-[9px] text-[#5A5655]">Variant {idx + 1}</span>
                        <span className="font-mono text-[9px] text-[#5A5655]">KIE: {selectedSegment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {outputs.length > 0 && (
            <div className="mt-3 border border-[rgba(107,103,212,0.2)] bg-[rgba(107,103,212,0.05)] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6B67D4] mb-2">KIE Calibration Active</p>
              <p className="font-body text-xs text-[#B8B5AA]">
                Output dikalibrasi untuk <strong className="text-[#F2EFE6]">{selectedSegment}</strong> —
                tone, hook formula, dan behavioral trigger disesuaikan otomatis berdasarkan profil segment aktif.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
