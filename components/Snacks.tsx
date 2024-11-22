// // Snacks.tsx

// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

// const Snacks: React.FC = () => {
 

  

//   return (
//     <View>
//         <Text>this screen hasnt made yet, but it is shown</Text>
//     </View>
   
//   );
// };

// export default Snacks;





import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FastFoodCard from '../components/FastFoodCard';
import { FastFoodItem } from '../type';

type SnacksProps = {
  fastFoodItems: FastFoodItem[];
  favouriteItems: FastFoodItem[];
  onToggleFavourite: (item: FastFoodItem) => void;
};

const Snacks: React.FC<SnacksProps> = ({ fastFoodItems, favouriteItems, onToggleFavourite }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={fastFoodItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FastFoodCard
            item={item}
            onPress={() => console.log('Navigate to details')}
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
    paddingRight: 15, // Adjusted padding to the right
    justifyContent: 'space-between', // Adds space between columns
    paddingVertical: 10, // Adds vertical padding to the container
  },
});

export default Snacks;
