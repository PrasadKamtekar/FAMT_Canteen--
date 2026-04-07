import Layout from "./componet/authenticaton/Layout.jsx";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/Signup.jsx";
import Forgot from "./pages/Auth/Forgotpassword.jsx";
import EmailVerify from "./pages/Auth/Emailverification.jsx"
import ResetPass from "./pages/Auth/Resetpassword.jsx"
import CustHome from "./componet/Dashboard/userDash/Home.jsx"
import Cart from "./pages/cart.jsx"
import Profile from "./pages/Profile.jsx"
import MyOrders from "./pages/MyOrders.jsx";
import CanteenHome from "./componet/Dashboard/canteenDash/CanteenHome.jsx"

import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";
import { useContext } from "react";

// Simple protected route wrapper.
// We read the current user from localStorage and, if missing, redirect to login.
function ProtectedRoute({ children, allowedRoles }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default function App() {
    const navigate = useNavigate();
    // useEffect(() => {
    //     setLocalStorage();
    // })

    const authData = useContext(AuthContext);
    const handleLogin = (email, password) => {
        // AUTH + LOCALSTORAGE:
        // Customer login uses localStorage users (frontend-only auth).
        const customers = JSON.parse(localStorage.getItem("users")) || [];
        const staffMembers = authData?.staff || [];

        const foundCustomer = customers.find((e) => email == e.email && password == e.password);
        const foundStaff = staffMembers.find((e) => email == e.username && password == e.password);

        if (foundCustomer) {
            // Save session in localStorage so we can protect pages and greet the user.
            localStorage.setItem(
                "currentUser",
                JSON.stringify({ username: foundCustomer.username, email: foundCustomer.email, role: "customer" })
            );
            navigate('/home');
        } else if (foundStaff) {
            localStorage.setItem(
                "currentUser",
                JSON.stringify({ username: foundStaff.username, role: "staff" })
            );
            navigate('/canteendashboard')
        } else {
            alert("Wrong login");
        }
    }


    return (

        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Login handleLogin={handleLogin} />} />
                <Route path="login" element={<Login handleLogin={handleLogin} />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forgotpassword" element={<Forgot />} />
                <Route path="emailverify" element={<EmailVerify />} />
                <Route path="resetpassword" element={<ResetPass />} />
            </Route>

            <Route
                path="home"
                element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                        <CustHome />
                    </ProtectedRoute>
                }
            />
            <Route
                path="cart"
                element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                        <Cart />
                    </ProtectedRoute>
                }
            />
            <Route
                path="profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="orders"
                element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                        <MyOrders />
                    </ProtectedRoute>
                }
            />
            <Route
                path="canteendashboard"
                element={
                    <ProtectedRoute allowedRoles={["staff"]}>
                        <CanteenHome />
                    </ProtectedRoute>
                }
            />
        </Routes>

    );
}