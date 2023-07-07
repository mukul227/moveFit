import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../../screens/Profile/HomeScreen";
import SettingsScreen from "../../screens/Profile/SettingsScreen";
import {useDispatch} from "react-redux";
import NewPostScreen from "../../screens/Profile/NewPostScreen";
import SinglePostScreen from "../../screens/Profile/SinglePostScreen";
import {getAuthUserSaga} from "../../store/auth";
import EditProfileScreen from "../../screens/Profile/EditProfileScreen";
import MySubscriptionScreen from "../../screens/Profile/MySubscriptionScreen";
import FollowersListScreen from "../../screens/Profile/FollowersListScreen";

const StackNavigator = createStackNavigator();

export const ProfileStack = () => {
  const dispatch = useDispatch();

  const getAuthUser = () => dispatch(getAuthUserSaga());

  useEffect(() => {
    getAuthUser();
  }, []);

  return (
    <StackNavigator.Navigator screenOptions={{headerShown: false}} initialRouteName={'HomeScreen'}>
      <StackNavigator.Screen
        name={'HomeScreen'}
        component={HomeScreen}
      />
      <StackNavigator.Screen
        name={'SettingsScreen'}
        component={SettingsScreen}
      />
      <StackNavigator.Screen
        name={'NewPostScreen'}
        component={NewPostScreen}
      />
      <StackNavigator.Screen
        name={'SinglePostScreen'}
        component={SinglePostScreen}
      />
      <StackNavigator.Screen
        name={'EditProfileScreen'}
        component={EditProfileScreen}
      />
      <StackNavigator.Screen
        name={'MySubscriptionScreen'}
        component={MySubscriptionScreen}
      />
        <StackNavigator.Screen
        name={'FollowersListScreen'}
        component={FollowersListScreen}
      />
    </StackNavigator.Navigator>
  );
};
