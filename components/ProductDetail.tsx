
// import React, { useState, useEffect } from 'react';
// import {
//   ScrollView,
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   FlatList,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RouteProp, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../App';

// type ProductDetailProps = {
//   route: RouteProp<RootStackParamList, 'ProductDetail'>;
// };

// const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
//   const { item } = route.params; // Extract the product details from route params
//   const navigation = useNavigation();
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   // Function to fetch cart items from AsyncStorage
//   const fetchCartItems = async () => {
//     try {
//       const cart = (await AsyncStorage.getItem('cart')) || '[]';
//       setCartItems(JSON.parse(cart));
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const addToCart = async () => {
//     try {
//       const cart = (await AsyncStorage.getItem('cart')) || '[]';
//       const cartItems = JSON.parse(cart);

//       const existingItem = cartItems.find((cartItem: any) => cartItem.id === item.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         cartItems.push({ ...item, quantity: 1 });
//       }

//       await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
//       Alert.alert('Success', `${item.name} added to cart!`);
//       fetchCartItems();
//     } catch (error) {
//       Alert.alert('Error', 'Failed to add item to cart.');
//       console.error(error);
//     }
//   };

//   const updateCartItemQuantity = async (id: number, delta: number) => {
//     try {
//       const updatedCart = cartItems
//         .map((cartItem) => {
//           if (cartItem.id === id) {
//             const newQuantity = cartItem.quantity + delta;
//             return newQuantity > 0 ? { ...cartItem, quantity: newQuantity } : null;
//           }
//           return cartItem;
//         })
//         .filter(Boolean); // Remove items with null values (quantity <= 0)

//       setCartItems(updatedCart);
//       await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
//     } catch (error) {
//       console.error('Error updating cart item quantity:', error);
//     }
//   };

//   const renderCartItem = ({ item }: { item: any }) => (
//     <View style={styles.cartItem}>
//       <Text style={styles.cartItemText}>{item.name}</Text>
//       <View style={styles.quantityContainer}>
//         <TouchableOpacity
//           style={styles.quantityButton}
//           onPress={() => updateCartItemQuantity(item.id, -1)}
//         >
//           <Text style={styles.quantityButtonText}>-</Text>
//         </TouchableOpacity>
//         <Text style={styles.quantityText}>{item.quantity}</Text>
//         <TouchableOpacity
//           style={styles.quantityButtonPlus}
//           onPress={() => updateCartItemQuantity(item.id, 1)}
//         >
//           <Text style={styles.quantityButtonText}>+</Text>
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.cartItemPrice}>
//         ${Math.round((item.price * item.quantity + Number.EPSILON) * 100) / 100}
//       </Text>
//     </View>
//   );

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={item.image} style={styles.image} resizeMode="contain" />
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.price}>${parseFloat(item.price).toFixed(2)}</Text>
//       <Text style={styles.description}>
//         Delicious {item.name} prepared just for you. Add to your cart to enjoy this amazing treat!
//       </Text>
//       <TouchableOpacity style={styles.addButton} onPress={addToCart}>
//         <Text style={styles.addButtonText}>Add to Cart</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>Back to Home</Text>
//       </TouchableOpacity>
//       <View style={styles.cartContainer}>
//         <Text style={styles.cartHeader}>Your Cart:</Text>
//         {cartItems.length > 0 ? (
//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={renderCartItem}
//           />
//         ) : (
//           <Text style={styles.emptyCartText}>Your cart is empty.</Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     paddingBottom: 30,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   price: {
//     fontSize: 20,
//     color: '#888',
//   },
//   description: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   addButton: {
//     backgroundColor: '#ff6347',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//     alignItems: 'center',
//     width: '100%',
//   },
//   addButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   backButton: {
//     backgroundColor: '#ddd',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 10,
//     alignItems: 'center',
//     width: '100%',
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   cartContainer: {
//     marginTop: 30,
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 3,
//   },
//   cartHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   emptyCartText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//   },
//   cartItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 10,
//   },
//   cartItemText: {
//     fontSize: 16,
//   },
//   cartItemPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantityButton: {
//     backgroundColor: '#ff6347',
//     paddingVertical: 10,
//     paddingHorizontal: 17,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   quantityButtonPlus: {
//     backgroundColor: 'green',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   quantityButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   quantityText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ProductDetail;




import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type ProductDetailProps = {
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const { item } = route.params; // Extract the product details from route params
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartVisible, setCartVisible] = useState(false); // Manage cart visibility
  const [currentItemQuantity, setCurrentItemQuantity] = useState(0); // Track current item's quantity in cart
  const [notification, setNotification] = useState<string | null>(null); // Notification message
  const [notificationTimeout, setNotificationTimeout] = useState<NodeJS.Timeout | null>(null); // Track timer

  // Function to fetch cart items from AsyncStorage
  const fetchCartItems = async () => {
    try {
      const cart = (await AsyncStorage.getItem('cart')) || '[]';
      const parsedCart = JSON.parse(cart);
      setCartItems(parsedCart);

      // Find the current item's quantity in the cart
      const currentCartItem = parsedCart.find((cartItem: any) => cartItem.id === item.id);
      setCurrentItemQuantity(currentCartItem?.quantity || 0); // Default to 0 if item not in cart
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();

    // Cleanup function to reset modal visibility when navigating away
    return () => {
      setCartVisible(false);
      if (notificationTimeout) clearTimeout(notificationTimeout);
    };
  }, [item]); // Trigger on item change (when navigating to another product)

  const showNotification = (message: string) => {
    // Clear the previous timer if it exists
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    setNotification(message);
    const timeout = setTimeout(() => setNotification(null), 3000); // Clear the message after 2 seconds
    setNotificationTimeout(timeout); // Store the current timer
  };

  const addToCart = async () => {
    try {
      const cart = (await AsyncStorage.getItem('cart')) || '[]';
      const cartItems = JSON.parse(cart);
      const existingItem = cartItems.find((cartItem: any) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${existingItem.quantity} ${item.name} are now  in your cart.😉`);
        setCurrentItemQuantity(existingItem.quantity); // Update local quantity
      } else {
        cartItems.push({ ...item, quantity: 1 });
        showNotification(`${item.name} added to cart! 😉`);
        setCurrentItemQuantity(1); // Set quantity to 1 for a new item
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      setCartItems(cartItems); // Update local cart items
      setCartVisible(true); // Show the cart modal
    } catch (error) {
      showNotification('Failed to add item to cart.');
      console.error(error);
    }
  };

  const updateCartItemQuantity = async (id: number, delta: number) => {
    try {
      const updatedCart = cartItems
        .map((cartItem) => {
          if (cartItem.id === id) {
            const newQuantity = cartItem.quantity + delta;

            if (newQuantity > 0) {
              if (cartItem.id === item.id) {
                showNotification(`${newQuantity} ${cartItem.name} are now  in your cart. 😉`);
                setCurrentItemQuantity(newQuantity);
              }
              return { ...cartItem, quantity: newQuantity };
            } else {
              if (cartItem.id === item.id) {
                setCurrentItemQuantity(0); // Reset the quantity to 0
                setNotification(null); // Immediately stop showing the notification
              }
              return null; // Remove item from cart if quantity is 0
            }
          }
          return cartItem;
        })
        .filter(Boolean); // Remove items with null values (quantity <= 0)

      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartVisible(updatedCart.length > 0); // Update cart visibility
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemText}>{item.name}</Text>
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
      <Text style={styles.cartItemPrice}>
        ${Math.round((item.price * item.quantity + Number.EPSILON) * 100) / 100}
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
      source={{ uri: item.image }} 
      style={styles.image} 
      resizeMode="contain" 
    />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${parseFloat(item.price).toFixed(2)}</Text>
      <Text style={styles.description}>
        Delicious {item.name} prepared just for you. Add to your cart to enjoy this amazing treat!
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={addToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>

      {/* Notification Banner */}
      {notification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}

      {/* Cart Modal */}
      <Modal
        visible={cartVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCartVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.cartHeader}>Your Cart:</Text>
            {cartItems.length > 0 ? (
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCartItem}
              />
            ) : (
              <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            )}
            {/* Display Total */}
            {cartItems.length > 0 && (
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCartVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    zIndex: 9999,
  },
  notificationText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  cartItemText: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonPlus: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  closeButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
