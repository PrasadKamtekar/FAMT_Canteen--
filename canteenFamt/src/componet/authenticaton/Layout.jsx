import NavBar from "./navbar.jsx"

import { Outlet } from "react-router-dom"
function Layout() {
    return (
     <>
            <NavBar />
            <div id="outlet" className="bg-[#F8FAFC] h-[calc(100dvh-10dvh)] flex flex-col justify-center items-center">
                <Outlet />
            </div>
        </>
    )
}

export default Layout
