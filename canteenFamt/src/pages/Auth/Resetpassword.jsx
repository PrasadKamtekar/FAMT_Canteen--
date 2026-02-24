import React from 'react'
import { Link } from "react-router-dom"
function Resetpassword() {
    return (
        <div className="bg-[#0F6657] w-[23vw] pt-[2vw] pb-[1vw] rounded-[0.6vw]">
            <h1 className="text-[1.7vw] leading-[2.5vw] mb-[1.2vw] pl-[2.2vw] font-semibold text-[#F8FAFC]">
                Reset Password
            </h1>

            <div className="bg-[#F8FAFC] rounded-[0.4vw] flex flex-col gap-4 p-[1.5vw] m-[1.3vw] pt-[2vw]">
                <div>
                    <h2 className="text-[0.9vw] text-center mb-[0.6vw] font-[400] text-gray-500"><span className="text-[#FBA808] text-[1.5vw] font-700">Enter New Password</span><br /> Your new password must be different from previously used password</h2>
                </div>
                <div>
                    <h2 className="text-[1vw] mb-[0.6vw] font-[400] text-gray-500">Password</h2>
                    <input
                        type="password"
                        className="bg-gray-200 w-[100%] p-[0.6vw] text-[0.8vw] rounded-lg outline-none"
                    />
                </div>
                <div>
                    <h2 className="text-[1vw] mb-[0.6vw] font-[400] text-gray-500">Confirm Password</h2>
                    <input
                        type="password"
                        className="bg-gray-200 w-[100%] p-[0.6vw] text-[0.8vw] rounded-lg outline-none"
                    />
                </div>
                

                <Link className="bg-[#FBA808] text-center p-[0.52vw] rounded-lg text-[1vw] text-[#F8FAFC]"> Continue </Link>



            </div>
        </div>
    )
}

export default Resetpassword
