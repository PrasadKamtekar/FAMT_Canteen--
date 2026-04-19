import { useEffect, useState } from "react";
import SubPageHeader from "../componet/Dashboard/userDash/SubPageHeader.jsx";
import { subscribeToUserOrders } from "../utils/firebaseUtils.js";
import { useAuth } from "../context/AuthContext.jsx";

function MyOrders() {
  const { currentUser } = useAuth();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = subscribeToUserOrders(currentUser.uid, (orders) => {
      setUserOrders(orders);
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="min-h-[100dvh] bg-[#eeeef1]">
      <SubPageHeader page="orders" />
      <div className="px-4 sm:px-8 py-6 max-w-5xl mx-auto">
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
              <div className="flex flex-wrap justify-between gap-2 text-sm sm:text-base">
                <p className="text-gray-700">
                  Token: <span className="font-semibold text-[#0F6657]">{order.token || order.id}</span>
                </p>
                <p className="text-gray-700">
                  Status:{" "}
                  <span className={`font-semibold ${order.status === "completed" ? "text-green-600" : "text-[#0F6657]"}`}>
                    {(order.status || "pending").toUpperCase()}
                  </span>
                </p>
              </div>

              <div className="mt-3 space-y-1 text-sm sm:text-base text-gray-700">
                {order.items.map((item) => (
                  <p key={`${order.id}-${item.id}`}>
                    {item.name} x {item.quantity}
                  </p>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 text-right text-[#0F6657] font-semibold">
                Total: Rs {order.total}
              </div>
            </div>
          ))}

          {!userOrders.length && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
