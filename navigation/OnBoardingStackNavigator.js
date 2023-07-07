import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardingUsernameScreen from "../screens/Auth/OnBoardingUsernameScreen";
import OnBoardingCreateAccountScreen from "../screens/Auth/OnBoardingCreateAccountScreen";
import OnBoardingSelectGoalScreen from "../screens/Auth/OnBoardingSelectGoalScreen";
import OnBoardingPreferWorkoutScreen from "../screens/Auth/OnBoardingPreferWorkoutScreen";
import OnBoardingWorkoutTypeScreen from "../screens/Auth/OnBoardingWorkoutTypeScreen";
import OnBoardingFitnessLevelScreen from "../screens/Auth/OnBoardingFitnessLevelScreen";
import OnBoardingThemeScreen from "../screens/Auth/OnBoardingThemeScreen";
import OnBoardingSubscriptionScreen from "../screens/Auth/OnBoardingSubscriptionScreen";

const StackNavigator = createStackNavigator();

export const OnBoardingStackNavigator = () => {
    return (
        <StackNavigator.Navigator  screenOptions={{headerShown: false}} initialRouteName={'OnBoardingUsernameScreen'}>
            <StackNavigator.Screen
                name={'OnBoardingUsernameScreen'}
                component={OnBoardingUsernameScreen}
            />
            <StackNavigator.Screen
                name={'OnBoardingCreateAccountScreen'}
                component={OnBoardingCreateAccountScreen}
            />
            <StackNavigator.Screen
                name={'OnBoardingSelectGoalScreen'}
                component={OnBoardingSelectGoalScreen}
            />
          <StackNavigator.Screen
            name={'OnBoardingPreferWorkoutScreen'}
            component={OnBoardingPreferWorkoutScreen}
          />
          <StackNavigator.Screen
            name={'OnBoardingWorkoutTypeScreen'}
            component={OnBoardingWorkoutTypeScreen}
          />
          <StackNavigator.Screen
            name={'OnBoardingFitnessLevelScreen'}
            component={OnBoardingFitnessLevelScreen}
          />
          <StackNavigator.Screen
            name={'OnBoardingThemeScreen'}
            component={OnBoardingThemeScreen}
          />
          <StackNavigator.Screen
            name={'OnBoardingSubscriptionScreen'}
            component={OnBoardingSubscriptionScreen}
          />
        </StackNavigator.Navigator>
    );
};
