// //ProductDetail.tsx

// import React from 'react';
// import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../App';
// import { FastFoodItem } from '../type';

// type ProductDetailProps = {
//   route: RouteProp<RootStackParamList, 'ProductDetail'>;
//   onAddToCart: (item: FastFoodItem, navigation: any) => void;
//   navigation: any;
// };

// const ProductDetail = ({ route, onAddToCart, navigation }: ProductDetailProps) => {
//   const { item } = route.params;

//   return (
//     <View style={styles.container}>
//       <Image source={item.image} style={styles.image} />
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.price}>${item.price}</Text>
//       <Text style={styles.description}>Delicious {item.name} at a great price! Enjoy this tasty item freshly prepared for you.</Text>
      
//       {/* Add to Cart Button */}
//       <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart(item, navigation)}>
//         <Text style={styles.buttonText}>Add to Cart</Text>
//       </TouchableOpacity>

//       {/* Go to Cart Button */}
//       <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
//         <Text style={styles.buttonText}>Go to Cart</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: 250,
//     height: 250,
//     marginBottom: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#ddd',
//     backgroundColor: '#fafafa',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 10,
//   },
//   name: {
//     fontSize: 28,
//     fontWeight: '700',
//     marginBottom: 10,
//     color: '#333',
//     textAlign: 'center',
//   },
//   price: {
//     fontSize: 22,
//     color: '#f4511e',
//     fontWeight: '600',
//     marginBottom: 15,
//   },
//   description: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 20,
//     lineHeight: 22,
//   },
//   addButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 5,
//     elevation: 5,
//     marginBottom: 15,
//   },
//   cartButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default ProductDetail;







import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type ProductDetailProps = {
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const { item } = route.params; // Extract the product details from route params
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description}>
        Delicious {item.name} prepared just for you. Add to your cart to enjoy this amazing treat!
      </Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ProductDetail;
