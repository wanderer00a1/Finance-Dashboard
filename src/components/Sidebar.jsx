import { useApp } from '../context/AppContext'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Overview' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'insights',     label: 'Insights' },
]

export default function Sidebar({ currentPage, onNavigate }) {
  const { role, setRole } = useApp()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        Finance<span className={styles.dot}>.</span>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`${styles.navItem} ${currentPage === item.id ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Role switcher at the bottom */}
      <div className={styles.footer}>
        <label className={styles.roleLabel}>Role</label>
        <select
          className={styles.roleSelect}
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
        <span className={`${styles.badge} ${role === 'admin' ? styles.admin : styles.viewer}`}>
          {role === 'admin' ? 'Can add & delete' : 'Read only'}
        </span>
      </div>
    </aside>
  )
}
