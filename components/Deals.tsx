// Deals.tsx

// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

// const Deals: React.FC = () => {
 

  

//   return (
//     <View>
//         <Text>this screen also has not made yet, but it is shown in app</Text>
//     </View>
   
//   );
// };

// export default Deals;








import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastFoodCard from '../components/FastFoodCard';
import { FastFoodItem } from '../type';

interface DealsProps {
  favouriteItems: FastFoodItem[];
  onToggleFavourite: (item: FastFoodItem) => void;
  navigation: any;
}

const Deals: React.FC<DealsProps> = ({ favouriteItems, onToggleFavourite, navigation }) => {
  const [dealsItems, setDealsItems] = useState<FastFoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDealsData = async () => {
    try {
      const response = await fetch('https://ayaan-ahmad24.github.io/data/data2.json');
      const data = await response.json();
      setDealsItems(data);
    } catch (error) {
      console.error('Error fetching deals data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDealsData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <FlatList
        data={dealsItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FastFoodCard
            item={item}
            onPress={() => navigation.navigate('ProductDetail', { item })}
            onToggleFavourite={() => onToggleFavourite(item)}
            isFavourite={favouriteItems.some((favItem) => favItem.id === item.id)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingLeft: 15,
    paddingBottom: 10,
  },
});

export default Deals;
