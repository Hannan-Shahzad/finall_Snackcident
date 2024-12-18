//App.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoaderScreen from './screens/LoaderScreen';
import SplashScreen from './screens/SplashScreen';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Favourites from './components/Favourites';
import Deals from './components/Deals';
import Snacks from './components/Snacks';
import TopBar from './components/TopBar';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';

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
  SignUpScreen:any;
  SignInScreen:any;
  ProfileScreen:any
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [cartItems, setCartItems] = useState<FastFoodItem[]>([]);
  const [favouriteItems, setFavouriteItems] = useState<FastFoodItem[]>([]);
  const [fastFoodItems, setFastFoodItems] = useState<FastFoodItem[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'loader' | 'main'>('splash');
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home' },
    { key: 'snacks', title: 'Snacks' },
    { key: 'deals', title: 'Deals' },
    { key: 'favourites', title: 'Favourites' },
  ]);
  const [indicatorPosition] = useState(new Animated.Value(0));

  // Splash and Loader Screen Transitions
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentScreen('loader'), 3000); // Splash duration
    const timer2 = setTimeout(() => setCurrentScreen('main'), 6000); // Loader duration
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Load data from storage on initial render
  useEffect(() => {
    loadDataFromStorage(setFastFoodItems, setIsLoading, fetchAndStoreData);
  }, []);
//this is where data is coming from 
  // Favourites Handling
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

  // TabView Scene Rendering
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
        return (
          <Deals
            favouriteItems={favouriteItems}
            onToggleFavourite={handleToggleFavourite}
            navigation={navigation}
          />
        );
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

  // TabView Tab Bar Rendering
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

  // Main Return with Conditional Rendering for Splash and Loader Screens
  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  if (currentScreen === 'loader') {
    return <LoaderScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {({ navigation }) => (
            <SafeAreaView style={{ flex: 1 }}>
              <TopBar fastFoodItems={fastFoodItems}  />
             
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
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
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
  tabView: { flex: 1 },
});












// // App.tsx
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, Text, ScrollView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
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
// import AppSwiper from './components/AppSwiper';

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

//   const handleRemoveFavourite = (itemId: string) => {
//     setFavouriteItems((prevItems) => prevItems.filter((favItem) => favItem.id !== itemId));
//   };

//   const renderScene = ({ route }: any, navigation: any) => {
//     switch (route.key) {
//       case 'home':
//         return (
//           <HomeScreen
//             fastFoodItems={fastFoodItems}
//             favouriteItems={favouriteItems}
//             isLoading={isLoading}
//             navigation={navigation}
//             onToggleFavourite={handleToggleFavourite}
//           />
//         );
//       case 'snacks':
//         return (
//           <Snacks
//             fastFoodItems={fastFoodItems.filter((item) => item.category === 'Snack')}
//             favouriteItems={favouriteItems}
//             onToggleFavourite={handleToggleFavourite}
//             navigation={navigation}
//           />
//         );
//       case 'deals':
//         return <Deals favouriteItems={favouriteItems} onToggleFavourite={handleToggleFavourite} navigation={navigation} />;
//       case 'favourites':
//         return (
//           <Favourites
//             favouriteItems={favouriteItems}
//             onRemoveFavourite={handleRemoveFavourite}
//             navigation={navigation}
//           />
//         );
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
//               <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
//                 <AppSwiper />
//                 <TabView
//                   navigationState={{ index, routes }}
//                   renderScene={({ route }) => renderScene({ route }, navigation)}
//                   renderTabBar={renderTabBar}
//                   onIndexChange={(index) => {
//                     setIndex(index);
//                     Animated.spring(indicatorPosition, {
//                       toValue: index * (Dimensions.get('window').width / routes.length),
//                       useNativeDriver: true,
//                     }).start();
//                   }}
//                   initialLayout={{ width: Dimensions.get('window').width }}
//                   style={styles.tabView}
//                   swipeEnabled={true}
//                 />
//               </ScrollView>
//             </SafeAreaView>
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Details' }} />
//         <Stack.Screen name="Cart" component={Cart} options={{ title: 'Your Cart' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   tabBarContainer: { flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 5, position: 'relative' },
//   tabButton: { flex: 1, alignItems: 'center', paddingVertical: 10 },
//   activeTab: { backgroundColor: '#fff' },
//   tabLabel: { fontWeight: 'bold', color: '#000' },
//   activeTabLabel: { color: '#ff6347' },
//   tabIndicator: { position: 'absolute', height: 2, backgroundColor: '#ff6347', width: '25%', bottom: 0 },
//   tabView: { flex: 1, minHeight: Dimensions.get('window').height - 200 },
// });
