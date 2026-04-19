import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please enter username, email and password");
      return;
    }

    try {
      setError("");
      setLoading(true);
      
      // Create user in Firebase Auth
      const userCredential = await signup(email, password);
      const user = userCredential.user;
      
      // Add user to Firestore database
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: username,
        email: email,
        role: email === "famt@gmail.com" ? "admin" : "customer",
        createdAt: new Date()
      });

      toast.success("Signup successful! Welcome to FAMTCANTEEN.");
      
      if (email === "famt@gmail.com") {
        navigate("/canteendashboard");
      } else {
        navigate("/home");
      }
      
    } catch (err) {
      let friendlyMessage = 'An unexpected error occurred.';
      switch (err.code) {
        case 'auth/email-already-in-use':
          friendlyMessage = 'An account already exists with this email.';
          break;
        case 'auth/invalid-email':
          friendlyMessage = 'The email address is not valid.';
          break;
        case 'auth/weak-password':
          friendlyMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/network-request-failed':
          friendlyMessage = 'Network error. Please check your connection.';
          break;
        default:
          friendlyMessage = err.message || 'Failed to create an account.';
      }
      setError(friendlyMessage);
      toast.error(friendlyMessage);
    }
    
    setLoading(false);
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
        {error && <div className="bg-red-100 text-red-600 p-2 rounded text-sm">{error}</div>}
        
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
          disabled={loading}
          className="bg-[#FBA808] w-full py-2.5 rounded-lg text-base text-[#F8FAFC] font-semibold disabled:opacity-50"
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
