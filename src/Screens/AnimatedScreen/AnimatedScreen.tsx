import {useNavigation} from '@react-navigation/core';
import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  View,
  DeviceEventEmitter,
} from 'react-native';

const ANIMATION_LIST = [
  {
    id: '1',
    name: 'BlurBackgroundCarousel',
    path: require('../../Animations/Animated/Carousels/BlurBackgroundCarousel/BlurBackgroundCarousel.tsx'),
  },
];

function AnimatedScreen() {
  const navigation = useNavigation();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flex: 1,
        },
        listItemStyle: {
          height: 55,
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
          backgroundColor: '#ffffff',
        },
        spacerStyle: {
          height: 5,
        },
      }),
    [],
  );

  return (
    <SafeAreaView style={styles.containerStyle}>
      <FlatList
        data={ANIMATION_LIST}
        renderItem={({item}) => (
          <Pressable
            style={styles.listItemStyle}
            onPress={() => {
              navigation.navigate('Animation', {name: item.name});
              setTimeout(() => {
                DeviceEventEmitter.emit('Animation', item.path);
              }, 300);
            }}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
        ListHeaderComponent={() => <View style={styles.spacerStyle} />}
        ItemSeparatorComponent={() => <View style={styles.spacerStyle} />}
      />
    </SafeAreaView>
  );
}

export default AnimatedScreen;
