// // FastFoodCard.tsx










// import React from 'react';
// import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// type FastFoodCardProps = {
//   item: {
//     id: string;
//     name: string;
//     price: string;
//     image: any;
//   };
//   onPress: () => void;
//   onToggleFavourite: () => void; // Prop for toggling favourite
//   isFavourite: boolean; // Prop to check if it's favourite
// };

// const FastFoodCard: React.FC<FastFoodCardProps> = React.memo(({ item, onPress, onToggleFavourite, isFavourite }) => {
//   return (
//     <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: '#ddd' }}>
//       <Image 
//       source={{ uri: item.image }} 
//       style={styles.image} 
//       resizeMode="cover" 
// />

//       <View style={styles.textContainer}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.price}>{item.price}</Text>
//       </View>
//       {/* Heart Icon for Favourites */}
//       <TouchableOpacity onPress={onToggleFavourite} style={styles.heartIcon}>
//         <Ionicons
//           name={isFavourite ? 'heart' : 'heart-outline'}
//           size={24}
//           color={isFavourite ? 'red' : '#aaa'}
//         />
//       </TouchableOpacity>
//     </Pressable>
//   );
// });

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 12,
//     width: '48%',
//     marginBottom: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: 120,
//     borderRadius: 12,
//   },
//   textContainer: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   price: {
//     fontSize: 14,
//     color: '#888',
//     marginTop: 5,
//   },
//   heartIcon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
// });

// export default FastFoodCard;










import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type FastFoodCardProps = {
  item: {
    id: string;
    name: string;
    price: string;
    image: any;
  };
  onPress: () => void;
  onToggleFavourite: () => void; // Prop for toggling favourite
  isFavourite: boolean; // Prop to check if it's favourite
};

const FastFoodCard: React.FC<FastFoodCardProps> = React.memo(({ item, onPress, onToggleFavourite, isFavourite }) => {
  console.log(`Rendering FastFoodCard for ${item.name}`);  // Debug log
  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: '#ddd' }}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      {/* Heart Icon for Favourites */}
      <TouchableOpacity onPress={onToggleFavourite} style={styles.heartIcon}>
        <Ionicons
          name={isFavourite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavourite ? 'red' : '#aaa'}
        />
      </TouchableOpacity>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default FastFoodCard;
