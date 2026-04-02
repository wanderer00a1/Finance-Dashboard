import { formatCurrency, getSummary } from '../utils/helpers'
import { useApp } from '../context/AppContext'
import styles from './SummaryCards.module.css'

export default function SummaryCards() {
  const { transactions } = useApp()
  const { income, expenses, balance } = getSummary(transactions)

  const cards = [
    { label: 'Balance',  value: balance,  color: balance >= 0 ? 'green' : 'red' },
    { label: 'Income',   value: income,   color: 'green' },
    { label: 'Expenses', value: expenses, color: 'red' },
  ]

  return (
    <div className={styles.grid}>
      {cards.map(card => (
        <div key={card.label} className={styles.card}>
          <div className={styles.label}>{card.label}</div>
          <div className={`${styles.value} ${styles[card.color]}`}>
            {formatCurrency(card.value)}
          </div>
        </div>
      ))}
    </div>
  )
}
