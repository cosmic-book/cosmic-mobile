import { Reading, ProfileInfos } from '@/@types';
import { ProfileService, ReadingService } from '@/services';
import React, { createContext, ReactNode, useState } from 'react';

interface GlobalContextData {
  loading: boolean;
  setLoading: (load: boolean) => void;
  actualReading: Reading;
  loadReading: (readingId: number) => Promise<void>;
  userInfos: ProfileInfos;
  loadUserInfos: (userId: number | undefined) => Promise<void>;
};

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [actualReading, setActualReading] = useState<Reading>({} as Reading);
  const [userInfos, setUserInfos] = useState<ProfileInfos>({} as ProfileInfos);

  async function loadReading(readingId: number): Promise<void> {
    try {
      const result = await ReadingService.getById(readingId);

      setActualReading(result ?? ({} as Reading));
    } catch (err) {
      console.log(err);
    }
  }

  async function loadUserInfos(userId: number | undefined): Promise<void> {
    try {
      if (userId) {
        setLoading(true)

        const result = await ProfileService.getByUser(userId);

        setUserInfos(result);
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
        actualReading,
        loadReading,
        userInfos,
        loadUserInfos
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
