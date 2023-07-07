import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeAuthScreen from '../screens/Auth/WelcomeAuthScreen';
import PhoneNumberAuthScreen from '../screens/Auth/PhoneNumberAuthScreen';
import ConfirmationCodeAuthScreen from '../screens/Auth/ConfirmationCodeAuthScreen';
import {OnBoardingStackNavigator} from './OnBoardingStackNavigator';
import OnBoardingSubscriptionScreen from "../screens/Auth/OnBoardingSubscriptionScreen";

const StackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <StackNavigator.Navigator  screenOptions={{headerShown: false}} initialRouteName={'WelcomeAuthScreen'}>
      <StackNavigator.Screen
        name={'WelcomeAuthScreen'}
        component={WelcomeAuthScreen}/>
      <StackNavigator.Screen
        name={'PhoneNumberAuthScreen'}
        component={PhoneNumberAuthScreen}/>
      <StackNavigator.Screen
        name={'ConfirmationCodeAuthScreen'}
        component={ConfirmationCodeAuthScreen}/>
        <StackNavigator.Screen
            name={'OnBoardingStackNavigator'}
            component={OnBoardingStackNavigator}/>
      <StackNavigator.Screen
        name={'OnBoardingSubscriptionScreen'}
        component={OnBoardingSubscriptionScreen}/>
    </StackNavigator.Navigator>
  );
};
