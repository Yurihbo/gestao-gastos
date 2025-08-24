import React, { useMemo, useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const toDate = (d) => new Date(d?.includes("T") ? d : `${d}T00:00:00`);

const ExpenseList = () => {
  const { expenses, deleteExpense, editExpense } = useExpenses();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => {
      const diff = toDate(b.date) - toDate(a.date);
      if (diff !== 0) return diff;
      return (b.id ?? 0) - (a.id ?? 0);
    });
  }, [expenses]);

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditData({
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date ? expense.date.split("T")[0] : "",
      note: expense.note || "",
    });
  };

  const handleSave = (id) => {
    const parsedAmount = parseFloat(editData.amount);
    if (!parsedAmount || parsedAmount <= 0) return;

    editExpense(id, {
      ...editData,
      amount: parsedAmount,
      id,
    });

    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="bg-[#111111] border border-neutral-800 rounded-xl p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Gastos do Mês
      </h2>

      <div className="max-h-80 overflow-y-auto pr-2 scroll-thin space-y-2">
        {sortedExpenses.map((exp) => (
          <div
            key={exp.id}
            className="flex gap-2 items-center p-2 bg-[#0f0f0f] border border-neutral-700 rounded-lg"
          >
            {editingId === exp.id ? (
              <>
                <input
                  type="number"
                  step="0.01"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: e.target.value })
                  }
                  className="px-2 py-1 rounded bg-[#111111] border border-neutral-700 w-24 text-white focus:ring-2 focus:ring-pink-400"
                />

                <select
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                  className="px-2 py-1 rounded bg-[#111111] border border-neutral-700 text-white focus:ring-2 focus:ring-pink-400"
                >
                  <option>Alimentação</option>
                  <option>Transporte</option>
                  <option>Moradia</option>
                  <option>Lazer</option>
                  <option>Saúde</option>
                  <option>Educação</option>
                  <option>Outros</option>
                </select>

                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  className="px-2 py-1 rounded bg-[#111111] border border-neutral-700 text-white focus:ring-2 focus:ring-pink-400"
                />

                <input
                  type="text"
                  value={editData.note}
                  onChange={(e) =>
                    setEditData({ ...editData, note: e.target.value })
                  }
                  className="px-2 py-1 rounded bg-[#111111] border border-neutral-700 flex-1 text-white focus:ring-2 focus:ring-pink-400"
                  placeholder="Observação"
                />

                <button
                  onClick={() => handleSave(exp.id)}
                  className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded text-sm text-white shadow-md"
                >
                  Salvar
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm text-white"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="w-28 text-gray-100">
                  {formatCurrency(exp.amount)}
                </span>
                <span className="w-28 text-gray-300">{exp.category}</span>
                <span className="w-28 text-gray-400">
                  {exp.date
                    ? format(toDate(exp.date), "dd/MM/yyyy", { locale: ptBR })
                    : ""}
                </span>
                <span className="flex-1 truncate text-gray-200">
                  {exp.note}
                </span>

                <button
                  onClick={() => handleEditClick(exp)}
                  className="px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded text-sm text-white shadow-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteExpense(exp.id)}
                  className="px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded text-sm text-white shadow-md"
                >
                  Excluir
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
