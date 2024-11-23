import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FastFoodCard from '../components/FastFoodCard';
import { FastFoodItem } from '../type';

interface HomeScreenProps {
  fastFoodItems: FastFoodItem[];
  favouriteItems: FastFoodItem[];
  isLoading: boolean;
  navigation: any;
  onToggleFavourite: (item: FastFoodItem) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ fastFoodItems, favouriteItems, isLoading, navigation, onToggleFavourite }) => {
  const renderItem = useCallback(
    ({ item }: { item: FastFoodItem }) => (
      <FastFoodCard
        item={item}
        onPress={() => navigation.navigate('ProductDetail', { item })}
        onToggleFavourite={() => onToggleFavourite(item)}
        isFavourite={favouriteItems.some((favItem) => favItem.id === item.id)}
      />
    ),
    [favouriteItems, navigation, onToggleFavourite]
  );

  return (
    // <SafeAreaView style={styles.safeAreaContainer}>
    <View style={styles.mainView}>
    {/* styles.mainView */}
    {isLoading ? (
        <ActivityIndicator size="large" color="#ff6347" />
      ) : (
        <FlatList
          data={fastFoodItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.cartButtonText}>Go To Cart</Text>
      </TouchableOpacity>
    
    </View>
    //</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: '#fff' },
  listContainer: { paddingLeft: 15 },
  cartButton: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  mainView:{
    marginTop:'4%',
  },
  cartButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default HomeScreen;
