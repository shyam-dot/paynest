import { User } from '../components/Icons.jsx'

export default function You() {
  return (
    <div className="page pb-28">
      <header className="safe-top px-4"><h1 className="text-xl font-semibold">You</h1></header>
      <div className="flex flex-col items-center mt-8">
        <span className="w-24 h-24 rounded-full bg-card2 flex items-center justify-center text-mint"><User size={44} /></span>
        <p className="mt-3 text-lg font-medium">Demo user</p>
        <p className="text-sm text-mute">demo@paynest</p>
      </div>
      <div className="mx-4 mt-8 bg-card rounded-2xl divide-y divide-line text-sm">
        <div className="flex justify-between p-4"><span className="text-mute">Mode</span><span>Demo, simulated payments</span></div>
        <div className="flex justify-between p-4"><span className="text-mute">Version</span><span>1.0.0</span></div>
      </div>
    </div>
  )
}
