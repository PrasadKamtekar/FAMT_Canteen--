function EarningsPanel({ dailyEarnings, totalEarnings, completedCount, pendingCount }) {
  const cards = [
    { label: "Today Earnings", value: `Rs ${dailyEarnings}`, accent: "text-[#0F6657]" },
    { label: "Overall Earnings", value: `Rs ${totalEarnings}`, accent: "text-[#0F6657]" },
    { label: "Completed Orders", value: completedCount, accent: "text-[#00AD8F]" },
    { label: "Pending Orders", value: pendingCount, accent: "text-[#e31837]" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
          <h2 className="text-gray-500 mb-2">{card.label}</h2>
          <p className={`text-2xl sm:text-3xl font-semibold ${card.accent}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default EarningsPanel;
