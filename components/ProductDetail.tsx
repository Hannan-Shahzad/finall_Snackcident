



// import React, { useState, useEffect } from 'react';
// import {
//   ScrollView,
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Modal,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RouteProp, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../App';

// type ProductDetailProps = {
//   route: RouteProp<RootStackParamList, 'ProductDetail'>;
// };

// const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
//   const { item } = route.params;
//   const navigation = useNavigation();
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [cartVisible, setCartVisible] = useState(false);
//   const [currentItemQuantity, setCurrentItemQuantity] = useState(0);
//   const [notification, setNotification] = useState<string | null>(null);
//   const [notificationTimeout, setNotificationTimeout] = useState<NodeJS.Timeout | null>(null);

//   const fetchCartItems = async () => {
//     try {
//       const cart = (await AsyncStorage.getItem('cart')) || '[]';
//       const parsedCart = JSON.parse(cart);
//       setCartItems(parsedCart);

//       const currentCartItem = parsedCart.find((cartItem: any) => cartItem.id === item.id);
//       setCurrentItemQuantity(currentCartItem?.quantity || 0);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//     return () => {
//       setCartVisible(false);
//       if (notificationTimeout) clearTimeout(notificationTimeout);
//     };
//   }, [item]);

//   const showNotification = (message: string) => {
//     if (notificationTimeout) {
//       clearTimeout(notificationTimeout);
//     }

//     setNotification(message);
//     const timeout = setTimeout(() => setNotification(null), 3000);
//     setNotificationTimeout(timeout);
//   };

//   const addToCart = async () => {
//     try {
//       const cart = (await AsyncStorage.getItem('cart')) || '[]';
//       const cartItems = JSON.parse(cart);
//       const existingItem = cartItems.find((cartItem: any) => cartItem.id === item.id);

//       if (existingItem) {
//         existingItem.quantity += 1;
//         showNotification(`${existingItem.quantity} ${item.name} are now in your cart. 😉`);
//         setCurrentItemQuantity(existingItem.quantity);
//       } else {
//         cartItems.push({ ...item, quantity: 1 });
//         showNotification(`${item.name} added to cart! 😉`);
//         setCurrentItemQuantity(1);
//       }

//       await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
//       setCartItems(cartItems);
//       setCartVisible(true);
//     } catch (error) {
//       showNotification('Failed to add item to cart.');
//       console.error(error);
//     }
//   };

//   const updateCartItemQuantity = async (id: number, delta: number) => {
//     try {
//       const updatedCart = cartItems
//         .map((cartItem) => {
//           if (cartItem.id === id) {
//             const newQuantity = cartItem.quantity + delta;

//             if (newQuantity > 0) {
//               if (cartItem.id === item.id) {
//                 showNotification(`${newQuantity} ${cartItem.name} are now in your cart. 😉`);
//                 setCurrentItemQuantity(newQuantity);
//               }
//               return { ...cartItem, quantity: newQuantity };
//             } else {
//               if (cartItem.id === item.id) {
//                 setCurrentItemQuantity(0);
//                 setNotification(null);
//               }
//               return null;
//             }
//           }
//           return cartItem;
//         })
//         .filter(Boolean);

