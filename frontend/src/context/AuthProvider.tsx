import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";
import { login as api_login, logout as api_logout } from "../services/authService";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    api_login(username).then((responce) => {
      console.log(responce);
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
