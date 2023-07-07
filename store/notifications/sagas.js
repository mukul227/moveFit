import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  GET_NOTIFICATION_SAGA, GET_NOTIFICATIONS_GRID_SAGA,
  GET_NOTIFICATIONS_SAGA, ON_PRESS_NOTIFICATION_SAGA,
  SEND_MESSAGE_TO_FRIEND_SAGA
} from './actionTypes';
import navigationService from '../../services/NavigationService';
import {setGlobalLoader, setIsAchievementModalShown, showActivityIndicator} from '../helpers/actions';
import {notificationsService} from "../../services/NotificationsService";
import {setAreNotificationsLoading, setNotifications, setNotificationsGrid} from "./actions";
import asyncStorageService from "../../services/AsyncStorageService";
import {profileService} from "../../services/ProfileService";
import {setSingleUser} from "../friends";
import {friendsService} from "../../services/FriendsService";
import {setAchievement, setShowConfettiAchievement} from "../profile/actions";
import Toast from "react-native-toast-message";
import {activeUserSelector, phoneNumberSelector} from "../auth";
import authService from "../../services/AuthService";

function* getNotificationSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const notification = yield call(notificationsService.getNotification, payload);
    yield put(setNotifications(notification));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getNotificationsSagaFn() {
  try {
    yield put(setGlobalLoader(true));
    const notifications = yield call(notificationsService.getNotifications);
    yield put(setNotifications(notifications));
    yield put(showActivityIndicator(false));
    navigationService.navigate('NotificationsScreen');
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* sendMessageToFriendSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const res = yield call(notificationsService.sendMessageToFriend, payload);
    if(res?.id){
      yield put(setAchievement(res))
      yield put(setIsAchievementModalShown(true))
      yield put(setShowConfettiAchievement(true))
    }
    Toast.show({
      type: 'messageSent',
      text1: 'Message Sent!',
      position: "bottom",
      visibilityTime: 2000,
    });
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getNotificationsGridSagaFn({payload: { page, limit }}) {
  try {
    yield put(showActivityIndicator(false));
    yield put(setAreNotificationsLoading(true));
    const notifications = yield call(notificationsService.getNotificationsGrid, page, limit );
    if (notifications.docs.length) {
      yield call(asyncStorageService.setItem, 'lastNotification', notifications.docs[0].id);
    }
    yield put(setNotificationsGrid(notifications));
  } catch (error) {
    console.log({error});
    yield put(setAreNotificationsLoading(false));
  } finally {
    yield put(setAreNotificationsLoading(false));
  }
}

function* onPressNotificationSagaFn({payload}) {
  try {
    const user = yield select(activeUserSelector());
    // if (payload.data.type !== 'workoutFinished') {
    //   const user = yield call(friendsService.getSingleUser, payload?.data?.user_id);
    //   const data = {
    //     user,
    //     isAuthUser: false
    //   };
    //   yield put(setSingleUser(data));
    //   navigationService.navigate('MainNavigator', {screen: 'Workouts', params: {
    //       screen: 'NotificationsScreen'
    //     }});
    // }
    if (user.subscribed) {
      yield call(authService.setAuthorizationHeader);
      navigationService.navigate('MainNavigator', {screen: 'Workouts', params: {
          screen: 'NotificationsScreen'
        }});
    } else {
      navigationService.navigate('MainNavigator', {screen: 'Habits', params: {
          screen: 'HomeScreen'
        }});
    }


  } catch (error) {
    console.log({error});
  } finally {

  }
}

export function* watchGetNotificationSaga() {
  yield takeLatest(GET_NOTIFICATION_SAGA, getNotificationSagaFn);
}

export function* watchGetNotificationsSaga() {
  yield takeLatest(GET_NOTIFICATIONS_SAGA, getNotificationsSagaFn);
}

export function* watchSendMessageToFriend() {
  yield takeLatest(SEND_MESSAGE_TO_FRIEND_SAGA, sendMessageToFriendSagaFn)
}

export function* watchGetNotificationsGrid() {
  yield takeLatest(GET_NOTIFICATIONS_GRID_SAGA, getNotificationsGridSagaFn)
}

export function* watchOnPressNotificationSaga() {
  yield takeLatest(ON_PRESS_NOTIFICATION_SAGA, onPressNotificationSagaFn);
}
