import NavBar from "./navbar.jsx"

import { Outlet } from "react-router-dom"
function Layout() {
    return (
     <>
            <NavBar />
            <div
                id="outlet"
                className="bg-[#eeeef1] min-h-[calc(100dvh-10dvh)] flex flex-col justify-center items-center px-4 py-6"
            >
                <Outlet />
            </div>
        </>
    )
}

export default Layout
