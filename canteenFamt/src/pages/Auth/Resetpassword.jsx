import { useState } from 'react'
import { useNavigate } from "react-router-dom"
function Resetpassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleReset = () => {
        const resetEmail = localStorage.getItem("resetEmail");
        if (!resetEmail) {
            alert("Reset session not found.");
            navigate("/forgotpassword");
            return;
        }

        if (!password || !confirmPassword) {
            alert("Please fill both password fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
            u.email === resetEmail ? { ...u, password } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.removeItem("resetEmail");
        alert("Password reset successful.");
        navigate("/login");
    };

    return (
        <div className="bg-[#0F6657] w-[90%] max-w-[400px] rounded-2xl shadow-sm p-5 sm:p-6">
            <h1 className="text-xl sm:text-2xl leading-tight pb-3 font-semibold text-[#F8FAFC] text-left">
                Reset Password
            </h1>

            <div className="bg-[#F8FAFC] rounded-xl flex flex-col gap-4 p-4 sm:p-5 mt-1">
                <div>
                    <h2 className="text-sm sm:text-base text-center mb-2 font-[400] text-gray-500"><span className="text-[#FBA808] text-base sm:text-lg font-700">Enter New Password</span><br /> Your new password must be different from previously used password</h2>
                </div>
                <div>
                    <h2 className="text-sm sm:text-base mb-2 font-[400] text-gray-500">New Password</h2>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="bg-gray-200 w-full px-3 py-2.5 text-sm sm:text-base rounded-lg outline-none"
                    />
                </div>
                <div>
                    <h2 className="text-sm sm:text-base mb-2 font-[400] text-gray-500">Confirm Password</h2>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        className="bg-gray-200 w-full px-3 py-2.5 text-sm sm:text-base rounded-lg outline-none"
                    />
                </div>
                

                <button
                    onClick={handleReset}
                    className="bg-[#FBA808] text-center w-full py-2.5 rounded-lg text-base text-[#F8FAFC]"
                >
                    Update Password
                </button>



            </div>
        </div>
    )
}

export default Resetpassword
