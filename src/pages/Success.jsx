import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Close } from '../components/Icons.jsx'
import { useApp } from '../lib/PaymentContext.jsx'
import { inr, fmtDate } from '../lib/upi.js'
import { TxDetail } from './History.jsx'

export default function Success() {
  const nav = useNavigate()
  const { receipt, setPayment, user } = useApp()
  const [detail, setDetail] = useState(false)

  if (!receipt) return <Navigate to="/" replace />

  const done = () => {
    setPayment(null)
    nav('/money', { replace: true })
  }

  return (
    <div className="page min-h-full bg-[#111215] flex flex-col justify-between text-white">
      <div>
        {/* Google Pay Green Top Banner */}
        <div className="bg-[#137333] safe-top px-4 pt-3 pb-8 text-center relative shadow-lg">
          <button
            onClick={done}
            className="absolute top-4 left-4 p-2 text-white/90 hover:text-white press rounded-full bg-black/20"
            aria-label="Close"
          >
            <Close size={20} />
          </button>

          {/* Animated Pop-in Checkmark */}
          <div className="w-16 h-16 rounded-full bg-white mx-auto mt-4 flex items-center justify-center shadow-xl pop">
            <svg width="34" height="34" viewBox="0 0 30 30">
              <circle cx="15" cy="15" r="15" fill="#137333" />
              <path
                className="tick"
                d="M8 15.5l4.5 4.5L22 10.5"
                stroke="#fff"
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-2xl font-bold text-white mt-4">{inr(receipt.amount)}</p>
          <p className="text-sm font-medium text-white/95 mt-1">Paid to {receipt.payeeName}</p>
          <p className="text-xs text-white/80 mt-0.5">{fmtDate(receipt.timestamp)}</p>
        </div>

        {/* Receipt Card Details */}
        <div className="px-4 -mt-4">
          <div className="bg-[#1e1f24] border border-[#2c2e36] rounded-2xl p-5 shadow-xl space-y-3.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#9aa0a6]">To</span>
              <span className="font-semibold text-white text-right">{receipt.payeeName}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-[#9aa0a6]">UPI ID</span>
              <span className="text-white/90 text-right break-all">{receipt.upiId}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-[#9aa0a6]">From</span>
              <span className="text-white text-right">{user.bankName || 'Indian Overseas Bank ••••1974'}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-[#9aa0a6]">UPI Transaction ID</span>
              <span className="text-white font-mono text-right">{receipt.transactionId}</span>
            </div>

            <div className="pt-2 border-t border-[#2c2e36] flex gap-2">
              <button
                onClick={() => setDetail(true)}
                className="flex-1 py-2 text-xs font-semibold text-[#8ab4f8] hover:text-white border border-[#2c2e36] rounded-full press transition-colors"
              >
                View full receipt
              </button>
              <button
                onClick={() => nav('/money')}
                className="flex-1 py-2 text-xs font-semibold text-[#8ab4f8] hover:text-white border border-[#2c2e36] rounded-full press transition-colors"
              >
                Check balance
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Done Button */}
      <div className="p-4 safe-bottom">
        <button
          onClick={done}
          className="w-full py-4 rounded-full bg-[#0b57d0] hover:bg-[#1565c0] text-white font-bold text-sm press transition-all shadow-lg shadow-black/50"
        >
          Done
        </button>
      </div>

      {/* Detailed Modal if clicked */}
      {detail && <TxDetail tx={receipt} onClose={() => setDetail(false)} />}
    </div>
  )
}
