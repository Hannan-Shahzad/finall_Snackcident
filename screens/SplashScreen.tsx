import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/SplashLogo2.png')} // Update the path to your logo image
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6347',
  },
  logo: {
    width: 200, // Adjust size as needed
    height: 200,
  },
});

export default SplashScreen;
