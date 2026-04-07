import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMenuFromStorage,
  getOrdersFromStorage,
  saveMenuToStorage,
  saveOrdersToStorage,
  setLocalStorage
} from "../../../utils/localstorage.jsx";
import AdminTopBar from "./components/AdminTopBar.jsx";
import MenuEditor from "./components/MenuEditor.jsx";
import OrdersPanel from "./components/OrdersPanel.jsx";
import EarningsPanel from "./components/EarningsPanel.jsx";

function CanteenHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState(() => {
    setLocalStorage();
    return getMenuFromStorage();
  });
  const [orders, setOrders] = useState(() => getOrdersFromStorage());
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = (item) => {
    const nextItems = [...menuItems, { id: Date.now(), ...item }];
    setMenuItems(nextItems);
    saveMenuToStorage(nextItems);
  };

  const handleUpdateItem = (updatedItem) => {
    const nextItems = menuItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setMenuItems(nextItems);
    saveMenuToStorage(nextItems);
  };

  const handleDeleteItem = (id) => {
    const nextItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(nextItems);
    saveMenuToStorage(nextItems);
  };

  const handleStatusChange = (orderId, status) => {
    const nextOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(nextOrders);
    saveOrdersToStorage(nextOrders);
  };

  const earnings = useMemo(() => {
    const now = new Date();
    const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

    let totalEarnings = 0;
    let dailyEarnings = 0;
    let completedCount = 0;
    let pendingCount = 0;

    orders.forEach((order) => {
      const status = order.status || "pending";
      if (status === "completed") {
        totalEarnings += order.total;
        completedCount += 1;

        const orderDate = new Date(order.createdAt);
        const orderKey = `${orderDate.getFullYear()}-${orderDate.getMonth()}-${orderDate.getDate()}`;
        if (orderKey === todayKey) {
          dailyEarnings += order.total;
        }
      } else {
        pendingCount += 1;
      }
    });

    return { totalEarnings, dailyEarnings, completedCount, pendingCount };
  }, [orders]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="min-h-[100dvh] bg-[#EDEEEF]">
      <AdminTopBar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="p-[2vw]">
        {activeTab === "menu" && (
          <MenuEditor
            items={menuItems}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            onAdd={handleAddItem}
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
          />
        )}

        {activeTab === "orders" && (
          <OrdersPanel orders={orders} onStatusChange={handleStatusChange} />
        )}

        {activeTab === "earnings" && (
          <EarningsPanel
            dailyEarnings={earnings.dailyEarnings}
            totalEarnings={earnings.totalEarnings}
            completedCount={earnings.completedCount}
            pendingCount={earnings.pendingCount}
          />
        )}
      </div>
    </div>
  );
}

export default CanteenHome;
