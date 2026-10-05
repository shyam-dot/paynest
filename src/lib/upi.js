// Parses upi://pay?pa=...&pn=...&am=...&tn=... as well as plain UPI IDs, phone numbers, or any QR
export function parseUpi(text) {
  try {
    const raw = String(text || '').trim()
    if (!raw) return null

    // 1. Standard UPI intent format (upi://pay?pa=... or UPI://PAY/...)
    if (/^upi:\/\/pay/i.test(raw)) {
      const queryIdx = raw.indexOf('?')
      const q = new URLSearchParams(queryIdx !== -1 ? raw.slice(queryIdx + 1) : '')
      const pa = (q.get('pa') || '').trim()
      const pn = (q.get('pn') || pa || 'Merchant').trim()
      const am = (q.get('am') || '').trim()
      const tn = (q.get('tn') || '').trim()
      return {
        upiId: pa || `${pn.toLowerCase().replace(/[^a-z0-9]/g, '') || 'payee'}@paynest`,
        payeeName: decodeURIComponent(pn.replace(/\+/g, ' ')),
        amount: Number(am) > 0 ? String(Number(am)) : '',
        note: decodeURIComponent(tn.replace(/\+/g, ' '))
      }
    }

    // 2. HTTP/HTTPS URL containing UPI params (e.g. BharatPe, Paytm, or web payment links)
    if (/^https?:\/\//i.test(raw)) {
      try {
        const url = new URL(raw)
        const pa = url.searchParams.get('pa')
        if (pa) {
          const pn = url.searchParams.get('pn') || pa
          const am = url.searchParams.get('am') || ''
          const tn = url.searchParams.get('tn') || ''
          return {
            upiId: pa.trim(),
            payeeName: decodeURIComponent(pn.trim()),
            amount: Number(am) > 0 ? String(Number(am)) : '',
            note: decodeURIComponent(tn.trim())
          }
        }
      } catch {
        // continue to next matcher
      }
    }

    // 3. Direct UPI ID match (e.g. john@okaxis, 9876543210@paytm, user@ibl)
    const upiMatch = raw.match(/([a-zA-Z0-9.\-_]{2,}@[a-zA-Z0-9.\-_]{2,})/)
    if (upiMatch) {
      return {
        upiId: upiMatch[1],
        payeeName: upiMatch[1].split('@')[0],
        amount: '',
        note: ''
      }
    }

    // 4. 10-digit mobile number
    const phoneMatch = raw.match(/\b([6-9]\d{9})\b/)
    if (phoneMatch) {
      return {
        upiId: `${phoneMatch[1]}@paynest`,
        payeeName: `Mobile (${phoneMatch[1]})`,
        amount: '',
        note: ''
      }
    }

    // 5. Any other text QR code (fallback so detection NEVER fails with an error)
    const clean = raw.replace(/[^\w\s.-]/g, '').trim().slice(0, 30) || 'Scanned QR'
    return {
      upiId: `${clean.toLowerCase().replace(/[^a-z0-9]/g, '') || 'merchant'}@paynest`,
      payeeName: clean,
      amount: '',
      note: 'Scanned from QR'
    }
  } catch {
    return {
      upiId: 'merchant@paynest',
      payeeName: 'Scanned QR Payee',
      amount: '',
      note: ''
    }
  }
}

export const inr = (n) => '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })
export const ref = () => 'PN' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(2, 6).toUpperCase()
export const initials = (n) => (n || '?').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
export const fmtDate = (d) => {
  const dateObj = d instanceof Date ? d : new Date(d)
  return isNaN(dateObj.getTime())
    ? 'Just now'
    : dateObj.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}
