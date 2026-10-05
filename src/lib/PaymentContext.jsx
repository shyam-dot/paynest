import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { auth } from '../firebase'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState('')
  const [payment, setPayment] = useState(null) // {upiId,payeeName,amount,note}
  const [receipt, setReceipt] = useState(null) // saved transaction

  useEffect(() => {
    const off = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u)
      else signInAnonymously(auth).catch((e) => setAuthError(e.message))
    })
    return off
  }, [])

  return <Ctx.Provider value={{ user, authError, payment, setPayment, receipt, setReceipt }}>{children}</Ctx.Provider>
}
