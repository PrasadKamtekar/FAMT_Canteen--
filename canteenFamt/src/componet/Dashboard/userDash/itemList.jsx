import { useAuth } from "../../../context/AuthContext.jsx";
import { addToCart } from "../../../utils/firebaseUtils.js";
import toast from "react-hot-toast";

function ItemList({ item }) {
  const { currentUser } = useAuth();

  const handleAddToCart = async () => {
    if (!currentUser) {
      toast.error("Please login to add to cart");
      return;
    }
    
    try {
      toast.loading("Adding...", { id: "addCart" });
      await addToCart(currentUser.uid, item);
      toast.success(`${item.name} added to cart`, { id: "addCart" });
    } catch (error) {
      toast.error("Failed to add to cart", { id: "addCart" });
    }
  };

  const isAvailable = item.isAvailable !== false;

  return (
    <div className={`w-full rounded-xl p-3 sm:p-4 flex gap-3 shadow-sm border border-gray-100 ${!isAvailable ? "bg-gray-50 opacity-80" : "bg-white"}`}>
      <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0">
        <img
          src={item.image || "https://thumbs.dreamstime.com/b/misal-pav-buns-smeared-butter-served-spicy-sprouts-curry-trail-mixture-chopped-onions-chilli-lemons-bun-indian-starter-171494146.jpg?w=768"}
          className={`h-full w-full rounded-lg object-cover ${!isAvailable ? "grayscale" : ""}`}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h1 className="font-semibold tracking-wide text-sm sm:text-base">
          {item.name}
          <span className="block text-[#0F6657] mt-1">₹ {item.price}</span>
        </h1>

        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`w-full rounded-lg py-2 text-sm sm:text-base transition-transform duration-150 ${
            isAvailable 
              ? "bg-[#E6F7F3] text-[#00AD8F] active:scale-95 active:bg-[#d9f2ec]" 
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Add to cart" : "Item Not Available"}
        </button>
      </div>
    </div>
  )
}

export default ItemList