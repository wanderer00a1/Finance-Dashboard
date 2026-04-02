import { useApp } from '../context/AppContext'
import { getSummary, getSpendingByCategory, formatCurrency } from '../utils/helpers'
import styles from './Insights.module.css'

export default function Insights() {
  const { transactions } = useApp()
  const { income, expenses, balance } = getSummary(transactions)
  const spending = getSpendingByCategory(transactions)

  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0
  const topCategory = spending[0] || null
  const avgExpense = transactions.filter(t => t.type === 'expense').length > 0
    ? expenses / transactions.filter(t => t.type === 'expense').length
    : 0

  const insights = [
    {
      label: 'Top Spending Category',
      value: topCategory ? topCategory.category : 'N/A',
      sub: topCategory ? `${formatCurrency(topCategory.amount)} spent` : 'No expenses yet',
      color: '#dc2626',
    },
    {
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: savingsRate >= 20 ? 'Above 20% target' : 'Below 20% target',
      color: savingsRate >= 20 ? '#16a34a' : '#d97706',
    },
    {
      label: 'Avg Expense',
      value: formatCurrency(avgExpense),
      sub: `Across ${transactions.filter(t => t.type === 'expense').length} expenses`,
      color: '#2563eb',
    },
    {
      label: 'Total Transactions',
      value: transactions.length,
      sub: `${transactions.filter(t => t.type === 'income').length} income · ${transactions.filter(t => t.type === 'expense').length} expenses`,
      color: '#7c3aed',
    },
  ]

  return (
    <div>
      <h1 className={styles.title}>Insights</h1>

      <div className={styles.grid}>
        {insights.map(item => (
          <div key={item.label} className={styles.card}>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.value} style={{ color: item.color }}>{item.value}</div>
            <div className={styles.sub}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Spending by Category</h2>
        {spending.length === 0 ? (
          <p className={styles.empty}>No expense data yet.</p>
        ) : (
          spending.map(item => {
            const pct = expenses > 0 ? (item.amount / expenses) * 100 : 0
            return (
              <div key={item.category} className={styles.row}>
                <span className={styles.cat}>{item.category}</span>
                <div className={styles.barWrap}>
                  <div className={styles.bar} style={{ width: `${pct}%` }} />
                </div>
                <span className={styles.pct}>{pct.toFixed(0)}%</span>
                <span className={styles.amt}>{formatCurrency(item.amount)}</span>
              </div>
            )
          })
        )}
      </div>

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Summary</h2>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Total Income</span>
          <span className={styles.summaryGreen}>{formatCurrency(income)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Total Expenses</span>
          <span className={styles.summaryRed}>{formatCurrency(expenses)}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
          <span className={styles.summaryLabel}>Net Balance</span>
          <span style={{ color: balance >= 0 ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
            {formatCurrency(balance)}
          </span>
        </div>
      </div>
    </div>
  )
}
