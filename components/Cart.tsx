//Cart.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FastFoodItem } from '../type'; // Import FastFoodItem type

type CartProps = {
  cartItems: FastFoodItem[];
  setCartItems: React.Dispatch<React.SetStateAction<FastFoodItem[]>>;
};

const Cart: React.FC<CartProps> = ({ cartItems, setCartItems }) => {
  const handleIncreaseQuantity = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId && item.quantity && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity && item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const getValidPrice = (price: string | number): number => {
    if (typeof price === 'string') {
      const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
      return isNaN(parsedPrice) ? 0 : parsedPrice;
    } else if (typeof price === 'number') {
      return price;
    } else {
      return 0;
    }
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((sum, item) => {
      const validPrice = getValidPrice(item.price);
      const quantity = item.quantity || 1;
      return sum + validPrice * quantity;
    }, 0);

    return total.toFixed(2);
  };

  const renderCartItem = ({ item }: { item: FastFoodItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.quantityButtons}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncreaseQuantity(item.id)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecreaseQuantity(item.id)}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartMessage}>Your cart is empty. Add items to your cart!</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
        />
      )}
      {cartItems.length > 0 && (
        <Text style={styles.totalPrice}>Total Price: ${calculateTotalPrice()}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  cartItem: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cartItemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 50,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    color: '#007bff',
  },
  emptyCartMessage: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
});

export default Cart;
