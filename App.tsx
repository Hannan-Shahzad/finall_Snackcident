
// //App.tsx:
// import React from 'react';
// import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import FastFoodCard from './components/FastFoodCard';
// import ProductDetail from './components/ProductDetail';
// import Cart from './components/Cart';
// import Favourites from './components/Favourites';
// import Deals from './components/Deals';
// import Snacks from './components/Snacks';
// import { fastFoodItems } from './data';
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

// export default function App() {
//   const [cartItems, setCartItems] = React.useState<FastFoodItem[]>([]);
//   const [favouriteItems, setFavouriteItems] = React.useState<FastFoodItem[]>([]);
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'home', title: 'Home' },
//     { key: 'snacks', title: 'Snacks' },
//     { key: 'deals', title: 'Deals' },
//     { key: 'favourites', title: 'Favourites' },
//   ]);

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

//   const HomeScreen = () => (
//     <SafeAreaView style={styles.safeAreaContainer}>
//       <FlatList
//         data={fastFoodItems}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <FastFoodCard
//             item={item}
//             onPress={() => {}}
//             onToggleFavourite={() => handleToggleFavourite(item)}
//             isFavourite={favouriteItems.some((favItem) => favItem.id === item.id)}
//           />
//         )}
//         numColumns={2}
//         contentContainerStyle={styles.listContainer}
//       />
//     </SafeAreaView>
//   );

//   const SnacksScreen = () => <Snacks />;
//   const DealsScreen = () => <Deals />;
//   const FavouritesScreen = () => <Favourites favouriteItems={favouriteItems} />;

//   const renderScene = SceneMap({
//     home: HomeScreen,
//     snacks: SnacksScreen,
//     deals: DealsScreen,
//     favourites: FavouritesScreen,
//   });

//   return (
//     <SafeAreaView style={styles.safeAreaContainer}>
//       <NavigationContainer>
//         <TabView
//           navigationState={{ index, routes }}
//           renderScene={renderScene}
//           onIndexChange={setIndex}
//           initialLayout={{ width: Dimensions.get('window').width }}
//           style={styles.tabView}
//         />
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   listContainer: {
//     padding: 16,
//   },
//   tabView: {
//     flex: 1,
//   },
// });

import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabView, SceneMap } from 'react-native-tab-view';
import FastFoodCard from './components/FastFoodCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Favourites from './components/Favourites';
import Deals from './components/Deals';
import Snacks from './components/Snacks';
import { fastFoodItems } from './data';
import { FastFoodItem } from './type';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const [cartItems, setCartItems] = React.useState<FastFoodItem[]>([]);
  const [favouriteItems, setFavouriteItems] = React.useState<FastFoodItem[]>([]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home' },
    { key: 'snacks', title: 'Snacks' },
    { key: 'deals', title: 'Deals' },
    { key: 'favourites', title: 'Favourites' },
  ]);

  const handleAddToCart = (item: FastFoodItem) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleToggleFavourite = (item: FastFoodItem) => {
    setFavouriteItems((prevItems) => {
      const itemExists = prevItems.find((favItem) => favItem.id === item.id);
      if (itemExists) {
        return prevItems.filter((favItem) => favItem.id !== item.id); // Remove from favourites
      } else {
        return [...prevItems, item]; // Add to favourites
      }
    });
  };

  const HomeScreen = ({ navigation }: any) => (
    <SafeAreaView style={styles.safeAreaContainer}>
      <FlatList
        data={fastFoodItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FastFoodCard
            item={item}
            onPress={() => navigation.navigate('ProductDetail', { item })}
            onToggleFavourite={() => handleToggleFavourite(item)}
            isFavourite={favouriteItems.some((favItem) => favItem.id === item.id)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );

  const SnacksScreen = () => <Snacks />;
  const DealsScreen = () => <Deals />;
  const FavouritesScreen = () => <Favourites favouriteItems={favouriteItems} />;

  const renderScene = ({ route }: any, navigation: any) => {
    switch (route.key) {
      case 'home':
        return <HomeScreen navigation={navigation} />;
      case 'snacks':
        return <SnacksScreen />;
      case 'deals':
        return <DealsScreen />;
      case 'favourites':
        return <FavouritesScreen />;
      default:
        return null;
    }
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
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                style={styles.tabView}
              />
            </SafeAreaView>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: 'Product Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  tabView: {
    flex: 1,
  },
});
