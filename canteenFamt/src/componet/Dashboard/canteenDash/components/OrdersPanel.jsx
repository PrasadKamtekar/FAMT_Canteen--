function OrdersPanel({ orders, onStatusChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-[#0F6657] mb-4">Orders</h2>

      <div className="flex flex-col gap-3">
        {orders.map((order) => {
          const status = order.status || "pending";
          const statusClass =
            status === "completed"
              ? "bg-[#DFF5EC] text-[#1F7A63]"
              : status === "cancelled"
              ? "bg-gray-200 text-gray-600"
              : "bg-[#ffeaf2] text-[#e31837]";

          return (
            <div
              key={order.id}
              className="border border-gray-100 rounded-xl p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-gray-500 text-sm sm:text-base">Order ID</div>
                  <div className="text-[#0F6657] font-semibold text-base sm:text-lg">
                    #{order.id}
                  </div>
                  <div className="mt-1 inline-flex items-center text-[#00AD8F] font-semibold text-sm sm:text-base">
                    Token: {order.token || order.id}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 sm:gap-2">
                  <div className="text-gray-500 text-sm sm:text-base">Status</div>
                  <span className={`rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold ${statusClass}`}>
                    {status === "completed" ? "Completed" : status === "cancelled" ? "Cancelled" : "Pending"}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-gray-700 font-medium text-sm sm:text-base">
                    {order.userName || "Customer"}
                </div>
              </div>

              <div className="mt-3 text-gray-700 text-sm sm:text-base space-y-1">
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.id}`}>
                    {item.name} x {item.quantity}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <div className="flex flex-col items-end gap-2">
                  <div className="text-[#0F6657] font-semibold text-base sm:text-lg">
                    Total: Rs {order.total}
                  </div>
                  {status !== "cancelled" && (
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-end">
                      <button
                        onClick={() => onStatusChange(order.id, "pending")}
                        className={`rounded-md px-3 py-1.5 text-xs sm:text-sm transition-all duration-150 active:scale-[0.98] ${status === "pending"
                          ? "bg-[#e31837] text-white shadow-sm hover:bg-[#c81430]"
                          : "bg-[#ffeaf2] text-[#e31837] hover:bg-[#ffd6e6]"
                          }`}
                      >
                        Mark Pending
                      </button>
                      <button
                        onClick={() => onStatusChange(order.id, "completed")}
                        className={`rounded-md px-3 py-1.5 text-xs sm:text-sm transition-all duration-150 active:scale-[0.98] ${status === "completed"
                          ? "bg-[#1F7A63] text-white shadow-sm hover:bg-[#18624f]"
                          : "bg-[#DFF5EC] text-[#1F7A63] hover:bg-[#cfeee0]"
                          }`}
                      >
                        Mark Completed
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {!orders.length && (
          <div className="text-gray-500 text-sm sm:text-base py-4">
            No orders yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPanel;
