import { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localstorage';


export const AuthContext = createContext();

function AuthProvider(props) {


  const [userData, setuserData] = useState(null);

  useEffect(() => {
    const { customer, staff } = getLocalStorage();
    setuserData({ customer, staff });
  }, [])


  return (

    <AuthContext.Provider value={userData}>
      {props.children}
    </AuthContext.Provider>

  )
}

export default AuthProvider
