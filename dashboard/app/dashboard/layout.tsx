import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--black-2)' }}>
      <Sidebar />
      {/* Content area — offset by sidebar width */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: 220 }}>
        {children}
      </div>
    </div>
  )
}
