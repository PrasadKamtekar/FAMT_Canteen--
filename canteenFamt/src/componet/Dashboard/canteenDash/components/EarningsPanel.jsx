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
        <div key={card.label} className="bg-white rounded-[0.8vw] shadow-sm p-[1.5vw]">
          <h2 className="text-gray-500 mb-[0.8vh]">{card.label}</h2>
          <p className={`text-[1.5vw] font-semibold ${card.accent}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default EarningsPanel;
