export const Tabs = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="border-b border-neutral-800">
      <nav className="-mb-px flex space-x-6">{children}</nav>
    </div>
  );
};

export const Tab = ({ label, id, activeTab, setActiveTab }) => {
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm transition-colors
        ${
          activeTab === id
            ? "border-white text-white"
            : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600"
        }`}
    >
      {label}
    </button>
  );
};
