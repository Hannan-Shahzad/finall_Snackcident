import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FastFoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
  [key: string]: any;
}

interface DataContextType {
  dealsItems: FastFoodItem[];
  isLoading: boolean;
  fetchDealsData: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dealsItems, setDealsItems] = useState<FastFoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const STORAGE_KEY = '@deals_data';

  const fetchDealsData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://ayaan-ahmad24.github.io/data/data3.json');
      const dealsData = await response.json();

      // Store fetched data in AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dealsData));
      setDealsItems(dealsData);
    } catch (error) {
      console.error('Error fetching deals data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDealsFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedData) {
        setDealsItems(JSON.parse(storedData));
      } else {
        await fetchDealsData();
      }
    } catch (error) {
      console.error('Error accessing AsyncStorage:', error);
      await fetchDealsData();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDealsFromStorage();
  }, []);

  return (
    <DataContext.Provider value={{ dealsItems, isLoading, fetchDealsData }}>
      {children}
    </DataContext.Provider>
  );
};
