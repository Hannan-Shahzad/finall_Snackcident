// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { FastFoodItem } from '../type';

// type FavouritesProps = {
//   favouriteItems: FastFoodItem[];
//   navigation: any; // Added navigation prop for navigation functionality
// };

// const Favourites: React.FC<FavouritesProps> = ({ favouriteItems, navigation }) => {
//   if (favouriteItems.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyMessage}>No favorite items yet!</Text>
//       </View>
//     );
//   }

//   const renderFavouriteItem = ({ item }: { item: FastFoodItem }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('ProductDetail', { item })} // Navigate to ProductDetail
//     >
//       <Image 
//         source={{ uri: item.image }} 
//         style={styles.image} 
//       />
//       <View style={styles.textContainer}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.price}>${item.price}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <FlatList
//       data={favouriteItems}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderFavouriteItem}
//       contentContainerStyle={styles.listContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyMessage: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#888',
//   },
//   listContainer: {
//     padding: 16,
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//     marginBottom: 8,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 16,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   price: {
//     fontSize: 16,
//     color: '#888',
//     marginTop: 5,
//   },
// });

// export default Favourites;












import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FastFoodItem } from '../type';

type FavouritesProps = {
  favouriteItems: FastFoodItem[];
  onRemoveFavourite: (itemId: string) => void; // Added remove functionality
  navigation: any; // Added navigation prop for navigation functionality
};

const Favourites: React.FC<FavouritesProps> = ({ favouriteItems, onRemoveFavourite, navigation }) => {
  if (favouriteItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyMessage}>No favorite items yet!</Text>
      </View>
    );
  }

  const renderFavouriteItem = ({ item }: { item: FastFoodItem }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate('ProductDetail', { item })}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>
      {/* Remove Button */}
      <TouchableOpacity onPress={() => onRemoveFavourite(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={favouriteItems}
      keyExtractor={(item) => item.id.toString()}
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
    marginBottom: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  removeButton: {
    backgroundColor: '#FF5C5C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Favourites;
