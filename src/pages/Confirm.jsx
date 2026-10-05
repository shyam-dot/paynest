import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../lib/PaymentContext.jsx'
import { inr, ref } from '../lib/upi.js'

export default function Confirm() {
  const nav = useNavigate()
  const { payment, setReceipt, addTransaction } = useApp()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  if (!payment || !payment.amount) return <Navigate to="/" replace />

  const payeeName = payment.payeeName || 'Payee'
  const upiId = payment.upiId || `${payeeName.toLowerCase().replace(/\s+/g, '')}@paynest`
  const rows = [
    ['Payee', payeeName],
    ['UPI ID', upiId],
    ['Amount', inr(payment.amount)],
    ['Note', payment.note || '—']
  ]

  const pay = async () => {
    setBusy(true)
    setErr('')
    
    // Simulated realistic payment network processing delay
    await new Promise((r) => setTimeout(r, 1200))

    const tx = {
      id: crypto.randomUUID(),
      transactionId: 'TXN-' + Math.floor(1000000000 + Math.random() * 9000000000),
      upiId: upiId,
      payeeName: payeeName,
      amount: Number(payment.amount),
      note: payment.note || '',
      status: 'SUCCESS',
      transactionReference: ref(),
      timestamp: new Date().toISOString()
    }

    try {
      addTransaction(tx)
      setReceipt({ ...tx, timestamp: new Date() })
      nav('/success', { replace: true })
    } catch (e) {
      setErr('Error processing payment: ' + e.message)
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 max-w-[480px] mx-auto flex items-end z-30">
      <div className="sheet w-full bg-card rounded-t-3xl p-5 safe-bottom animate-in fade-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 bg-line rounded-full mx-auto mb-4" />
        <p className="text-lg font-semibold">Confirm payment</p>
        <p className="text-4xl font-semibold mt-3 text-mint">{inr(payment.amount)}</p>
        
        <div className="mt-4 divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3 text-sm">
              <span className="text-mute">{k}</span>
              <span className="text-right font-medium break-all">{v}</span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-mute mt-3 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-mint animate-pulse" />
          Instant settlement · 100% secure front-end simulation
        </p>

        {err && <p className="text-xs text-red-400 mt-2">{err}</p>}

        <div className="flex gap-3 mt-5">
          <button
            disabled={busy}
            onClick={() => nav(-1)}
            className="flex-1 py-3.5 rounded-full bg-card2 font-medium disabled:opacity-40 press transition-all"
          >
            Edit
          </button>
          <button
            disabled={busy}
            onClick={pay}
            className="flex-[1.6] py-3.5 rounded-full bg-mint text-black font-semibold disabled:opacity-75 press flex items-center justify-center gap-2 transition-all shadow-lg shadow-mint/20"
          >
            {busy ? (
              <>
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>Processing…</span>
              </>
            ) : (
              `Pay ${inr(payment.amount)}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
