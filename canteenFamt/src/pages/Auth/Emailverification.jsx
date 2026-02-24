import React from 'react'
import { Link } from "react-router-dom"
function Emailverification() {
    return (
        <div className="bg-[#0F6657] w-[23vw] pt-[2vw] pb-[1vw] rounded-[0.6vw]">
            <h1 className="text-[1.7vw] leading-[2.5vw] mb-[1.2vw] pl-[2.2vw] font-semibold text-[#F8FAFC]">
                Forgot Password
            </h1>
            <div className="bg-[#F8FAFC] rounded-[0.4vw] flex flex-col gap-4 p-[1.5vw] m-[1.3vw] pt-[2vw]">
                <div>
                    <h2 className="text-[0.9vw] text-center mb-[0.6vw] font-[400] text-gray-500"><span className="text-[#FBA808] text-[1.5vw] font-700">Get Your Code</span><br /> Please enter the 4 digit code that sent to your email address</h2>
                </div>
                <div className="flex gap-3 justify-center">
                    <input className="bg-gray-200 w-[3vw] h-[3vw] text-center text-[1vw] rounded-lg outline-none" maxLength="1" />
                    <input className="bg-gray-200 w-[3vw] h-[3vw] text-center text-[1vw] rounded-lg outline-none" maxLength="1" />
                    <input className="bg-gray-200 w-[3vw] h-[3vw] text-center text-[1vw] rounded-lg outline-none" maxLength="1" />
                    <input className="bg-gray-200 w-[3vw] h-[3vw] text-center text-[1vw] rounded-lg outline-none" maxLength="1" />
                </div>
                
                <Link to="/resetpassword"
                className="bg-[#FBA808] p-[0.52vw] rounded-lg text-[1vw] text-[#F8FAFC] text-center">Verify and Proceed</Link>

            </div>
        </div>
    )
}

export default Emailverification
