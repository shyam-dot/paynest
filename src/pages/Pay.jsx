import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Back } from '../components/Icons.jsx'
import { initials } from '../lib/upi.js'
import { useApp } from '../lib/PaymentContext.jsx'

const QUICK_AMOUNTS = ['50', '100', '250', '500', '1000']

export default function Pay() {
  const nav = useNavigate()
  const { payment, setPayment } = useApp()
  const p = payment || { upiId: '', payeeName: '', amount: '', note: '' }
  const locked = Boolean(p.upiId && p.payeeName) // came from a scanned QR with both fields
  
  const [upiId, setUpiId] = useState(p.upiId || '')
  const [name, setName] = useState(p.payeeName || '')
  const [amount, setAmount] = useState(p.amount || '')
  const [note, setNote] = useState(p.note || '')

  const numAmount = Number(amount)
  const canProceed = numAmount > 0

  const handleNext = () => {
    if (!canProceed) return
    const resolvedName = (name || upiId || 'Demo Payee').trim()
    const resolvedUpi = upiId.trim() || `${resolvedName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'payee'}@paynest`

    setPayment({
      upiId: resolvedUpi,
      payeeName: resolvedName,
      amount: String(numAmount),
      note: note.trim()
    })
    nav('/confirm')
  }

  return (
    <div className="page min-h-full flex flex-col justify-between">
      <div>
        <header className="safe-top px-4 flex items-center justify-between">
          <button onClick={() => nav(-1)} className="p-2 -ml-2 press text-white" aria-label="Back">
            <Back />
          </button>
          <p className="font-semibold text-base">Make Payment</p>
          <div className="w-8" />
        </header>

        <div className="flex flex-col items-center mt-6">
          <span className="w-20 h-20 rounded-full bg-card2 text-mint text-2xl font-bold flex items-center justify-center shadow-inner">
            {initials(name || upiId || 'Payee')}
          </span>
          <p className="mt-3 text-lg font-semibold">{name || (upiId ? upiId : 'Enter Payee Details')}</p>
          {locked && <p className="text-xs text-mute mt-0.5 break-all px-6 text-center">{upiId}</p>}
        </div>

        {!locked && (
          <div className="px-4 mt-5 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Payee name or store (e.g. Cafe Mocha)"
              className="w-full bg-card border border-line rounded-xl px-4 py-3 outline-none focus:border-mint transition-colors text-sm"
            />
            <input
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="UPI ID (optional, e.g. merchant@upi)"
              autoCapitalize="none"
              autoCorrect="off"
              className="w-full bg-card border border-line rounded-xl px-4 py-3 outline-none focus:border-mint transition-colors text-sm"
            />
          </div>
        )}

        <div className="flex flex-col items-center justify-center px-6 mt-8">
          <div className="flex items-center text-5xl font-bold tracking-tight">
            <span className="mr-1 text-mint">₹</span>
            <input
              value={amount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')
                setAmount(val)
              }}
              inputMode="decimal"
              placeholder="0"
              autoFocus
              className="bg-transparent outline-none w-56 text-center placeholder:text-white/20 font-bold"
            />
          </div>

          {/* Quick Amount Suggestion Chips */}
          <div className="flex gap-2 mt-5 overflow-x-auto max-w-full py-1">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors press ${
                  amount === amt ? 'bg-mint text-black border-mint font-semibold' : 'bg-card border-line text-white/80 hover:border-mint/50'
                }`}
              >
                +₹{amt}
              </button>
            ))}
          </div>

          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note (optional)"
            maxLength={50}
            className="mt-6 bg-card border border-line rounded-full px-5 py-2.5 text-sm text-center outline-none focus:border-mint transition-colors w-64"
          />

        </div>
      </div>

      <div className="px-4 pb-6 safe-bottom mt-8">
        <button
          disabled={!canProceed}
          onClick={handleNext}
          className="w-full py-4 rounded-full bg-mint text-black font-bold text-base disabled:opacity-30 disabled:cursor-not-allowed press transition-all shadow-lg shadow-mint/20 flex items-center justify-center gap-2"
        >
          {canProceed ? `Pay ₹${numAmount.toLocaleString('en-IN')}` : 'Enter amount to pay'}
        </button>
      </div>
    </div>
  )
}
