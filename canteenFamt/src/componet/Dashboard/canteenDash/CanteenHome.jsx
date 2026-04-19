import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  subscribeToMenu,
  subscribeToAllOrders,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  updateOrderStatus
} from "../../../utils/firebaseUtils.js";
import AdminTopBar from "./components/AdminTopBar.jsx";
import MenuEditor from "./components/MenuEditor.jsx";
import OrdersPanel from "./components/OrdersPanel.jsx";
import EarningsPanel from "./components/EarningsPanel.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import toast from "react-hot-toast";

function CanteenHome() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const unsubscribeMenu = subscribeToMenu((items) => {
      setMenuItems(items);
    });
    
    const unsubscribeOrders = subscribeToAllOrders((items) => {
      setOrders(items);
    });

    return () => {
      unsubscribeMenu();
      unsubscribeOrders();
    };
  }, []);

  const handleAddItem = async (item, imageFile = null) => {
    await addMenuItem(item, imageFile);
  };

  const handleUpdateItem = async (updatedItem, imageFile = null) => {
    const { id, ...data } = updatedItem;
    await updateMenuItem(id, data, imageFile);
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteMenuItem(id);
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success("Order status updated");
    } catch (error) {
      toast.error("Failed to update order status");
    }
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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
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
