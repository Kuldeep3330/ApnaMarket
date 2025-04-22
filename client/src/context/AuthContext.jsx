import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { data } = await axios.post("/api/v1/auth/login", { email, password });
    setUser(data.user);
    return data;
  };

  const signup = async (name, email, password) => {
    const { data } = await axios.post("/api/v1/auth/register", { name, email, password });
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await axios.post("/api/v1/auth/logout", {}, { withCredentials: true }); // Optional backend logout
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup,logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
