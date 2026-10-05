import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Scan,
  PayAnyoneIcon,
  BankTileIcon,
  MobileRechargeIcon,
  QrTileIcon,
  RocketIcon,
  TrophyIcon,
  Chev,
  GPayLandscape
} from '../components/Icons.jsx'
import { useApp } from '../lib/PaymentContext.jsx'

// Contacts exactly matching the user's Google Pay screenshot
const CONTACTS = [
  { name: 'Sharan', initial: 'S', color: '#1a73e8', upiId: 'sharan@okaxis' },
  { name: 'Mr Kamalesh', initial: 'M', color: '#f2720c', upiId: 'mrkamalesh@okicici' },
  { name: 'MURALIS SWEETS ...', initial: 'M', color: '#b3266e', upiId: 'muralissweets@okaxis' },
  { name: 'Mr Sivabalan S', initial: 'M', color: '#0288d1', upiId: 'sivabalan@okhdfcbank' },
  { name: 'R Sumathi', initial: 'R', color: '#6d4c41', upiId: 'rsumathi@okaxis' },
  { name: 'Thilak', initial: 'T', color: '#7b1fa2', upiId: 'thilak@okicici' },
  { name: 'Suresh', initial: 'S', color: '#2e7d32', upiId: 'suresh@oksbi' }
]

