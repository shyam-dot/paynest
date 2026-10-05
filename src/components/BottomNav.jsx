import { NavLink } from 'react-router-dom'
import { Home } from './Icons'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#121316] border-t border-[#26282e] flex justify-around items-center pt-2 pb-1 safe-bottom z-30 shadow-2xl">
      {/* Home Tab */}
      <NavLink
        to="/"
        end
        className="flex-1 flex flex-col items-center gap-1 press group"
      >
        {({ isActive }) => (
          <>
            <span
              className={`px-5 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                isActive ? 'bg-[#0b57d0] text-white shadow-sm' : 'text-[#9aa0a6] group-hover:text-white'
              }`}
            >
              <Home size={20} />
            </span>
            <span
              className={`text-[11px] font-medium transition-colors ${
                isActive ? 'text-white font-semibold' : 'text-[#9aa0a6]'
              }`}
            >
              Home
            </span>
          </>
        )}
      </NavLink>

      {/* Money Tab */}
      <NavLink
        to="/money"
        className="flex-1 flex flex-col items-center gap-1 press group"
      >
        {({ isActive }) => (
          <>
            <span
              className={`px-5 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                isActive ? 'bg-[#0b57d0] text-white shadow-sm' : 'text-[#9aa0a6] group-hover:text-white'
              }`}
            >
              <span className="w-5 h-5 rounded-full border-[1.8px] border-current flex items-center justify-center text-xs font-bold leading-none">
                ₹
              </span>
            </span>
            <span
              className={`text-[11px] font-medium transition-colors ${
                isActive ? 'text-white font-semibold' : 'text-[#9aa0a6]'
              }`}
            >
              Money
            </span>
          </>
        )}
      </NavLink>

      {/* You Tab */}
      <NavLink
        to="/you"
        className="flex-1 flex flex-col items-center gap-1 press group"
      >
        {({ isActive }) => (
          <>
            <span
              className={`px-5 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                isActive ? 'bg-[#0b57d0] text-white shadow-sm' : 'text-[#9aa0a6] group-hover:text-white'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/80 text-white font-bold text-xs flex items-center justify-center border border-white/20">
                S
              </span>
            </span>
            <span
              className={`text-[11px] font-medium transition-colors ${
                isActive ? 'text-white font-semibold' : 'text-[#9aa0a6]'
              }`}
            >
              You
            </span>
          </>
        )}
      </NavLink>
    </nav>
  )
}
