# Finance Dashboard

A simple finance dashboard built with Vite + React.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Features

- **Overview** — balance, income, expenses summary cards with charts
- **Transactions** — searchable, filterable, sortable transaction table
- **Insights** — spending breakdown by category, savings rate, key stats
- **Role-based UI** — switch between Admin (add/edit/delete) and Viewer (read only)
- **Persisted state** — data saved to localStorage automatically

## Project Structure

```
src/
├── main.jsx               # App entry point
├── App.jsx                # Root component, page routing
├── index.css              # Global styles
│
├── context/
│   └── AppContext.jsx     # Global state (transactions, role)
│
├── data/
│   └── transactions.js    # Mock data + category config
│
├── utils/
│   └── helpers.js         # formatCurrency, getSummary, chart helpers
│
├── pages/
│   ├── Dashboard.jsx      # Overview page
│   ├── Transactions.jsx   # Transactions page
│   └── Insights.jsx       # Insights page
│
└── components/
    ├── Sidebar.jsx         # Navigation + role switcher
    ├── SummaryCards.jsx    # Balance / income / expense cards
    ├── TransactionList.jsx # Table with search, filter, sort
    ├── AddTransactionModal.jsx  # Add / edit form modal
    ├── TrendChart.jsx      # Monthly bar chart (Recharts)
    └── SpendingChart.jsx   # Category donut chart (Recharts)
```

## Tech Stack

- [Vite](https://vitejs.dev/) — build tool
- [React 18](https://react.dev/) — UI library
- [Recharts](https://recharts.org/) — charts
- CSS Modules — scoped styling, no extra dependencies
