import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
    getUserAchievementsSaga, setAchievement,
    setArePostsLoading, setAuthUserFollowListType, setFollowListType, setFollowUsers,
    setPostImage, setShowConfettiAchievement, setUserAchievements, setUserArray,
    setUserPosts,
    setUserPostsFromCreate
} from './actions';
import {
  NEW_POST_SAGA,
  CREATE_NEW_POST_SAGA,
  GET_USER_POSTS_SAGA,
  GET_SETTINGS_SAGA,
  UPDATE_PROFILE_STATUS_SAGA,
  UPDATE_PROFILE_THEME_SAGA,
  GET_USER_ACHIEVEMENTS_SAGA,
  CLOSE_ACHIEVEMENTS_MODAL_SAGA,
  SHOW_ACHIEVEMENTS_MODAL_SAGA,
  GET_FOLLOW_SAGA,
  GET_ALL_FOLLOW_USERS_SAGA,
  DELETE_POST_SAGA,
  REPORT_POST_SAGA,
  REDIRECT_TO_FRIEND_PROFILE_SAGA,
  REMOVE_FROM_USER_ARRAY_SAGA, GET_FOLLOWERS_FOLLOWING_SAGA

} from './actionTypes';
import navigationService from '../../services/NavigationService';
import {setGlobalLoader, setIsAchievementModalShown, setTheme, showConfetti} from "../helpers/actions";
import authService from "../../services/AuthService";
import {fromNotificationSelector, setSingleUser, userDataSelector} from "../friends";
import {setActiveUser} from "../auth/actions";
import {isFriendRedirectSelector, themeSelector} from "../helpers";
import {profileService} from "../../services/ProfileService";
import {authUserFollowListTypeSelector, followListTypeSelector, postsSelector, userArrSelector} from "./selectors";
import {activeUserSelector} from "../auth";
import {friendsService} from "../../services/FriendsService";
import {helperService} from "../../services/HelperService";
import {setFromNotification} from "../friends/actions";

function* newPostSagaFn({payload}) {
    try {
        yield put(setGlobalLoader(true));
        yield put(setPostImage(payload))
        navigationService.navigate('NewPostScreen');
    } catch (error) {
        yield put(setGlobalLoader(false));
        console.log({error});
    } finally {
        yield put(setGlobalLoader(false));
    }
}

function* createNewPostSagaFn({payload}) {
    try {
        yield put(setGlobalLoader(true));
        const data = {
            image: payload.image,
            description: payload.text
        }
        const res = yield call(profileService.createPost, data);
        const oldPosts = yield select(postsSelector());
        let clonedArray = JSON.parse(JSON.stringify(oldPosts));
        yield clonedArray.data.unshift(res);
        yield put(setUserPostsFromCreate(clonedArray));
        navigationService.navigate('HomeScreen');
        if(res.achievement){
            yield put(setAchievement(res?.achievement))
            yield put(setIsAchievementModalShown(true))
            yield put(setShowConfettiAchievement(true))
        }
    } catch (error) {
        yield put(setGlobalLoader(false));
        console.log({error});
    } finally {
        yield put(setGlobalLoader(false));
    }
}

function* getUserPostsSagaFn({payload: {page, limit, userId}}) {
    try {
        yield put(setArePostsLoading(true));
        const posts = yield call(profileService.getUserPosts, page, limit, userId);
        yield put(setUserPosts(posts));
    } catch (error) {
        console.log({error});
        yield put(setArePostsLoading(false));
    } finally {
        yield put(setArePostsLoading(false));
    }
}

function* getSettingsSagaFn() {
    try {
        yield put(setGlobalLoader(true));
        navigationService.navigate('SettingsScreen');
    } catch (error) {
        yield put(setGlobalLoader(false));
        console.log({error});
    } finally {
        yield put(setGlobalLoader(false));
    }
}

function* updateProfileStatusSagaFn({payload}) {
    try {
        yield put(setGlobalLoader(true));
        const user = yield call(authService.updateUser, payload);
        yield call(authService.updateUserInStorage, user);
        const data = {
            user,
            isAuthUser: true
        };
        yield put(setSingleUser(data));
        yield put(setActiveUser(user));
    } catch (error) {
        yield put(setGlobalLoader(false));
        console.log({error});
    } finally {
        yield put(setGlobalLoader(false));
    }
}

