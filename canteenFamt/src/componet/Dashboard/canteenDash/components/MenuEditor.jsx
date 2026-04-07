import { useState } from "react";

function MenuEditor({ items, onAdd, onUpdate, onDelete, editingItem, setEditingItem }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = () => {
    const activeName = editingItem ? editingItem.name : name;
    const activePriceRaw = editingItem ? editingItem.price : price;
    const parsedPrice = Number(activePriceRaw);

    if (!activeName.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("Please enter valid food name and price.");
      return;
    }

    const normalizedName = activeName.trim().toLowerCase();
    const isDuplicateName = items.some((i) => i.name?.trim().toLowerCase() === normalizedName && i.id !== editingItem?.id);
    if (isDuplicateName) {
      alert("Item name already exists.");
      return;
    }

    const imageToSave = imagePreview || editingItem?.image || "";

    if (editingItem) {
      onUpdate({ ...editingItem, name: activeName.trim(), price: parsedPrice, image: imageToSave });
      setEditingItem(null);
      setImagePreview("");
      return;
    }

    onAdd({ name: activeName.trim(), price: parsedPrice, image: imageToSave });
    setName("");
    setPrice("");
    setImagePreview("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreview("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-[0.8vw] shadow-sm p-[1.3vw]">
      <h2 className="text-[1.1vw] font-semibold text-[#0F6657] mb-[1.2vh]">Food Items</h2>
      <div className="bg-[#F8FAFC] border border-gray-200 rounded-[0.8vw] p-5 sm:p-6 mb-[1.4vh] max-w-[680px] mx-auto shadow-sm">
        <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
        <input
          className="bg-gray-100 rounded-[0.5vw] p-[0.6vw] outline-none w-full"
          placeholder="Food name"
          value={editingItem ? editingItem.name : name}
          onChange={(e) => {
            if (editingItem) {
              setEditingItem({ ...editingItem, name: e.target.value });
              return;
            }
            setName(e.target.value);
          }}
        />
        <input
          className="bg-gray-100 rounded-[0.5vw] p-[0.6vw] outline-none w-full sm:max-w-[180px]"
          placeholder="Price"
          value={editingItem ? editingItem.price : price}
          type="number"
          onChange={(e) => {
            if (editingItem) {
              setEditingItem({ ...editingItem, price: e.target.value });
              return;
            }
            setPrice(e.target.value);
          }}
        />

        </div>

        <div className="w-full">
          <label className="block text-[0.9vw] font-medium text-gray-600 mb-[0.5vh]">
            Upload Item Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="bg-gray-100 rounded-[0.5vw] p-[0.4vw] w-full"
            onChange={handleImageUpload}
          />
          <div className="mt-[0.8vh]">
            {(imagePreview || editingItem?.image) ? (
              <img
                src={imagePreview || editingItem?.image}
                alt="Preview"
                className="h-[6vh] w-[6vh] rounded-[0.6vw] object-cover border border-gray-200"
              />
            ) : (
              <div className="text-gray-400 text-[0.85vw]">No preview</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSubmit}
            className="bg-[#e31837] hover:bg-[#c81430] text-[#F8FAFC] rounded-[0.5vw] px-3 py-1 text-[0.85vw] font-semibold shadow-none"
          >
            {editingItem ? "Update Item" : "Add Item"}
          </button>
          {editingItem && (
            <button
              onClick={() => {
                setEditingItem(null);
                setImagePreview("");
                setName("");
                setPrice("");
              }}
              className="border border-gray-400 text-gray-700 rounded-[0.5vw] px-3 py-1 text-[0.85vw]"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      </div>

      <div className="flex flex-col gap-[0.8vh]">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-[0.7vw] px-4 py-3 flex items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[4.5vh] h-[4.5vh] rounded-[0.5vw] object-cover border border-gray-200"
                />
              ) : (
                <div className="w-[4.5vh] h-[4.5vh] rounded-[0.5vw] bg-gray-100 border border-gray-200" />
              )}
              <div>
                <div className="text-[0.98vw] font-semibold text-[#0F6657]">{item.name}</div>
                <div className="text-[0.9vw] text-gray-600">Rs {item.price}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="bg-[#E6F7F3] text-[#00AD8F] border border-[#E6F7F3] rounded-[0.4vw] px-[0.8vw] py-[0.2vh] font-semibold text-[0.9vw]"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-[#e31837] bg-white border border-[#e31837] rounded-[0.4vw] px-[0.8vw] py-[0.2vh] font-semibold text-[0.9vw]"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {!items.length && (
          <div className="text-gray-500 text-[0.95vw] py-[1.2vw]">
            No menu items available.
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuEditor;
