import { useEffect, useMemo, useState } from "react";
import ItemList from "./itemList.jsx"
import HomeNav from "./homeNav.jsx"
import SearchBar from './searchBar.jsx';
import { getMenuItems, addMenuItem, subscribeToMenu } from "../../../utils/firebaseUtils.js";
import toast from "react-hot-toast";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToMenu((items) => {
      setMenuItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // SEARCH LOGIC:
  // We use simple JavaScript filter() to match items by name.
  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return menuItems;
    return menuItems.filter((item) =>
      item.name?.toLowerCase().startsWith(term)
    );
  }, [searchTerm, menuItems]);

  return (
    <div className="w-full bg-[#0F6657]">
      {/* FIXED TOP — using your design */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0F6657]">
        <HomeNav activeTab="home" />
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* ADD SPACE so content not hide */}
      <div className="pt-36 sm:pt-44 bg-[#EDEEEF] px-4 sm:px-6 pb-10 min-h-[100dvh]">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <h1 className="text-[#0F6657] font-semibold text-lg">Loading Menu...</h1>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <ItemList key={item.id} item={item} />
          ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <h1 className="text-gray-500 font-medium">No items found.</h1>
          </div>
        )}
      </div>
    </div >
  )
}

export default Home
