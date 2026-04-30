function AdminTopBar({ activeTab, setActiveTab, onLogout }) {
  const tabs = [
    { id: "menu", label: "Food Items" },
    { id: "orders", label: "Orders" },
    { id: "earnings", label: "Earnings" }
  ];

  return (
    <div className="bg-[#0F6657] text-[#F8FAFC] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold leading-tight">
          FAMT<span className="text-[#FBA808]">CANTEEN</span>
        </h1>

        <div className="flex items-center gap-3 justify-end">
          <div className="text-sm sm:text-base opacity-90 font-medium">Admin</div>
          <button
            onClick={onLogout}
            className="bg-[#FBA808] text-[#0F6657] px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mt-4 flex gap-3 flex-wrap bg-white rounded-xl p-3 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab.id
              ? "bg-[#E6F7F3] text-[#00AD8F]"
              : "bg-[#f1f1f1] text-[#2e2e2e]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminTopBar;
