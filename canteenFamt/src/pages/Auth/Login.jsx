
import { Link } from "react-router-dom"
import { useState } from "react";
function Login({handleLogin}){
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    
  
    
    return (
        <div className="bg-[#0F6657] w-[90%] max-w-[400px] rounded-2xl shadow-sm p-5 sm:p-6">
            <div className="pb-3">
                <h1 className="text-xl sm:text-2xl leading-tight font-semibold text-[#F8FAFC] text-left">
                    Sign in to <br />
                    FAMT<span className="text-[#FBA808]">CANTEEN</span>
                </h1>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl flex flex-col gap-4 p-4 sm:p-5 mt-1">
                <div>
                    <h2 className="text-sm sm:text-base mb-2 font-[400] text-gray-500">Email / Username</h2>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        type="text"
                        className="bg-gray-200 w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg outline-none"
                    />
                </div>
                <div>
                    <h2 className="text-sm sm:text-base mb-2 font-[400] text-gray-500">Password</h2>
                    <input
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                        value={password}
                        type="password"
                        className="bg-gray-200 w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg outline-none"
                    />
                </div>
                <button onClick={()=> {
                      handleLogin(email,password);
                     setEmail("");
                     setpassword("");
                }}
                
                    className="bg-[#FBA808] w-full py-2.5 rounded-lg text-base text-[#F8FAFC] font-semibold">
                    Sign in
                </button>
                <div>
                    <h2 className="text-sm sm:text-base text-center font-medium text-[#0F6657]">
                        <Link to="/forgotpassword">Forgot Password?</Link>
                    </h2>
                </div>
            </div>

            <div className="pt-4 text-center">
                <h1 className="text-sm sm:text-base text-[#F8FAFC]">
                    Don't have an account?{" "}
                    <span className="font-[600] text-[#FBA808]"> <Link to="/signup">Sign Up</Link></span>
                </h1>
            </div>

        </div>

    )
}

export default Login
