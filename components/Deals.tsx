



// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FastFoodCard from '../components/FastFoodCard';
// import { FastFoodItem } from '../type';

// interface DealsProps {
//   favouriteItems: FastFoodItem[];
//   onToggleFavourite: (item: FastFoodItem) => void;
//   navigation: any;
// }
 
  
// const Deals: React.FC<DealsProps> = ({ favouriteItems, onToggleFavourite, navigation }) => {
//   const [dealsItems, setDealsItems] = useState<FastFoodItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const STORAGE_KEY = '@deals_data';
  
//   const fetchDealsData = async () => {
//     try {
//       const response = await fetch('https://ayaan-ahmad24.github.io/data/data3.json');
//        const dealsData = await response.json();

//       // Store fetched data in AsyncStorage
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dealsData));
//       setDealsItems(dealsData);
//     } catch (error) {
//       console.error('Error fetching deals data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loadDealsFromStorage = async () => {
//     try {
//       setIsLoading(true);
//       console.log("Checking Deals data from Async Storageee........");
//       // Check if data exists in AsyncStorage
//       const storedData = await AsyncStorage.getItem(STORAGE_KEY);

//       if (storedData) {
//         // Parse and set data from storage
//         setDealsItems(JSON.parse(storedData));
//       } else {
//         // Fetch from API if no data in storage
//         await fetchDealsData();
//       }
//     } catch (error) {
//       console.error('Error accessing AsyncStorage:', error);
//       await fetchDealsData(); // Fallback to API if storage fails
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDealsFromStorage();
//   }, []);

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.safeAreaContainer}>
//         <ActivityIndicator size="large" color="#ff6347" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <FlatList
//       data={dealsItems}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => (
//         <FastFoodCard
//           item={item}
//           onPress={() => navigation.navigate('ProductDetail', { item })}
//           onToggleFavourite={() => onToggleFavourite(item)}
//           isFavourite={favouriteItems.some((favItem) => favItem.id === item.id)}
//         />
//       )}
//       numColumns={2}
//       contentContainerStyle={styles.listContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   listContainer: {
//     padding: 2,
//     paddingBottom: 10,
//     marginTop: '3%',
    
//   },
// });

// export default Deals;












import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastFoodCard from '../components/FastFoodCard';
import { DataContext } from '../context/DataContext';

const Deals: React.FC<any> = ({ favouriteItems, onToggleFavourite, navigation }) => {
  const { dealsItems, isLoading }:any = useContext(DataContext);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      data={dealsItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <FastFoodCard
          item={item}
          onPress={() => navigation.navigate('ProductDetail', { item })}
          onToggleFavourite={() => onToggleFavourite(item)}
          isFavourite={favouriteItems.some((favItem:any) => favItem.id === item.id)}
        />
      )}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 2,
    paddingBottom: 10,
    marginTop: '3%',
  },
});

export default Deals;
