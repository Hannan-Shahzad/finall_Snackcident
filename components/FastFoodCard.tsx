



// //FastFoodCart.tsx:
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
//   console.log(`Rendering FastFoodCard for ${item.name}`);  // Debug log
//   //this component keeps rerendering everytime any change happens or we navigate to home screen
//   return (
//     <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: '#ddd' }}>
//       <Image 
//         source={{ uri: item.image }} 
//         style={styles.image} 
//         resizeMode="cover" 
//       />
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
//     marginBottom: 15,
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







import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type FastFoodCardProps = {
  item: {
    id: string;
    name: string;
    price: string;
    originalPrice?: string; // Optional property for original price
    image: any;
  };
  onPress: () => void;
  onToggleFavourite: () => void; // Prop for toggling favourite
  isFavourite: boolean; // Prop to check if it's favourite
};

const FastFoodCard: React.FC<FastFoodCardProps> = React.memo(
  ({ item, onPress, onToggleFavourite, isFavourite }) => {
    console.log(`Rendering FastFoodCard for ${item.name}`); // Debug log

    // Animation references
    const scaleValue = useRef(new Animated.Value(1)).current; // For pop effect

    const handleToggleFavourite = () => {
      // Trigger pop animation
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.4,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      // Trigger the toggle favourite function
      onToggleFavourite();
    };

    return (
      <Pressable
        style={styles.card}
        onPress={onPress}
        android_ripple={{ color: '#ddd' }}
      >
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.priceContainer}>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>${item.originalPrice}</Text>
            )}
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
        {/* Animated Heart Icon */}
        <TouchableOpacity onPress={handleToggleFavourite} style={styles.heartIcon}>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Ionicons
              name={isFavourite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavourite ? 'red' : '#aaa'}
            />
          </Animated.View>
        </TouchableOpacity>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    width: '48%',
    marginBottom: 15,
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
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: '#FA8072',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  price: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default FastFoodCard;
