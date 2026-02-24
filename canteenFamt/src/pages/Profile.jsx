import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    return (
        <>
            {/** nav */}
            <div className="bg-[#ffffff] flex items-center gap-4 pl-[4vw] h-[8dvh]  shadow-sm ">
                <button onClick={()=> {
                    navigate(-1);
                }}>
                    <ChevronLeft />
                </button>

                <h1 className="font-semibold tracking-wider text-[1.3vw]">My <span className="text-[#FBA808]">Profile</span></h1>

            </div>
            {/** profile container */}
            <div className="bg-[#eeeef1]">
                <div className="w-full h-[80dvh]  pt-[7vh]   pb-[7vh] gap-10  flex justify-center " >
                    <div className="bg-[#ffffff] w-[25vw] flex flex-col items-center gap-3  rounded-[1vw] pt-[3vh] shadow-md">
                        <div className="w-full flex justify-end pr-[3vw]">
                            <button className='text-[1vw] tracking-wider font-medium  text-gray-700'>Edit</button>
                        </div>
                        <div className="w-[10vw] h-[20vh]   text-center">
                            <img src="https://4kwallpapers.com/images/wallpapers/iron-man-marvel-superheroes-amoled-pitch-black-minimal-art-750x1334-6293.png" alt="" className=" w-[10vw] h-[20vh]  rounded-full text-center object-cover" />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 w-full ">
                            <div className='w-[80%]'>
                                <h1 className="text-[1vw]  font-[400] text-gray-500">username</h1>
                                <input type="text" placeholder='username'
                                    className="bg-gray-200 w-[100%] p-[0.6vw] text-[0.8vw] rounded-lg outline-none" />
                            </div>
                            <div className='w-[80%]'>
                                <h1 className="text-[1vw]  font-[400] text-gray-500">Email</h1>
                                <input type="text" placeholder='email'
                                    className="bg-gray-200 w-[100%] p-[0.6vw] text-[0.8vw] rounded-lg outline-none" />
                            </div>
                            <div className='w-[80%]'>
                                <h1 className="text-[1vw]  font-[400] text-gray-500">mobile</h1>
                                <input type="text" placeholder='mobile'
                                    className="bg-gray-200 w-[100%] p-[0.6vw] text-[0.8vw] rounded-lg outline-none" />
                            </div>

                        </div>
                        <div className="">
                            <button className="bg-[#FBA808] text-white tracking-wider font-medium text-[1vw] pl-[2vw] pr-[2vw] pt-[0.5vh] pb-[0.5vh] rounded-[0.5vw]">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Profile
