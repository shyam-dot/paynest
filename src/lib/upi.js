// Parses upi://pay?pa=...&pn=...&am=...&tn=...
export function parseUpi(text) {
  try {
    const t = String(text || '').trim()
    if (!/^upi:\/\/pay/i.test(t)) return null
    const q = new URLSearchParams(t.slice(t.indexOf('?') + 1))
    const pa = (q.get('pa') || '').trim()
    if (!/^[\w.\-]{2,}@[\w.\-]{2,}$/.test(pa)) return null
    const am = q.get('am') || ''
    return {
      upiId: pa,
      payeeName: (q.get('pn') || pa).trim(),
      amount: Number(am) > 0 ? am : '',
      note: (q.get('tn') || '').trim()
    }
  } catch { return null }
}
export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 })
export const ref = () => 'PN' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(2, 6).toUpperCase()
export const initials = (n) => (n || '?').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
export const fmtDate = (d) => d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })
