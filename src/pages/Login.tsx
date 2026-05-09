import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, isClientUser } from '../lib/auth'

export default function Login() {
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
      if (!user) {
        setError('Email atau password salah.')
        setLoading(false)
        return
      }
      if (isClientUser(user)) {
        navigate('/portal')
      } else {
        navigate('/app')
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#0C0C14] flex flex-col items-center justify-center px-4">
      {/* Hint box */}
      <div className="w-full max-w-sm mb-6 p-4 bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.15)]">
        <p className="font-mono text-[10px] text-[#D4A853] uppercase tracking-wider mb-2">Demo Credentials</p>
        <p className="font-mono text-[11px] text-[#B8B5AA]">Team: <span className="text-[#F2EFE6]">team@kala.id</span> / kala2026</p>
        <p className="font-mono text-[11px] text-[#B8B5AA] mt-1">Client: <span className="text-[#F2EFE6]">client@baseentertainment.id</span> / client2026</p>
      </div>

      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-10 justify-center">
          <span className="w-2 h-2 rounded-full bg-crimson live-dot" />
          <span className="font-display font-[800] text-[17px] tracking-[0.14em] text-[#F2EFE6] uppercase">KALA</span>
        </div>

        <h1 className="font-display font-light text-[28px] tracking-[-0.02em] text-[#F2EFE6] mb-2 text-center">Masuk ke KALA OS</h1>
        <p className="font-body font-[400] text-[14px] text-[#B8B5AA] text-center mb-8">Intelligence Platform · Film Indonesia</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-[#B8B5AA] block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#1A1A28] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-4 py-3 focus:outline-none focus:border-crimson transition-colors placeholder:text-[#5A5655]"
              placeholder="kamu@email.com"
              required
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-[#B8B5AA] block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#1A1A28] border border-[#2A2A3E] text-[#F2EFE6] font-body text-sm px-4 py-3 focus:outline-none focus:border-crimson transition-colors placeholder:text-[#5A5655]"
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
            className="w-full bg-crimson hover:bg-crimson-rich text-[#F2EFE6] font-body text-sm font-medium py-3 transition-all duration-200 disabled:opacity-50 mt-2"
          >
            {loading ? 'Memverifikasi...' : 'Masuk'}
          </button>
        </form>

        <p className="font-body text-sm text-[#5A5655] text-center mt-6">
          <Link to="/" className="text-[#B8B5AA] hover:text-[#F2EFE6] transition-colors">
            ← Kembali ke halaman utama
          </Link>
        </p>
      </div>
    </div>
  )
}
