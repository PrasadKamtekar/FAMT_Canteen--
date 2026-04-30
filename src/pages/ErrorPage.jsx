import { useNavigate } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#EDEEEF] flex flex-col items-center justify-center px-4">
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg max-w-md w-full text-center border-t-4 border-[#FBA808]">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle size={40} className="text-red-500" />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-3">Oops!</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Something went wrong or the page you are looking for does not exist.
                </p>
                
                <button
                    onClick={() => navigate("/home")}
                    className="w-full bg-[#0F6657] text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#0c5145] transition-colors"
                >
                    <Home size={18} />
                    <span>Back to Home</span>
                </button>
            </div>
        </div>
    );
}

export default ErrorPage;
