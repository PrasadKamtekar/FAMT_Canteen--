import { useMemo, useState } from "react";
import ItemList from "./itemList.jsx"
import HomeNav from "./homeNav.jsx"
import SearchBar from './searchBar.jsx';
import { getMenuFromStorage, setLocalStorage } from "../../../utils/localstorage.jsx";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems] = useState(() => {
    setLocalStorage();
    return getMenuFromStorage();
  });

  // SEARCH LOGIC:
  // We use simple JavaScript filter() to match items by name.
  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return menuItems;
    return menuItems.filter((item) =>
      item.name.toLowerCase().startsWith(term)
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
      <div className="mt-44 sm:mt-48 bg-[#EDEEEF] px-4 sm:px-6 py-5 min-h-[75vh]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredItems.map((item) => (
          <ItemList key={item.id} item={item} />
        ))}
        </div>
      </div>
    </div >
  )
}

export default Home
