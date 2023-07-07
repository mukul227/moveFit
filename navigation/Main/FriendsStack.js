import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../../screens/Friends/HomeScreen";
import FriendScreen from "../../screens/Profile/HomeScreen";
import SinglePostScreen from "../../screens/Profile/SinglePostScreen";
import FollowersListScreen from "../../screens/Profile/FollowersListScreen";
import ContactScreen from "../../screens/Friends/ContactScreen";

const StackNavigator = createStackNavigator();

export const FriendsStack = () => {
  return (
    <StackNavigator.Navigator options={{unmountOnBlur: true}} screenOptions={{headerShown: false}}  initialRouteName={'HomeScreen'}>
      <StackNavigator.Screen
        options={{unmountOnBlur: true}}
        name={'HomeScreen'}
        component={HomeScreen}
      />
      <StackNavigator.Screen
        options={{unmountOnBlur: true}}
        name={'FriendScreen'}
        component={FriendScreen}
      />
      <StackNavigator.Screen
        options={{unmountOnBlur: true}}
        name={'ContactScreen'}
        component={ContactScreen}
      />
      <StackNavigator.Screen
        options={{unmountOnBlur: true}}
        name={'SinglePostScreen'}
        component={SinglePostScreen}
      />
      <StackNavigator.Screen
        name={'FollowersListScreen'}
        component={FollowersListScreen}
      />
    </StackNavigator.Navigator>
  );
};
