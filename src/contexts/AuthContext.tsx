import { User } from '@/@types';
import { AuthService } from '@/services';
import Service from '@/services/service';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    const data = await AuthService.login(username, password);

    if (!data) return false;

    setUser(data.user);
    setIsAuthenticated(!!data.user);
    Service.setAuthToken(data.token);

    return isAuthenticated;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Service.setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
