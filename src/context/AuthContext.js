"use client";

import { createContext, useContext } from "react";
import useAuth from "@/hooks/useAuth";

const AuthContext = createContext(null);

// ESTE ES EL PROVIDER QUE TE FALTA
export function AuthProvider({ children }) {
  const auth = useAuth(); // contiene registerUser, loginUser, user, logout...

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
