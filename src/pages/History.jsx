import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useApp } from '../lib/PaymentContext.jsx'
import { inr, initials, fmtDate } from '../lib/upi.js'

const toDate = (t) => (t?.toDate ? t.toDate() : t instanceof Date ? t : new Date())

export function TxDetail({ tx, onClose }) {
  const rows = [['Status', tx.status], ['Payee', tx.payeeName], ['UPI ID', tx.upiId], ['Amount', inr(tx.amount)],
    ['Note', tx.note || '—'], ['Date', fmtDate(toDate(tx.timestamp))], ['Reference', tx.transactionReference], ['Transaction ID', tx.transactionId]]
  return (
    <div className="fixed inset-0 bg-black/60 max-w-[480px] mx-auto flex items-end z-30" onClick={onClose}>
      <div className="sheet w-full bg-card rounded-t-3xl p-5 safe-bottom" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-line rounded-full mx-auto mb-4" />
        <p className="text-lg font-semibold">Transaction details</p>
        <div className="mt-3 divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
              <span className="text-mute shrink-0">{k}</span><span className={`text-right break-all ${k === 'Status' ? 'text-mint' : ''}`}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-3.5 rounded-full bg-card2 font-medium press">Close</button>
      </div>
    </div>
  )
}

export default function History() {
  const { user } = useApp()
  const [items, setItems] = useState(null)
  const [sel, setSel] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    if (!user) return
    // single-field filter avoids needing a composite index; sorted on the client
    const q = query(collection(db, 'transactions'), where('userId', '==', user.uid))
    return onSnapshot(q, (s) => {
      setItems(s.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => toDate(b.timestamp) - toDate(a.timestamp)))
    }, (e) => setErr(e.message))
  }, [user])

  return (
    <div className="page pb-28">
      <header className="safe-top px-4"><h1 className="text-xl font-semibold">Transaction history</h1></header>
      {err && <p className="px-4 mt-3 text-xs text-red-400">{err}</p>}
      {items && items.length === 0 && <p className="px-4 mt-10 text-center text-mute text-sm">No payments yet. Scan a UPI QR code to make your first demo payment.</p>}
      {!items && !err && <p className="px-4 mt-10 text-center text-mute text-sm">Loading…</p>}
      <div className="mt-4 px-4 space-y-2">
        {items?.map((t) => (
          <button key={t.id} onClick={() => setSel(t)} className="w-full bg-card rounded-2xl p-3 flex items-center gap-3 text-left press">
            <span className="w-11 h-11 rounded-full bg-card2 text-mint font-medium flex items-center justify-center shrink-0">{initials(t.payeeName)}</span>
            <span className="flex-1 min-w-0">
              <span className="block font-medium truncate">{t.payeeName}</span>
              <span className="block text-xs text-mute truncate">{t.upiId}</span>
              <span className="block text-[11px] text-mute">{fmtDate(toDate(t.timestamp))}</span>
            </span>
            <span className="text-right shrink-0">
              <span className="block font-semibold">{inr(t.amount)}</span>
              <span className="block text-[11px] text-mint">{t.status}</span>
            </span>
          </button>
        ))}
      </div>
      {sel && <TxDetail tx={sel} onClose={() => setSel(null)} />}
    </div>
  )
}
