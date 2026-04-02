// transaction data to start with
export const initialTransactions = [
  { id: 1, description: 'Monthly Salary',    type: 'income',  category: 'Salary',        amount: 5000, date: '2025-03-01' },
  { id: 2, description: 'Groceries',         type: 'expense', category: 'Food',           amount: 120,  date: '2025-03-03' },
  { id: 3, description: 'Netflix',           type: 'expense', category: 'Entertainment',  amount: 16,   date: '2025-03-05' },
  { id: 4, description: 'Uber',              type: 'expense', category: 'Transport',      amount: 22,   date: '2025-03-06' },
  { id: 5, description: 'Freelance Project', type: 'income',  category: 'Freelance',      amount: 800,  date: '2025-03-08' },
  { id: 6, description: 'Electric Bill',     type: 'expense', category: 'Utilities',      amount: 88,   date: '2025-03-10' },
  { id: 7, description: 'Amazon',            type: 'expense', category: 'Shopping',       amount: 165,  date: '2025-03-11' },
  { id: 8, description: 'Gym Membership',    type: 'expense', category: 'Health',         amount: 45,   date: '2025-03-12' },
  { id: 9, description: 'Salary Bonus',      type: 'income',  category: 'Salary',        amount: 800,  date: '2025-03-15' },
  { id: 10, description: 'Restaurant',       type: 'expense', category: 'Food',           amount: 55,   date: '2025-03-18' },
  { id: 11, description: 'Spotify',          type: 'expense', category: 'Entertainment',  amount: 10,   date: '2025-03-20' },
  { id: 12, description: 'Internet Bill',    type: 'expense', category: 'Utilities',      amount: 75,   date: '2025-03-21' },
]

export const CATEGORIES = [
  'Salary',
  'Freelance',
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Other',
]

// Color for each category 
export const CATEGORY_COLORS = {
  Salary:        '#16a34a',
  Freelance:     '#2563eb',
  Food:          '#dc2626',
  Transport:     '#7c3aed',
  Shopping:      '#d97706',
  Entertainment: '#db2777',
  Health:        '#0891b2',
  Utilities:     '#65a30d',
  Other:         '#6b7280',
}
