

// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Text, Animated, ActivityIndicator } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
// import FastFoodCard from './components/FastFoodCard';
// import ProductDetail from './components/ProductDetail';
// import Cart from './components/Cart';
// import Favourites from './components/Favourites';
// import Deals from './components/Deals';
// import Snacks from './components/Snacks';
// import { FastFoodItem } from './type';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export type RootStackParamList = {
//   Home: undefined;
//   ProductDetail: { item: FastFoodItem };
//   Cart: undefined;
//   Favourites: undefined;
//   Deals: undefined;
//   Snacks: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   const [cartItems, setCartItems] = useState<FastFoodItem[]>([]);
//   const [favouriteItems, setFavouriteItems] = useState<FastFoodItem[]>([]);
//   const [fastFoodItems, setFastFoodItems] = useState<FastFoodItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'home', title: 'Home' },
//     { key: 'snacks', title: 'Snacks' },
//     { key: 'deals', title: 'Deals' },
//     { key: 'favourites', title: 'Favourites' },
//   ]);

//   const [indicatorPosition] = useState(new Animated.Value(0)); // Animated value for indicator

//   // Fetch data from the API
//   useEffect(() => {
//     fetch('https://ayaan-ahmad24.github.io/data/data.json')
//       .then((response) => response.json())
//       .then((data) => {
//         setFastFoodItems(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       });
//   }, []);

//   const handleAddToCart = (item: FastFoodItem) => {
//     setCartItems((prevItems) => {
//       const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
//       if (itemExists) {
//         return prevItems.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
//             : cartItem
//         );
//       } else {
//         return [...prevItems, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   const handleToggleFavourite = (item: FastFoodItem) => {
//     setFavouriteItems((prevItems) => {
//       const itemExists = prevItems.find((favItem) => favItem.id === item.id);
//       if (itemExists) {
//         return prevItems.filter((favItem) => favItem.id !== item.id); // Remove from favourites
//       } else {
//         return [...prevItems, item]; // Add to favourites
//       }
//     });
//   };

//   const HomeScreen = ({ navigation }: any) => (
//     <SafeAreaView style={styles.safeAreaContainer}>
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#ff6347" />
//       ) : (
//         <FlatList
//           data={fastFoodItems}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <FastFoodCard
//               item={item}
//               onPress={() => navigation.navigate('ProductDetail', { item })}
//               onToggleFavourite={() => handleToggleFavourite(item)}
//               isFavourite={favouriteItems.some((favItem) => favItem.id === item.id)}
//             />
//           )}
//           numColumns={2}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//       <TouchableOpacity
//         style={styles.cartButton}
//         onPress={() => navigation.navigate('Cart')}
//       >
//         <Text style={styles.cartButtonText}>Go To Cart</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );

//   const SnacksScreen = () => <Snacks />;
//   const DealsScreen = () => <Deals />;
//   const FavouritesScreen = () => <Favourites favouriteItems={favouriteItems} />;

//   const renderScene = ({ route }: any, navigation: any) => {
//     switch (route.key) {
//       case 'home':
//         return <HomeScreen navigation={navigation} />;
//       case 'snacks':
//         return <SnacksScreen />;
//       case 'deals':
//         return <DealsScreen />;
//       case 'favourites':
//         return <FavouritesScreen />;
//       default:
//         return null;
//     }
//   };

//   const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<any> }) => {
//     const handleTabPress = (index: number) => {
//       setIndex(index);
//       // Animate the indicator position
//       Animated.spring(indicatorPosition, {
//         toValue: index * (Dimensions.get('window').width / routes.length),
//         useNativeDriver: true,
//       }).start();
//     };

