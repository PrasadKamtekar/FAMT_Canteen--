import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    async function handleEmailLogin(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            const trimmedEmail = email.trim();
            const userCredential = await login(trimmedEmail, password);
            toast.success("Successfully logged in!");
            
            // Check if admin
            if (userCredential.user.email === 'famt@gmail.com') {
                navigate('/canteendashboard');
            } else {
                navigate('/home');
            }
        } catch (err) {
            let friendlyMessage = 'An unexpected error occurred.';
            switch (err.code) {
                case 'auth/invalid-credential':
                    friendlyMessage = 'Invalid email or password.';
                    break;
                case 'auth/user-not-found':
                    friendlyMessage = 'No account found with this email.';
                    break;
                case 'auth/wrong-password':
                    friendlyMessage = 'Incorrect password.';
                    break;
                case 'auth/too-many-requests':
                    friendlyMessage = 'Too many failed login attempts. Please try again later.';
                    break;
                case 'auth/network-request-failed':
                    friendlyMessage = 'Network error. Please check your connection.';
                    break;
                default:
                    friendlyMessage = err.message || 'Failed to log in.';
            }
            setError(friendlyMessage);
            toast.error(friendlyMessage);
        }
        setLoading(false);
    }

    async function handleGoogleLogin(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            const userCredential = await loginWithGoogle();
            toast.success("Successfully logged in with Google!");
            
            if (userCredential.user.email === 'famt@gmail.com') {
                navigate('/canteendashboard');
            } else {
                navigate('/home');
            }
        } catch (err) {
            let friendlyMessage = 'An unexpected error occurred during Google Sign-In.';
            switch (err.code) {
                case 'auth/popup-closed-by-user':
                    friendlyMessage = 'Sign-in popup was closed before completion.';
                    break;
                case 'auth/cancelled-popup-request':
                    friendlyMessage = 'Multiple sign-in requests were made.';
                    break;
                case 'auth/network-request-failed':
                    friendlyMessage = 'Network error. Please check your connection.';
                    break;
                default:
                    friendlyMessage = err.message || 'Failed to log in with Google.';
            }
            setError(friendlyMessage);
            toast.error(friendlyMessage);
        }
        setLoading(false);
    }
    
    return (
        <div className="bg-[#0F6657] w-[90%] max-w-[400px] rounded-2xl shadow-sm p-5 sm:p-6">
            <div className="pb-3">
                <h1 className="text-xl sm:text-2xl leading-tight font-semibold text-[#F8FAFC] text-left">
                    Sign in to <br />
                    FAMT<span className="text-[#FBA808]">CANTEEN</span>
                </h1>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl flex flex-col gap-4 p-4 sm:p-5 mt-1">
                {error && <div className="bg-red-100 text-red-600 p-2 rounded text-sm">{error}</div>}
                <div>
                    <h2 className="text-sm sm:text-base mb-2 font-[400] text-gray-500">Email</h2>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className="bg-gray-200 w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg outline-none"
                    />
                </div>
                <div>
                    <h2 className="text-sm sm:text-base mb-2 font-[400] text-gray-500">Password</h2>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="bg-gray-200 w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg outline-none"
                    />
                </div>
                <button 
                    onClick={handleEmailLogin}
                    disabled={loading}
                    className="bg-[#FBA808] w-full py-2.5 rounded-lg text-base text-[#F8FAFC] font-semibold disabled:opacity-50">
                    Sign in
                </button>
                
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button 
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="bg-white border border-gray-300 text-gray-700 w-full py-2.5 rounded-lg text-base font-semibold disabled:opacity-50 flex justify-center items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        <path fill="none" d="M1 1h22v22H1z"/>
                    </svg>
                    Sign in with Google
                </button>

                <div>
                    <h2 className="text-sm sm:text-base text-center font-medium text-[#0F6657]">
                        <Link to="/forgotpassword">Forgot Password?</Link>
                    </h2>
                </div>
            </div>

            <div className="pt-4 text-center">
                <h1 className="text-sm sm:text-base text-[#F8FAFC]">
                    Don't have an account?{" "}
                    <span className="font-[600] text-[#FBA808]"> <Link to="/signup">Sign Up</Link></span>
                </h1>
            </div>

        </div>

    )
}

export default Login
