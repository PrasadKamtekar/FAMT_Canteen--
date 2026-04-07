import { Link } from "react-router-dom"
function navbar() {
    return (
        <div>
            <div
                id="nav"
                className="w-full bg-[#0F6657] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-4 sm:px-8 py-3"
            >
                <h1 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
                    FAMT<span className="text-[#FBA808]">CANTEEN</span>
                </h1>

                <div className="flex gap-3 sm:gap-5 font-medium w-full sm:w-auto">
                    <Link to="/login"
                        className="flex-1 sm:flex-none text-center px-4 py-2 text-sm sm:text-base bg-[#F8FAFC] rounded-lg hover:bg-[#FBA808]"
                    >
                        Login
                    </Link>
                    <Link to="/signup"
                        className="flex-1 sm:flex-none text-center px-4 py-2 text-sm sm:text-base bg-[#F8FAFC] rounded-lg hover:bg-[#FBA808]"
                    >
                        Sign Up
                    </Link>

                </div>
            </div>
        </div>

    )
}

export default navbar
