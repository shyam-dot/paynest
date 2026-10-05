import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useApp } from '../lib/PaymentContext.jsx'
import { inr, ref } from '../lib/upi.js'

export default function Confirm() {
  const nav = useNavigate()
  const { payment, user, setReceipt } = useApp()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  if (!payment || !payment.upiId || !payment.amount) return <Navigate to="/" replace />

  const rows = [['Payee', payment.payeeName], ['UPI ID', payment.upiId], ['Amount', inr(payment.amount)], ['Note', payment.note || '—']]

  const pay = async () => {
    if (!user) { setErr('Still signing in. Try again in a moment.'); return }
    setBusy(true); setErr('')
    await new Promise((r) => setTimeout(r, 1200)) // simulated processing
    const tx = {
      transactionId: crypto.randomUUID(),
      upiId: payment.upiId,
      payeeName: payment.payeeName,
      amount: Number(payment.amount),
      note: payment.note,
      status: 'SUCCESS',
      transactionReference: ref(),
      userId: user.uid
    }
    try {
      await addDoc(collection(db, 'transactions'), { ...tx, timestamp: serverTimestamp() })
      setReceipt({ ...tx, timestamp: new Date() })
      nav('/success', { replace: true })
    } catch (e) { setErr('Could not save transaction: ' + e.message); setBusy(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/60 max-w-[480px] mx-auto flex items-end">
      <div className="sheet w-full bg-card rounded-t-3xl p-5 safe-bottom">
        <div className="w-10 h-1 bg-line rounded-full mx-auto mb-4" />
        <p className="text-lg font-semibold">Confirm payment</p>
        <p className="text-4xl font-semibold mt-3">{inr(payment.amount)}</p>
        <div className="mt-4 divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3 text-sm">
              <span className="text-mute">{k}</span><span className="text-right break-all">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-mute mt-2">Demo mode · no real money moves</p>
        {err && <p className="text-xs text-red-400 mt-2">{err}</p>}
        <div className="flex gap-3 mt-4">
          <button disabled={busy} onClick={() => nav(-1)} className="flex-1 py-3.5 rounded-full bg-card2 font-medium disabled:opacity-40 press">Edit</button>
          <button disabled={busy} onClick={pay} className="flex-[1.6] py-3.5 rounded-full bg-mint text-black font-semibold disabled:opacity-60 press">
            {busy ? 'Paying…' : `Pay ${inr(payment.amount)}`}
          </button>
        </div>
      </div>
    </div>
  )
}
