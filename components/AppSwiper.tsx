// //AppSwiper.tsx:

// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import Swiper from 'react-native-swiper';

// const AppSwiper = () => {
//   return (
//     <Swiper autoplay loop showsPagination>
//       <View style={styles.slide}>
//         <Image source={{ uri: 'https://www.honeyandbunny.com/uploaded-pics/realtime-resized-images/ori-pizza-kombi1447680411-904776-1600x-1-cropped.jpg' }} style={styles.image} />
//         <Text style={styles.text}>Slide 1</Text>
//       </View>
//       <View style={styles.slide}>
//         <Image source={{ uri: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-vietnamese-food-illustration_23-2149299356.jpg' }} style={styles.image} />
//         <Text style={styles.text}>Slide 2</Text>
//       </View>
//       <View style={styles.slide}>
//         <Image source={{ uri: 'https://c8.alamy.com/comp/KDCXF1/healthy-food-concept-flat-design-KDCXF1.jpg' }} style={styles.image} />
//         <Text style={styles.text}>Slide 3</Text>
//       </View>
//     </Swiper>
//   );
// };

// const styles = StyleSheet.create({
//   slide: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//   },
//   text: {
//     position: 'absolute',
//     bottom: 20,
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default AppSwiper;









//AppSwiper.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const AppSwiper = () => {
  return (
    <View style={styles.container}>
      <Swiper 
        autoplay 
        loop 
        showsPagination 
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        <View style={styles.slide}>
          <Image 
            source={{ uri: 'https://i.ytimg.com/vi/I2yLU-eNZ94/maxresdefault.jpg' }} 
            style={styles.image} 
          />
          <Text style={styles.text}>Slide 1</Text>
        </View>
        <View style={styles.slide}>
          <Image 
            source={{ uri: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-vietnamese-food-illustration_23-2149299356.jpg' }} 
            style={styles.image} 
          />
          <Text style={styles.text}>Slide 2</Text>
        </View>
        <View style={styles.slide}>
          <Image 
            source={{ uri: 'https://img.freepik.com/free-vector/hand-drawn-fast-food-sale-banner_23-2150970571.jpg' }} 
            style={styles.image} 
          />
          <Text style={styles.text}>Slide 3</Text>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220, // Adjust height to fit better
    backgroundColor: '#f8f8f8',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    bottom: 50,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#ff6347',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default AppSwiper;
