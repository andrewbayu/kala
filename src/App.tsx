import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './contexts/LangContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import AppLayout from './pages/app/AppLayout'
import Dashboard from './pages/app/Dashboard'
import FilmSim from './pages/app/FilmSim'
import CineForge from './pages/app/CineForge'
import LiveTicker from './pages/app/LiveTicker'
import AudienceDNA from './pages/app/AudienceDNA'
import PortalLayout from './pages/portal/PortalLayout'
import PortalLogin from './pages/portal/PortalLogin'
import PortalDashboard from './pages/portal/PortalDashboard'
import PortalReports from './pages/portal/PortalReports'
import PortalPerformance from './pages/portal/PortalPerformance'

function LandingLayout() {
  return (
    <>
      <Navbar />
      <Landing />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingLayout />} />
        <Route path="/login" element={<Login />} />

        {/* Internal team app */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="filmsim" element={<FilmSim />} />
          <Route path="cineforge" element={<CineForge />} />
          <Route path="live-ticker" element={<LiveTicker />} />
          <Route path="audience-dna" element={<AudienceDNA />} />
        </Route>

        {/* Client portal */}
        <Route path="/portal/login" element={<PortalLogin />} />
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<PortalDashboard />} />
          <Route path="reports" element={<PortalReports />} />
          <Route path="performance" element={<PortalPerformance />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </LangProvider>
  )
}
