import { useState } from 'react'
import {
  Dots,
  Bank,
  CreditCardIcon,
  Bolt,
  QrTileIcon,
  Chev,
  GPayLandscape,
  Close
} from '../components/Icons.jsx'
import { useApp } from '../lib/PaymentContext.jsx'

export default function You() {
  const { user } = useApp()
  const [showQrModal, setShowQrModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyUpi = () => {
    navigator.clipboard?.writeText(user.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="page pb-28 min-h-full bg-[#111215] text-white relative">
      {/* Night Landscape Graphic Header */}
      <GPayLandscape />

      {/* Top Bar with 3 Dots */}
      <header className="relative z-10 safe-top px-4 pt-3 flex justify-end">
        <button className="p-2 text-[#9aa0a6] hover:text-white press" aria-label="Settings">
          <Dots size={22} />
        </button>
      </header>

      {/* Profile Section matching Screenshot 3 */}
      <section className="relative z-10 px-4 mt-2 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{user.name || 'SHYAM'}</h1>
          <p className="text-xs text-[#9aa0a6] mt-1 break-all">
            UPI ID: {user.upiId || 'shyamshyamshyam13-1@okicici'}
          </p>
          <p className="text-sm font-semibold text-white/95 mt-1">
            {user.phone || '8825557169'}
          </p>
          <div className="inline-flex items-center gap-1.5 bg-[#0b57d0] text-white text-xs font-semibold px-3 py-1 rounded-full mt-2.5 shadow-sm">
            <span>✓</span>
            <span>UPI number</span>
          </div>
        </div>

        {/* Large Avatar "S" with QR badge */}
        <div className="relative shrink-0 ml-3" onClick={() => setShowQrModal(true)}>
          <div className="w-18 h-18 rounded-full bg-black border-2 border-white/20 flex items-center justify-center text-white font-extrabold text-3xl shadow-xl press cursor-pointer">
            S
          </div>
          <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#282a30] border-2 border-[#111215] flex items-center justify-center text-white/90 shadow-md">
            <QrTileIcon size={14} />
          </span>
        </div>
      </section>

      {/* Rewards & Referral Cards matching Screenshot 3 */}
      <section className="relative z-10 px-4 mt-6 grid grid-cols-2 gap-3">
        {/* Purple Card: 11 rewards */}
        <div className="bg-[#241a35] border border-[#3d2a58] rounded-2xl p-4 flex flex-col justify-between h-28 press hover:border-[#673ab7]/50 transition-colors shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#3d2a58] flex items-center justify-center text-[#d1c4e9]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="7" y1="8" x2="7" y2="8" />
              <line x1="17" y1="16" x2="17" y2="16" />
              <line x1="3" y1="12" x2="21" y2="12" strokeDasharray="2 2" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm text-white">11 rewards</p>
            <p className="text-xs text-[#b39ddb]">View now</p>
          </div>
        </div>

        {/* Teal Card: Get ₹121 */}
        <div className="bg-[#12282a] border border-[#1d4044] rounded-2xl p-4 flex flex-col justify-between h-28 press hover:border-[#00897b]/50 transition-colors shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#1d4044] flex items-center justify-center text-[#80cbc4]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm text-white">Get ₹121</p>
            <p className="text-xs text-[#80cbc4]">Refer a friend</p>
          </div>
        </div>
      </section>

      {/* Set Up Payment Methods Card matching Screenshot 3 */}
      <section className="relative z-10 px-4 mt-6">
        <div className="bg-[#1e1f24] border border-[#2c2e36] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Set up payment methods 1/3</h2>
            <Chev size={16} className="text-[#9aa0a6]" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* 1. Bank account */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#282a30] flex items-center justify-center text-white mb-2 shadow-sm">
                <Bank size={22} />
              </div>
              <p className="text-xs font-medium text-white leading-tight">Bank account</p>
              <p className="text-[10px] text-[#9aa0a6] mt-0.5">1 account</p>
            </div>

            {/* 2. RuPay credit card */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <div className="w-12 h-12 rounded-full bg-[#0b57d0] flex items-center justify-center text-white shadow-sm">
                  <CreditCardIcon size={20} />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1e1f24] border border-[#2c2e36] text-[#8ab4f8] text-xs font-bold flex items-center justify-center">
                  +
                </span>
              </div>
              <p className="text-xs font-medium text-white leading-tight">RuPay credit card</p>
              <p className="text-[10px] text-[#9aa0a6] mt-0.5">Pay with UPI</p>
            </div>

            {/* 3. UPI Lite */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <div className="w-12 h-12 rounded-full bg-[#0b57d0] flex items-center justify-center text-white shadow-sm">
                  <Bolt size={20} />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1e1f24] border border-[#2c2e36] text-[#8ab4f8] text-xs font-bold flex items-center justify-center">
                  +
                </span>
              </div>
              <p className="text-xs font-medium text-white leading-tight">UPI Lite</p>
              <p className="text-[10px] text-[#9aa0a6] mt-0.5">Pay PIN-free</p>
            </div>
          </div>
        </div>
      </section>

      {/* List Items matching Screenshot 3 */}
      <section className="relative z-10 px-4 mt-4 space-y-3">
        {/* Credit / Debit Cards */}
        <div className="bg-[#1e1f24] border border-[#2c2e36] rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#282a30] flex items-center justify-center text-[#8ab4f8]">
              <CreditCardIcon size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Pay with credit or debit cards</p>
              <p className="text-[11px] text-[#9aa0a6] mt-0.5">Pay bills with your card</p>
            </div>
          </div>
          <button className="text-xs font-semibold text-[#8ab4f8] press">Add</button>
        </div>

        {/* Your QR Code */}
        <div
          onClick={() => setShowQrModal(true)}
          className="bg-[#1e1f24] border border-[#2c2e36] rounded-2xl p-4 flex items-center justify-between cursor-pointer press hover:bg-[#25272e] transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#282a30] flex items-center justify-center text-white">
              <QrTileIcon size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Your QR code</p>
              <p className="text-[11px] text-[#9aa0a6] mt-0.5">Show your QR to receive money</p>
            </div>
          </div>
          <Chev size={16} className="text-[#9aa0a6]" />
        </div>
      </section>

      {/* My QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/80 max-w-[480px] mx-auto flex items-center justify-center p-6 z-50 animate-in fade-in" onClick={() => setShowQrModal(false)}>
          <div className="bg-[#1e1f24] border border-[#2c2e36] rounded-3xl p-6 w-full text-center relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowQrModal(false)} className="absolute top-4 right-4 p-2 text-[#9aa0a6] hover:text-white press">
              <Close size={20} />
            </button>
            <p className="text-lg font-bold text-white mt-1">{user.name}</p>
            <p className="text-xs text-[#9aa0a6] mt-0.5">{user.upiId}</p>

            {/* QR Code graphic */}
            <div className="bg-white p-4 rounded-2xl mx-auto my-5 inline-block shadow-lg">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <rect width="180" height="180" fill="#fff" />
                {/* Corner markers */}
                <rect x="15" y="15" width="45" height="45" fill="#000" />
                <rect x="22" y="22" width="31" height="31" fill="#fff" />
                <rect x="29" y="29" width="17" height="17" fill="#000" />

                <rect x="120" y="15" width="45" height="45" fill="#000" />
                <rect x="127" y="22" width="31" height="31" fill="#fff" />
                <rect x="134" y="29" width="17" height="17" fill="#000" />

                <rect x="15" y="120" width="45" height="45" fill="#000" />
                <rect x="22" y="127" width="31" height="31" fill="#fff" />
                <rect x="29" y="134" width="17" height="17" fill="#000" />

                {/* Data blocks */}
                <rect x="75" y="20" width="10" height="20" fill="#000" />
                <rect x="95" y="15" width="15" height="10" fill="#000" />
                <rect x="70" y="55" width="40" height="10" fill="#000" />
                <rect x="20" y="75" width="20" height="10" fill="#000" />
                <rect x="50" y="75" width="20" height="20" fill="#000" />
                <rect x="80" y="75" width="20" height="20" fill="#000" />
                <rect x="110" y="75" width="15" height="15" fill="#000" />
                <rect x="135" y="75" width="25" height="10" fill="#000" />
                <rect x="75" y="105" width="30" height="10" fill="#000" />
                <rect x="75" y="125" width="15" height="35" fill="#000" />
                <rect x="100" y="135" width="20" height="15" fill="#000" />
                <rect x="130" y="115" width="15" height="15" fill="#000" />
                <rect x="130" y="140" width="30" height="20" fill="#000" />
              </svg>
            </div>

            <p className="text-xs text-[#9aa0a6]">Scan with any UPI app to pay Shyam</p>
            <button
              onClick={copyUpi}
              className="mt-4 bg-[#282a30] hover:bg-[#32353d] text-white text-xs font-semibold px-5 py-2.5 rounded-full press transition-colors"
            >
              {copied ? '✓ UPI ID Copied!' : 'Copy UPI ID'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
