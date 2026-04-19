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

  return (
    <div className="w-full bg-white rounded-xl p-3 sm:p-4 flex gap-3 shadow-sm border border-gray-100">
      <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0">
        <img
          src={item.image || "https://thumbs.dreamstime.com/b/misal-pav-buns-smeared-butter-served-spicy-sprouts-curry-trail-mixture-chopped-onions-chilli-lemons-bun-indian-starter-171494146.jpg?w=768"}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h1 className="font-semibold tracking-wide text-sm sm:text-base">
          {item.name}
          <span className="block text-[#0F6657] mt-1">₹ {item.price}</span>
        </h1>

        <button
          onClick={handleAddToCart}
          className="bg-[#E6F7F3] w-full rounded-lg text-[#00AD8F] py-2 text-sm sm:text-base transition-transform duration-150 active:scale-95 active:bg-[#d9f2ec]"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ItemList