import { ChevronLeft } from 'lucide-react';
import CartItemList from "./cartItemList.jsx"
function cart() {
    return (
        <div>
            {/** nav */}
            <div className="bg-[#ffffff] flex items-center gap-4 pl-[4vw] h-[8dvh]  w-full shadow-sm ">
                <ChevronLeft />
                <h1 className="font-semibold tracking-wider text-[1.3vw]">My <span className="text-[#FBA808]">cart</span></h1>

            </div>
            {/** ;list containeer */}
            <div className="bg-[#eeeef1]">
                <div className="w-full h-[80dvh]  pt-[7vh]   pb-[7vh] gap-10  flex justify-center " >
                    <div className="bg-[#ffffff] w-4/12 flex flex-col items-center  gap-2 overflow-hidden overflow-y-scroll rounded-[1vw] pt-[3vh] shadow-md">
                        <CartItemList />
                        <CartItemList />
                        <CartItemList />
                        <CartItemList />
                    </div>

                    {/** order details */}
                    <div className="bg-[#ffffff] w-4/12 flex flex-col items-center gap-3 rounded-[1vw] shadow-md ">
                        <h1 className="text-[#666666] font-mono tracking-wider text-[1.3vw] pt-[3vh]">Bill Details</h1>
                        <div className=" bg-[#ffffff] w-[28vw] rounded-[1vw] tracking-wider shadow-lg">
                            <div className="flex justify-between p-[1.5vw] pb-[0.5vw] ">
                                <h1 className="text-[#666666]">Misal Pav</h1>
                                <h1 className="text-[#2e2e2e]">₹25</h1>
                            </div>
                            <div className="flex justify-between  p-[1.5vw] pt-[0vw] ">
                                <h1 className="text-[#666666]">Fried Rice</h1>
                                <h1 className="text-[#2e2e2e]">₹25</h1>
                            </div>
                            <hr className="w-[90%] mx-auto text-[#666666]"/>
                            <div className="flex justify-end gap-4 p-[1vw] pr-[1.5vw]">
                                <h1 className="text-[#2e2e2e]" >Total</h1>
                                <h1 className="text-[#2e2e2e]">₹25</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/** footer */}
            <div className="bg-[#ffffff] h-[12vh] flex items-center justify-center">
                <button className="bg-[#e31837] text-white w-[95%] p-[0.5vw] rounded-[0.6vw] tracking-wider font-medium ">
                    Order confirm
                </button>
            </div>
        </div>
    )
}

export default cart
