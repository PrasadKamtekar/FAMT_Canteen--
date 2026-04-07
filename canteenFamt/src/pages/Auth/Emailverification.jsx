import { useState } from 'react'
import { useNavigate } from "react-router-dom"
function Emailverification() {
    const [otpInput, setOtpInput] = useState("");
    const navigate = useNavigate();

    const handleVerifyOtp = () => {
        const otpData = JSON.parse(localStorage.getItem("otp")) || null;
        if (!otpData?.code) {
            alert("No OTP found. Please try again.");
            return;
        }

        if (String(otpInput) !== String(otpData.code)) {
            alert("Wrong OTP");
            return;
        }

        if (otpData.purpose === "signup") {
            const pendingSignup = JSON.parse(localStorage.getItem("pendingSignup")) || null;
            if (!pendingSignup) {
                alert("Signup data missing.");
                return;
            }
            const users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(pendingSignup);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.removeItem("pendingSignup");
            localStorage.removeItem("otp");
            alert("Signup successful. Please login.");
            navigate("/login");
            return;
        }

        if (otpData.purpose === "reset") {
            localStorage.setItem("resetEmail", otpData.email);
            localStorage.removeItem("otp");
            navigate("/resetpassword");
        }
    };

    return (
        <div className="bg-[#0F6657] w-[90%] max-w-[400px] rounded-2xl shadow-sm p-5 sm:p-6">
            <h1 className="text-xl sm:text-2xl leading-tight pb-3 font-semibold text-[#F8FAFC] text-left">
                Verify OTP
            </h1>
            <div className="bg-[#F8FAFC] rounded-xl flex flex-col gap-4 p-4 sm:p-5 mt-1">
                <div>
                    <h2 className="text-sm sm:text-base text-center mb-2 font-[400] text-gray-500"><span className="text-[#FBA808] text-base sm:text-lg font-700">Get Your Code</span><br /> Please enter the 4 digit code sent to your email address</h2>
                </div>
                <div className="flex justify-center">
                    <input
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="bg-gray-200 w-full px-3 py-2.5 text-center text-sm sm:text-base rounded-lg outline-none"
                        maxLength="4"
                    />
                </div>
                
                <button
                    onClick={handleVerifyOtp}
                    className="bg-[#FBA808] w-full py-2.5 rounded-lg text-base text-[#F8FAFC] text-center"
                >
                    Verify OTP
                </button>

            </div>
        </div>
    )
}

export default Emailverification
