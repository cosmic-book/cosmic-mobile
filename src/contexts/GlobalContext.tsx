import React, { createContext, useState, ReactNode } from 'react';
import { Reading, ReadingsInfo, User } from '@/@types';
import { ReadingService } from '@/services';
import { useAuth } from './AuthContext';

interface GlobalContextData {
  loading: boolean;
  setLoading: (load: boolean) => void;
  userReadingsInfo: ReadingsInfo;
  getUserReadingsInfo: (user: User) => Promise<void>;
};

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userReadingsInfo, setUserReadingsInfo] = useState<ReadingsInfo>({} as ReadingsInfo);

  async function getUserReadingsInfo(user: User | undefined): Promise<void> {
    try {
      if (user) {
        setLoading(true)

        const result = await ReadingService.getByUser(user.id);

        setUserReadingsInfo(result);
      }

      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        userReadingsInfo,
        getUserReadingsInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
