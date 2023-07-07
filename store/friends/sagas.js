import {call, put, select, delay, takeLatest} from 'redux-saga/effects';
import navigationService from '../../services/NavigationService';
import {
  FOLLOW_FROM_CONTACTS_SAGA,
  FOLLOW_USER_SAGA,
  FRIEND_REQUEST_SAGA,
  GET_ALL_USERS_SAGA,
  GET_FRIENDS_SAGA,
  GET_SINGLE_USER_SAGA,
  REDIRECT_TO_SINGLE_USER_FROM_FRIENDS_STACK,
  REDIRECT_TO_SINGLE_USER_FROM_NOTIFICATIONS, SYNC_CONTACTS_SAGA
} from "./actionTypes";
import {setGlobalLoader, setIsAchievementModalShown} from "../helpers/actions";
import {friendsService} from "../../services/FriendsService";
import {
  setAllUsers,
  setAreFriendsLoading,
  setAreUsersLoading, setContactsSaga,
  setFriends,
  setFriendsStatus, setFromNotification,
  setIsFriend,
  setSingleUser
} from "./actions";
import {setNotificationsGrid} from "../notifications";
import {notificationsService} from "../../services/NotificationsService";
import {setAchievement, setShowConfettiAchievement, setUserAchievements} from "../profile/actions";
import {profileService} from "../../services/ProfileService";
import {helperService} from "../../services/HelperService";


function* redirectToSingleFriendFromNotificationSagaFn({payload}) {
  try {
    yield put(setFromNotification(true));
    yield getSingleUserSagaFn({payload});
    navigationService.navigate('MainNavigator', {
      screen: 'Friends', params: {
        screen: 'FriendScreen'
      }
    });
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* redirectToSingleFriendFromFriendsStackSagaFn({payload}) {
  try {
    yield getSingleUserSagaFn({payload});
    navigationService.navigate('FriendScreen');
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getSingleUserSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const user = yield call(friendsService.getSingleUser, payload);

    const res = yield call(profileService.getUserAchievements, payload);
    let achievements = [];
    Object.entries(res).forEach(([key, value]) => {
      achievements.push({title: helperService.getAchievementSectionTitle(key), data:[...value]})
        }
    );
    yield put(setUserAchievements(achievements))

    const data = {
      user,
      isAuthUser: user.isAuthUser
    };
    yield put(setSingleUser(data));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getAllUsersSagaFn({payload: { page, limit, username }}) {
  try {
    yield put(setAreUsersLoading(true));
    const users = yield call(friendsService.getAllUsers, page, limit, username);
    yield put(setAllUsers(users));
  } catch (error) {
    console.log({error});
    yield put(setAreUsersLoading(false));
  } finally {
    yield put(setAreUsersLoading(false));
  }
}

function* followUserSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const friend = yield call(friendsService.followUser, payload);
    console.log(11,friend);
    console.log(22,!!friend);
    yield put(setIsFriend(friend));
    // if(friend && friend?.userFriend?.status){
    //   yield put(setIsFriend(true));
    // }
    // if (!friend) {
    //   yield put(setIsFriend(false));
    // }
    yield put(setFriendsStatus(friend?.userFriend ? friend?.userFriend?.status : friend));
    if(friend?.achievement){
      yield put(setAchievement(friend?.achievement))
      yield put(setIsAchievementModalShown(true))
      yield put(setShowConfettiAchievement(true))
    }
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getFriendsSagaFn({payload: { page, limit, term }}) {
  try {
    yield put(setAreFriendsLoading(true));
    const friends = yield call(friendsService.getFriends, page, limit, term);
    yield put(setFriends(friends));
  } catch (error) {
    console.log({error});
    yield put(setAreFriendsLoading(false));
  } finally {
    yield put(setAreFriendsLoading(false));
  }
}

function* friendRequestSagaFn({payload: {value, senderId}}) {
  try {
    yield put(setGlobalLoader(true));
    if (value === 'accept') {
      yield call(friendsService.acceptFriendRequest, senderId);
    } else {
      yield call(friendsService.declineFriendRequest, senderId);
    }
    const notifications = yield call(notificationsService.getNotificationsGrid, 1, 20);
    yield put(setNotificationsGrid(notifications));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* syncContactsSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true))
    let phoneNumbers = [];
    payload.map((item) => {
      if (item.phoneNumbers.length) {
        item.phoneNumbers.map((val) => {
          phoneNumbers.push(val.number.replace(/ /g,''))
        })
      }
    });
    const res = yield call(friendsService.getFilteredContacts, phoneNumbers);
    yield put(setContactsSaga(res));
    navigationService.navigate('ContactScreen');
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* followFromContactsSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    yield call(friendsService.followUser, payload.id);
    let phoneNumbers = [];
    payload.contacts.map((item) => {
      if (item.phoneNumbers.length) {
        item.phoneNumbers.map((val) => {
          phoneNumbers.push(val.number.replace(/ /g,''))
        })
      }
    });
    const res = yield call(friendsService.getFilteredContacts, phoneNumbers);
    yield put(setContactsSaga(res));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

export function* watchGetUserSaga() {
  yield takeLatest(GET_SINGLE_USER_SAGA, getSingleUserSagaFn);
}

export function* followFromContactsSaga() {
  yield takeLatest(FOLLOW_FROM_CONTACTS_SAGA, followFromContactsSagaFn);
}

export function* watchSyncContactsSaga() {
  yield takeLatest(SYNC_CONTACTS_SAGA, syncContactsSagaFn);
}

export function* watchRedirectToFriendFromNotificationSaga() {
  yield takeLatest(REDIRECT_TO_SINGLE_USER_FROM_NOTIFICATIONS, redirectToSingleFriendFromNotificationSagaFn);
}

export function* watchRedirectToFriendFromFriendsStackSaga() {
  yield takeLatest(REDIRECT_TO_SINGLE_USER_FROM_FRIENDS_STACK, redirectToSingleFriendFromFriendsStackSagaFn);
}

export function* watchGetAllUsersSaga() {
  yield takeLatest(GET_ALL_USERS_SAGA, getAllUsersSagaFn);
}

export function* watchFollowUserSaga() {
  yield takeLatest(FOLLOW_USER_SAGA, followUserSagaFn);
}

export function* watchGetFriendsSaga() {
  yield takeLatest(GET_FRIENDS_SAGA, getFriendsSagaFn);
}

export function* watchFriendRequestSaga() {
  yield takeLatest(FRIEND_REQUEST_SAGA, friendRequestSagaFn);
}
