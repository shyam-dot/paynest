import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../lib/PaymentContext.jsx'
import { inr, ref, initials } from '../lib/upi.js'
import { Back } from '../components/Icons.jsx'

export default function Confirm() {
  const nav = useNavigate()
  const { payment, setReceipt, addTransaction, user } = useApp()
  const [step, setStep] = useState('confirm') // 'confirm' | 'pin' | 'transfer'
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [transferStatus, setTransferStatus] = useState('Authorizing with Bank…')
  const [err, setErr] = useState('')

  if (!payment || !payment.amount) return <Navigate to="/" replace />

  const payeeName = payment.payeeName || 'Payee'
  const upiId = payment.upiId || `${payeeName.toLowerCase().replace(/\s+/g, '')}@paynest`
  const senderName = user?.name || 'Shyam'

  // Handle keypad input for UPI PIN
  const handleDigit = (digit) => {
    if (pin.length < 4) {
      const nextPin = pin + digit
      setPin(nextPin)
      if (nextPin.length === 4) {
        // Automatically start payment after a slight realistic pause
        setTimeout(() => {
          startTransfer()
        }, 250)
      }
    }
  }

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1))
  }

  const handleConfirmPin = () => {
    if (pin.length === 4) {
      startTransfer()
    } else {
      setErr('Please enter your 4-digit UPI PIN')
    }
  }

  // Keyboard support for desktop testing
  useEffect(() => {
    if (step !== 'pin') return
    const onKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key)
      } else if (e.key === 'Backspace') {
        handleDelete()
      } else if (e.key === 'Enter') {
        handleConfirmPin()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [step, pin])

  // Starts the cash moving animation and finalizes transaction
  const startTransfer = () => {
    setStep('transfer')
    setTransferStatus('Connecting to NPCI / Bank…')

    setTimeout(() => {
      setTransferStatus(`Transferring ₹${Number(payment.amount).toLocaleString('en-IN')} to ${payeeName}…`)
    }, 750)

    setTimeout(() => {
      setTransferStatus('Payment Confirmed!')
    }, 1700)

    // Conclude transfer and transition to success screen
    setTimeout(() => {
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

      addTransaction(tx)
      setReceipt({ ...tx, timestamp: new Date() })
      nav('/success', { replace: true })
    }, 2300)
  }

  // 1. CASH TRANSFER ANIMATION SCREEN
  if (step === 'transfer') {
    return (
      <div className="fixed inset-0 bg-[#0d1612] max-w-[480px] mx-auto flex flex-col justify-between p-6 select-none z-50 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-mint/10 rounded-full blur-3xl pointer-events-none" />

        {/* Sender Info (Top) */}
        <div className="flex flex-col items-center mt-6 z-10">
          <div className="relative">
            <span className="w-18 h-18 rounded-full bg-card2 border-2 border-mint/40 text-mint text-xl font-bold flex items-center justify-center shadow-lg shadow-black/50">
              {initials(senderName)}
            </span>
            <span className="absolute -bottom-1 -right-1 bg-mint text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              YOU
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-white/90">{senderName}</p>
          <p className="text-[11px] text-mute">State Bank of India ·· 4819</p>
        </div>

        {/* Dynamic Cash Transfer Animation Zone (Middle) */}
        <div className="relative flex-1 flex flex-col items-center justify-center my-4 overflow-hidden">
          {/* Animated Connecting Pathway */}
          <div className="absolute top-2 bottom-2 w-0.5 bg-gradient-to-b from-mint/20 via-mint to-mint/20 opacity-40" />

          {/* Floating Indian Currency Cash Notes */}
          {/* Note 1 */}
          <div className="absolute top-6 animate-cash-1 pointer-events-none">
            <div className="w-40 h-20 rounded-lg bg-gradient-to-br from-[#1d6d45] to-[#12422b] border border-mint/60 p-2 shadow-xl shadow-mint/20 flex flex-col justify-between text-white/95">
              <div className="flex justify-between items-center text-[10px] font-mono text-mint">
                <span>RESERVE BANK</span>
                <span>₹{payment.amount}</span>
              </div>
              <div className="flex items-center justify-center gap-1 font-bold text-lg text-white tracking-wider">
                <span>₹</span>
                <span>{payment.amount}</span>
              </div>
              <div className="flex justify-between text-[8px] text-white/70 font-mono">
                <span>PN-2026</span>
                <span>PROMISE TO PAY</span>
              </div>
            </div>
          </div>

          {/* Note 2 (slightly delayed) */}
          <div className="absolute top-6 animate-cash-2 pointer-events-none">
            <div className="w-38 h-19 rounded-lg bg-gradient-to-br from-[#1b5e3c] to-[#0f3623] border border-mint/40 p-2 shadow-lg shadow-black/40 flex flex-col justify-between text-white/90">
              <div className="flex justify-between items-center text-[9px] font-mono text-mint">
                <span>PAYNEST CASH</span>
                <span>₹{payment.amount}</span>
              </div>
              <div className="flex items-center justify-center font-bold text-base text-mint tracking-wider">
                ₹{payment.amount}
              </div>
              <div className="text-right text-[8px] text-white/60 font-mono">GUARANTEED</div>
            </div>
          </div>

          {/* Note 3 */}
          <div className="absolute top-6 animate-cash-3 pointer-events-none">
            <div className="w-36 h-18 rounded-lg bg-gradient-to-br from-[#238053] to-[#14472f] border border-mint/50 p-2 shadow-md flex flex-col justify-between text-white/90">
              <div className="text-[8px] font-mono text-mint/80">AUTHENTIC TRANSFER</div>
              <div className="text-center font-bold text-sm text-white">₹{payment.amount}</div>
              <div className="text-[8px] text-right text-mute font-mono">100% SECURE</div>
            </div>
          </div>

          {/* Floating Gold Rupee Coins */}
          <div className="absolute top-8 left-1/3 animate-coin-1 pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-yellow-200 flex items-center justify-center text-amber-950 font-bold text-xs shadow-md">
              ₹
            </div>
          </div>
          <div className="absolute top-8 right-1/3 animate-coin-2 pointer-events-none">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border border-yellow-200 flex items-center justify-center text-amber-950 font-bold text-[11px] shadow-md">
              ₹
            </div>
          </div>

          {/* Floating Amount Badge */}
          <div className="z-10 bg-card/90 border border-mint/40 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-mint animate-ping" />
            <span className="font-semibold text-mint text-sm">Sending {inr(payment.amount)}</span>
          </div>
        </div>

        {/* Receiver Info (Bottom) */}
        <div className="flex flex-col items-center mb-6 z-10">
          <div className="relative">
            <span className="w-20 h-20 rounded-full bg-card border-2 border-mint text-mint text-2xl font-bold flex items-center justify-center shadow-xl animate-receiver-pulse">
              {initials(payeeName)}
            </span>
          </div>
          <p className="mt-2.5 text-base font-semibold text-white">{payeeName}</p>
          <p className="text-xs text-mute truncate max-w-[280px] text-center">{upiId}</p>

          {/* Dynamic Status Progress */}
          <div className="mt-4 flex items-center gap-2 bg-card2/80 px-4 py-2 rounded-full border border-line">
            <svg className="animate-spin h-4 w-4 text-mint shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span className="text-xs font-medium text-white/90">{transferStatus}</span>
          </div>
        </div>
      </div>
    )
  }

  // 2. AUTHENTIC UPI PIN ENTRY SCREEN
  if (step === 'pin') {
    return (
      <div className="fixed inset-0 bg-[#121212] max-w-[480px] mx-auto flex flex-col justify-between select-none z-40 page">
        {/* Top Bar: Bank details & UPI Logo */}
        <div className="safe-top px-4 pt-3 pb-3 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setPin('')
                setErr('')
                setStep('confirm')
              }}
              className="p-1 -ml-1 text-mute hover:text-white press"
              aria-label="Back"
            >
              <Back />
            </button>
            <div>
              <p className="text-xs font-bold tracking-wide text-white uppercase">State Bank of India</p>
              <p className="text-[11px] text-mute font-mono">A/C No: ·· 4819</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-card2 px-2.5 py-1 rounded-md border border-line">
            <span className="text-xs font-black tracking-widest text-mint">UPI</span>
          </div>
        </div>

        {/* Center: Payee Info, Amount & PIN Dots */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <p className="text-xs text-mute uppercase tracking-wider font-medium">Paying to</p>
          <p className="text-lg font-bold text-white mt-0.5 text-center">{payeeName}</p>
          <p className="text-3xl font-extrabold text-mint mt-2">{inr(payment.amount)}</p>

          <div className="w-full max-w-[280px] mt-8 bg-card border border-line rounded-2xl p-5 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-xs font-medium text-mute tracking-wide">ENTER 4-DIGIT UPI PIN</span>
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="text-xs text-mint font-medium hover:underline press"
              >
                {showPin ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            {/* 4 PIN Dots */}
            <div className="flex items-center justify-center gap-5 my-2">
              {[0, 1, 2, 3].map((index) => {
                const filled = pin.length > index
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-150 flex items-center justify-center ${
                      filled
                        ? 'bg-mint border-mint scale-110 shadow-sm shadow-mint/50'
                        : 'border-white/30 bg-transparent'
                    }`}
                  >
                    {filled && showPin && (
                      <span className="text-[10px] font-bold text-black">{pin[index]}</span>
                    )}
                  </div>
                )
              })}
            </div>

            <p className="text-[11px] text-mute/80 mt-4 text-center">
              Enter any 4-digit PIN (e.g. 1234)
            </p>
          </div>

          {err && <p className="text-xs text-red-400 mt-3 font-medium">{err}</p>}
        </div>

        {/* Bottom: Custom NPCI Numeric Keypad */}
        <div className="bg-[#181818] border-t border-line/80 px-6 py-4 safe-bottom">
          <div className="grid grid-cols-3 gap-y-3 gap-x-6 max-w-[320px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleDigit(digit)}
                className="h-14 rounded-2xl bg-card hover:bg-card2 text-xl font-bold text-white flex items-center justify-center press transition-colors shadow-sm"
              >
                {digit}
              </button>
            ))}
            {/* Backspace */}
            <button
              type="button"
              onClick={handleDelete}
              className="h-14 rounded-2xl bg-card hover:bg-card2 text-white flex items-center justify-center press transition-colors shadow-sm"
              aria-label="Delete"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                <line x1="18" y1="9" x2="12" y2="15"></line>
                <line x1="12" y1="9" x2="18" y2="15"></line>
              </svg>
            </button>
            {/* Zero */}
            <button
              type="button"
              onClick={() => handleDigit('0')}
              className="h-14 rounded-2xl bg-card hover:bg-card2 text-xl font-bold text-white flex items-center justify-center press transition-colors shadow-sm"
            >
              0
            </button>
            {/* Confirm checkmark button */}
            <button
              type="button"
              onClick={handleConfirmPin}
              className={`h-14 rounded-2xl flex items-center justify-center press transition-all shadow-md ${
                pin.length === 4
                  ? 'bg-mint text-black font-extrabold shadow-mint/30 scale-105'
                  : 'bg-card text-mute'
              }`}
              aria-label="Submit"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 3. INITIAL CONFIRMATION SHEET SCREEN (step === 'confirm')
  const rows = [
    ['Payee', payeeName],
    ['UPI ID', upiId],
    ['Amount', inr(payment.amount)],
    ['Debit From', 'SBI ·· 4819'],
    ['Note', payment.note || '—']
  ]

  return (
    <div className="fixed inset-0 bg-black/60 max-w-[480px] mx-auto flex items-end z-30">
      <div className="sheet w-full bg-card rounded-t-3xl p-5 safe-bottom animate-in fade-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 bg-line rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Confirm payment</p>
          <span className="text-xs bg-mint/10 text-mint font-semibold px-2.5 py-1 rounded-full">
            UPI Instant
          </span>
        </div>

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
          UPI PIN verification required to authorize debit
        </p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => nav(-1)}
            className="flex-1 py-3.5 rounded-full bg-card2 font-medium press transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setPin('')
              setErr('')
              setStep('pin')
            }}
            className="flex-[1.6] py-3.5 rounded-full bg-mint text-black font-semibold press flex items-center justify-center gap-2 transition-all shadow-lg shadow-mint/20"
          >
            Pay {inr(payment.amount)}
          </button>
        </div>
      </div>
    </div>
  )
}
