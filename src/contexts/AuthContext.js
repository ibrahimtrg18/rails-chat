import React, { useContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const value = useAuth();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};
