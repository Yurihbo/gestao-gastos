import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useExpenses } from "../context/ExpenseContext";
import { isSameDay, isSameWeek, isSameMonth } from "date-fns";


const COLORS = [
  "#6366f1",
  "#3b82f6",
  "#06b6d4",
  "#ec4899",
  "#10b981",
  "#facc15",
];


const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};


const CustomLegend = ({ payload }) => {
  const total = payload.reduce(
    (sum, entry) => sum + (entry.payload.value || 0),
    0
  );

  return (
    <div className="max-h-60 overflow-y-auto pr-2 scroll-thin">
      <ul className="flex flex-col gap-2 mt-2">
        {payload.map((entry, index) => {
          const value = entry.payload.value || 0;
          const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
          return (
            <li key={`item-${index}`} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-gray-200 text-sm font-medium">
                {entry.value} — {formatCurrency(value)} ({percent}%)
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ExpenseChart = ({ period }) => {
  const { expenses, savings } = useExpenses();
  const today = new Date();

  
  const filteredExpenses = expenses.filter((exp) => {
    const expenseDate = new Date(exp.date);

    if (period === "today") return isSameDay(expenseDate, today);
    if (period === "week") return isSameWeek(expenseDate, today);
    if (period === "month") return isSameMonth(expenseDate, today);
    return true;
  });

  
  const totalExpenses = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  
  let categoryData = filteredExpenses.reduce((acc, expense) => {
    const existingCategory = acc.find(
      (item) => item.name === expense.category
    );
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  
  if (savings > 0) {
    categoryData.push({ name: "Cofrinho 💰", value: savings });
  }

  const totalWithSavings = totalExpenses + savings;

  return (
    <div className="mb-6 card p-6 border border-neutral-800 bg-[#111111] rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Visualização Gráfica
      </h2>

      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-medium text-gray-300">Por Categoria</h3>
        <span className="text-sm font-semibold text-pink-400">
          Total: {formatCurrency(totalWithSavings)}
        </span>
      </div>

      
      <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
       
        <div className="w-full md:w-2/3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                
                label={({ name, percent }) => {
                  const shortName =
                    name.length > 10 ? name.substring(0, 9) + "…" : name;
                  return `${shortName} ${(percent * 100).toFixed(0)}%`;
                }}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-cat-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [formatCurrency(value), name]}
                contentStyle={{
                  backgroundColor: "rgba(17, 17, 17, 0.9)",
                  border: "1px solid #333",
                  borderRadius: "0.5rem",
                  color: "#f9fafb",
                  padding: "8px 12px",
                  fontSize: "0.85rem",
                }}
                itemStyle={{
                  color: "#e5e7eb",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        
        <div className="w-full md:w-1/3">
          <CustomLegend
            payload={categoryData.map((cat, index) => ({
              value: cat.name,
              color: COLORS[index % COLORS.length],
              payload: cat,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
