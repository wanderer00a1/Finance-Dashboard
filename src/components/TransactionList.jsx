import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { formatCurrency, formatDate } from '../utils/helpers'
import { CATEGORIES, CATEGORY_COLORS } from '../data/transactions'
import AddTransactionModal from './AddTransactionModal'
import styles from './TransactionList.module.css'

export default function TransactionList() {
  const { transactions, role, deleteTransaction } = useApp()

  const [search, setSearch]     = useState('')
  const [typeFilter, setType]   = useState('')        
  const [catFilter, setCat]     = useState('')
  const [sortField, setSortField] = useState('date')
  const [sortDir, setSortDir]   = useState('desc')
  const [showModal, setShowModal] = useState(false)
  const [editTx, setEditTx]     = useState(null)      

  const isAdmin = role === 'admin'

  // Filter
  let filtered = transactions.filter(t => {
    if (typeFilter && t.type !== typeFilter) return false
    if (catFilter  && t.category !== catFilter) return false
    if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Sort
  filtered = [...filtered].sort((a, b) => {
    let av = a[sortField]
    let bv = b[sortField]
    if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    return sortDir === 'asc' ? av - bv : bv - av
  })

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  function handleDelete(id) {
    if (window.confirm('Delete this transaction?')) deleteTransaction(id)
  }

  function openAdd() {
    setEditTx(null)
    setShowModal(true)
  }

  function openEdit(tx) {
    setEditTx(tx)
    setShowModal(true)
  }

  const arrow = (field) => sortField === field ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

  return (
    <div>
      {/* Controls */}
      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select className={styles.select} value={typeFilter} onChange={e => setType(e.target.value)}>
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select className={styles.select} value={catFilter} onChange={e => setCat(e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {isAdmin && (
          <button className={styles.addBtn} onClick={openAdd}>
            + Add
          </button>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>No transactions found.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort('date')}>Date{arrow('date')}</th>
                <th onClick={() => handleSort('description')}>Description{arrow('description')}</th>
                <th>Category</th>
                <th onClick={() => handleSort('type')}>Type{arrow('type')}</th>
                <th onClick={() => handleSort('amount')}>Amount{arrow('amount')}</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id}>
                  <td className={styles.date}>{formatDate(tx.date)}</td>
                  <td className={styles.desc}>{tx.description}</td>
                  <td>
                    <span
                      className={styles.catTag}
                      style={{
                        background: CATEGORY_COLORS[tx.category] + '22',
                        color: CATEGORY_COLORS[tx.category],
                      }}
                    >
                      {tx.category}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.typeBadge} ${tx.type === 'income' ? styles.income : styles.expense}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`${styles.amount} ${tx.type === 'income' ? styles.incomeAmt : styles.expenseAmt}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  {isAdmin && (
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.editBtn} onClick={() => openEdit(tx)}>Edit</button>
                        <button className={styles.delBtn}  onClick={() => handleDelete(tx.id)}>Del</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <AddTransactionModal
          editTx={editTx}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
