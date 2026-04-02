import TransactionList from '../components/TransactionList'
import styles from './Transactions.module.css'

export default function Transactions() {
  return (
    <div>
      <h1 className={styles.title}>Transactions</h1>
      <TransactionList />
    </div>
  )
}
