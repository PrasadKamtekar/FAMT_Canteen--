import { useState, useEffect } from "react";
import SubPageHeader from "../componet/Dashboard/userDash/SubPageHeader.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getUserProfile } from "../utils/firebaseUtils.js";
import { Wallet as WalletIcon, Info } from "lucide-react";

function Wallet() {
    const { currentUser } = useAuth();
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWallet() {
            if (currentUser?.uid) {
                try {
                    const data = await getUserProfile(currentUser.uid);
                    if (data && data.walletBalance !== undefined) {
                        setBalance(data.walletBalance);
                    } else {
                        setBalance(0);
                    }
                } catch (error) {
                    console.error("Error fetching wallet balance", error);
                }
            }
            setLoading(false);
        }
        fetchWallet();
    }, [currentUser]);

    return (
        <>
            <SubPageHeader page="wallet" />
            <div className="bg-[#eeeef1] min-h-[calc(100dvh-90px)] px-4 py-8">
                <div className="w-full flex justify-center">
                    <div className="bg-white w-full max-w-xl rounded-xl shadow-md p-5 sm:p-7">
                        
                        {/* Balance Section */}
                        <div className="bg-gradient-to-r from-[#0F6657] to-[#168875] rounded-xl p-6 text-white mb-6 shadow-lg relative overflow-hidden">
                            <WalletIcon className="absolute -right-4 -bottom-4 opacity-10" size={120} />
                            <h2 className="text-sm font-medium opacity-90 mb-1">Available Balance</h2>
                            <div className="text-3xl sm:text-4xl font-bold">
                                ₹{loading ? "..." : balance.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wallet;
