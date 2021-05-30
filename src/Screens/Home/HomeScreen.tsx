import {useNavigation} from '@react-navigation/core';
import React, {useMemo} from 'react';
import {StyleSheet, SafeAreaView, Text, Pressable} from 'react-native';

function HomeScreen() {
  const navigation = useNavigation();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flex: 1,
        },
        boxStyle: {
          flex: 1,
          backgroundColor: '#00c6ff',
          margin: 30,
          justifyContent: 'center',
          alignItems: 'center',
        },
        textStyle: {
          color: '#ffffff',
          fontSize: 32,
        },
      }),
    [],
  );

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Pressable
        style={styles.boxStyle}
        onPress={() => navigation.navigate('Reanimated')}>
        <Text style={styles.textStyle}>Reanimated</Text>
      </Pressable>
      <Pressable
        style={styles.boxStyle}
        onPress={() => navigation.navigate('Animated')}>
        <Text style={styles.textStyle}>Animated</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default HomeScreen;
