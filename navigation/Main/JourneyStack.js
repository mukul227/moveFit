import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../../screens/Journey/HomeScreen";

const StackNavigator = createStackNavigator();

export const JourneyStack = () => {
  return (
    <StackNavigator.Navigator  screenOptions={{headerShown: false}} initialRouteName={'HomeScreen'}>
      <StackNavigator.Screen
        name={'HomeScreen'}
        component={HomeScreen}
      />
    </StackNavigator.Navigator>
  );
};
