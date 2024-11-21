import React, { createContext, useState, ReactNode } from 'react';
import { Reading, ReadingsInfo, User } from '@/@types';
import { ReadingService } from '@/services';
import { useAuth } from './AuthContext';

interface GlobalContextData {
  loading: boolean;
  setLoading: (load: boolean) => void;
  userReadingsInfo: ReadingsInfo;
  getUserReadingsInfo: (userId: number | undefined) => Promise<void>;
};

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userReadingsInfo, setUserReadingsInfo] = useState<ReadingsInfo>({} as ReadingsInfo);

  async function getUserReadingsInfo(userId: number | undefined): Promise<void> {
    try {
      if (userId) {
        setLoading(true)

        const result = await ReadingService.getByUser(userId);

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
