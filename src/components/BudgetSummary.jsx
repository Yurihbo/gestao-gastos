import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { isSameDay, isSameWeek, isSameMonth } from "date-fns";
import { PiggyBank, CreditCard, AlertTriangle, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BudgetSummary = () => {
  const { expenses, budget, savings, setBudget, period, setPeriod } =
    useExpenses();

  const [editingBudget, setEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(
    budget !== undefined && budget !== null ? budget.toString() : ""
  );

  const toAmount = (val) => {
    if (typeof val === "number") return isNaN(val) ? 0 : val;
    if (typeof val === "string") {
      const n = parseFloat(val.replace(/\./g, "").replace(",", "."));
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };

  const filterExpensesByPeriod = (exp) => {
    const today = new Date();
    const expDate = new Date(exp.date);

    if (period === "day") return isSameDay(expDate, today);
    if (period === "week") return isSameWeek(expDate, today, { weekStartsOn: 1 });
    if (period === "month") return isSameMonth(expDate, today);

    return true;
  };

  const totalPeriod = expenses
    .filter(filterExpensesByPeriod)
    .reduce((sum, exp) => sum + toAmount(exp.amount), 0);

  const remaining = toAmount(budget) - totalPeriod - toAmount(savings);

  const handleSaveBudget = (e) => {
    e.preventDefault();
    setBudget(toAmount(newBudget));
    setEditingBudget(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(toAmount(value));
  };

  const cards = [
    {
      title: "Orçamento",
      icon: <PiggyBank className="w-5 h-5 text-green-400" />,
      value: formatCurrency(budget),
      color: "text-green-400",
    },
    {
      title: "Gastos do Período",
      icon: <CreditCard className="w-5 h-5 text-red-400" />,
      value: formatCurrency(totalPeriod),
      color: totalPeriod > 0 ? "text-red-500" : "text-green-400",
    },
    {
      title: "Cofrinho",
      icon: <Wallet className="w-5 h-5 text-blue-400" />,
      value: formatCurrency(savings),
      color: "text-blue-400",
    },
    {
      title: budget > 0 && remaining < 0 ? "Excedido em" : "Restante",
      icon: (
        <AlertTriangle
          className={`w-5 h-5 ${
            budget > 0 && remaining < 0 ? "text-red-400" : "text-green-400"
          }`}
        />
      ),
      value: budget > 0 ? formatCurrency(Math.abs(remaining)) : "--",
      color: budget > 0 && remaining < 0 ? "text-red-400" : "text-green-400",
    },
  ];

  return (
    <div className="relative p-6 rounded-2xl border border-purple-700/30 bg-neutral-900/70 backdrop-blur-md shadow-lg shadow-purple-900/20">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
          <PiggyBank className="w-6 h-6 text-purple-400" />
          Resumo Financeiro
        </h2>

        {/* Botões de período */}
        <div className="flex gap-2">
          {[
            { key: "day", label: "Hoje" },
            { key: "week", label: "Semana" },
            { key: "month", label: "Mês" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setPeriod(opt.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                period === opt.key
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md"
                  : "bg-black/40 border border-white/10 text-gray-300 hover:bg-black/60"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setEditingBudget(true)}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          Definir Orçamento
        </button>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between 
                       bg-neutral-900/70 
                       border border-purple-700/30 
                       backdrop-blur-md 
                       rounded-2xl 
                       p-6 
                       shadow-lg shadow-purple-900/20
                       transition hover:scale-[1.02] hover:shadow-purple-700/40"
          >
            <div className="flex items-center gap-2 mb-2">
              {card.icon}
              <h3 className="text-base md:text-lg font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {card.title}
              </h3>
            </div>
            <p
              className={`text-xl md:text-2xl font-bold ${card.color} text-right mt-2`}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Modal com Animação */}
      <AnimatePresence>
        {editingBudget && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditingBudget(false)} // <- fecha clicando no fundo
          >
            <motion.div
              className="bg-neutral-900/90 p-6 rounded-2xl border border-purple-700/30 shadow-xl shadow-purple-900/40 w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // <- impede fechar ao clicar dentro
            >
              <h3 className="text-lg font-semibold text-center mb-4 text-purple-300">
                Definir Orçamento
              </h3>
              <form onSubmit={handleSaveBudget} className="flex flex-col gap-3">
                <input
                  type="number"
                  step="0.01"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="p-2 bg-black/40 text-gray-100 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Digite o valor"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingBudget(false)}
                    className="bg-black/40 border border-white/10 hover:bg-black/60 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetSummary;
