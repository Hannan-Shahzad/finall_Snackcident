// //Cart.tsx
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import { FastFoodItem } from '../type'; // Import FastFoodItem type

// type CartProps = {
//   cartItems: FastFoodItem[];
//   setCartItems: React.Dispatch<React.SetStateAction<FastFoodItem[]>>;
// };

// const Cart: React.FC<CartProps> = ({ cartItems, setCartItems }) => {
//   const handleIncreaseQuantity = (itemId: string) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId ? { ...item, quantity: (item.quantity || 0) + 1 } : item
//       )
//     );
//   };

//   const handleDecreaseQuantity = (itemId: string) => {
//     setCartItems((prevItems) =>
//       prevItems
//         .map((item) =>
//           item.id === itemId && item.quantity && item.quantity > 1
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity && item.quantity > 0) // Remove item if quantity is 0
//     );
//   };

//   const getValidPrice = (price: string | number): number => {
//     if (typeof price === 'string') {
//       const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
//       return isNaN(parsedPrice) ? 0 : parsedPrice;
//     } else if (typeof price === 'number') {
//       return price;
//     } else {
//       return 0;
//     }
//   };

//   const calculateTotalPrice = () => {
//     const total = cartItems.reduce((sum, item) => {
//       const validPrice = getValidPrice(item.price);
//       const quantity = item.quantity || 1;
//       return sum + validPrice * quantity;
//     }, 0);

//     return total.toFixed(2);
//   };

//   const renderCartItem = ({ item }: { item: FastFoodItem }) => (
//     <View style={styles.cartItem}>
//       <View style={styles.cartItemDetails}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <Text style={styles.itemPrice}>Price: ${item.price}</Text>
//         <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
//       </View>
//       <View style={styles.quantityButtons}>
//         <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncreaseQuantity(item.id)}>
//           <Text style={styles.quantityButtonText}>+</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecreaseQuantity(item.id)}>
//           <Text style={styles.quantityButtonText}>-</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {cartItems.length === 0 ? (
//         <Text style={styles.emptyCartMessage}>Your cart is empty. Add items to your cart!</Text>
//       ) : (
//         <FlatList
//           data={cartItems}
//           keyExtractor={(item) => item.id}
//           renderItem={renderCartItem}
//         />
//       )}
//       {cartItems.length > 0 && (
//         <Text style={styles.totalPrice}>Total Price: ${calculateTotalPrice()}</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f9fa',
//   },
//   cartItem: {
//     padding: 16,
//     backgroundColor: '#ffffff',
//     marginBottom: 12,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   cartItemDetails: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   itemPrice: {
//     fontSize: 16,
//     color: '#888',
//     marginTop: 5,
//   },
//   itemQuantity: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 5,
//   },
//   quantityButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantityButton: {
//     backgroundColor: '#28a745',
//     padding: 8,
//     borderRadius: 50,
//     marginHorizontal: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//   },
//   quantityButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   totalPrice: {
//     fontSize: 22,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#007bff',
//   },
//   emptyCartMessage: {
//     fontSize: 18,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginTop: 50,
//     color: '#888',
//   },
// });

// export default Cart;





// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const Cart: React.FC = () => {
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const cart = (await AsyncStorage.getItem('cart')) || '[]';
//         setCartItems(JSON.parse(cart));
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   };

//   const renderCartItem = ({ item }: { item: any }) => (
//     <View style={styles.cartItem}>
//       <Text style={styles.cartItemText}>{item.name}</Text>
//       <Text style={styles.cartItemQuantity}>Qty: {item.quantity}</Text>
//       <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {cartItems.length > 0 ? (
//         <>
//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={renderCartItem}
//           />
//           <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
//         </>
//       ) : (
//         <Text style={styles.emptyCartText}>Your cart is empty.</Text>
//       )}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>Back to Home</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   cartItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     paddingBottom: 10,
//   },
//   cartItemText: {
//     fontSize: 16,
//   },
//   cartItemQuantity: {
//     fontSize: 14,
//     color: '#555',
//   },
//   cartItemPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     textAlign: 'center',
//   },
//   emptyCartText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//     marginTop: 50,
//   },
//   backButton: {
//     backgroundColor: '#ff6347',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   backButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Cart;




import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';  // Import RootStackParamList

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = (await AsyncStorage.getItem('cart')) || '[]';
        setCartItems(JSON.parse(cart));
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const updateCartItemQuantity = async (id: number, delta: number) => {
    try {
      const updatedCart = cartItems
        .map((cartItem) => {
          if (cartItem.id === id) {
            const newQuantity = cartItem.quantity + delta;

            if (newQuantity > 0) {
              return { ...cartItem, quantity: newQuantity };
            }
            return null;
          }
          return cartItem;
        })
        .filter(Boolean);

      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.cartItemImage}   
      />
      <View style={styles.cartItemDetails}>
        <View style={styles.cartRow}>
          <Text style={styles.cartItemText} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.cartItemPrice}>
            ${Math.round((item.price * item.quantity + Number.EPSILON) * 100) / 100}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateCartItemQuantity(item.id, -1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButtonPlus}
            onPress={() => updateCartItemQuantity(item.id, 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />
          <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home'))}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cartItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    flexShrink: 1,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    width: 80,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonPlus: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  backButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,

  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
