import { NavLink } from 'react-router-dom'
import { Home, Money, User } from './Icons'

const tabs = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/money', label: 'Money', Icon: Money },
  { to: '/you', label: 'You', Icon: User }
]
export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-bg border-t border-line flex justify-around pt-2 safe-bottom z-20">
      {tabs.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} end className="flex-1 flex flex-col items-center gap-1 press">
          {({ isActive }) => (
            <>
              <span className={`px-5 py-1 rounded-full transition-colors ${isActive ? 'bg-mint/15 text-mint' : 'text-mute'}`}><Icon size={22} /></span>
              <span className={`text-[11px] ${isActive ? 'text-mint font-medium' : 'text-mute'}`}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
