import Layout from "./componet/authenticaton/Layout.jsx";
import Login from "./componet/authenticaton/login.jsx";
import SignUp from "./componet/authenticaton/signup.jsx";
import Forgot from "./componet/authenticaton/forgotpassword.jsx";
import EmailVerify from "./componet/authenticaton/emailverification.jsx"
import ResetPass from "./componet/authenticaton/resetpassword.jsx"
import Home from "./componet/pagesCustomer/home.jsx"
import Cart from "./componet/pagesCustomer/cart.jsx"
import { Route, Routes } from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotpassword" element={<Forgot />} />
                <Route path="/emailverify" element={<EmailVerify />} />
                <Route path="/resetpassword" element={<ResetPass />} />
               
            </Route>
             <Route path="/home" element={<Home/>} />
             <Route path="/cart" element={<Cart/>} />
        </Routes>
    );
}