function* updateProfileThemeSagaFn() {
    try {
        yield put(setGlobalLoader(true));
        const currentTheme = yield select(themeSelector());
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        yield put(setTheme(newTheme));
        const data = {
            theme: newTheme
        };
        yield call(authService.setTheme, newTheme);
        yield call(authService.updateUser, data);
    } catch (error) {
        yield put(setGlobalLoader(false));
        console.log({error});
    } finally {
        yield put(setGlobalLoader(false));
    }
}

function* getUserAchievementsSagaFn({payload}) {
    try {
        const res = yield call(profileService.getUserAchievements, payload);
        let data = [];
        Object.entries(res).forEach(([key, value]) => {
               data.push({title: helperService.getAchievementSectionTitle(key), data:[...value]})
            }
        );
        yield put(setUserAchievements(data))
    } catch (error) {
        yield put(setGlobalLoader(false));
        console.log({error});
    } finally {
        yield put(setGlobalLoader(false));
    }
}

function* closeModalAchievementSagaFn() {
    try {
        yield put(setIsAchievementModalShown(false))
        yield put(setShowConfettiAchievement(false))
        yield put(setAchievement(null))

    } catch (error) {
        yield put(setGlobalLoader(false));
        console.log({error});
    } finally {
        yield put(setGlobalLoader(false));
    }
}

function* getFollowSagaFn({payload}) {
    try {
        let userArr = yield select(userArrSelector());
        if(userArr.length === 0){
            yield put(setAuthUserFollowListType(payload.action));
        }
        yield put(setFollowListType(payload.action));
        let res;
        let result;
        let cloneArr = [...userArr];
        if (userArr.length) {
          let lastElement = {...userArr[userArr.length - 1].user};
          lastElement.action = payload.action;
          cloneArr.splice(cloneArr.length - 1, 1);
          cloneArr.push({user: lastElement});
          yield put(setUserArray(cloneArr));
        }
        if(payload.action === 'followers'){
            res = yield call(profileService.getFollowers,1,10,payload.user.user.id);
            result = {...res, arr:res.docs.map(({ user }) => user)}
        } else {
            res = yield call(profileService.getFollowing,1,10,payload.user.user.id);
            result = {...res, arr:res.docs.map(({ friend }) => friend)}
        }
        yield put(setFollowUsers(result))
        navigationService.push('FollowersListScreen');
    } catch (error) {
        yield put(setGlobalLoader(false));
        console.log({error});
    } finally {
        yield put(setGlobalLoader(false));
    }
}

function* redirectToFriendProfileSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const isFriendRedirection = yield select(isFriendRedirectSelector())
    let userArr = yield select(userArrSelector());
    yield put(setUserArray([...userArr, {user: payload}]));
    const user = yield call(friendsService.getSingleUser, payload.id);
    yield getUserAchievementsSagaFn({payload: user?.id});
    const data = {
      user,
      isAuthUser: user.isAuthUser
    };
    yield put(setSingleUser(data));
    if(isFriendRedirection){
        navigationService.push( 'FriendScreen')
    }else {
        navigationService.push('HomeScreen')
    }
  } catch (error) {
    yield put(setGlobalLoader(false));
    console.log({error});
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* removeFromUserArrSagaFn() {
  try {
    yield put(setGlobalLoader(true));
    const followListType = yield select(followListTypeSelector());
    const authUserFollowListType = yield select(authUserFollowListTypeSelector());
    let res;
    let result;
    const userArr = yield select(userArrSelector());
    const userArrClone = [...userArr];
    if (userArrClone.length > 1) {
      userArrClone.pop();
      if (userArrClone.length) {
        yield put(setFollowListType(userArrClone[userArrClone.length - 1].user.action));
      }
      const user = yield call(friendsService.getSingleUser, userArrClone[userArrClone.length - 1].user.id);
      const data = {
        user,
        isAuthUser: user.isAuthUser
      };
      if(userArrClone[userArrClone.length - 1].user.action === 'followers'){
        res = yield call(profileService.getFollowers,1,10,userArrClone[userArrClone.length - 1].user.id);
        result = {...res, arr:res.docs.map(({ user }) => user)}
      } else {
        res = yield call(profileService.getFollowing,1,10,userArrClone[userArrClone.length - 1].user.id);
        result = {...res, arr:res.docs.map(({ friend }) => friend)}
      }
      yield put(setFollowUsers(result))

      yield put(setUserArray(userArrClone));
      yield put(setSingleUser(data));
    } else {
      userArrClone.pop();
      const user = yield call(authService.getAuthUser);
      const userData = {
        user: user,
        isAuthUser: true
      };
      if(authUserFollowListType === 'followers'){
        res = yield call(profileService.getFollowers,1,10,user.id);
        result = {...res, arr:res.docs.map(({ user }) => user)}
      } else {
        res = yield call(profileService.getFollowing,1,10,user.id);
        result = {...res, arr:res.docs.map(({ friend }) => friend)}
      }
      yield put(setFollowUsers(result))
      yield put(setUserArray(userArrClone));
      yield put(setSingleUser(userData));
    }
    const fromNotification = yield select(fromNotificationSelector());
    if (fromNotification) {
      yield put(setFromNotification(false));
      navigationService.navigate('MainNavigator', {
        screen: 'Workouts', params: {
          screen: 'NotificationsScreen'
        }
      });
    } else {
      navigationService.goBack();
    }

  } catch (error) {
    yield put(setGlobalLoader(false));
    console.log({error});
  } finally {
    yield put(setGlobalLoader(false));
  }
}



function* deletePostSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const user = yield select(activeUserSelector());
    yield call(profileService.deleteUserPosts, payload);
    const posts = yield call(profileService.getUserPosts, 1, 18, user.id);
    yield put(setUserPosts(posts));
    navigationService.goBack();
  } catch (error) {
    yield put(setGlobalLoader(false));
    console.log({error});
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getFollowersFollowingSagaFn({payload: { page, limit, listType, userId }}) {
  try {
    let res;
    let result;
    if(listType === 'followers'){
      res = yield call(profileService.getFollowers,page,limit, userId);
      result = {...res, arr:res.docs.map(({ user }) => user)}
    } else {
      res = yield call(profileService.getFollowing,page,limit, userId);
      result = {...res, arr:res.docs.map(({ friend }) => friend)}
    }
    yield put(setFollowUsers(result))
  } catch (error) {
    yield put(setGlobalLoader(false));
    console.log({error});
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* reportPostSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    yield call(profileService.reportUserPosts, payload);
    navigationService.goBack();
  } catch (error) {
    yield put(setGlobalLoader(false));
    console.log({error});
  } finally {
    yield put(setGlobalLoader(false));
  }
}


export function* watchCloseModalAchievementSaga() {
    yield takeLatest(CLOSE_ACHIEVEMENTS_MODAL_SAGA, closeModalAchievementSagaFn);
}

export function* watchGetAllFollowerFollowingSaga() {
  yield takeLatest(GET_FOLLOWERS_FOLLOWING_SAGA, getFollowersFollowingSagaFn);
}

export function* watchRemoveFromUserArrSaga() {
  yield takeLatest(REMOVE_FROM_USER_ARRAY_SAGA, removeFromUserArrSagaFn);
}


export function* watchGetAllFollowUsersSaga() {
    yield takeLatest(REDIRECT_TO_FRIEND_PROFILE_SAGA, redirectToFriendProfileSagaFn);
}

export function* watchGetFollowSagaFn() {
  yield takeLatest(GET_FOLLOW_SAGA, getFollowSagaFn);
}
export function* watchDeletePostSaga() {
  yield takeLatest(DELETE_POST_SAGA, deletePostSagaFn);
}

export function* watchReportPostSaga() {
  yield takeLatest(REPORT_POST_SAGA, reportPostSagaFn);

}

export function* watchCreateNewPostSaga() {
    yield takeLatest(CREATE_NEW_POST_SAGA, createNewPostSagaFn);
}

export function* watchGetUserAchievementsSagaFn() {
    yield takeLatest(GET_USER_ACHIEVEMENTS_SAGA, getUserAchievementsSagaFn);
}

export function* watchNewPostSaga() {
    yield takeLatest(NEW_POST_SAGA, newPostSagaFn);
}

export function* watchGetUserPostsSaga() {
    yield takeLatest(GET_USER_POSTS_SAGA, getUserPostsSagaFn);
}

export function* watchGetSettingsSaga() {
    yield takeLatest(GET_SETTINGS_SAGA, getSettingsSagaFn);
}

export function* watchUpdateProfileStatusSaga() {
    yield takeLatest(UPDATE_PROFILE_STATUS_SAGA, updateProfileStatusSagaFn);
}

export function* watchUpdateProfileThemeSaga() {
    yield takeLatest(UPDATE_PROFILE_THEME_SAGA, updateProfileThemeSagaFn);
}
