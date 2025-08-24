import { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });

  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem("budget");
    return stored ? JSON.parse(stored) : 0;
  });

  const [savings, setSavings] = useState(() => {
    const stored = localStorage.getItem("savings");
    return stored ? JSON.parse(stored) : 0;
  });

  const [period, setPeriod] = useState(() => {
    const stored = localStorage.getItem("period");
    return stored ? stored : "month";
  });

  
  const toAmount = (val) => {
    if (typeof val === "number") return isNaN(val) ? 0 : val;
    if (typeof val === "string") {
      const n = parseFloat(val.replace(/\./g, "").replace(",", "."));
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };

  
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("savings", JSON.stringify(savings));
  }, [savings]);

  useEffect(() => {
    localStorage.setItem("period", period);
  }, [period]);

 
  const addExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      {
        ...expense,
        id: expense.id || Date.now(), 
        amount: toAmount(expense.amount),
        date: expense.date.includes("T")
          ? expense.date
          : expense.date + "T00:00:00",
      },
    ]);
  };

  
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };


  const editExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              ...updatedExpense,
              id,
              amount: toAmount(updatedExpense.amount ?? exp.amount),
              date: updatedExpense.date
                ? updatedExpense.date.includes("T")
                  ? updatedExpense.date
                  : updatedExpense.date + "T00:00:00"
                : exp.date,
            }
          : exp
      )
    );
  };

  
  const addToSavings = (amount) => {
    setSavings((prev) => prev + toAmount(amount));
  };

  
  const resetSavings = () => {
    setSavings(0);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        editExpense,
        budget,
        setBudget: (val) => setBudget(toAmount(val)),
        savings,
        setSavings: (val) => setSavings(toAmount(val)),
        addToSavings,
        resetSavings,
        period,
        setPeriod,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
