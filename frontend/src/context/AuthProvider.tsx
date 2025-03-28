import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../types/User";
import { login as api_login, logout as api_logout } from "../services/authService";
import { getUser, getUsers } from "../services/userService";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => {
    api_login(username).then((responce) => {
      setUser(responce)
    });
  };

  const logout = () => {
    // TODO: Doesn't work! Server error
    if (user) {
      api_logout(user.id).then((responce) => {
        if (responce == 400) {
          console.log("Log out failed!");
        }
        else {
          setUser(null);
        }
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
