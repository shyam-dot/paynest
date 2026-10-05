import { useState, useEffect, useRef } from 'react'
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

  // Trigger phone vibration pattern
  const vibrate = (pattern) => {
    try { navigator.vibrate?.(pattern) } catch {}
  }

  // Starts the Navi-style animation and finalizes transaction
  const startTransfer = () => {
    setStep('transfer')
    vibrate([30, 40, 30])
    setTransferStatus('Authorizing…')

    setTimeout(() => {
      setTransferStatus('Processing…')
    }, 700)

    setTimeout(() => {
      setTransferStatus('Confirmed!')
      vibrate([0, 50, 40, 80])
    }, 1600)

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
    }, 2200)
  }

  // 1. NAVI-STYLE TRANSFER ANIMATION SCREEN
  if (step === 'transfer') {
    const isConfirmed = transferStatus === 'Confirmed!'
    return (
      <div className="fixed inset-0 bg-[#090f0c] max-w-[480px] mx-auto flex flex-col items-center justify-center select-none z-50 overflow-hidden">

        {/* Navi-style pulsing ring stack */}
        <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
          {/* Outermost ripple ring */}
          <div
            className="absolute rounded-full border border-mint/10"
            style={{
              width: 260, height: 260,
              animation: 'naviRipple 1.8s ease-out infinite'
            }}
          />
          {/* Middle ripple */}
          <div
            className="absolute rounded-full border border-mint/20"
            style={{
              width: 200, height: 200,
              animation: 'naviRipple 1.8s ease-out infinite 0.3s'
            }}
          />
          {/* Inner ripple */}
          <div
            className="absolute rounded-full border border-mint/40"
            style={{
              width: 148, height: 148,
              animation: 'naviRipple 1.8s ease-out infinite 0.6s'
            }}
          />
          {/* Spinning arc ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 110, height: 110,
              border: '2.5px solid transparent',
              borderTopColor: '#2ae083',
              borderRightColor: '#2ae083',
              animation: isConfirmed ? 'none' : 'spin 0.85s linear infinite'
            }}
          />
          {/* Core circle */}
          <div
            className="relative rounded-full flex flex-col items-center justify-center"
            style={{
              width: 92, height: 92,
              background: isConfirmed
                ? 'radial-gradient(circle, #2ae08330, #2ae08310)'
                : 'radial-gradient(circle, #12231a, #0d1a13)',
              border: isConfirmed ? '2px solid #2ae083' : '2px solid #2ae08360',
              transition: 'all 0.4s ease'
            }}
          >
            {isConfirmed ? (
              /* Tick icon when confirmed */
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" className="pop">
                <circle cx="19" cy="19" r="19" fill="#2ae08318" />
                <path
                  d="M10 20l6 6L28 12"
                  stroke="#2ae083"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="tick"
                  style={{ strokeDasharray: 36, strokeDashoffset: 36 }}
                />
              </svg>
            ) : (
              /* Rupee symbol during processing */
              <span style={{ fontSize: 30, fontWeight: 800, color: '#2ae083', lineHeight: 1 }}>₹</span>
            )}
          </div>
        </div>

        {/* Amount */}
        <p className="mt-8 text-3xl font-bold text-white tracking-tight">{inr(payment.amount)}</p>

        {/* Payee */}
        <p className="mt-1.5 text-base font-semibold text-white/90">{payeeName}</p>
        <p className="text-xs text-mute mt-0.5">{upiId}</p>

        {/* Status label */}
        <p
          className="mt-6 text-sm font-semibold tracking-wide transition-all duration-300"
          style={{ color: isConfirmed ? '#2ae083' : '#ffffff90' }}
        >
          {transferStatus}
        </p>

        {/* Progress track (3 dots) */}
        <div className="flex gap-2 mt-3">
          {['Authorizing…', 'Processing…', 'Confirmed!'].map((s, i) => (
            <div
              key={s}
              className="rounded-full transition-all duration-300"
              style={{
                width: transferStatus === s ? 18 : 8,
                height: 8,
                background: transferStatus === s || ['Authorizing…', 'Processing…', 'Confirmed!'].indexOf(transferStatus) > i
                  ? '#2ae083'
                  : '#2ae08330'
              }}
            />
          ))}
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
