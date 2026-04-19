import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <div
            id="outlet"
            className="bg-[#eeeef1] min-h-[100dvh] flex flex-col justify-center items-center px-4 py-6"
        >
            <Outlet />
        </div>
    )
}

export default Layout
