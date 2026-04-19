import React, { useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const value = {
    currentUser,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center bg-[#eeeef1]">
            <h1 className="text-xl font-bold text-[#0F6657]">Loading FAMT<span className="text-[#FBA808]">CANTEEN</span>...</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
