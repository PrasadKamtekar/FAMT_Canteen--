import { useEffect, useMemo, useState } from 'react';
import { CircleCheckBig, Wallet, CreditCard } from 'lucide-react';
import CartItemList from "../componet/Dashboard/userDash/cartItemList.jsx"
import { useNavigate } from 'react-router-dom';
import SubPageHeader from "../componet/Dashboard/userDash/SubPageHeader.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  subscribeToCart,
  updateCartItemQuantity,
  removeFromCart,
  placeOrder,
  placeOrderWithWallet,
  getUserProfile
} from "../utils/firebaseUtils.js";
import toast from "react-hot-toast";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

function Cart() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(null);
  
  // Wallet & Payment State
  const [walletBalance, setWalletBalance] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online"); // 'online' | 'wallet'
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    
    // Subscribe to cart
    const unsubscribeCart = subscribeToCart(currentUser.uid, (items) => {
      setCartItems(items);
    });

    // Fetch wallet balance
    const fetchWallet = async () => {
      const profile = await getUserProfile(currentUser.uid);
      if (profile && profile.walletBalance !== undefined) {
        setWalletBalance(profile.walletBalance);
      }
    };
    fetchWallet();

    return () => {
      unsubscribeCart();
    };
  }, [currentUser]);

  const handleIncrease = async (id, cartDocId, currentQuantity) => {
    try {
      await updateCartItemQuantity(cartDocId, currentQuantity + 1);
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleDecrease = async (id, cartDocId, currentQuantity) => {
    try {
      await updateCartItemQuantity(cartDocId, currentQuantity - 1);
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (id, cartDocId) => {
    try {
      await removeFromCart(cartDocId);
      toast.success("Item removed");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleConfirmOrder = async () => {
    if (!currentUser) return;
    
    if (!cartItems.length) {
      toast.error("Please select an item first.");
      return;
    }

    const userName = currentUser.displayName || currentUser.email.split('@')[0];

    // --- WALLET PAYMENT LOGIC ---
    if (paymentMethod === "wallet") {
      if (walletBalance < total) {
        toast.error("Insufficient wallet balance.");
        return;
      }
      try {
        setIsProcessing(true);
        toast.loading("Processing payment from wallet...", { id: "order" });
        
        const { token } = await placeOrderWithWallet(currentUser.uid, userName, cartItems, total, walletBalance);
        
        toast.success("Order placed successfully!", { id: "order" });
        setOrderSuccess({ token, userName, total });
      } catch (error) {
        toast.error(error.message || "Failed to place order using wallet.", { id: "order" });
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // --- RAZORPAY LOGIC (ONLINE) ---
    setIsProcessing(true);
    toast.loading("Loading payment gateway...", { id: "order" });
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      toast.error("Failed to load payment gateway", { id: "order" });
      setIsProcessing(false);
      return;
    }

    const options = {
      key: "rzp_test_SfLSUjiPymkMlt",
      amount: total * 100, // Amount is in paise
      currency: "INR",
      name: "FAMT Canteen",
      description: "Food Order Payment",
      image: "https://cdn-icons-png.flaticon.com/512/3703/3703377.png",
      config: {
        display: {
          hide: [{ method: "card" }, { method: "netbanking" }, { method: "wallet" }]
        }
      },
      handler: async function (response) {
        try {
          toast.loading("Placing order...", { id: "order" });
          const { token } = await placeOrder(currentUser.uid, userName, cartItems, total);
          toast.success("Order placed successfully!", { id: "order" });
          setOrderSuccess({ token, userName, total });
        } catch (error) {
          toast.error("Failed to save order", { id: "order" });
        } finally {
          setIsProcessing(false);
        }
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          toast.dismiss("order");
        }
      },
      prefill: {
        name: userName,
        email: currentUser.email,
        contact: "9999999999"
      },
      theme: {
        color: "#0F6657"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      toast.error(response.error.description || "Payment failed", { id: "order" });
      setIsProcessing(false);
    });

    paymentObject.open();
    toast.dismiss("order");
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[100dvh] bg-white flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="px-6 pt-6 pb-4 text-center">
            <div className="flex justify-center mb-3">
              <CircleCheckBig className="text-green-600" size={34} />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-[#0F6657]">
              Order Placed Successfully
            </h1>
          </div>

          <div className="bg-white px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm sm:text-base text-gray-700">
              <span>Token Number</span>
              <span className="font-semibold text-[#0F6657]">{orderSuccess.token}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base text-gray-700">
              <span>User Name</span>
              <span className="font-semibold text-[#0F6657]">{orderSuccess.userName}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base text-gray-700">
              <span>Total Amount</span>
              <span className="font-semibold text-[#0F6657]">₹{orderSuccess.total}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => navigate("/home")}
                className="w-full mt-1 bg-[#FBA808] text-[#F8FAFC] py-2.5 rounded-lg font-semibold"
              >
                Back to Menu
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="w-full mt-1 bg-[#E6F7F3] text-[#00AD8F] py-2.5 rounded-lg font-semibold"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isWalletDisabled = walletBalance < total;

  return (
    <div className="min-h-[100dvh] bg-[#eeeef1] pb-[20vh] sm:pb-[15vh]">
      <SubPageHeader page="cart" />
      <div className="px-4 sm:px-8 py-5">
        <div className="w-full max-w-6xl mx-auto gap-6 flex flex-col lg:flex-row lg:items-start">
          
          {/* Cart Items */}
          <div className="bg-[#ffffff] w-full lg:w-7/12 flex flex-col items-center gap-3 rounded-xl p-4 shadow-sm max-h-[50vh] overflow-y-auto">
            {cartItems.map((item) => (
              <CartItemList
                key={item.id}
                item={item}
                onIncrease={() => handleIncrease(item.id, item.cartDocId, item.quantity)}
                onDecrease={() => handleDecrease(item.id, item.cartDocId, item.quantity)}
                onRemove={() => handleRemove(item.id, item.cartDocId)}
              />
            ))}
            {!cartItems.length && (
              <p className="text-gray-500 text-sm pb-4">Your cart is empty.</p>
            )}
          </div>

          {/* Checkout & Payment Details */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4 lg:sticky lg:top-28">
            
            {/* Bill Details */}
            <div className="bg-[#ffffff] flex flex-col items-center gap-3 rounded-xl shadow-sm p-4">
              <h1 className="text-[#666666] font-semibold tracking-wider text-lg w-full text-center">Bill Details</h1>
              <div className="bg-[#ffffff] w-full rounded-xl tracking-wide border border-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between px-4 py-2 text-sm sm:text-base"
                  >
                    <h1 className="text-[#666666]">
                      {item.name} x {item.quantity}
                    </h1>
                    <h1 className="text-[#2e2e2e]">₹{item.price * item.quantity}</h1>
                  </div>
                ))}
                <hr className="w-[92%] mx-auto text-[#666666]" />
                <div className="flex justify-end gap-4 px-4 py-3 font-medium">
                  <h1 className="text-[#2e2e2e]" >Total</h1>
                  <h1 className="text-[#0F6657]">₹{total}</h1>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            {cartItems.length > 0 && (
              <div className="bg-[#ffffff] rounded-xl shadow-sm p-4">
                <h1 className="text-[#666666] font-semibold tracking-wider text-lg mb-3">Payment Method</h1>
                
                <div className="space-y-3">
                  <label 
                    className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "online" ? "border-[#0F6657] bg-[#E6F7F3]" : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="mt-1 accent-[#0F6657]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-medium text-gray-800">
                        <CreditCard size={18} className="text-[#0F6657]" /> Online Payment
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">Pay via Razorpay (UPI, Pay Later)</div>
                    </div>
                  </label>

                  <label 
                    className={`flex items-start gap-3 p-3 border rounded-lg transition-colors ${
                      isWalletDisabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer hover:bg-gray-50"
                    } ${paymentMethod === "wallet" ? "border-[#0F6657] bg-[#E6F7F3]" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      checked={paymentMethod === "wallet"}
                      onChange={() => !isWalletDisabled && setPaymentMethod("wallet")}
                      disabled={isWalletDisabled}
                      className="mt-1 accent-[#0F6657]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium text-gray-800">
                          <Wallet size={18} className="text-[#0F6657]" /> Canteen Wallet
                        </div>
                        <div className="font-semibold text-sm text-[#0F6657]">₹{walletBalance.toFixed(2)}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {isWalletDisabled 
                          ? "Insufficient balance for this order." 
                          : "Deduct directly from your wallet balance."}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] h-[11vh] flex items-center justify-center border-t border-gray-200 z-50">
        <button
          onClick={handleConfirmOrder}
          disabled={isProcessing || (paymentMethod === "wallet" && isWalletDisabled)}
          className="bg-[#e31837] hover:bg-[#c91530] text-white w-[95%] max-w-4xl py-3 rounded-lg tracking-wider font-semibold disabled:opacity-50 transition-colors"
        >
          {isProcessing ? "Processing..." : cartItems.length ? `Confirm Order • ₹${total}` : "Order confirm"}
        </button>
      </div>
    </div>
  )
}

export default Cart;
