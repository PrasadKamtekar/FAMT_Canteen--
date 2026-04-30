import { useEffect, useState } from "react";
import SubPageHeader from "../componet/Dashboard/userDash/SubPageHeader.jsx";
import { subscribeToUserOrders, updateOrderStatus } from "../utils/firebaseUtils.js";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { Loader2, X } from "lucide-react";

function MyOrders() {
  const { currentUser } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  
  // Cancellation Modal State
  const [cancelOrderData, setCancelOrderData] = useState(null);
  const [refundChoice, setRefundChoice] = useState("wallet");
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = subscribeToUserOrders(currentUser.uid, (orders) => {
      setUserOrders(orders);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const confirmCancelOrder = async () => {
    if (!cancelOrderData) return;
    
    try {
      setIsCancelling(true);
      await updateOrderStatus(cancelOrderData.id, "cancelled", refundChoice);
      toast.success("Order cancelled successfully");
      setCancelOrderData(null); // Close modal
    } catch (error) {
      toast.error("Failed to cancel order");
      console.error(error);
    } finally {
      setIsCancelling(false);
    }
  };

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
                  <span className={`font-semibold ${
                    order.status === "completed" ? "text-green-600" :
                    order.status === "cancelled" ? "text-red-500" :
                    "text-[#0F6657]"
                  }`}>
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

              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center text-[#0F6657] font-semibold">
                <span>Total: ₹{order.total}</span>
                {order.status === "pending" && (
                  <button
                    onClick={() => setCancelOrderData(order)}
                    className="text-sm font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors"
                  >
                    Cancel Order
                  </button>
                )}
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

      {/* Cancellation Modal */}
      {cancelOrderData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 bg-[#0F6657] text-white">
              <h2 className="text-lg font-semibold tracking-wide">Cancel Order</h2>
              <button 
                onClick={() => !isCancelling && setCancelOrderData(null)}
                className="text-white/80 hover:text-white transition-colors"
                disabled={isCancelling}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to cancel this order? Please select your preferred refund method:
              </p>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="refundMethod"
                    value="wallet"
                    checked={refundChoice === "wallet"}
                    onChange={() => setRefundChoice("wallet")}
                    className="mt-1 accent-[#0F6657]"
                  />
                  <div>
                    <div className="font-medium text-gray-800 text-sm">Direct Wallet Transfer</div>
                    <div className="text-xs text-gray-500 mt-0.5">Instant refund to your canteen wallet. Can be used for future orders.</div>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="refundMethod"
                    value="original"
                    checked={refundChoice === "original"}
                    onChange={() => setRefundChoice("original")}
                    className="mt-1 accent-[#0F6657]"
                  />
                  <div>
                    <div className="font-medium text-gray-800 text-sm">Original Payment Method</div>
                    <div className="text-xs text-gray-500 mt-0.5">Refund processed back to your bank/card/UPI. May take 3-5 business days.</div>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t">
              <button
                onClick={() => setCancelOrderData(null)}
                disabled={isCancelling}
                className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors disabled:opacity-50"
              >
                Go Back
              </button>
              <button
                onClick={confirmCancelOrder}
                disabled={isCancelling}
                className="px-5 py-2 text-sm font-semibold text-[#0F6657] bg-[#FBA808] hover:bg-[#e59807] rounded-lg transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {isCancelling ? <Loader2 size={16} className="animate-spin" /> : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default MyOrders;
