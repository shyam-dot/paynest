import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../lib/PaymentContext.jsx'
import { inr, initials, fmtDate } from '../lib/upi.js'
import {
  Dots,
  SpeedometerIcon,
  MoneyBagIcon,
  CreditCardIcon,
  Chev,
  Close,
  GPayLandscape
} from '../components/Icons.jsx'

// Indian Overseas Bank SVG Logo
const IOBLogo = () => (
  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-sm shrink-0">
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <rect width="40" height="40" rx="8" fill="#005a9c" />
      <path d="M20 7 L28 15 L20 23 L12 15 Z" fill="#fff" />
      <path d="M20 18 L28 26 L20 34 L12 26 Z" fill="#fff" />
      <circle cx="20" cy="20.5" r="3" fill="#005a9c" />
    </svg>
  </div>
)

// Transaction Detail Sheet
export function TxDetail({ tx, onClose }) {
  if (!tx) return null

  const rows = [
    ['Status', 'Completed'],
    ['Paid to', tx.payeeName],
    ['UPI ID', tx.upiId],
    ['Amount', inr(tx.amount)],
    ['Note', tx.note || '—'],
    ['Date & Time', fmtDate(tx.timestamp)],
    ['UPI transaction ID', tx.transactionId || '427918492019'],
    ['Google transaction ID', tx.transactionReference || 'CICAgOCk_83dHQ']
  ]

  return (
    <div className="fixed inset-0 bg-black/75 max-w-[480px] mx-auto flex items-end z-50 animate-in fade-in duration-200" onClick={onClose}>
      <div className="sheet w-full bg-[#1e1f24] rounded-t-3xl p-5 safe-bottom border-t border-[#2c2e36]" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-[#3c4043] rounded-full mx-auto mb-4" />
        
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-white">Payment Details</p>
          <button onClick={onClose} className="p-1 rounded-full text-[#9aa0a6] hover:text-white press">
            <Close size={20} />
          </button>
        </div>

        {/* Amount & Payee Badge */}
        <div className="text-center py-4 border-b border-[#2c2e36]">
          <p className="text-3xl font-bold text-white tracking-tight">{inr(tx.amount)}</p>
          <p className="text-sm font-medium text-white/90 mt-1">{tx.payeeName}</p>
          <p className="text-xs text-[#9aa0a6] mt-0.5">{tx.upiId}</p>
          <div className="inline-flex items-center gap-1.5 bg-[#0e3a24] text-[#34a853] text-xs font-semibold px-3 py-1 rounded-full mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34a853]" />
            Paid securely via UPI
          </div>
        </div>

        <div className="mt-2 divide-y divide-[#2c2e36]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5 text-xs">
              <span className="text-[#9aa0a6] shrink-0">{k}</span>
              <span className={`text-right break-all font-medium ${k === 'Status' ? 'text-[#34a853]' : 'text-white'}`}>{v}</span>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="w-full mt-5 py-3 rounded-full bg-[#282a30] text-white text-sm font-semibold press hover:bg-[#32353d]">
          Close
        </button>
      </div>
    </div>
  )
}

export default function History() {
  const nav = useNavigate()
  const { transactions, balance, user } = useApp()
  const [sel, setSel] = useState(null)
  const [balanceModal, setBalanceModal] = useState(false)
  const [cibilModal, setCibilModal] = useState(false)
  const [checkingBal, setCheckingBal] = useState(false)

  const handleCheckBalance = () => {
    setCheckingBal(true)
    setTimeout(() => {
      setCheckingBal(false)
      setBalanceModal(true)
    }, 600)
  }

  return (
    <div className="page pb-28 min-h-full bg-[#111215] text-white relative">
      {/* Night Landscape Header */}
      <GPayLandscape />

      {/* Header Bar */}
      <header className="relative z-10 safe-top px-4 pt-3 flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Money</h1>
        <button className="p-2 text-[#9aa0a6] hover:text-white press" aria-label="Menu">
          <Dots size={22} />
        </button>
      </header>

      {/* Bank Account Card matching Screenshot 1 */}
      <section className="relative z-10 px-4 mt-6">
        <div className="bg-[#1e1f24] border border-[#2c2e36] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3.5 min-w-0">
            <IOBLogo />
            <div className="min-w-0">
              <p className="font-medium text-sm text-white truncate">
                {user.bankName || 'Indian Overseas Bank ••••1974'}
              </p>
              <p className="text-xs text-[#9aa0a6] mt-0.5">{user.accountType || 'Savings account'}</p>
            </div>
          </div>
          <button
            onClick={handleCheckBalance}
            className="text-xs font-semibold text-[#8ab4f8] hover:text-white px-2 py-1 press shrink-0 transition-colors"
          >
            {checkingBal ? 'Checking…' : 'Check balance'}
          </button>
        </div>
      </section>

      {/* CIBIL Score Card matching Screenshot 1 */}
      <section className="relative z-10 px-4 mt-3">
        <div className="bg-[#1e1f24] border border-[#2c2e36] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#282a30] flex items-center justify-center text-[#ea4335] shrink-0">
              <SpeedometerIcon size={22} />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm text-white">CIBIL score</p>
              <p className="text-xs text-[#9aa0a6] mt-0.5">Check for free, instantly</p>
            </div>
          </div>
          <button
            onClick={() => setCibilModal(true)}
            className="text-xs font-semibold text-[#8ab4f8] hover:text-white px-2 py-1 press shrink-0 transition-colors"
          >
            Check
          </button>
        </div>
      </section>

      {/* Credit for You Section matching Screenshot 1 */}
      <section className="relative z-10 px-4 mt-7">
        <h2 className="text-lg font-semibold tracking-tight text-white">Credit for you</h2>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {/* Card 1: Personal loan */}
          <div className="bg-[#1e1f24] border border-[#2c2e36] rounded-2xl p-4 flex flex-col justify-between h-40">
            <div>
              <div className="w-9 h-9 rounded-full bg-[#282a30] flex items-center justify-center mb-2.5">
                <MoneyBagIcon size={20} />
              </div>
              <p className="font-medium text-sm text-white">Personal loan</p>
              <p className="text-xs text-[#9aa0a6] mt-1 leading-snug">Up to ₹40 lakh, instant approval</p>
            </div>
            <button className="text-xs font-semibold text-[#8ab4f8] text-left press">
              Check details
            </button>
          </div>

          {/* Card 2: Flex by Google Pay */}
          <div className="bg-[#1e1f24] border border-[#2c2e36] rounded-2xl p-4 flex flex-col justify-between h-40">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="w-9 h-9 rounded-full bg-[#282a30] flex items-center justify-center">
                  <CreditCardIcon size={20} />
                </div>
                <span className="bg-[#8ab4f8]/20 text-[#8ab4f8] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  New
                </span>
              </div>
              <p className="font-medium text-sm text-white">Flex by Google Pay</p>
              <p className="text-xs text-[#9aa0a6] mt-1 leading-snug">UPI credit card made simple</p>
            </div>
            <button className="text-xs font-semibold text-[#8ab4f8] text-left press">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Transaction History Section matching Screenshot 1 */}
      <section className="relative z-10 px-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-white">Transaction history</h2>
          {transactions.length > 0 && (
            <span className="text-xs font-semibold text-[#8ab4f8] flex items-center gap-0.5 press">
              See all <Chev size={14} />
            </span>
          )}
        </div>

        {/* Clean realistic state with ZERO dummy transactions */}
        {transactions.length === 0 ? (
          <div className="bg-[#1e1f24] border border-[#2c2e36] rounded-2xl p-6 mt-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#282a30] text-[#9aa0a6] mx-auto flex items-center justify-center mb-2.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 14l2 2 4-4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-white">No transactions yet</p>
            <p className="text-xs text-[#9aa0a6] mt-1">
              Payments made in the app will appear here automatically.
            </p>
            <button
              onClick={() => nav('/pay')}
              className="mt-4 bg-[#0b57d0] text-white text-xs font-semibold px-4 py-2 rounded-full press"
            >
              Make a payment
            </button>
          </div>
        ) : (
          <div className="mt-3 divide-y divide-[#2c2e36] bg-[#1e1f24] border border-[#2c2e36] rounded-2xl overflow-hidden">
            {transactions.map((t) => (
              <button
                key={t.id || t.transactionId}
                onClick={() => setSel(t)}
                className="w-full p-3.5 flex items-center gap-3.5 text-left press hover:bg-[#25272e] transition-colors"
              >
                <span className="w-11 h-11 rounded-full bg-[#0b57d0] text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {initials(t.payeeName)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">{t.payeeName}</p>
                  <p className="text-xs text-[#9aa0a6] mt-0.5">{fmtDate(t.timestamp)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-sm text-white">{inr(t.amount)}</p>
                  <p className="text-[11px] text-[#34a853] font-medium">Completed</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Balance Modal */}
      {balanceModal && (
        <div className="fixed inset-0 bg-black/75 max-w-[480px] mx-auto flex items-end z-50 animate-in fade-in" onClick={() => setBalanceModal(false)}>
          <div className="sheet w-full bg-[#1e1f24] rounded-t-3xl p-6 safe-bottom border-t border-[#2c2e36]" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-[#3c4043] rounded-full mx-auto mb-4" />
            <div className="flex items-center gap-3 mb-4">
              <IOBLogo />
              <div>
                <p className="font-semibold text-sm text-white">{user.bankName}</p>
                <p className="text-xs text-[#9aa0a6]">{user.accountType}</p>
              </div>
            </div>
            <p className="text-xs text-[#9aa0a6]">Available balance</p>
            <p className="text-4xl font-bold text-white mt-1">{inr(balance)}</p>
            <p className="text-[11px] text-[#9aa0a6] mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34a853]" />
              Updated just now · Verified via UPI
            </p>
            <button
              onClick={() => setBalanceModal(false)}
              className="w-full mt-6 py-3 rounded-full bg-[#0b57d0] text-white font-semibold text-sm press"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* CIBIL Score Modal */}
      {cibilModal && (
        <div className="fixed inset-0 bg-black/75 max-w-[480px] mx-auto flex items-end z-50 animate-in fade-in" onClick={() => setCibilModal(false)}>
          <div className="sheet w-full bg-[#1e1f24] rounded-t-3xl p-6 safe-bottom border-t border-[#2c2e36]" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-[#3c4043] rounded-full mx-auto mb-4" />
            <p className="text-base font-semibold text-white">Your CIBIL Score</p>
            <div className="text-center py-6">
              <p className="text-5xl font-extrabold text-[#34a853]">782</p>
              <p className="text-sm font-semibold text-white mt-1">Excellent</p>
              <p className="text-xs text-[#9aa0a6] mt-1">Next refresh in 28 days</p>
            </div>
            <button
              onClick={() => setCibilModal(false)}
              className="w-full py-3 rounded-full bg-[#0b57d0] text-white font-semibold text-sm press"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {sel && <TxDetail tx={sel} onClose={() => setSel(null)} />}
    </div>
  )
}
