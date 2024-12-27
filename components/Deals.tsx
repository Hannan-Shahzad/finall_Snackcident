










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
