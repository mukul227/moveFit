import {
  GET_NOTIFICATION_SAGA,
  SET_NOTIFICATION,
  GET_NOTIFICATIONS_SAGA,
  SET_NOTIFICATIONS,
  SEND_MESSAGE_TO_FRIEND_SAGA,
  GET_NOTIFICATIONS_GRID_SAGA,
  SET_NOTIFICATIONS_GRID,
  SET_ARE_NOTIFICATIONS_LOADING, PUSH_NOTIFICATION_SAGA, SET_PUSH_NOTIFICATION, ON_PRESS_NOTIFICATION_SAGA
} from './actionTypes';

export function getNotificationSaga(payload) {
  return {
    type: GET_NOTIFICATION_SAGA,
    payload
  };
}

export function setNotification(payload) {
  return {
    type: SET_NOTIFICATION,
    payload
  }
}

export function getNotificationsSaga() {
  return {
    type: GET_NOTIFICATIONS_SAGA
  };
}

export function setNotifications(payload) {
  return {
    type: SET_NOTIFICATIONS,
    payload
  }
}

export function sendMessageToFriendSaga(payload) {
  return {
    type: SEND_MESSAGE_TO_FRIEND_SAGA,
    payload
  };
}

export function getNotificationsGridSaga(page, limit) {
  return {
    type: GET_NOTIFICATIONS_GRID_SAGA,
    payload: {
      page,
      limit
    }
  };
}

export function setNotificationsGrid(payload) {
  return {
    type: SET_NOTIFICATIONS_GRID,
    payload
  };
}

export function setAreNotificationsLoading(payload) {
  return {
    type: SET_ARE_NOTIFICATIONS_LOADING,
    payload
  };
}

export function pushNotificationSaga(payload) {
  return {
    type: PUSH_NOTIFICATION_SAGA,
    payload
  };
}

export function setPushNotification(payload) {
  return {
    type: SET_PUSH_NOTIFICATION,
    payload
  };
}

export function onPressNotificationSaga(payload) {
  return {
    type: ON_PRESS_NOTIFICATION_SAGA,
    payload
  };
}
