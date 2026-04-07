import { ClipboardList, Home, LogOut, ShoppingCart, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserProfile } from "../../../utils/localstorage.jsx";

function HomeNav({ activeTab = "home" }) {
    const navigate = useNavigate();

    // LOCALSTORAGE (CURRENT USER):
    // We read the currentUser object from localStorage to greet the user by name.
    // If nothing is stored we fall back to a generic name.
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    const displayName = currentUser?.username || "User";
    const profile = getCurrentUserProfile();

    const tabs = [
        { id: "home", path: "/home", icon: <Home size={16} /> },
        { id: "orders", path: "/orders", icon: <ClipboardList size={16} /> },
        { id: "profile", path: "/profile", icon: <UserRound size={16} /> },
        { id: "cart", path: "/cart", icon: <ShoppingCart size={16} /> }
    ];

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
        <div
            id="nav"
            className="w-full bg-[#0F6657] text-[#F8FAFC] px-4 sm:px-6 py-3"
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                    FAMT<span className="text-[#FBA808]">CANTEEN</span>
                    <span className="block text-sm sm:text-base font-semibold mt-2">
                        Hello <span className="text-[#FBA808]">{displayName}!!</span>
                    </span>
                </h1>

                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => navigate(tab.path)}
                            aria-label={tab.id}
                            className={`w-9 h-9 inline-flex items-center justify-center rounded-full ${activeTab === tab.id
                                ? "bg-[#FBA808] text-[#0F6657]"
                                : "bg-[#E6F7F3] text-[#0F6657]"
                                }`}
                        >
                            {tab.icon}
                        </button>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center bg-[#F8FAFC] text-[#0F6657] w-9 h-9 rounded-full"
                        aria-label="logout"
                    >
                        <LogOut size={16} />
                    </button>
                    <button
                        onClick={() => navigate("/profile")}
                        className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#FBA808] bg-[#F8FAFC]"
                    >
                        <img
                            src={profile?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeNav
