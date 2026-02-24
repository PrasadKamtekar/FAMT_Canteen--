import { Search, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function SearchBar() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center mt-[3vh] px-[4vw] pb-[1vw]">

            {/* SEARCH */}
            <div className="flex w-[36vw] bg-[#FFFFFF33] text-white rounded-lg overflow-hidden">

                <input
                    type="text"
                    placeholder="Search Item..."
                    className="flex-1 pl-4 py-2 text-[1vw] outline-none text-white bg-transparent"
                />

                <button className="px-3 ">
                    <Search size={20} strokeWidth={3} />
                </button>

            </div>

            {/* CART */}
            <div >
                <button onClick={()=> {
                    navigate('/cart');
                }} className="bg-[#FBA808] p-[0.5vw] rounded-full hover:bg-white">
                    <ShoppingCart size={24} strokeWidth={1} />
                </button>

            </div>

        </div>
    )
}

export default SearchBar
