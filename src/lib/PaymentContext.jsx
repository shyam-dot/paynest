import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

const STORAGE_KEY = 'paynest_transactions'

const DEFAULT_TRANSACTIONS = [
  {
    id: 'tx-seed-1',
    transactionId: 'TXN-9843217482',
    upiId: 'starbucks@okaxis',
    payeeName: 'Starbucks Coffee',
    amount: 350,
    note: 'Cold Brew & Croissant',
    status: 'SUCCESS',
    transactionReference: 'PN84920194A',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'tx-seed-2',
    transactionId: 'TXN-4910283921',
    upiId: 'arun.k@okicici',
    payeeName: 'Arun K',
    amount: 1200,
    note: 'Dinner split',
    status: 'SUCCESS',
    transactionReference: 'PN39184022B',
    timestamp: new Date(Date.now() - 86400000).toISOString()
  }
]

export function AppProvider({ children }) {
  const [user] = useState({
    uid: 'demo-user-1',
    name: 'Shyam',
    upiId: 'shyam@paynest'
  })
  const [payment, setPayment] = useState(null) // { upiId, payeeName, amount, note }
  const [receipt, setReceipt] = useState(null) // last saved transaction
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // fallback
    }
    return DEFAULT_TRANSACTIONS
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch {
      // ignore storage errors
    }
  }, [transactions])

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev])
  }

  const clearTransactions = () => {
    setTransactions([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return (
    <Ctx.Provider
      value={{
        user,
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
