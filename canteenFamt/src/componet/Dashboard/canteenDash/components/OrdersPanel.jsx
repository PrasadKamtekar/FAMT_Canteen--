function OrdersPanel({ orders, onStatusChange }) {
  return (
    <div className="bg-white rounded-[0.8vw] shadow-sm p-[1.3vw]">
      <h2 className="text-[1.1vw] font-semibold text-[#0F6657] mb-[1.2vh]">Orders</h2>

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
              className="border border-gray-100 rounded-[0.8vw] p-[1.1vw]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-gray-500 text-[0.9vw]">Order ID</div>
                  <div className="text-[#0F6657] font-semibold text-[1vw]">
                    #{order.id}
                  </div>
                  <div className="mt-[0.4vh] inline-flex items-center text-[#00AD8F] font-semibold text-[0.9vw]">
                    Token: {order.token || order.id}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-[0.6vh]">
                  <div className="text-gray-500 text-[0.9vw]">Status</div>
                  <span className={`rounded-[0.6vw] px-[0.8vw] py-[0.3vh] text-[0.86vw] font-semibold ${statusClass}`}>
                    {status === "completed" ? "Completed" : status === "cancelled" ? "Cancelled" : "Pending"}
                  </span>
                </div>
              </div>

              <div className="mt-[0.7vh]">
                <div className="text-gray-700 font-medium text-[0.95vw]">
                    {order.userName || "Customer"}
                </div>
              </div>

              <div className="mt-[1.1vh] text-gray-700 text-[0.95vw] space-y-[0.3vh]">
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.id}`}>
                    {item.name} x {item.quantity}
                  </div>
                ))}
              </div>

              <div className="mt-[1.2vh] flex justify-end">
                <div className="flex flex-col items-end gap-[0.5vh]">
                  <div className="text-[#0F6657] font-semibold text-[1vw]">
                    Total: Rs {order.total}
                  </div>
                  {status !== "cancelled" && (
                    <div className="flex gap-[0.4vw]">
                      <button
                        onClick={() => onStatusChange(order.id, "pending")}
                        className={`rounded-[0.45vw] px-[0.7vw] py-[0.2vh] text-[0.83vw] transition-all duration-150 active:scale-[0.98] ${status === "pending"
                          ? "bg-[#e31837] text-white shadow-sm hover:bg-[#c81430]"
                          : "bg-[#ffeaf2] text-[#e31837] hover:bg-[#ffd6e6]"
                          }`}
                      >
                        Mark Pending
                      </button>
                      <button
                        onClick={() => onStatusChange(order.id, "completed")}
                        className={`rounded-[0.45vw] px-[0.7vw] py-[0.2vh] text-[0.83vw] transition-all duration-150 active:scale-[0.98] ${status === "completed"
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
          <div className="text-gray-500 text-[0.95vw] py-[1.2vw]">
            No orders yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPanel;
