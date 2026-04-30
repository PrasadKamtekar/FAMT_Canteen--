import { Search } from 'lucide-react';

function SearchBar({ value, onChange }) {
  // SEARCH BAR:
  // Whenever the user types, we simply call onChange with the latest value.
  // The parent (Home) then filters items using Array.filter().
  const handleInputChange = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="px-4 sm:px-6 pb-3">

      {/* SEARCH */}
      <div className="flex w-full bg-[#FFFFFF33] text-white rounded-lg overflow-hidden">

        <input
          type="text"
          placeholder="Search Item..."
          value={value}
          onChange={handleInputChange}
          className="flex-1 pl-4 py-2 text-[4vw] md:text-[1vw] outline-none text-white bg-transparent"
        />

        <button className="px-3 ">
          <Search size={20} strokeWidth={3} />
        </button>

      </div>
    </div>
  )
}

export default SearchBar
