// 





import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/loader.json')}  // Path to your Lottie animation JSON file
        autoPlay
        loop
        style={styles.animation}  // Optional: Adjust the animation size
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: 300,  // Adjust size as needed
    height: 300, // Adjust size as needed
  },
});

export default LoaderScreen;
