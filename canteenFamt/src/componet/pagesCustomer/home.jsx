import ItemList from "./itemList.jsx"
import HomeNav from "./homeNav.jsx"
import SearchBar from './searchBar.jsx';

function Home() {
    return (
        <div className=" w-full  bg-[#0F6657]">

            {/* FIXED TOP — using your design */}
            <div className="fixed top-0 left-0 w-full z-50 bg-[#0F6657]">
                <HomeNav />
                <SearchBar />
            </div>

            {/* ADD SPACE so content not hide */}
           <div className="mt-[20vh] bg-[#EDEEEF]  p-[3.5vw] min-h-[75vh] flex gap-3 flex-wrap">
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
                <ItemList />
            </div>

        </div >
    )
}

export default Home
