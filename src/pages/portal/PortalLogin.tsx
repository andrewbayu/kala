import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../lib/auth'

export default function PortalLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const user = login(email, password)
      if (!user || user.role !== 'client') {
        setError('Akses ditolak. Gunakan credential client portal.')
        setLoading(false)
        return
      }
      navigate('/portal')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#0C0C14] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm mb-6 p-4 bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.15)]">
        <p className="font-mono text-[10px] text-[#D4A853] uppercase tracking-wider mb-2">Demo Client</p>
        <p className="font-mono text-[11px] text-[#B8B5AA]">Email: <span className="text-[#F2EFE6]">client@baseentertainment.id</span></p>
        <p className="font-mono text-[11px] text-[#B8B5AA]">Pass: <span className="text-[#F2EFE6]">client2026</span></p>
      </div>

      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-10 justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-crimson" />
          <span className="font-display font-bold text-xl tracking-widest text-[#F2EFE6] uppercase">KALA</span>
        </div>

        <h1 className="font-display text-2xl font-light text-[#F2EFE6] mb-2 text-center">Client Portal</h1>
        <p className="font-body text-sm text-[#B8B5AA] text-center mb-8">Akses kampanye & laporan filmmu.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-[#B8B5AA] block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#1A1A28] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-4 py-3 focus:outline-none focus:border-crimson"
              placeholder="kamu@studio.com"
              required
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-[#B8B5AA] block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#1A1A28] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-4 py-3 focus:outline-none focus:border-crimson"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="font-body text-sm text-[#B83A35] bg-[rgba(184,58,53,0.08)] border border-[rgba(184,58,53,0.2)] px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-crimson hover:bg-crimson-rich text-[#F2EFE6] font-body text-sm font-medium py-3 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Portal'}
          </button>
        </form>

        <div className="mt-6 flex justify-center gap-4">
          <Link to="/login" className="font-body text-sm text-[#5A5655] hover:text-[#B8B5AA] transition-colors">
            Login Tim KALA
          </Link>
          <span className="text-[#2A2A3E]">·</span>
          <Link to="/" className="font-body text-sm text-[#5A5655] hover:text-[#B8B5AA] transition-colors">
            Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  )
}
