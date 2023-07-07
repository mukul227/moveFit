import React,{useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  globalLoaderSelector,
  isAchievementModalShownSelector, isTutorialVisibleSelector,
  showConfettiSelector, subscriptionModalSelector,
  themeSelector
} from '../store/helpers';
import GlobalErrorModal from '../components/shared/GlobalErrorModal';
import {globalErrorSelector} from '../store/errors';
import ActivityIndicatorComponent from '../components/shared/ActivityIndicatorComponent';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {DARK_THEME, LIGHT_THEME} from "../constants/Colors";
import ConfettiComponent from "../components/shared/ConfettiComponent";
import AchievementModal from "../components/shared/AchievementModal";
import authService from "../services/AuthService";
import messaging from '@react-native-firebase/messaging';
import InAppNotification from "../components/shared/InAppNotifications";
import {pushNotificationSelector} from "../store/notifications";
import {onPressNotificationSaga, setPushNotification} from "../store/notifications/actions";
import NoSubscriptionModal from "../components/shared/NoSubscriptionModal";
import TutorialComponent from "../components/shared/TutorialComponent";

const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DARK_THEME,
    ...DefaultTheme.colors,
    backgroundColor: "black",
    accent: "#FAFAFA"
  },
};

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,

  colors: {
    ...LIGHT_THEME,
    backgroundColor: "white",
    accent: "#1A1A1A",
  },
};

const NetworkInterceptor = ({showNotification, children}) => {

  const dispatch = useDispatch();
  const handleNotifications = (data) => dispatch(setPushNotification(data));
  const closeNotifications = (data) => dispatch(setPushNotification(data));

  const token = authService.getAccessToken();

  const globalError = useSelector(globalErrorSelector());
  const pushNotification = useSelector(pushNotificationSelector());
  const isTutorialVisible = useSelector(isTutorialVisibleSelector());
  const subscriptionModal = useSelector(subscriptionModalSelector());
  const globalLoader = useSelector(globalLoaderSelector());
  const theme = useSelector(themeSelector());
  const confetti = useSelector(showConfettiSelector());
  const isAchievementVisible = useSelector(isAchievementModalShownSelector());

  useEffect(() => {
    if (pushNotification.isVisible) {
      setTimeout(() => {
        closeNotifications({
          isVisible: false,
          data: {},
          notification: {}
        })
      }, 4000);
    }

  }, [pushNotification.isVisible]);

  useEffect(() => {
    if (token) {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        const data = {
          isVisible: true,
          data: remoteMessage.data,
          notification: remoteMessage.notification
        };
        handleNotifications(data);
      });

      const unsubscribe1 = messaging().onNotificationOpenedApp(
        async remoteMessage => {
          const data = {
            isVisible: true,
            data: remoteMessage.data,
            notification: remoteMessage.notification
          };
          dispatch(onPressNotificationSaga(data));
        });

      return unsubscribe;
    }
  }, [token]);

  return (
    <PaperProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <View style={styles.container}>
        {globalLoader && <ActivityIndicatorComponent/>}
        {children}
        <GlobalErrorModal isVisible={globalError}/>
        {confetti ? <ConfettiComponent showConfettiProp={confetti}/> : null}
        {isTutorialVisible ? <TutorialComponent /> : null}
        <AchievementModal isModalVisible={isAchievementVisible}/>
        <NoSubscriptionModal isModalVisible={subscriptionModal.isVisible}/>
        {pushNotification.isVisible && <InAppNotification notification={pushNotification} />}
      </View>
    </PaperProvider>
  );
};

export default NetworkInterceptor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