export default function Home() {
  const nav = useNavigate()
  const { setPayment } = useApp()
  const [showAllContacts, setShowAllContacts] = useState(false)

  const toContact = (c) => {
    setPayment({
      upiId: c.upiId,
      payeeName: c.name,
      amount: '',
      note: ''
    })
    nav('/pay')
  }

  return (
    <div className="page pb-28 min-h-full bg-[#111215] text-white relative">
      {/* Night Landscape Graphic Header */}
      <GPayLandscape />

      {/* Top Search Bar & Profile */}
      <header className="relative z-10 safe-top px-4 pt-3 flex items-center gap-3">
        <button
          onClick={() => nav('/pay')}
          className="flex-1 flex items-center gap-3 bg-[#1e1f24] hover:bg-[#25272e] border border-[#2c2e36] rounded-full px-4 py-3 text-[#9aa0a6] text-sm text-left press transition-colors shadow-sm"
        >
          <Search size={19} className="text-white shrink-0" />
          <span className="truncate text-sm text-[#9aa0a6]">Pay by name or phone nu...</span>
        </button>

        {/* Profile Avatar "S" */}
        <button
          onClick={() => nav('/you')}
          className="w-10 h-10 rounded-full bg-[#1e1f24] border border-[#2c2e36] flex items-center justify-center text-sm font-bold text-white shrink-0 press hover:border-[#8ab4f8] transition-colors"
          aria-label="Profile"
        >
          S
        </button>
      </header>

      {/* Primary 4 Google Blue Action Tiles */}
      <section className="relative z-10 px-4 mt-20 grid grid-cols-4 gap-2.5">
        {/* 1. Scan any QR code */}
        <button
          onClick={() => nav('/scan')}
          className="flex flex-col items-center gap-2 press group"
        >
          <span className="w-14 h-14 rounded-2xl bg-[#0b57d0] group-hover:bg-[#1565c0] flex items-center justify-center text-white transition-colors shadow-md">
            <QrTileIcon size={26} />
          </span>
          <span className="text-[11px] font-medium text-center leading-tight text-white/95 px-1">
            Scan any QR code
          </span>
        </button>

        {/* 2. Pay anyone */}
        <button
          onClick={() => nav('/pay')}
          className="flex flex-col items-center gap-2 press group"
        >
          <span className="w-14 h-14 rounded-2xl bg-[#0b57d0] group-hover:bg-[#1565c0] flex items-center justify-center text-white transition-colors shadow-md">
            <PayAnyoneIcon size={26} />
          </span>
          <span className="text-[11px] font-medium text-center leading-tight text-white/95 px-1">
            Pay anyone
          </span>
        </button>

        {/* 3. Bank transfer */}
        <button
          onClick={() => nav('/pay')}
          className="flex flex-col items-center gap-2 press group"
        >
          <span className="w-14 h-14 rounded-2xl bg-[#0b57d0] group-hover:bg-[#1565c0] flex items-center justify-center text-white transition-colors shadow-md">
            <BankTileIcon size={26} />
          </span>
          <span className="text-[11px] font-medium text-center leading-tight text-white/95 px-1">
            Bank transfer
          </span>
        </button>

        {/* 4. Mobile recharge */}
        <button
          onClick={() => nav('/pay')}
          className="flex flex-col items-center gap-2 press group"
        >
          <span className="w-14 h-14 rounded-2xl bg-[#0b57d0] group-hover:bg-[#1565c0] flex items-center justify-center text-white transition-colors shadow-md">
            <MobileRechargeIcon size={26} />
          </span>
          <span className="text-[11px] font-medium text-center leading-tight text-white/95 px-1">
            Mobile recharge
          </span>
        </button>
      </section>

      {/* Quick Pills Row matching Screenshot 2 */}
      <section className="relative z-10 px-4 mt-6 flex gap-2.5 overflow-x-auto [scrollbar-width:none]">
        {/* UPI Lite */}
        <button
          onClick={() => nav('/money')}
          className="shrink-0 bg-[#1e1f24] border border-[#2c2e36] rounded-full px-3.5 py-2 flex items-center gap-2 press hover:bg-[#25272e] transition-colors"
        >
          <RocketIcon size={16} />
          <span className="text-xs text-white">UPI Lite</span>
          <span className="text-xs text-[#8ab4f8] font-medium">Activate</span>
        </button>

        {/* Rewards */}
        <button
          onClick={() => nav('/you')}
          className="shrink-0 bg-[#1e1f24] border border-[#2c2e36] rounded-full px-3.5 py-2 flex items-center gap-2 press hover:bg-[#25272e] transition-colors"
        >
          <TrophyIcon size={16} />
          <span className="text-xs text-white">Rewards</span>
          <span className="text-xs text-[#fbbc04] font-medium">New</span>
        </button>

        {/* Explore more */}
        <button
          onClick={() => nav('/money')}
          className="shrink-0 bg-[#1e1f24] border border-[#2c2e36] rounded-full px-3.5 py-2 flex items-center gap-2 press hover:bg-[#25272e] transition-colors"
        >
          <span className="text-xs text-white">Cards &amp; Loans</span>
          <Chev size={14} className="text-[#9aa0a6]" />
        </button>
      </section>

      {/* Send Money Contacts Grid matching Screenshot 2 */}
      <section className="relative z-10 px-4 mt-8">
        <h2 className="text-lg font-semibold tracking-tight text-white">Send money</h2>
        
        <div className="grid grid-cols-4 gap-y-5 gap-x-2 mt-4">
          {CONTACTS.map((c) => (
            <button
              key={c.name}
              onClick={() => toContact(c)}
              className="flex flex-col items-center gap-1.5 press group"
            >
              <span
                style={{ backgroundColor: c.color }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform"
              >
                {c.initial}
              </span>
              <span className="text-[11px] text-[#e3e3e3] text-center truncate w-full px-0.5 leading-tight">
                {c.name}
              </span>
            </button>
          ))}

          {/* More Button */}
          <button
            onClick={() => setShowAllContacts(!showAllContacts)}
            className="flex flex-col items-center gap-1.5 press group"
          >
            <span className="w-14 h-14 rounded-full bg-[#1e1f24] border border-[#2c2e36] flex items-center justify-center text-[#9aa0a6] group-hover:text-white transition-colors">
              <Chev size={20} className={showAllContacts ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </span>
            <span className="text-[11px] text-[#9aa0a6] text-center font-medium">
              {showAllContacts ? 'Less' : 'More'}
            </span>
          </button>
        </div>

        {/* Expanded contacts if "More" is clicked */}
        {showAllContacts && (
          <div className="grid grid-cols-4 gap-y-5 gap-x-2 mt-4 animate-in fade-in duration-200">
            {[
              { name: 'Karthik', initial: 'K', color: '#00897b', upiId: 'karthik@okaxis' },
              { name: 'Ananya', initial: 'A', color: '#e53935', upiId: 'ananya@okicici' },
              { name: 'Pradeep', initial: 'P', color: '#3949ab', upiId: 'pradeep@okhdfcbank' },
              { name: 'Divya', initial: 'D', color: '#8e24aa', upiId: 'divya@oksbi' }
            ].map((c) => (
              <button
                key={c.name}
                onClick={() => toContact(c)}
                className="flex flex-col items-center gap-1.5 press group"
              >
                <span
                  style={{ backgroundColor: c.color }}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
                >
                  {c.initial}
                </span>
                <span className="text-[11px] text-[#e3e3e3] text-center truncate w-full px-0.5 leading-tight">
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Floating Pill "Scan QR" button matching Screenshot 2 */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <button
          onClick={() => nav('/scan')}
          className="bg-[#0b57d0] hover:bg-[#1565c0] text-white px-5 py-3 rounded-full flex items-center gap-2.5 font-medium text-sm shadow-xl shadow-black/60 press transition-all"
        >
          <Scan size={18} />
          <span>Scan QR</span>
        </button>
      </div>
    </div>
  )
}
