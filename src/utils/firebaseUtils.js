import { db, storage } from "../firebase";
import { 
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, onSnapshot, getDoc, setDoc, orderBy
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ==============================
// STORAGE FUNCTIONS (Cloudinary)
// ==============================
export const uploadImage = async (file, path) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "canteen_uploads"); // Unsigned preset
  
  // Optional: Cloudinary allows passing a folder name
  formData.append("folder", path);

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dokbqutau/image/upload", {
      method: "POST",
      body: formData,
    });
    
    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Cloudinary upload error:", data);
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

// ==============================
// MENU FUNCTIONS
// ==============================
export const getMenuItems = async () => {
  const menuSnapshot = await getDocs(collection(db, "menu"));
  return menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToMenu = (callback) => {
  return onSnapshot(collection(db, "menu"), (snapshot) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(items);
  }, (error) => {
    console.error("Error fetching menu:", error);
    callback([]);
  });
};

export const addMenuItem = async (itemData, imageFile = null) => {
  let imageUrl = itemData.image || "";
  if (imageFile) {
    imageUrl = await uploadImage(imageFile, "menu_images");
  }
  await addDoc(collection(db, "menu"), { ...itemData, image: imageUrl });
};

export const updateMenuItem = async (id, updatedData, imageFile = null) => {
  const itemRef = doc(db, "menu", id);
  let imageUrl = updatedData.image;
  if (imageFile) {
    imageUrl = await uploadImage(imageFile, "menu_images");
  }
  await updateDoc(itemRef, { ...updatedData, image: imageUrl });
};

export const deleteMenuItem = async (id) => {
  await deleteDoc(doc(db, "menu", id));
};

// ==============================
// CART FUNCTIONS
// ==============================
export const subscribeToCart = (userId, callback) => {
  if (!userId) return () => {};
  const q = query(collection(db, "cart"), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({ cartDocId: doc.id, ...doc.data() }));
    callback(items);
  });
};

export const addToCart = async (userId, item) => {
  // Check if item already in cart
  const q = query(collection(db, "cart"), where("userId", "==", userId), where("id", "==", item.id));
  const snapshot = await getDocs(q);
  
  if (!snapshot.empty) {
    // Increment quantity
    const existingDoc = snapshot.docs[0];
    const newQuantity = existingDoc.data().quantity + 1;
    await updateDoc(doc(db, "cart", existingDoc.id), { quantity: newQuantity });
  } else {
    // Add new
    await addDoc(collection(db, "cart"), {
      userId,
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || "",
      quantity: 1
    });
  }
};

export const updateCartItemQuantity = async (cartDocId, newQuantity) => {
  if (newQuantity <= 0) {
    await deleteDoc(doc(db, "cart", cartDocId));
  } else {
    await updateDoc(doc(db, "cart", cartDocId), { quantity: newQuantity });
  }
};

export const removeFromCart = async (cartDocId) => {
  await deleteDoc(doc(db, "cart", cartDocId));
};

export const clearCart = async (userId) => {
  const q = query(collection(db, "cart"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, "cart", d.id)));
  await Promise.all(deletePromises);
};

// ==============================
// ORDERS FUNCTIONS
// ==============================
export const placeOrder = async (userId, userName, cartItems, total) => {
  // Generate random Token
  const token = "TKN-" + Math.floor(1000 + Math.random() * 9000);
  
  const orderData = {
    userId,
    userName,
    token,
    items: cartItems,
    total,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  
  const docRef = await addDoc(collection(db, "orders"), orderData);
  await clearCart(userId);
  return { id: docRef.id, token };
};

export const placeOrderWithWallet = async (userId, userName, cartItems, total, currentBalance) => {
  if (currentBalance < total) {
    throw new Error("Insufficient wallet balance.");
  }

  // Generate random Token
  const token = "TKN-" + Math.floor(1000 + Math.random() * 9000);
  
  const orderData = {
    userId,
    userName,
    token,
    items: cartItems,
    total,
    status: "pending",
    paymentMethod: "wallet",
    createdAt: new Date().toISOString()
  };
  
  // Create Order
  const docRef = await addDoc(collection(db, "orders"), orderData);
  
  // Deduct from wallet balance
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    walletBalance: currentBalance - total
  });

  // Clear Cart
  await clearCart(userId);
  return { id: docRef.id, token };
};

export const subscribeToUserOrders = (userId, callback) => {
  if (!userId) return () => {};
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Sort newest first
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    callback(items);
  });
};

export const subscribeToAllOrders = (callback) => {
  return onSnapshot(collection(db, "orders"), (snapshot) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    callback(items);
  });
};

export const getAllOrders = async () => {
  const orderSnapshot = await getDocs(collection(db, "orders"));
  const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return orderList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const updateOrderStatus = async (orderId, newStatus, refundMethod = "wallet") => {
  if (newStatus === "cancelled") {
    const orderDoc = await getDoc(doc(db, "orders", orderId));
    if (orderDoc.exists()) {
      const orderData = orderDoc.data();
      if (orderData.status !== "cancelled") {
        if (refundMethod === "wallet") {
          const userId = orderData.userId;
          const total = orderData.total || 0;
          const userDoc = await getDoc(doc(db, "users", userId));
          let currentBalance = 0;
          if (userDoc.exists()) {
            currentBalance = userDoc.data().walletBalance || 0;
          }
          await setDoc(doc(db, "users", userId), {
            walletBalance: currentBalance + total
          }, { merge: true });
        }
      }
    }
  }
  
  const updateData = { status: newStatus };
  if (newStatus === "cancelled" && refundMethod) {
    updateData.refundMethod = refundMethod;
  }
  
  await updateDoc(doc(db, "orders", orderId), updateData);
};

// ==============================
// PROFILE FUNCTIONS
// ==============================
export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

export const updateUserProfile = async (uid, profileData, imageFile = null) => {
  if (!uid) return;
  let profileImage = profileData.profileImage || "";
  
  if (imageFile) {
    profileImage = await uploadImage(imageFile, "profile_images");
  }

  // Update or create user document
  await setDoc(doc(db, "users", uid), {
    ...profileData,
    profileImage
  }, { merge: true });
};

// ==============================
// WALLET FUNCTIONS
// ==============================
export const requestWithdrawal = async (uid, amount, method, details, currentBalance) => {
  if (!uid || amount <= 0 || amount > currentBalance) throw new Error("Invalid withdrawal request");

  // Add the withdrawal request
  await addDoc(collection(db, "withdrawals"), {
    userId: uid,
    amount: amount,
    method: method,
    details: details,
    status: "pending",
    createdAt: new Date().toISOString()
  });

  // Deduct from wallet balance
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    walletBalance: currentBalance - amount
  });
};
