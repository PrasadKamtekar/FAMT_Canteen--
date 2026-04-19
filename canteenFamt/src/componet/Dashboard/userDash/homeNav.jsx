import { ClipboardList, Home, LogOut, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../utils/firebaseUtils.js";

function HomeNav({ activeTab = "home" }) {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [profile, setProfile] = useState(null);

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
                        className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#FBA808] bg-[#F8FAFC] flex items-center justify-center text-[#0F6657]"
                    >
                        {profile?.profileImage ? (
                            <img
                                src={profile.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeNav
