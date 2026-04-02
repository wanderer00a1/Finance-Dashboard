import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import styles from './App.module.css'

export default function App() {
  const [page, setPage] = useState('dashboard')

  const pages = {
    dashboard:    <Dashboard />,
    transactions: <Transactions />,
    insights:     <Insights />,
  }

  return (
    <AppProvider>
      <div className={styles.layout}>
        <Sidebar currentPage={page} onNavigate={setPage} />
        <main className={styles.main}>
          {pages[page]}
        </main>
      </div>
    </AppProvider>
  )
}
