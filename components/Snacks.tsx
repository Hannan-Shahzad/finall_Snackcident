
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FastFoodCard from '../components/FastFoodCard';
import { FastFoodItem } from '../type';

type SnacksProps = {
  fastFoodItems: FastFoodItem[];
  favouriteItems: FastFoodItem[];
  onToggleFavourite: (item: FastFoodItem) => void;
  navigation: any; // Added navigation prop
};

const Snacks: React.FC<SnacksProps> = ({
  fastFoodItems,
  favouriteItems,
  onToggleFavourite,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={fastFoodItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FastFoodCard
            item={item}
            onPress={() => navigation.navigate('ProductDetail', { item })} // Navigate to ProductDetail
            onToggleFavourite={() => onToggleFavourite(item)}
            isFavourite={favouriteItems.some((favItem) => favItem.id === item.id)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingLeft: 15, // Adjusted padding to the left
    paddingRight: 10, // Adjusted padding to the right
    justifyContent: 'space-between', // Adds space between columns
    paddingVertical: 10, // Adds vertical padding to the container
    backgroundColor:'#fff'
  },
});

export default Snacks;
