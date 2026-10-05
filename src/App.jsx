import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './lib/PaymentContext.jsx'
import BottomNav from './components/BottomNav.jsx'
import Home from './pages/Home.jsx'
import Scan from './pages/Scan.jsx'
import Pay from './pages/Pay.jsx'
import Confirm from './pages/Confirm.jsx'
import Success from './pages/Success.jsx'
import History from './pages/History.jsx'
import You from './pages/You.jsx'

function Splash() {
  return (
    <div className="fixed inset-0 bg-[#111215] flex flex-col items-center justify-center z-50">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-[#1e1f24] border border-[#2c2e36] flex items-center justify-center shadow-2xl pop">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
        </div>
        <p className="mt-4 text-xl font-bold tracking-tight text-white">Google Pay</p>
      </div>
      <div className="pb-10 flex items-center gap-2 text-[#9aa0a6] text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
        UPI payments · Secured by Google
      </div>
    </div>
  )
}

export default function App() {
  const [splash, setSplash] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 900)
    return () => clearTimeout(t)
  }, [])

  const showNav = ['/', '/money', '/you'].includes(pathname)

  return (
    <AppProvider>
      {splash && <Splash />}
      <div className="mx-auto max-w-[480px] min-h-full bg-[#111215] relative overflow-x-hidden font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/money" element={<History />} />
          <Route path="/you" element={<You />} />
          <Route path="*" element={<Home />} />
        </Routes>
        {showNav && <BottomNav />}
      </div>
    </AppProvider>
  )
}
