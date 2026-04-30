import Layout from "./componet/authenticaton/Layout.jsx";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/Signup.jsx";
import Forgot from "./pages/Auth/Forgotpassword.jsx";
import CustHome from "./componet/Dashboard/userDash/Home.jsx"
import Cart from "./pages/cart.jsx"
import Profile from "./pages/Profile.jsx"
import MyOrders from "./pages/MyOrders.jsx";
import CanteenHome from "./componet/Dashboard/canteenDash/CanteenHome.jsx"
import Wallet from "./pages/Wallet.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import SplashScreen from "./componet/SplashScreen.jsx";

import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { useState, useEffect } from "react";

// Protected route wrapper using Firebase Auth.
function ProtectedRoute({ children, allowedRoles }) {
    const { currentUser } = useAuth();

    // Since we don't have roles implemented in Firebase yet, 
    // we'll just check if the user is logged in for now.
    // In a real app, you'd fetch the role from Firestore.
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Temporary mock for roles based on email domain or something similar,
    // or just bypass for now until Firestore roles are fully implemented.
    return children;
}

export default function App() {
    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAppLoading(false);
        }, 2000); // 2 seconds flash screen
        return () => clearTimeout(timer);
    }, []);

    if (isAppLoading) {
        return <SplashScreen />;
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forgotpassword" element={<Forgot />} />
            </Route>

            <Route
                path="home"
                element={
                    <ProtectedRoute>
                        <CustHome />
                    </ProtectedRoute>
                }
            />
            <Route
                path="cart"
                element={
                    <ProtectedRoute>
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
                    <ProtectedRoute>
                        <MyOrders />
                    </ProtectedRoute>
                }
            />
            <Route
                path="canteendashboard"
                element={
                    <ProtectedRoute>
                        <CanteenHome />
                    </ProtectedRoute>
                }
            />
            <Route
                path="wallet"
                element={
                    <ProtectedRoute>
                        <Wallet />
                    </ProtectedRoute>
                }
            />
            {/* Catch-all Route for Error Page */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}