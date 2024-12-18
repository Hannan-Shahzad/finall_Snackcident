






// import React, { useState, useEffect } from 'react';

// //this data : i want to check search from this data too...
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Text,
//   Image,
//   ScrollView,
//   Keyboard,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../App';

// interface FastFoodItem {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
// }

// interface TopBarProps {
//   fastFoodItems: FastFoodItem[];
//   dealsData:FastFoodItem[];//MAKE SURE THAT THE SEARCH ALSO SEARCHED FROM THIS

// }

// const TopBar = ({ fastFoodItems }: TopBarProps) => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState<FastFoodItem[]>([]);

//   // Filter products in real-time
//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setFilteredProducts([]);
//     } else {
//       const lowerCaseQuery = searchQuery.toLowerCase();
//       const filtered = fastFoodItems.filter((item) =>
//         item.name.toLowerCase().includes(lowerCaseQuery)
//       );
//       setFilteredProducts(filtered);
//     }
//   }, [searchQuery, fastFoodItems]);

//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   return (
//     <View style={styles.container}>
//       {/* Profile Icon */}
//       <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('ProfileScreen')}>
//   <Ionicons name="person-circle-outline" size={28} color="#ff6347" />
// </TouchableOpacity>


//       {/* Search Bar with Suggestions */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search food items here..."
//           placeholderTextColor="#aaa"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       {/* Cart Icon */}
//       <TouchableOpacity
//         style={styles.iconButton}
//         onPress={() => navigation.navigate('Cart')}
//       >
//         <Ionicons name="cart-outline" size={28} color="#ff6347" />
//       </TouchableOpacity>

//       {/* Suggestions List */}
//       <View style={styles.suggestionsWrapper}>
//         {searchQuery.trim() !== '' && (
//           <>
//             {filteredProducts.length > 0 ? (
//               <ScrollView
//                 style={styles.suggestionsList}
//                 keyboardShouldPersistTaps="handled"
//                 nestedScrollEnabled={true} // Ensures nested scrolling is enabled
//               >
//                 {filteredProducts.map((item) => (
//                   <TouchableOpacity
//                     key={item.id}
//                     style={styles.suggestionItem}
//                     onPress={() => {
//                       setSearchQuery('');
//                       navigation.navigate('ProductDetail', { item });
//                     }
//                   }
//                   >
//                     <Image source={{ uri: item.image }} style={styles.suggestionImage} />
//                     <Text style={styles.suggestionText}>{item.name}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             ) : (
//               <View style={styles.noResult}>
//                 <Text style={styles.noResultText}>No such food found!</Text>
//               </View>
//             )}
//           </>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.5,
//     zIndex: 1,
//   },
//   iconButton: {
//     padding: 5,
//   },
//   searchContainer: {
//     flex: 1,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 10,
//     marginHorizontal: 10,
//   },
//   searchBar: {
//     height: 40,
//     paddingHorizontal: 10,
//     color: '#333',
//   },
//   suggestionsWrapper: {
//     position: 'absolute',
//     top: 50, // Below the search bar
//     left: 10,
//     right: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 5,
//     zIndex: 10,
//     overflow: 'hidden', // Prevent children from exceeding bounds
//     pointerEvents: 'box-none',
//     flexShrink: 1, // Allow it to adjust dynamically based on content
//   },
//   suggestionsList: {
//     flexGrow: 0, // Prevent it from taking extra space
//   },

//   suggestionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomColor: '#ddd',
//     borderBottomWidth: 1,
//   },
//   suggestionImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   suggestionText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   noResult: {
//     padding: 10,
//     alignItems: 'center',
//   },
//   noResultText: {
//     fontSize: 14,
//     color: '#999',
//     fontStyle: 'italic',
//   },
// });

// export default TopBar;
















import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import supabase from '../supabaseClient';

interface FastFoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface TopBarProps {
  fastFoodItems: FastFoodItem[];
}

const TopBar = ({ fastFoodItems }: TopBarProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<FastFoodItem[]>([]);
  const [user, setUser] = useState<any>(null);

  // Check user authentication status
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  // Filter products in real-time
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = fastFoodItems.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, fastFoodItems]);

  const handleProfilePress = () => {
    if (user) {
      navigation.navigate('ProfileScreen');
    } else {
      navigation.navigate('SignInScreen');
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <TouchableOpacity style={styles.iconButton} onPress={handleProfilePress}>
        <Ionicons name="person-circle-outline" size={28} color="#ff6347" />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search food items here..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Cart Icon */}
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="cart-outline" size={28} color="#ff6347" />
      </TouchableOpacity>

      {/* Suggestions List */}
      {searchQuery.trim() !== '' && (
        <View style={styles.suggestionsWrapper}>
          <ScrollView style={styles.suggestionsList} keyboardShouldPersistTaps="handled">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setSearchQuery('');
                    navigation.navigate('ProductDetail', { item });
                  }}
                >
                  <Image source={{ uri: item.image }} style={styles.suggestionImage} />
                  <Text style={styles.suggestionText}>{item.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noResult}>
                <Text style={styles.noResultText}>No such food found!</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 2,
    position: 'relative', // Ensures it works well with absolute children
    zIndex: 5, // Gives TopBar a higher stacking level
  },
  iconButton: {
    padding: 5,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  searchBar: {
    height: 40,
    paddingHorizontal: 10,
    color: '#333',
  },
  suggestionsWrapper: {
    position: 'absolute',
    top: 50, // Positions below the TopBar
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 10, // Android stacking
    zIndex: 20, // Ensures it appears above everything else
    overflow: 'hidden',
    maxHeight: 300, // Increased max height to accommodate all suggestions
  },
  suggestionsList: {
    flexGrow: 0, // Ensures the list does not exceed the maxHeight
  },
  
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  suggestionImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  noResult: {
    padding: 10,
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default TopBar;
