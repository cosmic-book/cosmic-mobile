import { TUser } from '@/@types';
import { AuthService } from '@/services';
import Service from '@/services/service';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { setItemAsync, deleteItemAsync } from 'expo-secure-store';

interface AuthContextProps {
  actualUser: TUser | null;
  setActualUser: (user: TUser | null) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<TUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actualUser, setActualUser] = useState<TUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string): Promise<TUser | null> => {
    const data = await AuthService.login(username, password);

    if (!data) return null;

    await setItemAsync('cosmic_user', JSON.stringify(data.user))
    await setItemAsync('cosmic_auth', JSON.stringify(data))

    setActualUser(data.user);
    setIsAuthenticated(!!data.user);
    Service.setAuthToken(data.token);

    return data.user;
  };

  const logout = async () => {
    await deleteItemAsync('cosmic_user')
    await deleteItemAsync('cosmic_auth')

    setActualUser(null);
    setIsAuthenticated(false);
    Service.setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ actualUser, setActualUser, isAuthenticated, login, logout }}>
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
