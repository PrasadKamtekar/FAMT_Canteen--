import Layout from "./componet/authenticaton/Layout.jsx";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/Signup.jsx";
import Forgot from "./pages/Auth/Forgotpassword.jsx";
import EmailVerify from "./pages/Auth/Emailverification.jsx"
import ResetPass from "./pages/Auth/Resetpassword.jsx"
import CustHome from "./componet/Dashboard/userDash/Home.jsx"
import Cart from "./pages/cart.jsx"
import Profile from "./pages/Profile.jsx"
import CanteenHome from "./componet/Dashboard/canteenDash/CanteenHome.jsx"

import { useNavigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider.jsx";
import { useContext, useEffect, useState } from "react";
export default function App() {
    const navigate = useNavigate();
    // useEffect(() => {
    //     setLocalStorage();
    // })

    const authData = useContext(AuthContext);


    const handleLogin = (username, password) => {
        if (authData && authData.customer.find((e) => username == e.username && password == e.password)) {
            navigate('/home');
        } else if (authData && authData.staff.find((e) => username == e.username && password == e.password)) {
            navigate('/canteendashboard')
        } else {
            alert("Invlid credential");
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
            <Route path="canteendashboard" element={<CanteenHome />} />
            <Route path="home" element={<CustHome />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
        </Routes>

    );
}