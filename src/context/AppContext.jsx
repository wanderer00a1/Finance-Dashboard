import { createContext, useContext, useState } from "react";
import { initialTransactions } from "../data/transactions";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("finance_transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState("admin");
  const [nextId, setNextId] = useState(100);

  function saveTransactions(updated) {
    setTransactions(updated);
    localStorage.setItem("finance_transactions", JSON.stringify(updated));
  }

  function addTransaction(tx) {
    const newTx = { ...tx, id: nextId };
    setNextId((prev) => prev + 1);
    saveTransactions([...transactions, newTx]);
  }

  function deleteTransaction(id) {
    saveTransactions(transactions.filter((t) => t.id !== id));
  }

  function editTransaction(id, updated) {
    saveTransactions(
      transactions.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    );
  }

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        setRole,
        addTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
