import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function MenuEditor({ items, onAdd, onUpdate, onDelete, editingItem, setEditingItem }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load item data when editingItem changes
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || "");
      setPrice(editingItem.price || "");
      setImagePreview(editingItem.image || "");
      setImageFile(null); // Reset file input when editing a new item
    } else {
      setName("");
      setPrice("");
      setImagePreview("");
      setImageFile(null);
    }
  }, [editingItem]);

  const handleSubmit = async () => {
    const parsedPrice = Number(price);

    if (!name.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Please enter a valid food name and price.");
      return;
    }

    const normalizedName = name.trim().toLowerCase();
    const isDuplicateName = items.some(
      (i) => i.name?.trim().toLowerCase() === normalizedName && i.id !== editingItem?.id
    );

    if (isDuplicateName) {
      toast.error("Item name already exists.");
      return;
    }

    setIsSaving(true);
    try {
      const imageToSave = imagePreview || "";

      if (editingItem) {
        await onUpdate(
          { ...editingItem, name: name.trim(), price: parsedPrice, image: imageToSave },
          imageFile
        );
      } else {
        await onAdd(
          { name: name.trim(), price: parsedPrice, image: imageToSave },
          imageFile
        );
      }
      
      // Clear form and show success
      setEditingItem(null);
      setName("");
      setPrice("");
      setImagePreview("");
      setImageFile(null);
      
      // Reset file input element if possible by selecting it
      const fileInput = document.getElementById("food-image-upload");
      if (fileInput) fileInput.value = "";
      
      toast.success("Item saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save item.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      if (!editingItem) setImagePreview("");
      setImageFile(null);
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-800">Food Items</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              className="border border-gray-300 rounded px-3 py-2 outline-none w-full text-sm"
              placeholder="Food name"
              value={name}
              disabled={isSaving}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded px-3 py-2 outline-none w-full sm:max-w-[180px] text-sm"
              placeholder="Price"
              value={price}
              type="number"
              disabled={isSaving}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-sm text-gray-600 mb-1">
              Upload Item Image
            </label>
            <input
              id="food-image-upload"
              type="file"
              accept="image/*"
              disabled={isSaving}
              className="border border-gray-300 rounded px-3 py-1.5 w-full text-sm text-gray-600"
              onChange={handleImageUpload}
            />
            <div className="mt-2">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-16 w-16 rounded object-cover border border-gray-200"
                />
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="bg-gray-800 hover:bg-gray-700 text-white rounded px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            {editingItem && !isSaving && (
              <button
                onClick={() => {
                  setEditingItem(null);
                  setName("");
                  setPrice("");
                  setImagePreview("");
                  setImageFile(null);
                  
                  const fileInput = document.getElementById("food-image-upload");
                  if (fileInput) fileInput.value = "";
                }}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 rounded px-4 py-2 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${item.isAvailable === false ? "opacity-60 grayscale" : ""}`}
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover border border-gray-200"
                />
              ) : (
                <div className="w-12 h-12 rounded bg-gray-50 border border-gray-200" />
              )}
              <div>
                <div className="text-sm font-medium text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-500">Rs {item.price}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0 justify-start sm:justify-end">
              <button
                onClick={() => onUpdate({ ...item, isAvailable: item.isAvailable === false ? true : false }, null)}
                className={`border rounded px-3 py-1 text-sm font-medium transition-colors ${
                  item.isAvailable === false
                    ? "border-green-200 text-green-600 hover:bg-green-50"
                    : "border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                }`}
              >
                {item.isAvailable === false ? "Mark Available" : "Mark Unavailable"}
              </button>
              <button
                onClick={() => setEditingItem(item)}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 rounded px-3 py-1 text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="border border-red-200 hover:bg-red-50 text-red-600 rounded px-3 py-1 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {!items.length && (
          <div className="text-gray-500 text-sm py-4 text-center border border-dashed border-gray-200 rounded-lg">
            No menu items available.
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuEditor;
