import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AnimatedScreen from './Screens/AnimatedScreen/AnimatedScreen';
import AnimationScreen from './Screens/Animation/AnimationScreen';
import HomeScreen from './Screens/Home/HomeScreen';
import ReanimatedScreen from './Screens/Reanimated/ReanimatedScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Animated" component={AnimatedScreen} />
        <Stack.Screen name="Reanimated" component={ReanimatedScreen} />
        <Stack.Screen name="Animation" component={AnimationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
