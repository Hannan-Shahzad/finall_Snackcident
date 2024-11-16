// Favourites.tsx

import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { FastFoodItem } from '../type'; // Import the FastFoodItem type

type FavouritesProps = {
  favouriteItems: FastFoodItem[];
};

const Favourites: React.FC<FavouritesProps> = ({ favouriteItems }) => {
  if (favouriteItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyMessage}>No favorite items yet!</Text>
      </View>
    );
  }

  const renderFavouriteItem = ({ item }: { item: FastFoodItem }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={favouriteItems}
      keyExtractor={(item) => item.id}
      renderItem={renderFavouriteItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});

export default Favourites;
