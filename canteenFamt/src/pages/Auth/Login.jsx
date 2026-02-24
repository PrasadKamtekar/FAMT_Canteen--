
import { Link } from "react-router-dom"
import { useState } from "react";
function Login({handleLogin}){
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    
  
    
    return (
        <div className="bg-[#0F6657] w-[23vw] pt-[2vw] rounded-[0.6vw]">
            <h1 className="text-[1.7vw] leading-[2.5vw] mb-[1.2vw] pl-[2.2vw] font-semibold text-[#F8FAFC]">
                Sign in to <br />
                FAMT<span className="text-[#FBA808]">CANTEEN</span>
            </h1>
            <div className="bg-[#F8FAFC] rounded-[0.4vw] flex flex-col gap-4 p-[1.5vw] m-[1.3vw] pt-[2vw]">
                <div>
                    <h2 className="text-[1vw] mb-[0.6vw] font-[400] text-gray-500">Username</h2>
                    <input
                        onChange={(e) => {
                            setusername(e.target.value);
                        }}
                        value={username}
                        type="text"
                        className="bg-gray-200 w-[100%] p-[0.6vw] text-[0.8vw] rounded-lg outline-none"
                    />
                </div>
                <div>
                    <h2 className="text-[1vw] mb-[0.6vw] font-[400] text-gray-500">Password</h2>
                    <input
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                        value={password}
                        type="password"
                        className="bg-gray-200 w-[100%] p-[0.6vw] text-[0.8vw] rounded-lg outline-none"
                    />
                </div>
                <button onClick={()=> {
                      handleLogin(username,password);
                     setusername("");
                     setpassword("");
                }}
                
                    className="bg-[#FBA808] p-[0.52vw] rounded-lg text-[1vw] text-[#F8FAFC]">
                    Sign in
                </button>
                <div>
                    <h2 className="text-[1vw] text-center font-medium text-[#0F6657]">
                        <Link to="/forgotpassword">Forgot Password?</Link>
                    </h2>
                </div>
            </div>
            <div className="mt-[2vw] mb-[1vw] text-center">
                <h1 className="text-[0.85vw] text-[#F8FAFC]">
                    Don't have an account?{" "}
                    <span className="font-[600] text-[#FBA808]"> <Link to="/signup">Sign Up</Link></span>
                </h1>
            </div>

        </div>

    )
}

export default Login
