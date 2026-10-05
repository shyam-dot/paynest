import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Close } from '../components/Icons.jsx'
import { useApp } from '../lib/PaymentContext.jsx'
import { inr, fmtDate } from '../lib/upi.js'
import { TxDetail } from './History.jsx'

const cats = ['People', 'Food & drinks', 'Shopping', 'Bills', 'Others']

export default function Success() {
  const nav = useNavigate()
  const { receipt, setPayment } = useApp()
  const [cat, setCat] = useState('People')
  const [detail, setDetail] = useState(false)
  if (!receipt) return <Navigate to="/" replace />
  const done = () => { setPayment(null); nav('/', { replace: true }) }

  return (
    <div className="page min-h-full bg-bg flex flex-col">
      <div className="bg-ok safe-top px-4 pb-6">
        <button onClick={done} className="p-2 -ml-2 press"><Close /></button>
        <div className="text-center mt-2">
          <p className="text-xl font-medium">Payment successful</p>
          <p className="text-sm text-white/80 mt-1">{fmtDate(receipt.timestamp)}</p>
        </div>
        <div className="bg-white text-black rounded-2xl mt-5 p-5 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-semibold">{inr(receipt.amount)}</span>
            <svg className="pop" width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="15" fill="#1b7f3a" /><path className="tick" d="M8 15.5l4.5 4.5L22 10.5" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="flex justify-center gap-3 mt-4">
            <button className="border border-black rounded-lg px-4 py-2 text-sm font-medium press">Split payment</button>
            <button onClick={() => setDetail(true)} className="border border-black rounded-lg px-4 py-2 text-sm font-medium press">View details</button>
          </div>
          <hr className="my-4 border-neutral-200" />
          <p className="font-semibold text-lg">{receipt.payeeName}</p>
          <p className="text-sm text-neutral-500 break-all">{receipt.upiId}</p>
        </div>
      </div>

      <div className="p-4 flex-1">
        <div className="bg-card rounded-2xl p-4">
          <p className="text-sm">What was this payment for?</p>
          <div className="flex gap-2 overflow-x-auto mt-3 [scrollbar-width:none]">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full px-4 py-2 text-sm border press ${cat === c ? 'border-mint text-mint bg-mint/10' : 'border-line text-white/80'}`}>{c}</button>
            ))}
          </div>
        </div>

      </div>

      <div className="px-4 pb-4 safe-bottom">
        <button onClick={done} className="w-full py-3.5 rounded-full bg-card2 font-semibold press">Done</button>
      </div>
      {detail && <TxDetail tx={receipt} onClose={() => setDetail(false)} />}
    </div>
  )
}
