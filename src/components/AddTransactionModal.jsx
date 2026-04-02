import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/transactions'
import styles from './AddTransactionModal.module.css'

export default function AddTransactionModal({ editTx, onClose }) {
  const { addTransaction, editTransaction } = useApp()

  // Pre-fill form if editing an existing transaction
  const [form, setForm] = useState({
    description: editTx?.description || '',
    amount:      editTx?.amount      || '',
    type:        editTx?.type        || 'expense',
    category:    editTx?.category    || 'Food',
    date:        editTx?.date        || new Date().toISOString().slice(0, 10),
  })

  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.description.trim()) { setError('Description is required'); return }
    if (!form.amount || Number(form.amount) <= 0) { setError('Enter a valid amount'); return }

    const tx = {
      ...form,
      amount: parseFloat(form.amount),
    }

    if (editTx) {
      editTransaction(editTx.id, tx)
    } else {
      addTransaction(tx)
    }

    onClose()
  }

  return (
    // Clicking the backdrop closes the modal
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h3 className={styles.title}>{editTx ? 'Edit Transaction' : 'Add Transaction'}</h3>

        <form onSubmit={handleSubmit}>
          <label className={styles.label}>Description</label>
          <input
            className={styles.input}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Monthly Salary"
          />

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Amount ($)</label>
              <input
                className={styles.input}
                name="amount"
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
            <div className={styles.col}>
              <label className={styles.label}>Date</label>
              <input
                className={styles.input}
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <label className={styles.label}>Type</label>
              <select className={styles.input} name="type" value={form.type} onChange={handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className={styles.col}>
              <label className={styles.label}>Category</label>
              <select className={styles.input} name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.btns}>
            <button type="button" className={styles.cancel} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.save}>
              {editTx ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
