import {useRoute} from '@react-navigation/core';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import {StyleSheet, SafeAreaView, DeviceEventEmitter} from 'react-native';

let Animation: any;

function AnimationScreen() {
  const route = useRoute<any>();
  const {name} = route.params ?? {};
  console.log({name});
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'Animation',
      eventData => {
        console.log({eventData});
        Animation = eventData.default;
        setLoaded(true);
      },
    );
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flex: 1,
        },
      }),
    [],
  );

  return (
    <SafeAreaView style={styles.containerStyle}>
      {loaded && <Animation />}
    </SafeAreaView>
  );
}

export default AnimationScreen;
