import { useState } from 'react'
import { mockAudienceSegments, mockFilms } from '../../data/mockData'
import type { AudienceSegment } from '../../types'
import Badge from '../../components/ui/Badge'

function VectorBar({ label, value, color }: { label: string; value: number; color: string }) {
  const level = value >= 70 ? 'high' : value >= 40 ? 'mid' : 'low'
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#F2EFE6]">{value}</span>
          <span className={`font-mono text-[9px] uppercase ${level === 'high' ? 'text-[#B83A35]' : level === 'mid' ? 'text-[#D4A853]' : 'text-[#4ade80]'}`}>
            {level}
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-[#2A2A3E] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  )
}

function SegmentCard({ segment, active, onClick }: { segment: AudienceSegment; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border p-4 transition-all duration-200 ${
        active
          ? 'border-crimson bg-[rgba(155,28,28,0.08)]'
          : 'border-[#2A2A3E] bg-[#1A1A28] hover:border-[rgba(255,255,255,0.15)]'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className={`font-body text-sm font-medium ${active ? 'text-[#F2EFE6]' : 'text-[#B8B5AA]'}`}>
            {segment.name}
          </p>
          <p className="font-mono text-[10px] text-[#5A5655]">{segment.ageRange}</p>
        </div>
        <div className="text-right">
          <p className={`font-display text-xl font-light ${active ? 'text-crimson' : 'text-[#D4A853]'}`}>
            {segment.resonanceScore}
          </p>
          <p className="font-mono text-[9px] text-[#5A5655]">resonance</p>
        </div>
      </div>
      <div className="h-1 bg-[#2A2A3E] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${active ? 'bg-crimson' : 'bg-[#D4A853]'}`}
          style={{ width: `${segment.resonanceScore}%` }}
        />
      </div>
    </button>
  )
}

const TONES: Record<string, string> = {
  'Penonton Keluarga': 'Warm, relatable, word-of-mouth driven. Lead dengan social proof dari sesama orang tua. WhatsApp copy harus terasa seperti rekomendasi teman, bukan iklan.',
  'Penggemar Horor': 'Bold, atmospheric, FOMO-inducing. Tidak perlu social proof — mereka sudah mau datang. Hook harus terasa seperti peringatan, bukan pitch.',
  'Remaja Urban': 'FOMO-maximizing, trend-native, identity-driven. TikTok hook dalam 3 detik pertama. Community language: "ini film buat kita."',
  'Cinephile Millennial': 'Evidence-based, craft-forward. Sebut director track record, genre references, festival context. Hype backfires — credibility is everything.',
  'Penonton Romance': 'Emotional payoff promise, kilig moment highlight. Hook harus membuat mereka melihat diri mereka di dalam cerita.',
  'Ibu Rumah Tangga': 'Peer recommendation framing. Highlight aktor favorit dan warm family angle. WhatsApp blast tone: teman yang merekomendasikan, bukan brand.',
}

export default function AudienceDNA() {
  const [selectedFilm, setSelectedFilm] = useState(mockFilms[0].id)
  const [activeSegment, setActiveSegment] = useState(mockAudienceSegments[0])

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1">KALA OS · AudienceDNA™</p>
        <h1 className="font-display text-2xl font-light text-[#F2EFE6] mb-1">AudienceDNA™ · Audience Intelligence</h1>
        <p className="font-body text-sm text-[#B8B5AA]">KIE-powered audience segmentation — resonance scores & behavioral vectors.</p>
      </div>

      {/* Film selector */}
      <div className="flex items-center gap-4 mb-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655]">Film:</p>
        <select
          value={selectedFilm}
          onChange={e => setSelectedFilm(e.target.value)}
          className="bg-[#1A1A28] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-4 py-2 focus:outline-none focus:border-crimson"
        >
          {mockFilms.map(f => <option key={f.id} value={f.id}>{f.title}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Segment list */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-3">
            Audience Segments · Ranked by Resonance
          </p>
          <div className="space-y-2">
            {mockAudienceSegments
              .sort((a, b) => b.resonanceScore - a.resonanceScore)
              .map(seg => (
                <SegmentCard
                  key={seg.id}
                  segment={seg}
                  active={activeSegment.id === seg.id}
                  onClick={() => setActiveSegment(seg)}
                />
              ))}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-2 space-y-4">
          {/* Segment detail */}
          <div className="border border-[#2A2A3E] bg-[#1A1A28] p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-crimson mb-1">Active Segment</p>
                <h2 className="font-display text-2xl font-light text-[#F2EFE6]">{activeSegment.name}</h2>
                <p className="font-mono text-xs text-[#5A5655] mt-1">{activeSegment.ageRange}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-4xl font-light text-[#D4A853]">{activeSegment.resonanceScore}</p>
                <p className="font-mono text-[10px] text-[#5A5655]">KIE Resonance Score</p>
              </div>
            </div>

            <p className="font-body text-sm text-[#B8B5AA] leading-relaxed mb-6">{activeSegment.profile}</p>

            <div className="border border-[rgba(212,168,83,0.2)] bg-[rgba(212,168,83,0.05)] p-4 mb-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#D4A853] mb-2">Key Insight</p>
              <p className="font-body text-sm text-[#F2EFE6] italic">"{activeSegment.keyInsight}"</p>
            </div>

            {/* Behavioral vectors */}
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">Behavioral Vectors</p>
            <VectorBar label="Skepticism" value={activeSegment.skepticism} color="#B83A35" />
            <VectorBar label="Knowledge" value={activeSegment.knowledge} color="#D4A853" />
            <VectorBar label="Identity" value={activeSegment.identity} color="#9B1C1C" />
            <VectorBar label="Anxiety" value={activeSegment.anxiety} color="#6B67D4" />

            {/* Primary channels */}
            <div className="mt-4 pt-4 border-t border-[#2A2A3E]">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-2">Primary Channels</p>
              <div className="flex flex-wrap gap-2">
                {activeSegment.primaryChannels.map(ch => (
                  <Badge key={ch} variant="info">{ch}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Tone strategy */}
          <div className="border border-[#2A2A3E] bg-[#1A1A28] p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-3">
              Tone Strategy · CineForge Calibration
            </p>
            <p className="font-body text-sm text-[#B8B5AA] leading-relaxed">
              {TONES[activeSegment.name] ?? 'Kalibrasi tone tersedia setelah segment dipilih sebagai KIE context aktif.'}
            </p>
          </div>

          {/* Vector interpretation */}
          <div className="border border-[#2A2A3E] bg-[#1A1A28] p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-4">
              Vector Interpretation
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  v: activeSegment.skepticism,
                  label: 'Skepticism',
                  high: 'Lead dengan social proof & bukti. Hindari superlatives tanpa data.',
                  low: 'Bold claims bekerja. FOMO dan hype efektif untuk segment ini.',
                },
                {
                  v: activeSegment.knowledge,
                  label: 'Knowledge',
                  high: 'Bicara bahasa mereka. Genre reference, director recognition.',
                  low: 'Jelaskan premise dengan jelas. Jangan assume familiarity.',
                },
                {
                  v: activeSegment.identity,
                  label: 'Identity',
                  high: '"Film ini untuk kita." Community language & belonging messaging.',
                  low: 'Functional benefit messaging. Fokus pada experience, bukan community.',
                },
                {
                  v: activeSegment.anxiety,
                  label: 'Anxiety',
                  high: 'Risk-reversal. Early positive reviews, WOM amplification.',
                  low: 'Lean into the unknown. Surprise & discovery work.',
                },
              ].map(item => (
                <div key={item.label} className="border border-[#2A2A3E] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#5A5655] mb-1">{item.label}</p>
                  <p className="font-body text-xs text-[#B8B5AA] leading-relaxed">
                    {item.v >= 60 ? item.high : item.low}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
