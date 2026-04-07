function AdminTopBar({ activeTab, setActiveTab, onLogout }) {
  const tabs = [
    { id: "menu", label: "Food Items" },
    { id: "orders", label: "Orders" },
    { id: "earnings", label: "Earnings" }
  ];

  return (
    <div className="bg-[#0F6657] text-[#F8FAFC] px-[3vw] py-[2vh]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-[1.8vw] sm:text-[1.6vw] font-semibold leading-tight">
          FAMT<span className="text-[#FBA808]">CANTEEN</span>
        </h1>

        <div className="flex items-center gap-3 justify-end">
          <div className="text-sm sm:text-base opacity-90 font-medium">Admin</div>
          <button
            onClick={onLogout}
            className="bg-[#FBA808] text-[#0F6657] px-[1.4vw] py-[0.7vh] rounded-[0.5vw] font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mt-[2vh] flex gap-3 flex-wrap bg-white rounded-[0.8vw] p-[0.8vw] shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-[1.2vw] py-[0.7vh] rounded-[0.5vw] ${activeTab === tab.id
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
