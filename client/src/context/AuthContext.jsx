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
    await axios.post("/api/v1/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    // optionally fetch user on page reload
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
