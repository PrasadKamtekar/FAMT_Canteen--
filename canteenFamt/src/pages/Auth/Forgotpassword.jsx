import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Forgotpassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

    const handleForgot = () => {
        if (!email) {
            alert("Please enter email");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const found = users.find((u) => u.email === email);
        if (!found) {
            alert("Email not found");
            return;
        }

        const code = generateOtp();
        localStorage.setItem("otp", JSON.stringify({ email, code, purpose: "reset" }));
        alert(`Your OTP is ${code}`);
        navigate("/emailverify");
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
                            className="bg-[#FBA808] text-center w-full py-2.5 rounded-lg text-base text-[#F8FAFC]"
                        >
                            Send OTP
                        </button>
                   
                  

                </div>
            </div>
       
    )
}

export default Forgotpassword
