import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function Forgotpassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleForgot = async () => {
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        try {
            setLoading(true);
            await resetPassword(email);
            toast.success("Password reset email sent! Check your inbox.");
            navigate("/login");
        } catch (error) {
            toast.error("Failed to reset password: " + error.message);
        }
        setLoading(false);
    };

    return (
            <div className="bg-[#0F6657] w-[90%] max-w-[400px] rounded-2xl shadow-sm p-5 sm:p-6">
                <h1 className="text-xl sm:text-2xl leading-tight pb-3 font-semibold text-[#F8FAFC] text-left">
                    Forgot Password
                </h1>
                <div className="bg-[#F8FAFC] rounded-xl flex flex-col gap-4 p-4 sm:p-5 mt-1">
                    <div>
                        <h2 className="text-sm sm:text-base text-center mb-2 font-[400] text-gray-500"><span className="text-[#FBA808] text-base sm:text-lg font-700">Mail Address Here</span><br /> Enter the email address associated with your account</h2>

                    </div>
                    <input
                    placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-200 w-full px-3 py-2.5 text-sm sm:text-base rounded-lg outline-none"
                    />
                   
                        <button
                            onClick={handleForgot}
                            disabled={loading}
                            className="bg-[#FBA808] text-center w-full py-2.5 rounded-lg text-base text-[#F8FAFC] disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                   
                  

                </div>
            </div>
       
    )
}

export default Forgotpassword
