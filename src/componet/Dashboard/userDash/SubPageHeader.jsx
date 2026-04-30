import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SubPageHeader({ page = "orders" }) {
  const navigate = useNavigate();
  const pageMap = {
    orders: { label: "Orders" },
    profile: { label: "Profile" },
    cart: { label: "Cart" },
    wallet: { label: "Wallet" }
  };

  const active = pageMap[page] || pageMap.orders;

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-800"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
          <span className="text-black">My</span>
          <span className="text-[#FBA808]">{active.label}</span>
        </h1>
      </div>
    </div>
  );
}

export default SubPageHeader;
