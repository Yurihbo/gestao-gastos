import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpenseProvider, useExpenses } from './context/ExpenseContext';
import ExpenseList from './components/ExpenseList';
import BudgetSummary from './components/BudgetSummary';
import ExpenseChart from './components/ExpenseChart';
import Insights from './components/Insights';
import SavingsGoal from './components/SavingsGoal';

import AddExpense from './components/AddExpense';
import './index.css';

function AppContent() {
  const { period } = useExpenses(); 

  useEffect(() => {
    document.title = "GG Money";
  }, []);

  return (
    <div
      className="min-h-screen text-gray-200"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
     
      <motion.header 
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-neutral-900/80 backdrop-blur-md border-b border-purple-700/30 
                   px-6 py-3 flex items-center gap-3 shadow-sm"
      >
        <img 
          src="/icons/favicon-32.png" 
          alt="GG Money Logo" 
          className="w-7 h-7"
        />
        <h1 className="text-xl md:text-2xl font-orbitron text-purple-300 tracking-wide 
                       drop-shadow-[0_0_6px_rgba(147,51,234,0.4)]">
          GG Money
        </h1>
      </motion.header>

      <main className="max-w-6xl mx-auto p-6">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full"
          >
            <BudgetSummary />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full"
          >
            <Insights />
          </motion.div>
        </div>

        

        
        <AnimatePresence mode="wait">
          <motion.div
            key={period}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-neutral-900/70 backdrop-blur-lg border border-purple-700/30 rounded-xl shadow-lg p-6"
            >
              <AddExpense />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-neutral-900/70 backdrop-blur-lg border border-purple-700/30 rounded-xl shadow-lg p-6"
            >
              <ExpenseList />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-neutral-900/70 backdrop-blur-lg border border-purple-700/30 rounded-xl shadow-lg p-6"
            >
              <ExpenseChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <SavingsGoal />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}

export default App;
