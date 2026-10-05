import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

const STORAGE_KEY = 'paynest_user_transactions'
const BALANCE_KEY = 'paynest_user_balance'

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    uid: 'shyam-001',
    name: 'SHYAM',
    phone: '8825557169',
    upiId: 'shyamshyamshyam13-1@okicici',
    bankName: 'Indian Overseas Bank ••••1974',
    accountType: 'Savings account'
  })

  const [balance, setBalance] = useState(() => {
    try {
      const savedBal = localStorage.getItem(BALANCE_KEY)
      if (savedBal !== null) return Number(savedBal)
    } catch {}
    return 18450.50
  })

  const [payment, setPayment] = useState(null) // { upiId, payeeName, amount, note }
  const [receipt, setReceipt] = useState(null) // last saved transaction

  // Clean empty transaction history by default (NO dummy datas!)
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Clean out any legacy seed dummy transactions if they were saved earlier
        return parsed.filter((t) => !t.id?.startsWith('tx-seed-'))
      }
    } catch {}
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch {}
  }, [transactions])

  useEffect(() => {
    try {
      localStorage.setItem(BALANCE_KEY, String(balance))
    } catch {}
  }, [balance])

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev])
    setBalance((prev) => Math.max(0, prev - Number(tx.amount || 0)))
  }

  const clearTransactions = () => {
    setTransactions([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }

  return (
    <Ctx.Provider
      value={{
        user,
        setUser,
        balance,
        setBalance,
        payment,
        setPayment,
        receipt,
        setReceipt,
        transactions,
        addTransaction,
        clearTransactions
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