//     return (
//       <View style={styles.tabBarContainer}>
//         {props.navigationState.routes.map((route, index) => {
//           const isActive = props.navigationState.index === index;
//           return (
//             <TouchableOpacity
//               key={route.key}
//               style={[styles.tabButton, isActive && styles.activeTab]}
//               onPress={() => handleTabPress(index)}
//             >
//               <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
//                 {route.title}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//         {/* Animated Tab Indicator */}
//         <Animated.View
//           style={[
//             styles.tabIndicator,
//             { transform: [{ translateX: indicatorPosition }] },
//           ]}
//         />
//       </View>
//     );
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" options={{ headerShown: false }}>
//           {({ navigation }) => (
//             <SafeAreaView style={{ flex: 1 }}>
//               <TabView
//                 navigationState={{ index, routes }}
//                 renderScene={({ route }) => renderScene({ route }, navigation)}
//                 renderTabBar={renderTabBar}
//                 onIndexChange={(index) => {
//                   setIndex(index);
//                   // Animate the indicator position when swiping
//                   Animated.spring(indicatorPosition, {
//                     toValue: index * (Dimensions.get('window').width / routes.length),
//                     useNativeDriver: true,
//                   }).start();
//                 }}
//                 initialLayout={{ width: Dimensions.get('window').width }}
//                 style={styles.tabView}
//                 swipeEnabled={true}
//               />
//             </SafeAreaView>
//           )}
//         </Stack.Screen>
//         <Stack.Screen
//           name="ProductDetail"
//           component={ProductDetail}
//           options={{ title: 'Details' }}
//         />
//         <Stack.Screen
//           name="Cart"
//           component={Cart}
//           options={{ title: 'Your Cart' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   listContainer: {
//     paddingLeft: 15,
//   },
//   tabView: {
//     flex: 1,
//   },
//   cartButton: {
//     position: 'absolute',
//     bottom: 10,
//     left: 20,
//     right: 20,
//     backgroundColor: '#ff6347',
//     padding: 15,
//     borderRadius: 30,
//     alignItems: 'center',
//   },
//   cartButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   // Custom TabBar styles
//   tabBarContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     paddingVertical: 5,
//     position: 'relative',
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   activeTab: {
//     backgroundColor: '#fff',
//   },
//   tabLabel: {
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   activeTabLabel: {
//     color: '#ff6347',
//   },
//   tabIndicator: {
//     position: 'absolute',
//     height: 2,
//     backgroundColor: '#ff6347',
//     width: '25%', // Adjust based on the number of tabs
//     bottom: 0,
//   },
// });

















//App.tsx:
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Text, Animated, ActivityIndicator } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FastFoodCard from './components/FastFoodCard';
// import ProductDetail from './components/ProductDetail';


// import Cart from './components/Cart';


// import Favourites from './components/Favourites';
// import Deals from './components/Deals';
// import Snacks from './components/Snacks';
// import { FastFoodItem } from './type';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export type RootStackParamList = {
//   Home: undefined;
//   ProductDetail: { item: FastFoodItem };
//   Cart: undefined;
//   Favourites: undefined;
//   Deals: undefined;
//   Snacks: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   const [cartItems, setCartItems] = useState<FastFoodItem[]>([]);
//   const [favouriteItems, setFavouriteItems] = useState<FastFoodItem[]>([]);
//   const [fastFoodItems, setFastFoodItems] = useState<FastFoodItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'home', title: 'Home' },
//     { key: 'snacks', title: 'Snacks' },
//     { key: 'deals', title: 'Deals' },
//     { key: 'favourites', title: 'Favourites' },
//   ]);

//   const [indicatorPosition] = useState(new Animated.Value(0));

//   const fetchAndStoreData = async () => {
//     try {
//       const response = await fetch('https://ayaan-ahmad24.github.io/data/data.json');
//       const data = await response.json();
//       await AsyncStorage.setItem('fastFoodItems', JSON.stringify(data));
//       console.log("Fetched Data")
//       setFastFoodItems(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loadDataFromStorage = async () => {
//     try {
//       const storedData = await AsyncStorage.getItem('fastFoodItems');
//       if (storedData) {
//         console.log("API CALLED..................................................................");
//         setFastFoodItems(JSON.parse(storedData));
//         setIsLoading(false);
//       } else {
//         fetchAndStoreData();
//       }
//     } catch (error) {
//       console.error('Error loading data from storage:', error);
//       fetchAndStoreData();
//     }
//   };

//   useEffect(() => {
//     loadDataFromStorage();
//     console.log("use effect called")
//   }, []);

//   // const handleAddToCart = (item: FastFoodItem) => {
//   //   setCartItems((prevItems) => {
//   //     const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
//   //     if (itemExists) {
//   //       return prevItems.map((cartItem) =>
//   //         cartItem.id === item.id
//   //           ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
//   //           : cartItem
//   //       );
//   //     } else {
//   //       return [...prevItems, { ...item, quantity: 1 }];
//   //     }
//   //   });
//   // };

//   const handleToggleFavourite = (item: FastFoodItem) => {
//     setFavouriteItems((prevItems) => {
//       const itemExists = prevItems.find((favItem) => favItem.id === item.id);
//       if (itemExists) {
//         return prevItems.filter((favItem) => favItem.id !== item.id);
//       } else {
//         return [...prevItems, item];
//       }
//     });
//   };

//   const HomeScreen = ({ navigation }: any) => {
//     const renderItem = React.useCallback(({ item }: { item: FastFoodItem }) => (
//       <FastFoodCard
//         item={item}
//         onPress={() => navigation.navigate('ProductDetail', { item })}
//         onToggleFavourite={() => handleToggleFavourite(item)}
//         isFavourite={favouriteItems.some((favItem) => favItem.id === item.id)}
//       />
//     ), [favouriteItems, navigation]);


//     return (
//       <SafeAreaView style={styles.safeAreaContainer}>
//         {isLoading ? (
//           <ActivityIndicator size="large" color="#ff6347" />
//         ) : (
//           <FlatList
//             data={fastFoodItems}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={renderItem}
//             numColumns={2}
//             contentContainerStyle={styles.listContainer}
//           />
//         )}
//         <TouchableOpacity
//           style={styles.cartButton}
//           onPress={() => navigation.navigate('Cart')}
//         >
//           <Text style={styles.cartButtonText}>Go To Cart</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   };

//   const SnacksScreen = () => (
//     <Snacks
//       fastFoodItems={fastFoodItems.filter((item) => item.category === 'Snack')}
//       favouriteItems={favouriteItems}
//       onToggleFavourite={handleToggleFavourite}
//     />
//   );

//   const renderScene = ({ route }: any, navigation: any) => {
//     switch (route.key) {
//       case 'home':
//         return <HomeScreen navigation={navigation} />;
//       case 'snacks':
//         return <SnacksScreen />;
//       case 'deals':
//         return (
//           <Deals
//             favouriteItems={favouriteItems}
//             onToggleFavourite={handleToggleFavourite}
//             navigation={navigation}
//           />
//         );
//       case 'favourites':
//         return <Favourites favouriteItems={favouriteItems} />;
//       default:
//         return null;
//     }
//   };

//   const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<any> }) => {
//     const handleTabPress = (index: number) => {
//       setIndex(index);
//       Animated.spring(indicatorPosition, {
//         toValue: index * (Dimensions.get('window').width / routes.length),
//         useNativeDriver: true,
//       }).start();
//     };

//     return (
//       <View style={styles.tabBarContainer}>
//         {props.navigationState.routes.map((route, index) => {
//           const isActive = props.navigationState.index === index;
//           return (
//             <TouchableOpacity
//               key={route.key}
//               style={[styles.tabButton, isActive && styles.activeTab]}
//               onPress={() => handleTabPress(index)}
//             >
//               <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
//                 {route.title}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//         <Animated.View
//           style={[
//             styles.tabIndicator,
//             { transform: [{ translateX: indicatorPosition }] },
//           ]}
//         />
//       </View>
//     );
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" options={{ headerShown: false }}>
//           {({ navigation }) => (
//             <SafeAreaView style={{ flex: 1 }}>
//               <TabView
//                 navigationState={{ index, routes }}
//                 renderScene={({ route }) => renderScene({ route }, navigation)}
//                 renderTabBar={renderTabBar}
//                 onIndexChange={(index) => {
//                   setIndex(index);
//                   Animated.spring(indicatorPosition, {
//                     toValue: index * (Dimensions.get('window').width / routes.length),
//                     useNativeDriver: true,
//                   }).start();
//                 }}
//                 initialLayout={{ width: Dimensions.get('window').width }}
//                 style={styles.tabView}
//                 swipeEnabled={true}
//               />
//             </SafeAreaView>
//           )}
//         </Stack.Screen>
//         <Stack.Screen
//           name="ProductDetail"
//           component={ProductDetail}
//           options={{ title: 'Details' }}
//         />
//         <Stack.Screen
//           name="Cart"
//           component={Cart}
//           options={{ title: 'Your Cart' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   listContainer: {
//     paddingLeft: 15,
//   },
//   tabView: {
//     flex: 1,
//   },
//   cartButton: {
//     position: 'absolute',
//     bottom: 10,
//     left: 20,
//     right: 20,
//     backgroundColor: '#ff6347',
//     padding: 15,
//     borderRadius: 30,
//     alignItems: 'center',
//   },
//   cartButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   tabBarContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     paddingVertical: 5,
//     position: 'relative',
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   activeTab: {
//     backgroundColor: '#fff',
//   },
//   tabLabel: {
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   activeTabLabel: {
//     color: '#ff6347',
//   },
//   tabIndicator: {
//     position: 'absolute',
//     height: 2,
//     backgroundColor: '#ff6347',
//     width: '25%',
//     bottom: 0,
//   },
// });









// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import FastFoodCard from './components/FastFoodCard';
// import ProductDetail from './components/ProductDetail';
// import Cart from './components/Cart';
// import Favourites from './components/Favourites';
// import Deals from './components/Deals';
// import Snacks from './components/Snacks';
// import HomeScreen from './screens/HomeScreen';

// import { fetchAndStoreData, loadDataFromStorage } from './services/dataService';
// import { FastFoodItem } from './type';

// export type RootStackParamList = {
//   Home: undefined;
//   ProductDetail: { item: FastFoodItem };
//   Cart: undefined;
//   Favourites: undefined;
//   Deals: undefined;
//   Snacks: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   const [cartItems, setCartItems] = useState<FastFoodItem[]>([]);
//   const [favouriteItems, setFavouriteItems] = useState<FastFoodItem[]>([]);
//   const [fastFoodItems, setFastFoodItems] = useState<FastFoodItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'home', title: 'Home' },
//     { key: 'snacks', title: 'Snacks' },
//     { key: 'deals', title: 'Deals' },
//     { key: 'favourites', title: 'Favourites' },
//   ]);

//   const [indicatorPosition] = useState(new Animated.Value(0));

//   useEffect(() => {
//     loadDataFromStorage(setFastFoodItems, setIsLoading, fetchAndStoreData);
//   }, []);

//   const handleToggleFavourite = (item: FastFoodItem) => {
//     setFavouriteItems((prevItems) => {
//       const itemExists = prevItems.find((favItem) => favItem.id === item.id);
//       if (itemExists) {
//         return prevItems.filter((favItem) => favItem.id !== item.id);
//       } else {
//         return [...prevItems, item];
//       }
//     });
//   };
// //this lines causing problems now
//   // const SnacksScreen = () => (
//   //   <Snacks
//   //     fastFoodItems={fastFoodItems.filter((item) => item.category === 'Snack')}
//   //     favouriteItems={favouriteItems}
//   //     onToggleFavourite={handleToggleFavourite}
//   //   />
//   // );

//   const renderScene = ({ route }: any, navigation: any) => {
//     switch (route.key) {
//       case 'home':
//         return <HomeScreen fastFoodItems={fastFoodItems} favouriteItems={favouriteItems} isLoading={isLoading} navigation={navigation} onToggleFavourite={handleToggleFavourite} />;
//       case 'snacks':
//         return  <Snacks
//         fastFoodItems={fastFoodItems.filter((item) => item.category === 'Snack')}
//         favouriteItems={favouriteItems}
//         onToggleFavourite={handleToggleFavourite}
//         navigation={navigation}
//       />;
//       case 'deals':
//         return <Deals favouriteItems={favouriteItems} onToggleFavourite={handleToggleFavourite} navigation={navigation} />;
//       case 'favourites':
//         return <Favourites favouriteItems={favouriteItems} navigation={navigation}/>;
//       default:
//         return null;
//     }
//   };

//   const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<any> }) => {
//     const handleTabPress = (index: number) => {
//       setIndex(index);
//       Animated.spring(indicatorPosition, {
//         toValue: index * (Dimensions.get('window').width / routes.length),
//         useNativeDriver: true,
//       }).start();
//     };

//     return (
//       <View style={styles.tabBarContainer}>
//         {props.navigationState.routes.map((route, index) => {
//           const isActive = props.navigationState.index === index;
//           return (
//             <TouchableOpacity
//               key={route.key}
//               style={[styles.tabButton, isActive && styles.activeTab]}
//               onPress={() => handleTabPress(index)}
//             >
//               <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{route.title}</Text>
//             </TouchableOpacity>
//           );
//         })}
//         <Animated.View
//           style={[
//             styles.tabIndicator,
//             { transform: [{ translateX: indicatorPosition }] },
//           ]}
//         />
//       </View>
//     );
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" options={{ headerShown: false }}>
//           {({ navigation }) => (
//             <SafeAreaView style={{ flex: 1 }}>
//               <TabView
//                 navigationState={{ index, routes }}
//                 renderScene={({ route }) => renderScene({ route }, navigation)}
//                 renderTabBar={renderTabBar}
//                 onIndexChange={(index) => {
//                   setIndex(index);
//                   Animated.spring(indicatorPosition, {
//                     toValue: index * (Dimensions.get('window').width / routes.length),
//                     useNativeDriver: true,
//                   }).start();
//                 }}
//                 initialLayout={{ width: Dimensions.get('window').width }}
//                 style={styles.tabView}
//                 swipeEnabled={true}
//               />
//             </SafeAreaView>
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Details' }} />
//         <Stack.Screen name="Cart" component={Cart} options={{ title: 'Your Cart' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }











import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import FastFoodCard from './components/FastFoodCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Favourites from './components/Favourites';
import Deals from './components/Deals';
import Snacks from './components/Snacks';
import HomeScreen from './screens/HomeScreen';

import { fetchAndStoreData, loadDataFromStorage } from './services/dataService';
import { FastFoodItem } from './type';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { item: FastFoodItem };
  Cart: undefined;
  Favourites: undefined;
  Deals: undefined;
  Snacks: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [cartItems, setCartItems] = useState<FastFoodItem[]>([]);
  const [favouriteItems, setFavouriteItems] = useState<FastFoodItem[]>([]);
  const [fastFoodItems, setFastFoodItems] = useState<FastFoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home' },
    { key: 'snacks', title: 'Snacks' },
    { key: 'deals', title: 'Deals' },
    { key: 'favourites', title: 'Favourites' },
  ]);

  const [indicatorPosition] = useState(new Animated.Value(0));

  useEffect(() => {
    loadDataFromStorage(setFastFoodItems, setIsLoading, fetchAndStoreData);
  }, []);

  const handleToggleFavourite = (item: FastFoodItem) => {
    setFavouriteItems((prevItems) => {
      const itemExists = prevItems.find((favItem) => favItem.id === item.id);
      if (itemExists) {
        return prevItems.filter((favItem) => favItem.id !== item.id);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const handleRemoveFavourite = (itemId: string) => {
    setFavouriteItems((prevItems) => prevItems.filter((favItem) => favItem.id !== itemId));
  };

  const renderScene = ({ route }: any, navigation: any) => {
    switch (route.key) {
      case 'home':
        return (
          <HomeScreen
            fastFoodItems={fastFoodItems}
            favouriteItems={favouriteItems}
            isLoading={isLoading}
            navigation={navigation}
            onToggleFavourite={handleToggleFavourite}
          />
        );
      case 'snacks':
        return (
          <Snacks
            fastFoodItems={fastFoodItems.filter((item) => item.category === 'Snack')}
            favouriteItems={favouriteItems}
            onToggleFavourite={handleToggleFavourite}
            navigation={navigation}
          />
        );
      case 'deals':
        return <Deals favouriteItems={favouriteItems} onToggleFavourite={handleToggleFavourite} navigation={navigation} />;
      case 'favourites':
        return (
          <Favourites
            favouriteItems={favouriteItems}
            onRemoveFavourite={handleRemoveFavourite}
            navigation={navigation}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<any> }) => {
    const handleTabPress = (index: number) => {
      setIndex(index);
      Animated.spring(indicatorPosition, {
        toValue: index * (Dimensions.get('window').width / routes.length),
        useNativeDriver: true,
      }).start();
    };

    return (
      <View style={styles.tabBarContainer}>
        {props.navigationState.routes.map((route, index) => {
          const isActive = props.navigationState.index === index;
          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabButton, isActive && styles.activeTab]}
              onPress={() => handleTabPress(index)}
            >
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
        <Animated.View
          style={[
            styles.tabIndicator,
            { transform: [{ translateX: indicatorPosition }] },
          ]}
        />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {({ navigation }) => (
            <SafeAreaView style={{ flex: 1 }}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={({ route }) => renderScene({ route }, navigation)}
                renderTabBar={renderTabBar}
                onIndexChange={(index) => {
                  setIndex(index);
                  Animated.spring(indicatorPosition, {
                    toValue: index * (Dimensions.get('window').width / routes.length),
                    useNativeDriver: true,
                  }).start();
                }}
                initialLayout={{ width: Dimensions.get('window').width }}
                style={styles.tabView}
                swipeEnabled={true}
              />
            </SafeAreaView>
          )}
        </Stack.Screen>
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Details' }} />
        <Stack.Screen name="Cart" component={Cart} options={{ title: 'Your Cart' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  tabBarContainer: { flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 5, position: 'relative' },
  tabButton: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  activeTab: { backgroundColor: '#fff' },
  tabLabel: { fontWeight: 'bold', color: '#000' },
  activeTabLabel: { color: '#ff6347' },
  tabIndicator: { position: 'absolute', height: 2, backgroundColor: '#ff6347', width: '25%', bottom: 0 },
  tabView: {
         flex: 1,
       }
});
