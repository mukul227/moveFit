import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../../screens/Workouts/HomeScreen";
import NotificationsScreen from "../../screens/Workouts/NotificationsScreen";
import SingleProgramScreen from "../../screens/Workouts/SingleProgramScreen";
import SingleWorkoutScreen from "../../screens/Workouts/SingleWorkoutScreen";
import ShareProgressScreen from "../../screens/Workouts/ShareProgressScreen";
import SeeAllProgramsScreen from "../../screens/Workouts/SeeAllProgramsScreen";
import PlayWorkoutScreen from "../../screens/Workouts/PlayWorkoutScreen";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setIsBottomTabVisible} from "../../store/helpers";


const StackNavigator = createStackNavigator();

export const WorkoutsStack = ({ route }) => {
  const dispatch = useDispatch();
  const routeName = getFocusedRouteNameFromRoute(route);

  const setIsBottomTabVisibleFn = () => {
    if (routeName === 'SingleProgramScreen' || routeName === 'SingleWorkoutScreen' || routeName === 'PlayWorkoutScreen' || routeName === 'ShareProgressScreen') {
        dispatch(setIsBottomTabVisible(-150));
    } else {
      dispatch(setIsBottomTabVisible(0));
    }
  };

  useEffect(() => {
    setIsBottomTabVisibleFn();
  }, [route]);

  return (
    <StackNavigator.Navigator  screenOptions={{headerShown: false}} initialRouteName={'HomeScreen'}>
      <StackNavigator.Screen
        name={'HomeScreen'}
        component={HomeScreen}
      />
      <StackNavigator.Screen
        name={'SingleProgramScreen'}
        component={SingleProgramScreen}
      />
      <StackNavigator.Screen
        name={'NotificationsScreen'}
        component={NotificationsScreen}
      />
      <StackNavigator.Screen
        name={'SingleWorkoutScreen'}
        component={SingleWorkoutScreen}
      />
      <StackNavigator.Screen
        options={{
          gestureEnabled: false
        }}
        name={'PlayWorkoutScreen'}
        component={PlayWorkoutScreen}
      />
      <StackNavigator.Screen
        name={'ShareProgressScreen'}
        component={ShareProgressScreen}
        options={{gestureEnabled: false}}
      />
      <StackNavigator.Screen
          name={'SeeAllProgramsScreen'}
          component={SeeAllProgramsScreen}
      />
    </StackNavigator.Navigator>
  );
};
