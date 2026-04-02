import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../context/AppContext'
import { getSpendingByCategory, formatCurrency } from '../utils/helpers'
import { CATEGORY_COLORS } from '../data/transactions'
import styles from './SpendingChart.module.css'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className={styles.tooltip}>
      <p style={{ color: d.payload.fill, fontWeight: 500, fontSize: 13 }}>{d.name}</p>
      <p style={{ color: '#fff', fontSize: 12 }}>{formatCurrency(d.value)}</p>
    </div>
  )
}

export default function SpendingChart() {
  const { transactions } = useApp()
  const data = getSpendingByCategory(transactions)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>Spending Breakdown</div>
        <div className={styles.sub}>By category</div>
      </div>

      {data.length === 0 ? (
        <p className={styles.empty}>No expense data yet.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {data.map(item => (
                  <Cell
                    key={item.category}
                    fill={CATEGORY_COLORS[item.category] || '#6b7280'}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend below chart */}
          <div className={styles.legend}>
            {data.slice(0, 5).map(item => (
              <div key={item.category} className={styles.legendItem}>
                <span
                  className={styles.dot}
                  style={{ background: CATEGORY_COLORS[item.category] || '#6b7280' }}
                />
                <span className={styles.catName}>{item.category}</span>
                <span className={styles.catAmt}>{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
