import React, {useEffect} from 'react';
import Icons from "../constants/Icons";
import {StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {WorkoutsStack} from "./Main/WorkoutsStack";
import {CalendarStack} from "./Main/CalendarStack";
import {JourneyStack} from "./Main/JourneyStack";
import {FriendsStack} from "./Main/FriendsStack";
import {ProfileStack} from "./Main/ProfileStack";
import {useTheme} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {isBottomTabVisibleSelector} from "../store/helpers";
import {activeUserSelector, getAuthUserSaga} from "../store/auth";
import {setIsFriendRedirect, showSubscriptionModal} from "../store/helpers/actions";
import {setUserArray} from "../store/profile/actions";
import {setFromNotification} from "../store/friends/actions";
import authService from "../services/AuthService";
import {setActiveUser} from "../store/auth/actions";

const Tab = createBottomTabNavigator();

export const MainNavigator = ({navigation, route}) => {
  const dispatch = useDispatch();
  const handleSubscriptionModal = (tab) => dispatch(showSubscriptionModal({isVisible: true, tab}))
  const isVisible = useSelector(isBottomTabVisibleSelector());
  const user = useSelector(activeUserSelector());
  const { colors } = useTheme();

  const updateUser = async () => {
    try {
      const user = await authService.getAuthUser();
      dispatch(setActiveUser(user));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    updateUser();
  },[])


  return (
    <Tab.Navigator  screenOptions={({ route }) => ({
      keyboardHidesTabBar: true,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ focused, color, size }) => {

        if (route.name === 'Workouts') {
          return <Icons.workoutTab color={user?.subscribed ? (focused ? colors.primaryColor : colors.unFocusedBottomTabIconColor) : 'lightgray'} />
        } else if (route.name === 'Habits') {
          return <Icons.habitTab color={focused ? colors.primaryColor : colors.unFocusedBottomTabIconColor}/>
        } else if (route.name === 'Calendar') {
          return <Icons.calendarTab color={user?.subscribed ? (focused ? colors.primaryColor : colors.unFocusedBottomTabIconColor) : 'lightgray'}/>
        } else if (route.name === 'Friends') {
          return <Icons.friendsTab color={user?.subscribed ? (focused ? colors.primaryColor : colors.unFocusedBottomTabIconColor) : 'lightgray'}/>
        } else if (route.name === 'Profile') {
          return <Icons.profileTab color={focused ? colors.primaryColor : colors.unFocusedBottomTabIconColor}/>
        }

        // You can return any component that you like here!
        return <Icons.Gym  />;
      },
      tabBarStyle: {
        backgroundColor: colors.bottomTabColor,
        shadowColor: "#000",
        borderTopColor: colors.bottomTabColor,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position:'absolute',
      },
      headerShown: false,
      tabBarActiveTintColor: colors.primaryColor,
      tabBarInactiveTintColor: colors.bottomTabLabel,
    })}>

      <Tab.Screen
        listeners={{
          tabPress: e => {
            if (!user?.subscribed) {
              e.preventDefault();
              handleSubscriptionModal('Workout')
            } else {
              dispatch(setFromNotification(false))
              navigation.navigate('Workouts', {screen: 'HomeScreen'});
            }
          },
        }}
        options={{unmountOnBlur: true, tabBarStyle: { ...styles.tabBarStyle, bottom:isVisible,  backgroundColor: colors.bottomTabColor, borderTopColor: colors.bottomTabColor} }} name="Workouts" component={WorkoutsStack}/>

      <Tab.Screen options={{unmountOnBlur: true, tabBarStyle: { ...styles.tabBarStyle,  bottom:isVisible,backgroundColor: colors.bottomTabColor, borderTopColor: colors.bottomTabColor} }} name="Habits" component={JourneyStack} />

      <Tab.Screen
        listeners={{
          tabPress: e => {
            dispatch(setFromNotification(false));
            if (!user?.subscribed) {
              e.preventDefault();
              handleSubscriptionModal('Calendar')
            }
          },
        }}
        options={{unmountOnBlur: true, tabBarStyle: { ...styles.tabBarStyle,  bottom:isVisible,backgroundColor: colors.bottomTabColor, borderTopColor: colors.bottomTabColor} }} name="Calendar" component={CalendarStack} />


      <Tab.Screen
        listeners={{
          tabPress: e => {
            if (!user?.subscribed) {
              e.preventDefault();
              handleSubscriptionModal('Friends')
            } else {
              dispatch(setFromNotification(false))
              dispatch(setUserArray([]))
              dispatch(setIsFriendRedirect(true))
              navigation.navigate('Friends', {screen: 'HomeScreen'});
            }
          },
        }}
        options={{unmountOnBlur: true, tabBarStyle: { ...styles.tabBarStyle,bottom:isVisible,  backgroundColor: colors.bottomTabColor, borderTopColor: colors.bottomTabColor} }} name="Friends" component={FriendsStack} />

      <Tab.Screen
          listeners={{
            tabPress: e => {
                dispatch(setFromNotification(false))
                dispatch(getAuthUserSaga())
                dispatch(setUserArray([]))
                dispatch(setIsFriendRedirect(false))
                navigation.navigate('Profile', {screen: 'HomeScreen'});

            },
          }}
          options={{unmountOnBlur: true, tabBarStyle: { ...styles.tabBarStyle,  bottom:isVisible,backgroundColor: colors.bottomTabColor, borderTopColor: colors.bottomTabColor} }} name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    width: 100,
    minHeight: '100%',
  },
  tabLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#b0b0b7',
  },
  focusedTabLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    letterSpacing: -0.1
  },
  tabBarStyle: {
    backgroundColor: 'black',
    shadowColor: "#000",
    borderTopColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position:'absolute',
    paddingVertical: 10,
    zIndex: 10
  }
});
