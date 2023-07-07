import React, {useEffect, useState} from 'react';
import {View, ScrollView, BackHandler, Platform} from 'react-native';
import {useTheme} from "react-native-paper";
import Wrapper from "../../components/shared/Wrapper";
import CustomText from "../../components/shared/CustomText";
import TodayWorkout from "../../components/workouts/TodayWorkout";
import WorkoutAdjustModal from "../../components/workouts/WorkoutAdjustModal";
import WorkoutProgramList from "../../components/workouts/WorkoutProgramList";
import {useDispatch, useSelector} from "react-redux";
import {getNotificationsSaga} from "../../store/notifications";
import {useFocusEffect} from "@react-navigation/native";
import {
  dataForHomePageSelector,
  getAllProgramsSaga,
  getDataForHomePageSaga,
  getProgramSaga,
} from "../../store/programs";
import {getWorkoutSaga} from "../../store/workouts";
import {activeUserSelector} from "../../store/auth";
import { preferenceWidgetHelper } from "../../helpers/preferenceWidgetHelper";
import WorkoutAdjustWidget from "../../components/workouts/WorkoutAdjustWidget";
import WorkoutHeader from "../../components/workouts/WorkoutHeader";
import {profileService} from "../../services/ProfileService";
import {getNotificationIndicatorSaga} from "../../store/programs/actions";
import pushNotificationService from "../../services/PushNotificationService";
import {achievementSelector} from "../../store/profile";
import {setIsAchievementModalShown, workoutScreenVisited} from "../../store/helpers/actions";
import {setShowConfettiAchievement} from "../../store/profile/actions";
import {showTutorialVisible} from "../../store/helpers/actions";
import authService from "../../services/AuthService";
import asyncStorageService from "../../services/AsyncStorageService";
import {fromCalendar} from "../../store/workouts/actions";
import {workoutScreenVisitedSelector} from "../../store/helpers";
import {setActiveUser} from "../../store/auth/actions";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const data = useSelector(dataForHomePageSelector());
  const { myPreference } = useSelector(activeUserSelector());
  const screenVisited = useSelector(workoutScreenVisitedSelector());
  const { location, fitness_level } = myPreference;
  const { programsByLocation, newPrograms, todayWorkout, recommendedProgram } = data;
  const [preferences, setPreferences] = useState([]);
  const achievement = useSelector(achievementSelector());

  const registerForNotifications = async () => {
    const fcm = await pushNotificationService.requestUserPermission();
    if (fcm) {
      try {
        await authService.setFcmToken(fcm);
      } catch (e) {
        console.log({e});
      }
    }
  };

  const getDataForHomePage = async () => dispatch(getDataForHomePageSaga());

  useEffect(() => {
    if (!screenVisited) {
      registerForNotifications();
      dispatch(workoutScreenVisited(true));
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const getPreferences = async () => {
    try {
      const res = await profileService.getPreferences();
      let arr = [];
      res.map((item) => {
        const data = {
          id: item.id,
          title: item.name,
          value: item.name
        }
        arr.push(data);
      })
      setPreferences(arr);
    } catch (e) {
      console.log({e});
    }
  }

  const checkTutorial = async () => {
    const user = await authService.getAuthUser();
    if (!user.tutorial) {
      setTimeout(() => {
        dispatch(showTutorialVisible(true));
      }, 500)
    }
  }

  const getAuthMe = async () => {
    try {
      const user = await authService.getAuthUser();
      dispatch(setActiveUser(user));
    } catch (e) {
      console.log({e});
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getAuthMe();
      dispatch(fromCalendar(false));
      removeCompleted();
      dispatch(getNotificationIndicatorSaga());
      getDataForHomePage();
      checkTutorial();
    }, [])
  );

  useFocusEffect(
      React.useCallback(() => {
        if(achievement) {
          dispatch(setIsAchievementModalShown(true))
          dispatch(setShowConfettiAchievement(true))
        }
      }, [achievement])
  );

  const removeCompleted = async () => {
    await asyncStorageService.removeItem('completed');
  }



  useEffect( () => {
    getPreferences();
    getDataForHomePage();
    // if (Platform.OS === 'android') {
    //   checkSubscription();
    // }

  }, []);

  const locationTitle = preferenceWidgetHelper.getLocationTitle(location);
  const fitnessLevelTitle = preferenceWidgetHelper.getFitnessLevelTitle(fitness_level);
  const fitnessLevelIcon = preferenceWidgetHelper.getFitnessLevelIcon(fitness_level, colors);
  const [isWidgetModalVisible, setIsWidgetModalVisible] = useState(false);
  const [selectedWidgetTab, setSelectedWidgetTab] = useState(null);

  const onNotificationsPress = () => dispatch(getNotificationsSaga());
  const onTodayWorkoutPress = (data) => dispatch(getWorkoutSaga(data));
  const onProgramPress = programId => dispatch(getProgramSaga(programId));

  const onSeeAllPress = (data, title) => {
    const programsData = {data, title};
    dispatch(getAllProgramsSaga(programsData));
  };

  const todayProgramDataForDispatch = {
    "todaysWorkoutId": todayWorkout?.workout_id,
    "todaysWorkoutProgram": todayWorkout?.program,
    "todaysProgramWeekId": todayWorkout?.program_week_id
  }

  const openWorkoutWidget = (val) => {
    setSelectedWidgetTab(val);
    setIsWidgetModalVisible(true)
  }

  return (
    <Wrapper>
      <View style={{backgroundColor: colors.backgroundColor}}>
        <WorkoutHeader colors={colors} onNotificationsPress={onNotificationsPress}/>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{paddingBottom: 100, paddingHorizontal: 3}}
          showsVerticalScrollIndicator={false}>
          <WorkoutAdjustWidget setIsWidgetModalVisible={(val) => openWorkoutWidget(val)} locationTitle={locationTitle} preferenceTitle={myPreference.preference.name} fitnessLevelTitle={fitnessLevelTitle} fitnessLevelIcon={fitnessLevelIcon} colors={colors} />
          {
            todayWorkout || recommendedProgram ?
            <TodayWorkout colors={colors} isWorkout={!!todayWorkout} data={todayWorkout ? todayWorkout : recommendedProgram} onItemPress={() => todayWorkout ? onTodayWorkoutPress(todayProgramDataForDispatch) : onProgramPress(recommendedProgram.id)}/> :
            <CustomText children={'You have no workouts for today'} size={21} fontWeight={'600'} style={{marginTop: 30, textAlign: 'center'}} color={colors.fontColor}/>
          }
          <WorkoutProgramList colors={colors} data={newPrograms} navigation={navigation} title={'New Programs'} onPressItem={onProgramPress} onSeeAllPress={data => onSeeAllPress(data, 'New Programs')}/>
          <WorkoutProgramList colors={colors} data={programsByLocation} navigation={navigation} title={ locationTitle + ' Programs'} onPressItem={onProgramPress} onSeeAllPress={data => onSeeAllPress(data, locationTitle + ' Programs')}/>
        </ScrollView>
        <WorkoutAdjustModal
          selectedTab={selectedWidgetTab}
          preferences={preferences}
          colors={colors} onModalClose={() => {
          setIsWidgetModalVisible(false);
          setSelectedWidgetTab(null);
        }} isVisible={isWidgetModalVisible} preference={myPreference} fitnessLevelIcon={fitnessLevelIcon}/>
      </View>
    </Wrapper>
  );
};

export default HomeScreen;
