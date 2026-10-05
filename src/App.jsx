import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './lib/PaymentContext.jsx'
import BottomNav from './components/BottomNav.jsx'
import { Logo } from './components/Icons.jsx'
import Home from './pages/Home.jsx'
import Scan from './pages/Scan.jsx'
import Pay from './pages/Pay.jsx'
import Confirm from './pages/Confirm.jsx'
import Success from './pages/Success.jsx'
import History from './pages/History.jsx'
import You from './pages/You.jsx'

function Splash() {
  return (
    <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center z-50">
      <div className="flex-1 flex items-center justify-center pop"><Logo size={110} /></div>
      <div className="pb-12 flex items-center gap-2 text-mute text-xs">
        <span className="text-mint">●</span> 100% secure demo payments
      </div>
    </div>
  )
}

export default function App() {
  const [splash, setSplash] = useState(true)
  const { pathname } = useLocation()
  useEffect(() => { const t = setTimeout(() => setSplash(false), 1300); return () => clearTimeout(t) }, [])
  const showNav = ['/', '/money', '/you'].includes(pathname)

  return (
    <AppProvider>
      {splash && <Splash />}
      <div className="mx-auto max-w-[480px] min-h-full bg-bg relative">
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
