
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  const handleSignup = () => {
    if (!username || !email || !password) {
      alert("Please enter username, email and password");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = existingUsers.some(
      (u) => u.username === username || u.email === email
    );
    if (alreadyExists) {
      alert("User already exists with same username/email");
      return;
    }

    const code = generateOtp();
    localStorage.setItem("otp", JSON.stringify({ email, code, purpose: "signup" }));
    localStorage.setItem("pendingSignup", JSON.stringify({ username, email, password }));
    alert(`Your OTP is ${code}`);

    setUsername("");
    setEmail("");
    setPassword("");
    navigate("/emailverify");
  };

  return (
    <div className="bg-[#0F6657] w-[90%] max-w-[400px] rounded-2xl shadow-sm p-5 sm:p-6">
      <div className="pb-3">
        <h1 className="text-xl sm:text-2xl leading-tight font-semibold text-[#F8FAFC] text-left">
          Create account for <br />
          FAMT<span className="text-[#FBA808]">CANTEEN</span>
        </h1>
      </div>

      <div className="bg-[#F8FAFC] rounded-xl flex flex-col gap-4 p-4 sm:p-5 mt-1">
        <div>
          <h2 className="text-sm sm:text-base mb-2 font-[400] text-gray-500">Username</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="bg-gray-200 w-full px-3 py-2.5 text-sm sm:text-base rounded-lg outline-none"
          />
        </div>
        <div>
          <h2 className="text-sm sm:text-base mb-2 font-[400] text-gray-500">Email</h2>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="bg-gray-200 w-full px-3 py-2.5 text-sm sm:text-base rounded-lg outline-none"
          />
        </div>
        <div>
          <h2 className="text-sm sm:text-base mb-2 font-[400] text-gray-500">Password</h2>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-gray-200 w-full px-3 py-2.5 text-sm sm:text-base rounded-lg outline-none"
          />
        </div>

        <button
          onClick={handleSignup}
          className="bg-[#FBA808] w-full py-2.5 rounded-lg text-base text-[#F8FAFC] font-semibold"
        >
          Sign up
        </button>
      </div>
      <div className="pt-4 text-center">
        <h1 className="text-sm sm:text-base text-[#F8FAFC]">
          Already have an account?{" "}
          <span className="font-[600] text-[#FBA808]"><Link to="/login">Login</Link></span>
        </h1>
      </div>
    </div>
  )
}

export default Signup
