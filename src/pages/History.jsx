import { useState } from 'react'
import { useApp } from '../lib/PaymentContext.jsx'
import { inr, initials, fmtDate } from '../lib/upi.js'

const toDate = (t) => {
  if (!t) return new Date()
  if (t?.toDate) return t.toDate()
  if (t instanceof Date) return t
  const parsed = new Date(t)
  return isNaN(parsed.getTime()) ? new Date() : parsed
}

export function TxDetail({ tx, onClose }) {
  if (!tx) return null
  const rows = [
    ['Status', tx.status || 'SUCCESS'],
    ['Payee', tx.payeeName],
    ['UPI ID', tx.upiId],
    ['Amount', inr(tx.amount)],
    ['Note', tx.note || '—'],
    ['Date', fmtDate(toDate(tx.timestamp))],
    ['Reference ID', tx.transactionReference || 'PN' + Math.random().toString(36).slice(2, 8).toUpperCase()],
    ['Transaction ID', tx.transactionId || 'TXN-' + Math.floor(1000000000 + Math.random() * 9000000000)]
  ]

  return (
    <div className="fixed inset-0 bg-black/60 max-w-[480px] mx-auto flex items-end z-40" onClick={onClose}>
      <div className="sheet w-full bg-card rounded-t-3xl p-5 safe-bottom animate-in fade-in slide-in-from-bottom duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-line rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Transaction Details</p>
          <span className="text-xs bg-mint/10 text-mint font-semibold px-2.5 py-1 rounded-full">Completed</span>
        </div>

        <div className="mt-4 divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
              <span className="text-mute shrink-0">{k}</span>
              <span className={`text-right break-all font-medium ${k === 'Status' ? 'text-mint' : ''}`}>{v}</span>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="w-full mt-5 py-3.5 rounded-full bg-card2 font-semibold press">
          Close
        </button>
      </div>
    </div>
  )
}

export default function History() {
  const { transactions } = useApp()
  const [sel, setSel] = useState(null)

  const sorted = [...(transactions || [])].sort((a, b) => toDate(b.timestamp) - toDate(a.timestamp))

  return (
    <div className="page pb-28">
      <header className="safe-top px-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Transaction history</h1>
        <span className="text-xs text-mute">{sorted.length} transactions</span>
      </header>

      {sorted.length === 0 ? (
        <div className="px-4 mt-16 text-center">
          <div className="w-16 h-16 rounded-full bg-card mx-auto flex items-center justify-center text-mute mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
          <p className="font-medium text-white/90">No payments yet</p>
          <p className="text-mute text-xs mt-1">Make a demo payment to see it appear here instantly.</p>
        </div>
      ) : (
        <div className="mt-4 px-4 space-y-2.5">
          {sorted.map((t) => (
            <button
              key={t.id || t.transactionId}
              onClick={() => setSel(t)}
              className="w-full bg-card hover:bg-card2/80 transition-colors border border-line/60 rounded-2xl p-3.5 flex items-center gap-3.5 text-left press shadow-sm"
            >
              <span className="w-11 h-11 rounded-full bg-card2 text-mint font-semibold flex items-center justify-center shrink-0">
                {initials(t.payeeName)}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-medium truncate text-sm">{t.payeeName}</span>
                <span className="block text-xs text-mute truncate">{t.upiId}</span>
                <span className="block text-[11px] text-mute/80 mt-0.5">{fmtDate(toDate(t.timestamp))}</span>
              </span>
              <span className="text-right shrink-0">
                <span className="block font-semibold text-sm">{inr(t.amount)}</span>
                <span className="block text-[11px] text-mint font-medium">{t.status || 'SUCCESS'}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {sel && <TxDetail tx={sel} onClose={() => setSel(null)} />}
    </div>
  )
}
