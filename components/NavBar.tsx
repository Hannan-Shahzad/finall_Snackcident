
// //NavBar.tsx:

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// interface NavBarProps {
//   currentPage: string;
//   onNavigate: (page: string) => void;
// }

// const NavBar: React.FC<NavBarProps> = ({ currentPage, onNavigate }) => {
//   return (
//     <View style={styles.navBar}>
//       <TouchableOpacity
//         style={[styles.navItem, currentPage === 'Home' && styles.active]}
//         onPress={() => onNavigate('Home')}
//       >
//         <Text style={[styles.navText, currentPage === 'Home' && styles.activeText]}>Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.navItem, currentPage === 'Snacks' && styles.active]}
//         onPress={() => onNavigate('Snacks')}
//       >
//         <Text style={[styles.navText, currentPage === 'Snacks' && styles.activeText]}>Snacks</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.navItem, currentPage === 'Deals' && styles.active]}
//         onPress={() => onNavigate('Deals')}
//       >
//         <Text style={[styles.navText, currentPage === 'Deals' && styles.activeText]}>Deals</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.navItem, currentPage === 'Favourites' && styles.active]}
//         onPress={() => onNavigate('Favourites')}
//       >
//         <Text style={[styles.navText, currentPage === 'Favourites' && styles.activeText]}>Favourites</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   navBar: {
   
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#333',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//       },
//   navItem: {
//     padding: 10,
//   },
//   navText: {
//     color: '#fff', // Default text color
//     fontSize: 16,
//   },
//   active: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#ff0', // Color of the underline for the active item
//   },
//   activeText: {
//     color: '#ff0', // Color of the text for the active item
//     fontWeight: 'bold',
//   },
// });

// export default NavBar;







