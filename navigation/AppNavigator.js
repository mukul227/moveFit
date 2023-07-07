import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthNavigator} from "./AuthNavigator";
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import {MainNavigator} from "./MainNavigator";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {

  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName={'AuthLoadingScreen'} tabBar={() => null}>
      <Tab.Screen
        name={'AuthLoadingScreen'}
        component={AuthLoadingScreen}
        options={{
          tabBarVisible: false,
          headerShown: false
        }}
      />
      <Tab.Screen
        name={'AuthNavigator'}
        component={AuthNavigator}
        options={{
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name={'MainNavigator'}
        component={MainNavigator}
        options={{
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};
