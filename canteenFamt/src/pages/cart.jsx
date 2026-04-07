import { useEffect, useMemo, useState } from 'react';
import { CircleCheckBig } from 'lucide-react';
import CartItemList from "../componet/Dashboard/userDash/cartItemList.jsx"
import { useNavigate } from 'react-router-dom';
import SubPageHeader from "../componet/Dashboard/userDash/SubPageHeader.jsx";
import {
  getCartFromStorage,
  saveCartToStorage,
  getOrdersFromStorage,
  saveOrdersToStorage
} from "../utils/localstorage.jsx";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => getCartFromStorage());
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Whenever cartItems change we keep localStorage in sync.
  useEffect(() => {
    // LOCALSTORAGE + CART:
    // We always store the latest cart as JSON so that
    // refreshing the page or reopening the app restores the cart.
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // TOTAL PRICE:
  // Simple reduce over all cart items: sum(price * quantity).
  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleConfirmOrder = () => {
    if (!cartItems.length) {
      return;
    }

    // ORDERS:
    // 1. Read existing orders from localStorage (fallback []).
    // 2. Append a new order with items, total and timestamp.
    // 3. Save back to localStorage and clear cart.
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    const counter = Number(localStorage.getItem("orderTokenCounter") || "100");
    const nextCounter = counter + 1;
    localStorage.setItem("orderTokenCounter", String(nextCounter));
    const token = `TKN-${nextCounter}`;

    const existingOrders = getOrdersFromStorage();
    const newOrder = {
      id: Date.now(),
      token,
      userName: currentUser?.username || "User",
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    saveOrdersToStorage([...existingOrders, newOrder]);
    setCartItems([]);
    setOrderSuccess({
      token: newOrder.token,
      userName: newOrder.userName,
      total: newOrder.total
    });
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
              <span className="font-semibold text-[#0F6657]">Rs {orderSuccess.total}</span>
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

  return (
    <div className="min-h-[100dvh] bg-[#eeeef1] pb-24">
      <SubPageHeader page="cart" />
      {/** ;list containeer */}
      <div className="px-4 sm:px-8 py-5">
        <div className="w-full max-w-6xl mx-auto gap-6 flex flex-col lg:flex-row lg:items-start">
          <div className="bg-[#ffffff] w-full lg:w-8/12 flex flex-col items-center gap-3 rounded-xl p-4 shadow-sm max-h-[58vh] overflow-y-auto">
            {cartItems.map((item) => (
              <CartItemList
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}
            {!cartItems.length && (
              <p className="text-gray-500 text-sm pb-4">Your cart is empty.</p>
            )}
          </div>

          {/** order details */}
          <div className="bg-[#ffffff] w-full lg:w-4/12 flex flex-col items-center gap-3 rounded-xl shadow-sm p-4 lg:sticky lg:top-28">
            <h1 className="text-[#666666] font-semibold tracking-wider text-lg">Bill Details</h1>
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
              <div className="flex justify-end gap-4 px-4 py-3">
                <h1 className="text-[#2e2e2e]" >Total</h1>
                <h1 className="text-[#2e2e2e]">₹{total}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] h-[11vh] flex items-center justify-center border-t border-gray-200">
        <button
          onClick={handleConfirmOrder}
          className="bg-[#e31837] text-white w-[95%] max-w-4xl py-2.5 rounded-lg tracking-wider font-medium"
        >
          Order confirm
        </button>
      </div>
    </div>
  )
}

export default Cart
