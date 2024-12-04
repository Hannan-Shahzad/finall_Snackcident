// declare module 'react-native-snap-carousel' {
//     import { Component } from 'react';
//     import {
//       FlatListProps,
//       StyleProp,
//       ViewStyle,
//       ImageStyle,
//       TextStyle,
//       ScrollViewProps,
//     } from 'react-native';
  
//     interface CarouselProps<T> extends FlatListProps<T> {
//       data: ReadonlyArray<T>;
//       renderItem: (item: { item: T; index: number }) => React.ReactNode;
//       itemWidth: number;
//       sliderWidth: number;
//       onSnapToItem?: (index: number) => void;
//       loop?: boolean;
//       autoplay?: boolean;
//       autoplayDelay?: number;
//       autoplayInterval?: number;
//       enableMomentum?: boolean;
//       lockScrollWhileSnapping?: boolean;
//       containerCustomStyle?: StyleProp<ViewStyle>;
//       contentContainerCustomStyle?: StyleProp<ViewStyle>;
//       slideStyle?: StyleProp<ViewStyle>;
//       inactiveSlideOpacity?: number;
//       inactiveSlideScale?: number;
//       inactiveSlideShift?: number;
//       scrollInterpolator?: (index: number, carouselProps: CarouselProps<T>) => any;
//       slideInterpolatedStyle?: (index: number, animatedValue: Animated.AnimatedValue, carouselProps: CarouselProps<T>) => any;
//       useScrollView?: boolean;
//       vertical?: boolean;
//     }
  
//     export default class Carousel<T> extends Component<CarouselProps<T>> {}
//   }
  