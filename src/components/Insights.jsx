import { useExpenses } from "../context/ExpenseContext";
import { Wallet, PiggyBank, AlertTriangle, PieChart } from "lucide-react";
import { isSameDay, isSameWeek, isSameMonth } from "date-fns";

const Insights = () => {
  const { expenses, period, budget } = useExpenses();

  const today = new Date();
  const filtered = expenses.filter((exp) => {
    const d = new Date(exp.date);
    if (period === "day") return isSameDay(d, today);
    if (period === "week") return isSameWeek(d, today);
    if (period === "month") return isSameMonth(d, today);
    return false;
  });

  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const categoryTotals = filtered.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const top = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);
  };

  return (
    <div
      className="relative p-6 rounded-2xl border border-purple-700/30 
                 bg-neutral-900/70 backdrop-blur-md shadow-lg shadow-purple-900/20 
                 h-full flex flex-col"
    >
      <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
        <PieChart className="w-5 h-5 text-purple-400" />
        Insights
      </h2>

      {filtered.length === 0 ? (
        <p className="text-gray-400 flex-1">
          Nenhum gasto registrado neste período.
        </p>
      ) : (
        <ul className="space-y-4 text-gray-300 flex-1">
          <li className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-400" />
            <span>
              <span className="text-white font-medium">Total gasto:</span>{" "}
              {formatCurrency(total)}
            </span>
          </li>

          {budget > 0 && (
            <li className="flex items-center gap-2">
              {total > budget ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">
                    Você ultrapassou seu orçamento em{" "}
                    <strong>{formatCurrency(total - budget)}</strong>.
                  </span>
                </>
              ) : (
                <>
                  <PiggyBank className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">
                    Você ainda tem{" "}
                    <strong>{formatCurrency(budget - total)}</strong> do
                    orçamento.
                  </span>
                </>
              )}
            </li>
          )}

          {top && (
            <li className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-yellow-400" />
              <span>
                Categoria com mais gastos: <strong>{top[0]}</strong> (
                {formatCurrency(top[1])})
              </span>
            </li>
          )}

          {top && total > 0 && top[1] / total > 0.5 && (
            <li className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <span>
                Atenção: mais de 50% dos gastos foram em{" "}
                <strong>{top[0]}</strong>.
              </span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Insights;
