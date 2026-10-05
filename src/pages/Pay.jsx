import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Back } from '../components/Icons.jsx'
import { initials } from '../lib/upi.js'
import { useApp } from '../lib/PaymentContext.jsx'

export default function Pay() {
  const nav = useNavigate()
  const { payment, setPayment } = useApp()
  const p = payment || { upiId: '', payeeName: '', amount: '', note: '' }
  const locked = Boolean(p.upiId) // came from a scanned QR
  const [upiId, setUpiId] = useState(p.upiId)
  const [name, setName] = useState(p.payeeName)
  const [amount, setAmount] = useState(p.amount)
  const [note, setNote] = useState(p.note)
  const idOk = /^[\w.\-]{2,}@[\w.\-]{2,}$/.test(upiId.trim())
  const ok = idOk && Number(amount) > 0

  const next = () => {
    setPayment({ upiId: upiId.trim(), payeeName: (name || upiId).trim(), amount: String(Number(amount)), note: note.trim() })
    nav('/confirm')
  }

  return (
    <div className="page min-h-full flex flex-col">
      <header className="safe-top px-4 flex items-center gap-3">
        <button onClick={() => nav(-1)} className="p-2 -ml-2 press"><Back /></button>
        <p className="font-medium">Pay</p>
      </header>

      <div className="flex flex-col items-center mt-8">
        <span className="w-20 h-20 rounded-full bg-card2 text-mint text-2xl font-semibold flex items-center justify-center">{initials(name || upiId)}</span>
        <p className="mt-3 text-lg font-medium">{name || 'Enter UPI ID'}</p>
        {locked && <p className="text-sm text-mute mt-0.5 break-all px-6 text-center">{upiId}</p>}
      </div>

      {!locked && (
        <div className="px-4 mt-6 space-y-3">
          <input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="UPI ID (name@bank)" autoCapitalize="none" autoCorrect="off"
            className="w-full bg-card rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-mint" />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Payee name (optional)"
            className="w-full bg-card rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-mint" />
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="flex items-center text-5xl font-semibold">
          <span className="mr-1">₹</span>
          <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1'))}
            inputMode="decimal" placeholder="0" autoFocus={locked}
            className="bg-transparent outline-none w-48 text-center placeholder:text-white/30" />
        </div>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note" maxLength={50}
          className="mt-6 bg-card rounded-full px-5 py-2.5 text-sm text-center outline-none focus:ring-1 focus:ring-mint w-64" />
        <p className="text-[11px] text-mute mt-4">Demo mode · no real money moves</p>
      </div>

      <div className="px-4 pb-6 safe-bottom">
        <button disabled={!ok} onClick={next} className="w-full py-3.5 rounded-full bg-mint text-black font-semibold disabled:opacity-40 press">Continue</button>
      </div>
    </div>
  )
}
