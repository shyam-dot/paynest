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
  const [cameraActive, setCameraActive] = useState(false)

  const handle = (rawResult) => {
    if (done.current) return
    const text = typeof rawResult === 'object' && rawResult ? rawResult.data : rawResult
    if (!text || typeof text !== 'string') return

    const parsed = parseUpi(text)
    if (!parsed) {
      setErr('Could not read payment info from QR. Please try again.')
      return
    }

    done.current = true
    try {
      scanner.current?.stop()
    } catch {}

    setPayment(parsed)
    nav('/pay', { replace: true })
  }

  useEffect(() => {
    if (!video.current) return

    // Configure QrScanner with full-frame scanning and responsive detection
    const s = new QrScanner(
      video.current,
      (result) => handle(result),
      {
        preferredCamera: 'environment',
        maxScansPerSecond: 25,
        highlightScanRegion: false,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
        // Scan full camera field of view so QR codes anywhere in the frame are detected
        calculateScanRegion: (vid) => ({
          x: 0,
          y: 0,
          width: vid.videoWidth || 1280,
          height: vid.videoHeight || 720
        })
      }
    )

    scanner.current = s

    s.start()
      .then(() => setCameraActive(true))
      .catch((e) => {
        console.warn('Camera start error:', e)
        setCameraActive(false)
        setErr('Camera access is not available or blocked. You can upload a QR image from gallery or enter details manually.')
      })

    return () => {
      try {
        s.stop()
        s.destroy()
      } catch {}
    }
  }, [])

  const pick = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setErr('')
    try {
      const r = await QrScanner.scanImage(f, {
        returnDetailedScanResult: true,
        alsoTryWithoutScanRegion: true
      })
      handle(r)
    } catch {
      setErr('No QR code detected in that image. Try a clearer image or choose another file.')
    }
  }

  const toggleTorch = async () => {
    try {
      if (scanner.current) {
        await scanner.current.toggleFlash()
        setTorch(scanner.current.isFlashOn())
      }
    } catch {
      setErr('Flashlight is not available on this device.')
    }
  }

  // Quick simulated scan demo for quick testing
  const simulateScan = (sample) => {
    handle(sample)
  }

  return (
    <div className="fixed inset-0 bg-black max-w-[480px] mx-auto page overflow-hidden select-none">
      {/* Video Element */}
      <video
        ref={video}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />

      {/* Dimmed Background Overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Top Header */}
      <header className="absolute top-0 inset-x-0 safe-top px-4 py-3 flex items-center justify-between z-20">
        <button
          onClick={() => nav(-1)}
          className="p-2 -ml-2 rounded-full bg-black/40 text-white press backdrop-blur-md"
          aria-label="Back"
        >
          <Back />
        </button>
        <p className="font-semibold text-white text-base shadow-sm">Scan UPI QR Code</p>
        <div className="w-8" />
      </header>

      {/* Viewfinder Target Area */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[72%] max-w-[280px] aspect-square pointer-events-none z-10">
        {/* Dark cutout mask */}
        <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: '0 0 0 100vmax rgba(0,0,0,0.52)' }} />

        {/* Corner Accents */}
        <span className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-mint rounded-tl-2xl shadow-sm" />
        <span className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-mint rounded-tr-2xl shadow-sm" />
        <span className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-mint rounded-bl-2xl shadow-sm" />
        <span className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-mint rounded-br-2xl shadow-sm" />

        {/* Animated Laser Scanning Line */}
        <div className="scan-beam" />
      </div>

      <p className="absolute top-[57%] inset-x-0 text-center text-xs font-medium text-white/90 z-20 pointer-events-none">
        Align QR code within the frame to scan
      </p>

      {/* Controls: Flashlight & Gallery */}
      <div className="absolute inset-x-0 bottom-28 flex flex-col items-center gap-4 z-20 px-6">
        <div className="flex justify-center gap-10 text-xs">
          <button
            onClick={toggleTorch}
            className="flex flex-col items-center gap-2 press"
          >
            <span
              className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                torch ? 'bg-mint text-black' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Flash />
            </span>
            <span className="text-white/80 font-medium">Flashlight</span>
          </button>

          <button
            onClick={() => file.current?.click()}
            className="flex flex-col items-center gap-2 press"
          >
            <span className="w-14 h-14 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-colors">
              <Image />
            </span>
            <span className="text-white/80 font-medium">Upload QR</span>
          </button>
          <input
            ref={file}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={pick}
          />
        </div>

        {/* Quick Demo Shortcuts (Useful for desktop testing or camera fallback) */}
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          <button
            onClick={() => simulateScan('upi://pay?pa=starbucks@okaxis&pn=Starbucks%20Coffee&am=350&tn=Coffee')}
            className="text-[11px] bg-card/90 border border-line hover:border-mint/50 text-white/90 px-3 py-1.5 rounded-full backdrop-blur-md press"
          >
            ⚡ Test: Starbucks ₹350
          </button>
          <button
            onClick={() => simulateScan('upi://pay?pa=supermart@okicici&pn=Fresh%20Supermarket&am=850&tn=Groceries')}
            className="text-[11px] bg-card/90 border border-line hover:border-mint/50 text-white/90 px-3 py-1.5 rounded-full backdrop-blur-md press"
          >
            ⚡ Test: Supermarket ₹850
          </button>
        </div>
      </div>

      {/* Error or Fallback Message */}
      {err && (
        <div className="absolute inset-x-6 top-20 z-30 bg-card/95 border border-red-500/40 rounded-2xl p-3.5 shadow-xl text-center backdrop-blur-md">
          <p className="text-xs text-red-300 font-medium">{err}</p>
          <button
            onClick={() => nav('/pay')}
            className="mt-2.5 text-xs bg-mint text-black font-semibold px-4 py-1.5 rounded-full press"
          >
            Enter UPI ID manually »
          </button>
        </div>
      )}

      {/* Footer */}
        <footer className="absolute bottom-4 inset-x-0 text-center text-[11px] text-white/60 safe-bottom z-20">
          Align QR code in the frame to pay instantly
        </footer>
    </div>
  )
}
