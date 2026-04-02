import { createContext, useContext, useState } from 'react'
import { initialTransactions } from '../data/transactions'

// 1. Create the context
const AppContext = createContext(null)

// 2. Provider component — wraps the whole app and holds shared state
export function AppProvider({ children }) {
  // Load from localStorage if available, otherwise use mock data
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions')
    return saved ? JSON.parse(saved) : initialTransactions
  })

  const [role, setRole] = useState('admin') // 'admin' or 'viewer'
  const [nextId, setNextId] = useState(100)

  // Save to localStorage whenever transactions change
  function saveTransactions(updated) {
    setTransactions(updated)
    localStorage.setItem('finance_transactions', JSON.stringify(updated))
  }

  function addTransaction(tx) {
    const newTx = { ...tx, id: nextId }
    setNextId(prev => prev + 1)
    saveTransactions([...transactions, newTx])
  }

  function deleteTransaction(id) {
    saveTransactions(transactions.filter(t => t.id !== id))
  }

  function editTransaction(id, updated) {
    saveTransactions(transactions.map(t => t.id === id ? { ...t, ...updated } : t))
  }

  return (
    <AppContext.Provider value={{
      transactions,
      role,
      setRole,
      addTransaction,
      deleteTransaction,
      editTransaction,
    }}>
      {children}
    </AppContext.Provider>
  )
}

// 3. Custom hook — use this in any component instead of useContext directly
export function useApp() {
  return useContext(AppContext)
}
