import React, { createContext, useContext } from 'react';

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
  signedOut?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, signedOut = false }) => {
  const user = signedOut ? null : { id: 1, username: 'mockuser' };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};