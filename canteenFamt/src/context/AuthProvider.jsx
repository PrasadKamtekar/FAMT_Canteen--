import { useMemo } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localstorage";
import { AuthContext } from "./AuthContext.jsx";

function AuthProvider(props) {
  // Seed demo users only if they are not already present.
  // This avoids wiping any existing localStorage data.
  const userData = useMemo(() => {
    setLocalStorage();
    const { customer, staff } = getLocalStorage();
    return { customer, staff };
  }, []);

  return (
    <AuthContext.Provider value={userData}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
