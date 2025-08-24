import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { DollarSign, List, Calendar, PlusCircle, StickyNote } from "lucide-react";

const categories = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Outros",
];


const getLocalDate = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60000);
  return localDate.toISOString().split("T")[0];
};

const AddExpense = () => {
  const { addExpense } = useExpenses();
  const [formData, setFormData] = useState({
    amount: "",
    category: categories[0],
    date: getLocalDate(), 
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(formData.amount);

    if (!parsedAmount || parsedAmount <= 0) return;

    addExpense({
      ...formData,
      id: Date.now(),
      amount: parsedAmount,
      date: formData.date,
    });

    
    setFormData((prev) => ({
      amount: "",
      category: prev.category,
      date: getLocalDate(), 
      note: "",
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-neutral-900/70 backdrop-blur-lg border border-purple-700/30 rounded-xl shadow-lg p-6"
    >
      
      <h2 className="text-xl font-bold text-purple-400 tracking-wide flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6 text-purple-400" />
        Adicionar Gasto
      </h2>

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1 text-gray-300">
            <DollarSign size={16} /> Valor
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full p-2 bg-neutral-800/90 border border-purple-700/30 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="R$ 0,00"
            aria-label="Valor do gasto"
            required
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1 text-gray-300">
            <List size={16} /> Categoria
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full p-2 bg-neutral-800/90 border border-purple-700/30 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            aria-label="Categoria do gasto"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

       
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1 text-gray-300">
            <Calendar size={16} /> Data
          </label>
          <input
            type="date"
            value={formData.date}
            max={getLocalDate()} 
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="w-full p-2 bg-neutral-800/90 border border-purple-700/30 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            aria-label="Data do gasto"
          />
        </div>

       
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2
                       bg-purple-600 hover:bg-purple-500 transition
                       p-2 rounded-lg font-medium text-white shadow-md"
          >
            <PlusCircle size={18} /> Adicionar
          </button>
        </div>
      </div>

      
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1 flex items-center gap-1 text-gray-300">
          <StickyNote size={16} /> Observação (opcional)
        </label>
        <input
          type="text"
          value={formData.note}
          onChange={(e) =>
            setFormData({ ...formData, note: e.target.value })
          }
          className="w-full p-2 bg-neutral-800/90 border border-purple-700/30 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Descrição breve"
          aria-label="Observação do gasto"
        />
      </div>
    </form>
  );
};

export default AddExpense;
