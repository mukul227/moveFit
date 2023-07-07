import {
  FOLLOW_FROM_CONTACTS_SAGA,
  FOLLOW_USER_SAGA,
  FRIEND_REQUEST_SAGA,
  GET_ALL_USERS_SAGA,
  GET_FRIENDS_SAGA,
  GET_SINGLE_USER_SAGA,
  REDIRECT_TO_SINGLE_USER_FROM_FRIENDS_STACK,
  REDIRECT_TO_SINGLE_USER_FROM_NOTIFICATIONS,
  SET_ALL_USERS,
  SET_ARE_FRIENDS_LOADING,
  SET_ARE_USERS_LOADING, SET_CONTACTS,
  SET_FRIENDS,
  SET_FRIENDS_STATUS, SET_FROM_NOTIFICATION,
  SET_IS_FRIEND,
  SET_SINGLE_USER, SYNC_CONTACTS_SAGA
} from "./actionTypes";

export function getSingleUserSaga(payload) {
  return {
    type: GET_SINGLE_USER_SAGA,
    payload
  };
}

export function redirectToSingleUserFromNotificationsSaga(payload) {
  return {
    type: REDIRECT_TO_SINGLE_USER_FROM_NOTIFICATIONS,
    payload
  };
}

export function syncContactsSaga(payload) {
  return {
    type: SYNC_CONTACTS_SAGA,
    payload
  };
}

export function setFromNotification(payload) {
  return {
    type: SET_FROM_NOTIFICATION,
    payload
  };
}

export function setContactsSaga(payload) {
  return {
    type: SET_CONTACTS,
    payload
  };
}

export function followFromContactsSaga(payload) {
  return {
    type: FOLLOW_FROM_CONTACTS_SAGA,
    payload
  };
}

export function redirectToSingleUserFromFriendsStackSaga(payload) {
  return {
    type: REDIRECT_TO_SINGLE_USER_FROM_FRIENDS_STACK,
    payload
  };
}

export function setSingleUser(payload) {
  return {
    type: SET_SINGLE_USER,
    payload
  };
}

export function getAllUsersSaga(page, limit, username) {
  return {
    type: GET_ALL_USERS_SAGA,
    payload: {
      page,
      limit,
      username
    }
  };
}

export function setAllUsers(payload) {
  return {
    type: SET_ALL_USERS,
    payload
  };
}

export function setAreUsersLoading(payload) {
  return {
    type: SET_ARE_USERS_LOADING,
    payload
  };
}

export function followUserSaga(payload) {
  return {
    type: FOLLOW_USER_SAGA,
    payload
  };
}

export function getFriendsSaga(page, limit, term) {
  return {
    type: GET_FRIENDS_SAGA,
    payload: {
      page,
      limit,
      term
    }
  };
}

export function setFriends(payload) {
  return {
    type: SET_FRIENDS,
    payload
  };
}

export function setAreFriendsLoading(payload) {
  return {
    type: SET_ARE_FRIENDS_LOADING,
    payload
  };
}

export function setIsFriend(payload) {
  return {
    type: SET_IS_FRIEND,
    payload
  };
}

export function setFriendsStatus(payload) {
  return {
    type: SET_FRIENDS_STATUS,
    payload
  }
}

export function friendRequestSaga(value, senderId) {
  return {
    type: FRIEND_REQUEST_SAGA,
    payload: {
      value,
      senderId
    }
  }
}
