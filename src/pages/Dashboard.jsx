import SummaryCards from '../components/SummaryCards'
import TrendChart from '../components/TrendChart'
import SpendingChart from '../components/SpendingChart'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  return (
    <div>
      <h1 className={styles.title}>Overview</h1>
      <SummaryCards />
      <div className={styles.charts}>
        <TrendChart />
        <SpendingChart />
      </div>
    </div>
  )
}