//       setCartItems(updatedCart);
//       await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
//       setCartVisible(updatedCart.length > 0);
//     } catch (error) {
//       console.error('Error updating cart item quantity:', error);
//     }
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const renderCartItem = ({ item }: { item: any }) => (
//     <View style={styles.cartItem}>
//       <Text
//         style={styles.cartItemText}
//         numberOfLines={1}
//         ellipsizeMode="tail"
//       >
//         {item.name}
//       </Text>
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
//       <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.price}>${parseFloat(item.price).toFixed(2)}</Text>

//       <TouchableOpacity style={styles.addButton} onPress={addToCart}>
//         <Text style={styles.addButtonText}>Add to Cart</Text>
//       </TouchableOpacity>

//       <Text style={styles.description}>
//         Delicious {item.name} prepared just for you. Add to your cart to enjoy this amazing treat!
//       </Text>

//       <View style={styles.tableContainer}>
//         <Text style={styles.tableHeader}>Nutritional Information</Text>
//         {Object.entries(item.nutritionalInfo).map(([key, value]) => (
//           <View style={styles.tableRow} key={key}>
//             <Text style={styles.tableCell}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
//             <Text style={styles.tableCell}>
//               {value} {key === 'calories' ? 'kcal' : 'g'}
//             </Text>
//           </View>
//         ))}
//       </View>
// {/* 
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>Back to Home</Text>
//       </TouchableOpacity> */}

//       {notification && (
//         <View style={styles.notification}>
//           <Text style={styles.notificationText}>{notification}</Text>
//         </View>
//       )}
// {/* following is the modal */}
//       <Modal
//         visible={cartVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setCartVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.cartHeader}>Your Cart:</Text>
//             {cartItems.length > 0 ? (
//               <FlatList
//                 data={cartItems}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={renderCartItem}
//               />
//             ) : (
//               <Text style={styles.emptyCartText}>Your cart is empty.</Text>
//             )}
//             {cartItems.length > 0 && (
//               <View style={styles.totalContainer}>
//                 <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
//               </View>
//             )}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setCartVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
  
//   tableContainer: {
//     marginTop: 20,
//     width: '100%',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   tableHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//     color: '#444',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     paddingBottom: 5,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   tableCell: {
//     fontSize: 16,
//     color: '#555',
//   },
  
//     notification: {
//     position: 'absolute',
//     top: 10,
//     left: 20,
//     right: 20,
//     backgroundColor: '#333',
//     padding: 10,
//     borderRadius: 8,
//     zIndex: 9999,
//   },
//   notificationText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
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
//     borderRadius: 30,
//     marginTop: 20,
//     alignItems: 'center',
//     width: '60%',
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
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
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
//     fontWeight:'bold',
//     maxWidth: 150, // Adjust the width to your preference
//     overflow: 'hidden',
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
//   closeButton: {
//     backgroundColor: '#ff6347',
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   totalContainer: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   totalText: {
//     fontSize: 18,
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
  const { item } = route.params;
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [currentItemQuantity, setCurrentItemQuantity] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationTimeout, setNotificationTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchCartItems = async () => {
    try {
      const cart = (await AsyncStorage.getItem('cart')) || '[]';
      const parsedCart = JSON.parse(cart);
      setCartItems(parsedCart);

      const currentCartItem = parsedCart.find((cartItem: any) => cartItem.id === item.id);
      setCurrentItemQuantity(currentCartItem?.quantity || 0);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    return () => {
      setCartVisible(false);
      if (notificationTimeout) clearTimeout(notificationTimeout);
    };
  }, [item]);

  const showNotification = (message: string) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    setNotification(message);
    const timeout = setTimeout(() => setNotification(null), 3000);
    setNotificationTimeout(timeout);
  };

  const addToCart = async () => {
    try {
      const cart = (await AsyncStorage.getItem('cart')) || '[]';
      const cartItems = JSON.parse(cart);
      const existingItem = cartItems.find((cartItem: any) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${existingItem.quantity} ${item.name} are now in your cart. 😉`);
        setCurrentItemQuantity(existingItem.quantity);
      } else {
        cartItems.push({ ...item, quantity: 1 });
        showNotification(`${item.name} added to cart! 😉`);
        setCurrentItemQuantity(1);
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      setCartItems(cartItems);
      setCartVisible(true);
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
                showNotification(`${newQuantity} ${cartItem.name} are now in your cart. 😉`);
                setCurrentItemQuantity(newQuantity);
              }
              return { ...cartItem, quantity: newQuantity };
            } else {
              if (cartItem.id === item.id) {
                setCurrentItemQuantity(0);
                setNotification(null);
              }
              return null;
            }
          }
          return cartItem;
        })
        .filter(Boolean);

      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartVisible(updatedCart.length > 0);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Text
        style={styles.cartItemText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.name}
      </Text>
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
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{item.name}</Text>
      {item.originalPrice && (
              <Text style={styles.originalPrice}>${item.originalPrice}</Text>
            )}
      <Text style={styles.price}>${parseFloat(item.price).toFixed(2)}</Text>

      <TouchableOpacity style={styles.addButton} onPress={addToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        Delicious {item.name} prepared just for you. Add to your cart to enjoy this amazing treat!
      </Text>

      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Nutritional Information</Text>
        {Object.entries(item.nutritionalInfo).map(([key, value]) => (
          <View style={styles.tableRow} key={key}>
            <Text style={styles.tableCell}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <Text style={styles.tableCell}>
              {value} {key === 'calories' ? 'kcal' : 'g'}
            </Text>
          </View>
        ))}
      </View>
{/* 
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity> */}

      {notification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}
{/* following is the modal */}
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
      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
        </View>
      )}
      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.modalButton, styles.closeButton]}
          onPress={() => setCartVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, styles.cartButton]}
          onPress={() => {
            setCartVisible(false);
            navigation.navigate('Cart'); // Ensure the "Cart" screen is part of your navigation setup
          }}
        >
          <Text style={styles.cartButtonText}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  tableContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#4CAF50', // Green color for the "Go to Cart" button
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center'
  
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    fontSize: 16,
    color: '#555',
  },
  
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
  originalPrice: {
    fontSize: 20,
    color: '#FA8072',
    textDecorationLine: 'line-through',
    marginRight: 5,
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
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    width: '60%',
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
    fontWeight:'bold',
    maxWidth: 150, // Adjust the width to your preference
    overflow: 'hidden',
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
