import { ClipboardList, Home, LogOut, ShoppingCart, User, Wallet, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../utils/firebaseUtils.js";

function HomeNav({ activeTab = "home" }) {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!currentUser) return;
        const fetchProfile = async () => {
            const data = await getUserProfile(currentUser.uid);
            if (data) setProfile(data);
        };
        fetchProfile();
    }, [currentUser]);

    // Determine display name
    // Prefer the username from the fetched profile, fallback to auth object or email.
    const displayName = profile?.username || currentUser?.displayName || currentUser?.email?.split('@')[0] || "User";

    const tabs = [
        { id: "wallet", path: "/wallet", icon: <Wallet size={16} /> },
        { id: "orders", path: "/orders", icon: <ClipboardList size={16} /> },
        { id: "cart", path: "/cart", icon: <ShoppingCart size={16} /> }
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div
            id="nav"
            className="w-full bg-[#0F6657] text-[#F8FAFC] px-4 sm:px-6 py-3 relative"
        >
            <div className="flex flex-row items-center justify-between gap-3">
                <h1 className="text-xl sm:text-3xl font-bold leading-tight">
                    FAMT<span className="text-[#FBA808]">CANTEEN</span>
                    <span className="block text-xs sm:text-base font-semibold mt-1 sm:mt-2">
                        Hello <span className="text-[#FBA808]">{displayName}!!</span>
                    </span>
                </h1>

                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => navigate(tab.path)}
                            aria-label={tab.id}
                            className={`w-8 h-8 sm:w-9 sm:h-9 items-center justify-center rounded-full ${
                                activeTab === tab.id ? "bg-[#FBA808] text-[#0F6657]" : "bg-[#E6F7F3] text-[#0F6657]"
                            } ${tab.id !== 'cart' ? 'hidden sm:inline-flex' : 'inline-flex'}`}
                        >
                            {tab.icon}
                        </button>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="hidden sm:inline-flex items-center justify-center bg-[#F8FAFC] text-[#0F6657] w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-gray-200"
                        aria-label="logout"
                    >
                        <LogOut size={16} />
                    </button>
                    <button
                        onClick={() => navigate("/profile")}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#FBA808] bg-[#F8FAFC] flex items-center justify-center text-[#0F6657] shrink-0"
                    >
                        {profile?.profileImage ? (
                            <img
                                src={profile.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={18} className="sm:w-[20px] sm:h-[20px]" />
                        )}
                    </button>

                    {/* Hamburger Menu Button for Mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="sm:hidden inline-flex items-center justify-center bg-[#E6F7F3] text-[#0F6657] w-8 h-8 rounded-md shrink-0"
                        aria-label="menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden absolute top-full right-4 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-[70] border border-gray-100 flex flex-col">
                    <button
                        onClick={() => { setIsMobileMenuOpen(false); navigate("/wallet"); }}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'wallet' ? 'text-[#FBA808] bg-orange-50' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        <Wallet size={18} /> Wallet
                    </button>
                    <button
                        onClick={() => { setIsMobileMenuOpen(false); navigate("/orders"); }}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'orders' ? 'text-[#FBA808] bg-orange-50' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        <ClipboardList size={18} /> Orders
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                        onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default HomeNav
