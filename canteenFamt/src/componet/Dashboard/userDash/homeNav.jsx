import { CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomeNav() {
    const navigate = useNavigate();
    return (
        <div id="nav" className="h-[10dvh] flex justify-between items-center px-[4vw] ">

            <h1 className="text-[1.8vw] font-bold mt-[5vh] leading-7 text-[#F8FAFC]">
                FAMT<span className="text-[#FBA808]">CANTEEN</span><br />

                <span className="text-[1.2vw] font-semibold text-white">
                    Hello <span className="text-[#FBA808]">Sai!!</span>
                </span>
            </h1>

            <div >
                <button onClick={ ()=>{
                    navigate('/profile');
                }
                    
                } className="bg-[#FBA808] mt-[5vh] rounded-full p-[0.5vw] hover:bg-white">
                    <CircleUserRound size={24} strokeWidth={1} />
                </button>
            </div>

        </div>
    )
}

export default HomeNav
