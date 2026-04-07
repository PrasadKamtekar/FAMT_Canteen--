// Default demo users that we store once in localStorage.
export const users = [
  { username: "cust1", email: "cust1@mail.com", password: "123" },
  { username: "cust2", email: "cust2@mail.com", password: "123" },
  { username: "cust3", email: "cust3@mail.com", password: "123" },
  { username: "cust4", email: "cust4@mail.com", password: "123" },
  { username: "cust5", email: "cust5@mail.com", password: "123" }
];

export const staff = [
  { username: "staff1", password: "123" },
  { username: "staff2", password: "123" },
  { username: "staff3", password: "123" },
  { username: "staff4", password: "123" },
  { username: "staff5", password: "123" }
];

export const defaultMenuItems = [
  { id: 1, name: "Misal Pav", price: 25, image: "" },
  { id: 2, name: "Fried Rice", price: 40, image: "" },
  { id: 3, name: "Veg Sandwich", price: 30, image: "" },
  { id: 4, name: "Cheese Sandwich", price: 35, image: "" },
  { id: 5, name: "Samosa", price: 15, image: "" },
  { id: 6, name: "Tea", price: 10, image: "" }
];

// Small helper so JSON.parse never crashes the app.
// If the key is missing OR the JSON is invalid, we always return the fallback value.
const safeParse = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

// This only seeds demo users once – it does NOT clear or reset other localStorage keys.
export const setLocalStorage = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  if (!localStorage.getItem("staff")) {
    localStorage.setItem("staff", JSON.stringify(staff));
  }
  if (!localStorage.getItem("menuItems")) {
    localStorage.setItem("menuItems", JSON.stringify(defaultMenuItems));
  }
};

// Always returns arrays so AuthContext never breaks with null/undefined.
export const getLocalStorage = () => {
  const customer = safeParse("users", users);
  const staffData = safeParse("staff", staff);
  return { customer, staff: staffData };
};

// CART HELPERS
// Cart is stored as an array of items: { id, name, price, quantity }
export const getCartFromStorage = () => {
  // If nothing is stored yet we simply return an empty array instead of crashing.
  return safeParse("cart", []);
};

export const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ORDERS HELPERS
// Orders are stored as an array of order objects so we can show simple history.
export const getOrdersFromStorage = () => {
  return safeParse("orders", []);
};

export const saveOrdersToStorage = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

// MENU HELPERS
export const getMenuFromStorage = () => {
  return safeParse("menuItems", defaultMenuItems);
};

export const saveMenuToStorage = (menuItems) => {
  localStorage.setItem("menuItems", JSON.stringify(menuItems));
};

// PROFILE HELPERS
export const getProfilesFromStorage = () => {
  return safeParse("userProfiles", {});
};

export const getCurrentUserProfile = () => {
  const currentUser = safeParse("currentUser", null);
  if (!currentUser?.username) return null;
  const profiles = getProfilesFromStorage();
  return profiles[currentUser.username] || null;
};

export const saveCurrentUserProfile = (profileData) => {
  const currentUser = safeParse("currentUser", null);
  if (!currentUser?.username) return;
  const profiles = getProfilesFromStorage();
  const nextProfiles = {
    ...profiles,
    [currentUser.username]: profileData
  };
  localStorage.setItem("userProfiles", JSON.stringify(nextProfiles));
};

