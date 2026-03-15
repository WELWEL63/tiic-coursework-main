import React, { createContext, useContext, useState } from "react";
// import { loginApi } from "../api/authApi.js"; // backend mode (later)

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // FRONTEND-ONLY MODE:
  // Accept any username/password and set a dummy role so you can see all pages.
  const login = async ({ username, password }) => {
    if (!username || !password) return false;

    setUser({
      username,
      role: "SystemAdministrator", // full access for testing
    });
    return true;

    // BACKEND MODE (later):
    // try {
    //   const data = await loginApi({ username, password });
    //   setUser({ username: data.username, role: data.role });
    //   return true;
    // } catch (err) {
    //   console.error(err);
    //   return false;
    // }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
