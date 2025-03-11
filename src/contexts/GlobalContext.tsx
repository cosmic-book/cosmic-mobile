import { TReading, TProfileInfos } from '@/@types';
import { TBookshelfFilter } from '@/@types/filters';
import { ProfileService, ReadingsService } from '@/services';
import React, { createContext, ReactNode, useState } from 'react';

interface GlobalContextData {
  loading: boolean;
  setLoading: (load: boolean) => void;
  actualReading: TReading;
  loadReading: (readingId: number) => Promise<void>;
  userInfos: TProfileInfos;
  loadUserInfos: (userId?: number, filters?: TBookshelfFilter) => Promise<void>;
}

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [actualReading, setActualReading] = useState<TReading>({} as TReading);
  const [userInfos, setUserInfos] = useState<TProfileInfos>({} as TProfileInfos);

  async function loadReading(readingId: number): Promise<void> {
    try {
      const result = await ReadingsService.getById(readingId);

      setActualReading(result ?? ({} as TReading));
    } catch (err) {
      console.log(err);
    }
  }

  async function loadUserInfos(userId?: number, filters?: TBookshelfFilter): Promise<void> {
    try {
      if (userId) {
        setLoading(true);

        const result = await ProfileService.getByUser(userId, filters);

        setUserInfos(result);
      }

      setLoading(false);
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
