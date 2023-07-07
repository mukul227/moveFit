import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../../screens/Calendar/HomeScreen";

const StackNavigator = createStackNavigator();

export const CalendarStack = () => {
  return (
    <StackNavigator.Navigator  screenOptions={{headerShown: false}} initialRouteName={'HomeScreen'}>
      <StackNavigator.Screen
        name={'HomeScreen'}
        component={HomeScreen}
      />
    </StackNavigator.Navigator>
  );
};
