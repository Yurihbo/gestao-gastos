import React, { useState, useEffect } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { motion, AnimatePresence } from "framer-motion";
import { PiggyBank, Target, Plus, RotateCcw } from "lucide-react";

const SavingsGoal = () => {
  const { savings = 0, addToSavings, resetSavings } = useExpenses();
  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem("goal");
    return savedGoal ? parseFloat(savedGoal) : 1000;
  });
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState(goal);

  useEffect(() => {
    localStorage.setItem("goal", goal.toString());
  }, [goal]);

  const handleAdd = () => {
    const value = parseFloat(input);
    if (!isNaN(value) && value > 0) {
      addToSavings(value);
      setInput("");
    }
  };

  const handleSaveGoal = () => {
    if (!isNaN(newGoal) && newGoal > 0) {
      setGoal(newGoal);
      setIsModalOpen(false);
    }
  };

  const progress = goal > 0 ? Math.min((savings / goal) * 100, 100) : 0;

  return (
    <div className="relative h-full">
      <div className="h-full flex flex-col justify-center p-6 bg-neutral-900/70 backdrop-blur-lg rounded-2xl border border-purple-700/30 shadow-lg text-white">
       
        <h2 className="text-lg font-bold text-purple-400 mb-6 flex items-center justify-center gap-2">
          <PiggyBank className="w-5 h-5 text-purple-400" /> Meta de Poupança
        </h2>

        
        <div className="w-full bg-black/40 rounded-full h-4 mb-4 overflow-hidden border border-purple-700/30">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-4 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

       
        <p className="text-sm text-gray-300 mb-6 text-center">
          <span className="font-semibold text-green-400">
            R$ {savings.toFixed(2)}
          </span>{" "}
          /{" "}
          <span className="font-semibold text-purple-400">
            R$ {goal.toFixed(2)}
          </span>
        </p>

        {/* Input + botão adicionar */}
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-neutral-900/70 border border-purple-700/30 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Valor"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-sm font-semibold text-white transition flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Adicionar
          </button>
        </div>

        {/* Botões meta e reset */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 px-4 py-2 bg-purple-700/80 hover:bg-purple-600 rounded-lg text-sm font-semibold flex items-center justify-center gap-1"
          >
            <Target className="w-4 h-4" /> Definir Meta
          </button>
          <button
            onClick={resetSavings}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-lg text-sm font-semibold flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-4 h-4" /> Resetar
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-neutral-900/70 backdrop-blur-lg p-6 rounded-2xl border border-purple-700/30 shadow-lg w-[400px] text-white">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-400">
                  <Target className="w-5 h-5 text-purple-400" />
                  Definir Nova Meta
                </h2>

                <input
                  type="number"
                  value={newGoal}
                  onChange={(e) => setNewGoal(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-neutral-900/70 border border-purple-700/30 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Digite a meta"
                />

                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg"
                    onClick={handleSaveGoal}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SavingsGoal;
