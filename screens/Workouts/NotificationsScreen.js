import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {encouragementMessageList} from "../../constants/Messages";
import {useTheme} from "react-native-paper";
import NotificationsList from "../../components/workouts/notifications/NotificationsList";
import NotificationsHeader from "../../components/workouts/notifications/NotificationsHeader";
import Wrapper from "../../components/shared/Wrapper";
import SendMessageModal from "../../components/workouts/notifications/SendMessageModal";
import {getNotificationsGridSaga, notificationsGridSelector, sendMessageToFriendSaga} from "../../store/notifications";
import {friendRequestSaga} from "../../store/friends";
import {redirectToSingleUserFromNotificationsSaga} from "../../store/friends/actions";
import {useFocusEffect} from "@react-navigation/native";
import {AppState} from "react-native";

const NotificationsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const appState = useRef(AppState.currentState);

  let appStateVal;

  useEffect(() => {
    appStateVal = AppState.addEventListener("change", async nextAppState => {
      if (appState.current === 'background' && nextAppState === 'active') {
        getNotifications(1, 20);
      }
      appState.current = nextAppState;
    });

    return () => {
      appStateVal.remove();
    };
  },[])

  const onOverlayPress = () => setIsModalOpen(false);

  const onNotificationPress = notification => {
    setNotification(notification);
    if (notification.type === 'workoutFinished') {
      setIsModalOpen(true);
    } else if (notification.type === 'sendMessage') {
      return null;
    } else {
      dispatch(redirectToSingleUserFromNotificationsSaga(notification.sender.id))
    }
  };

  const onMessagePress = message => {
    setIsModalOpen(false);
    dispatch(sendMessageToFriendSaga({receiver_id: notification.sender_id, message: message.title}));
  };

  const onAnswerPress = (value, senderId) => {
    dispatch(friendRequestSaga(value, senderId))
  };

  const getNotifications = (page, limit) => dispatch(getNotificationsGridSaga(page, limit));
  const notifications = useSelector(notificationsGridSelector());
  // const {isLoading, data} = notifications;

  useFocusEffect(
    React.useCallback(() => {
      getNotifications(1, 20);
    }, [])
  );

  const onRefresh = () => dispatch(getNotificationsGridSaga(1, 20));

  const onLoadMore = () => {
    if (notifications.total > notifications.limit * notifications.page) {
      dispatch(getNotificationsGridSaga(notifications.page + 1, 20));
    }
  };

  return (
    <Wrapper paddingBottom={35} backgroundColor={colors.notificationBackground} showStatusBar={false}>
      <NotificationsHeader navigation={navigation} colors={colors}/>
      <NotificationsList notifications={notifications?.data} colors={colors} onNotificationPress={onNotificationPress} onAnswerPress={onAnswerPress} onLoadMore={onLoadMore} onRefresh={onRefresh} refreshing={notifications?.isLoading}/>
      <SendMessageModal onOverlayPress={onOverlayPress} isModalOpen={isModalOpen} colors={colors} messages={encouragementMessageList} notification={notification} onMessagePress={onMessagePress}/>
    </Wrapper>
  );
};

export default NotificationsScreen;
