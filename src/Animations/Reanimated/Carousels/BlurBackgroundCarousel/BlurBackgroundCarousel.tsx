import React, {useMemo, useRef} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const SLIDES = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const {width} = Dimensions.get('screen');
const imageW = width * 0.7;
const imageH = imageW * 1.54;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function BlurBackgroundCarousel() {
  const flatListRef = useRef<any>();
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flex: 1,
        },
        imageContainerStyle: {
          width,
          justifyContent: 'center',
          alignItems: 'center',
        },
        imageStyle: {
          height: imageH,
          width: imageW,
          borderRadius: 15,
        },
        imageCoverStyle: {
          elevation: 5,
          shadowOpacity: 0.0015 * 5 + 0.18,
          shadowRadius: 0.54 * 5,
          shadowOffset: {
            height: 0.6 * 5,
            width: 0.6 * 5,
          },
          borderRadius: 15,
        },
      }),
    [],
  );

  return (
    <View style={styles.containerStyle}>
      {SLIDES.map((_, _index) => {
        return (
          <BackgroundSlide key={_} index={_index} scrollX={scrollX} uri={_} />
        );
      })}
      <AnimatedFlatList
        ref={flatListRef}
        data={SLIDES}
        onScroll={scrollHandler}
        horizontal
        renderItem={({item}: any) => (
          <View style={styles.imageContainerStyle}>
            <View style={styles.imageCoverStyle}>
              <Image source={{uri: item}} style={styles.imageStyle} />
            </View>
          </View>
        )}
        pagingEnabled
        keyExtractor={(item: any) => item}
        onScrollToIndexFailed={() => {}}
        decelerationRate={'fast'}
      />
    </View>
  );
}

function BackgroundSlide(props: any) {
  const {index, scrollX, uri} = props;
  const animatedStyles = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    return {opacity: interpolate(scrollX.value, inputRange, [0, 1, 0])};
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyles]}>
      <Image
        source={{uri}}
        style={[StyleSheet.absoluteFillObject]}
        blurRadius={30}
      />
    </Animated.View>
  );
}

export default BlurBackgroundCarousel;
