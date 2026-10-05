import { useNavigate } from 'react-router-dom'
import { Search, User, Book, Bank, Swap, Wallet, Scan, Copy, Bolt, Chev } from '../components/Icons.jsx'
import { initials } from '../lib/upi.js'
import { useApp } from '../lib/PaymentContext.jsx'

const actions = [
  { label: 'Pay mobile number', Icon: Book, to: '/pay' },
  { label: 'Pay to UPI ID or bank', Icon: Bank, to: '/pay' },
  { label: 'Self transfer', Icon: Swap, to: '/pay' },
  { label: 'Check balance', Icon: Wallet, to: '/money' }
]
const contacts = ['Arun K', 'Meena R', 'Karthik S', 'Divya P', 'Rahul M']
const cards = [
  { t: 'Check score', s: 'See your credit score for free' },
  { t: 'Mobile recharge', s: 'Plans from all operators' },
  { t: 'Insurance', s: 'Cover starting at ₹1/day' }
]

export default function Home() {
  const nav = useNavigate()
  const { setPayment } = useApp()
  const toContact = (name) => { setPayment({ upiId: '', payeeName: name, amount: '', note: '' }); nav('/pay') }

  return (
    <div className="page pb-28">
      <header className="safe-top px-4 flex items-center gap-3">
        <button onClick={() => nav('/pay')} className="flex-1 flex items-center gap-3 bg-card rounded-full px-4 py-3 text-mute text-sm text-left press">
          <Search size={18} /> Pay by name or phone number
        </button>
        <button onClick={() => nav('/you')} className="w-11 h-11 rounded-full bg-card2 flex items-center justify-center press"><User size={22} /></button>
      </header>

      <section className="mx-4 mt-5 rounded-3xl p-5 bg-gradient-to-br from-[#1d4f3a] via-[#173a2c] to-card overflow-hidden relative">
        <div className="w-14 h-14 rounded-2xl bg-mint/20 text-mint flex items-center justify-center mb-3"><Bolt size={30} /></div>
        <p className="text-[11px] tracking-wide text-mint/80">Recharge and win</p>
        <p className="text-2xl font-semibold mt-1">Flat 1,600 coins</p>
        <p className="text-xs text-mute mt-1">Limited time offer</p>
        <button className="mt-4 bg-white text-black text-sm font-medium rounded-xl px-4 py-2.5 press">Recharge now »</button>
      </section>

      <section className="px-4 mt-6 grid grid-cols-4 gap-2">
        {actions.map(({ label, Icon, to }) => (
          <button key={label} onClick={() => nav(to)} className="flex flex-col items-center gap-2 press">
            <span className="w-16 h-16 rounded-full bg-card flex items-center justify-center text-mint"><Icon size={26} /></span>
            <span className="text-[11px] text-center leading-tight text-white/90">{label}</span>
          </button>
        ))}
      </section>

      <section className="px-4 mt-5 flex gap-3">
        <div className="flex-1 border border-line rounded-xl px-3 py-2.5">
          <p className="text-[10px] text-mute">Pay super-fast</p>
          <p className="text-sm font-medium flex items-center">Try Lite <Chev size={16} /></p>
        </div>
        <button onClick={() => nav('/scan')} className="flex-[1.3] bg-plum rounded-xl flex items-center justify-center gap-2 font-medium press">
          <Scan size={24} className="text-mint" /> Scan &amp; pay
        </button>
      </section>

      <section className="mx-4 mt-3 bg-card rounded-xl flex text-sm overflow-hidden">
        <button onClick={() => nav('/you')} className="flex items-center gap-2 px-3 py-3 border-r border-line text-mint press"><Scan size={18} /> My QR code <Chev size={16} /></button>
        <div className="flex-1 flex items-center justify-between px-3 text-mute text-xs">
          <span>UPI ID: demo@paynest</span><Copy size={16} />
        </div>
      </section>

      <section className="mt-7">
        <h2 className="px-4 text-base font-semibold">Send money</h2>
        <div className="flex gap-4 overflow-x-auto px-4 mt-3 pb-1 [scrollbar-width:none]">
          {contacts.map((c) => (
            <button key={c} onClick={() => toContact(c)} className="flex flex-col items-center gap-1.5 shrink-0 press">
              <span className="w-14 h-14 rounded-full bg-card2 flex items-center justify-center font-medium text-mint">{initials(c)}</span>
              <span className="text-[11px] text-white/80">{c.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="px-4 text-base font-semibold flex items-center gap-2">Next for you <span className="text-[10px] bg-mint text-black rounded-full px-2 py-0.5">New</span></h2>
        <div className="flex gap-3 overflow-x-auto px-4 mt-3 [scrollbar-width:none]">
          {cards.map((c) => (
            <div key={c.t} className="shrink-0 w-64 bg-card rounded-2xl p-4 border border-line">
              <p className="font-medium">{c.t}</p><p className="text-xs text-mute mt-1">{c.s}</p>
            </div>
          ))}
        </div>
      </section>

      <button onClick={() => nav('/scan')} aria-label="Scan QR"
        className="fixed right-4 bottom-24 z-10 bg-mint text-black rounded-full px-5 py-3.5 flex items-center gap-2 font-semibold shadow-lg shadow-black/50 press"
        style={{ marginRight: 'max(0px, calc((100vw - 480px) / 2))' }}>
        <Scan size={22} /> Scan QR
      </button>
    </div>
  )
}
