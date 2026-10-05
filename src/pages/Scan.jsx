import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QrScanner from 'qr-scanner'
import { Back, Flash, Image } from '../components/Icons.jsx'
import { parseUpi } from '../lib/upi.js'
import { useApp } from '../lib/PaymentContext.jsx'

export default function Scan() {
  const video = useRef(null)
  const scanner = useRef(null)
  const done = useRef(false)
  const file = useRef(null)
  const nav = useNavigate()
  const { setPayment } = useApp()
  const [err, setErr] = useState('')
  const [torch, setTorch] = useState(false)

  const handle = (text) => {
    if (done.current) return
    const p = parseUpi(text)
    if (!p) { setErr('This is not a UPI payment QR. Try another one.'); return }
    done.current = true
    scanner.current?.stop()
    setPayment(p)
    nav('/pay', { replace: true })
  }

  useEffect(() => {
    const s = new QrScanner(video.current, (r) => handle(r.data), {
      preferredCamera: 'environment', highlightScanRegion: false, highlightCodeOutline: false, maxScansPerSecond: 12
    })
    scanner.current = s
    s.start().catch(() => setErr('Camera blocked. Allow camera access, or pick a QR from your gallery.'))
    return () => { s.stop(); s.destroy() }
    // eslint-disable-next-line
  }, [])

  const pick = async (e) => {
    const f = e.target.files?.[0]; if (!f) return
    try { const r = await QrScanner.scanImage(f, { returnDetailedScanResult: true }); handle(r.data) }
    catch { setErr('No QR code found in that image.') }
  }
  const toggleTorch = async () => {
    try { await scanner.current.toggleFlash(); setTorch(scanner.current.isFlashOn()) } catch { setErr('Torch is not available on this device.') }
  }

  return (
    <div className="fixed inset-0 bg-black max-w-[480px] mx-auto page">
      <video ref={video} className="absolute inset-0 w-full h-full object-cover" playsInline muted />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute top-0 inset-x-0 safe-top px-4 flex items-center gap-3 z-10">
        <button onClick={() => nav(-1)} className="p-2 -ml-2 press"><Back /></button>
        <p className="flex-1 text-center pr-6 font-medium">Scan any QR code</p>
      </div>
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square">
        <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: '0 0 0 100vmax rgba(0,0,0,.55)' }} />
        {['top-0 left-0 border-t-4 border-l-4 rounded-tl-3xl', 'top-0 right-0 border-t-4 border-r-4 rounded-tr-3xl',
          'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-3xl', 'bottom-0 right-0 border-b-4 border-r-4 rounded-br-3xl'].map((c) => (
          <span key={c} className={`absolute w-12 h-12 border-white ${c}`} />
        ))}
      </div>
      <div className="absolute inset-x-0 top-[66%] flex justify-center gap-10 z-10 text-xs">
        <button onClick={toggleTorch} className="flex flex-col items-center gap-2 press">
          <span className={`w-14 h-14 rounded-full flex items-center justify-center ${torch ? 'bg-mint text-black' : 'bg-white/20'}`}><Flash /></span>Torch
        </button>
        <button onClick={() => file.current.click()} className="flex flex-col items-center gap-2 press">
          <span className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center"><Image /></span>Gallery
        </button>
        <input ref={file} type="file" accept="image/*" className="hidden" onChange={pick} />
      </div>
      {err && <p className="absolute inset-x-6 bottom-24 z-10 bg-card rounded-xl px-4 py-3 text-sm text-center">{err}</p>}
      <p className="absolute bottom-6 inset-x-0 text-center text-[11px] text-white/60 safe-bottom">Demo mode · no real money moves</p>
    </div>
  )
}
