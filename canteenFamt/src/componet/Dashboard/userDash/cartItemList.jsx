import { X } from 'lucide-react';

function CartItemList({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="w-full bg-white rounded-xl p-3 sm:p-4 flex gap-3 shadow-sm border border-gray-100">
      <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0">
        <img
          src="https://thumbs.dreamstime.com/b/misal-pav-buns-smeared-butter-served-spicy-sprouts-curry-trail-mixture-chopped-onions-chilli-lemons-bun-indian-starter-171494146.jpg?w=768"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between">
          <h1 className="font-medium tracking-wide text-sm sm:text-base">
            {item.name}
            <span className="block text-[#0F6657] mt-1">₹ {item.price}</span>
          </h1>
          <button
            onClick={() => onRemove?.(item.id)}
            className="text-[#e31837]"
          >
            <X strokeWidth={1.25} size={24} />
          </button>
        </div>

        {/* counter */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onDecrease?.(item.id)}
            className="bg-[#E6F7F3] w-8 h-8 rounded-md text-[#00AD8F] text-lg leading-none font-medium"
          >
            -
          </button>
          <h1 className="min-w-6 text-center">
            {item.quantity}
          </h1>
          <button
            onClick={() => onIncrease?.(item.id)}
            className="bg-[#E6F7F3] w-8 h-8 rounded-md text-[#00AD8F] text-lg leading-none font-medium"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItemList
