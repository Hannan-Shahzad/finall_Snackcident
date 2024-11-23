import AsyncStorage from '@react-native-async-storage/async-storage';
import { FastFoodItem } from '../type';

export const fetchAndStoreData = async () => {
  try {
    const response = await fetch('https://ayaan-ahmad24.github.io/data/data.json');
    const data: FastFoodItem[] = await response.json();
    await AsyncStorage.setItem('fastFoodItems', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const loadDataFromStorage = async (
  setFastFoodItems: React.Dispatch<React.SetStateAction<FastFoodItem[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  fetchAndStoreData: () => Promise<FastFoodItem[]>
) => {
  try {
    const storedData = await AsyncStorage.getItem('fastFoodItems');
    if (storedData) {
      setFastFoodItems(JSON.parse(storedData));
    } else {
      const data = await fetchAndStoreData();
      setFastFoodItems(data);
    }
  } catch (error) {
    console.error('Error loading data from storage:', error);
    await fetchAndStoreData();
  } finally {
    setIsLoading(false);
  }
};
