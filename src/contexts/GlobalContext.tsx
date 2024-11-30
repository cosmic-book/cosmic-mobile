import { Reading, ReadingsInfo } from '@/@types';
import { ReadingService } from '@/services';
import React, { createContext, ReactNode, useState } from 'react';

interface GlobalContextData {
  loading: boolean;
  setLoading: (load: boolean) => void;
  actualReading: Reading;
  loadReading: (readingId: number) => Promise<void>;
  userReadingsInfo: ReadingsInfo;
  getUserReadingsInfo: (userId: number | undefined) => Promise<void>;
};

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [actualReading, setActualReading] = useState<Reading>({} as Reading);
  const [userReadingsInfo, setUserReadingsInfo] = useState<ReadingsInfo>({} as ReadingsInfo);

  async function loadReading(readingId: number): Promise<void> {
    try {
      const result = await ReadingService.getById(readingId);

      if (result) setActualReading(result);
    } catch (err) {
      console.log(err);
    }
  }

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
        actualReading,
        loadReading,
        userReadingsInfo,
        getUserReadingsInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
