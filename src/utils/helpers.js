
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}


export function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}


export function getSummary(transactions) {
  const income   = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const balance  = income - expenses

  return { income, expenses, balance }
}


export function getSpendingByCategory(transactions) {
  const expenseOnly = transactions.filter(t => t.type === 'expense')
  const grouped = {}

  expenseOnly.forEach(t => {
    grouped[t.category] = (grouped[t.category] || 0) + t.amount
  })

  return Object.entries(grouped)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}


export function getMonthlyTotals(transactions) {
  const months = {}

  transactions.forEach(t => {
    const label = new Date(t.date + 'T00:00:00').toLocaleString('en-US', { month: 'short' })
    if (!months[label]) months[label] = { income: 0, expenses: 0 }
    if (t.type === 'income')  months[label].income   += t.amount
    if (t.type === 'expense') months[label].expenses += t.amount
  })

  return Object.entries(months).map(([month, data]) => ({ month, ...data }))
}
