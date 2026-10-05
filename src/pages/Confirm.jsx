import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../lib/PaymentContext.jsx'
import { inr, ref } from '../lib/upi.js'

// IOB Small Logo
const IOBBadge = () => (
  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-sm">
    <svg viewBox="0 0 40 40" className="w-6 h-6">
      <rect width="40" height="40" rx="8" fill="#005a9c" />
      <path d="M20 7 L28 15 L20 23 L12 15 Z" fill="#fff" />
      <path d="M20 18 L28 26 L20 34 L12 26 Z" fill="#fff" />
      <circle cx="20" cy="20.5" r="3" fill="#005a9c" />
    </svg>
  </div>
)

export default function Confirm() {
  const nav = useNavigate()
  const { payment, setReceipt, addTransaction, user } = useApp()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  if (!payment || !payment.amount) return <Navigate to="/" replace />

  const payeeName = payment.payeeName || 'Payee'
  const upiId = payment.upiId || `${payeeName.toLowerCase().replace(/\s+/g, '')}@paynest`
  const rows = [
    ['Paying', payeeName],
    ['UPI ID', upiId],
    ['Note', payment.note || 'None']
  ]

  const pay = async () => {
    setBusy(true)
    setErr('')

    // Realistic processing delay (connecting to bank UPI switch)
    await new Promise((r) => setTimeout(r, 1300))

    const tx = {
      id: crypto.randomUUID(),
      transactionId: 'TXN-' + Math.floor(1000000000 + Math.random() * 9000000000),
      upiId: upiId,
      payeeName: payeeName,
      amount: Number(payment.amount),
      note: payment.note || '',
      status: 'Completed',
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
    <div className="fixed inset-0 bg-black/75 max-w-[480px] mx-auto flex items-end z-40 animate-in fade-in duration-200">
      <div className="sheet w-full bg-[#1e1f24] rounded-t-3xl p-5 safe-bottom border-t border-[#2c2e36] animate-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 bg-[#3c4043] rounded-full mx-auto mb-4" />
        
        <p className="text-sm font-medium text-[#9aa0a6]">Paying to</p>
        <p className="text-xl font-bold text-white mt-0.5">{payeeName}</p>
        <p className="text-xs text-[#9aa0a6] mt-0.5 break-all">{upiId}</p>

        {/* Big Amount Display */}
        <div className="mt-5 py-4 border-y border-[#2c2e36] flex items-baseline justify-between">
          <span className="text-sm text-[#9aa0a6]">Amount</span>
          <span className="text-3xl font-bold text-white tracking-tight">{inr(payment.amount)}</span>
        </div>

        {/* Payment Account selector */}
        <div className="mt-4 bg-[#282a30] border border-[#2c2e36] rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IOBBadge />
            <div>
              <p className="text-xs font-semibold text-white">{user.bankName || 'Indian Overseas Bank ••••1974'}</p>
              <p className="text-[10px] text-[#9aa0a6]">Primary payment method</p>
            </div>
          </div>
          <span className="text-[11px] text-[#8ab4f8] font-semibold">Change</span>
        </div>

        {/* Note if any */}
        {payment.note && (
          <div className="mt-3 flex justify-between text-xs py-1">
            <span className="text-[#9aa0a6]">Note</span>
            <span className="text-white font-medium">{payment.note}</span>
          </div>
        )}

        <p className="text-[11px] text-[#9aa0a6] mt-4 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
          UPI 100% secure · instant bank transfer
        </p>

        {err && <p className="text-xs text-red-400 mt-2">{err}</p>}

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            disabled={busy}
            onClick={() => nav(-1)}
            className="flex-1 py-3.5 rounded-full bg-[#282a30] text-white font-medium text-sm disabled:opacity-40 press hover:bg-[#32353d]"
          >
            Edit
          </button>

          <button
            disabled={busy}
            onClick={pay}
            className="flex-[1.8] py-3.5 rounded-full bg-[#0b57d0] hover:bg-[#1565c0] text-white font-bold text-sm disabled:opacity-75 press flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/50"
          >
            {busy ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>Processing payment…</span>
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
