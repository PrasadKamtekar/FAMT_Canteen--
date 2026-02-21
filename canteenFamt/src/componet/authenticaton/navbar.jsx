import { Link } from "react-router-dom"
function navbar() {
    return (
        <div>
            <div id="nav" className="h-[10dvh] w-full bg-[#0F6657] flex justify-between items-center py-[2vw] px-[4vw]">
                <h1 className="text-[1.8vw] font-bold text-[#F8FAFC]">
                    FAMT<span className="text-[#FBA808]">CANTEEN</span>
                </h1>

                <div className="flex gap-5  font-medium ">
                    <Link to="/login"
                        className="px-4 py-1 text-[1.2vw] bg-[#F8FAFC] rounded-[0.5vw] hover:bg-[#FBA808] ">
                        Login
                    </Link>
                    <Link to="/signup"
                        className="px-4 py-1 text-[1.2vw] bg-[#F8FAFC] rounded-[0.5vw] hover:bg-[#FBA808]">
                        Sign Up
                    </Link>

                </div>
            </div>
        </div>

    )
}

export default navbar
