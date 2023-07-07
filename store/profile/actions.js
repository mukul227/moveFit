import {
  NEW_POST_SAGA,
  SET_POST_IMAGE,
  CREATE_NEW_POST_SAGA,
  GET_USER_POSTS_SAGA,
  SET_USER_POSTS,
  GET_SETTINGS_SAGA,
  UPDATE_PROFILE_STATUS_SAGA,
  UPDATE_PROFILE_THEME_SAGA,
  SET_ARE_POSTS_LOADING,
  SET_USER_POSTS_FROM_CREATE,
  GET_USER_ACHIEVEMENTS_SAGA,
  SET_USER_ACHIEVEMENTS,
  SET_ACHIEVEMENT,
  CLOSE_ACHIEVEMENTS_MODAL_SAGA,
  SHOW_ACHIEVEMENTS_MODAL_SAGA,
  SHOW_ACHIEVEMENTS_CONFETTI,
  DELETE_POST_SAGA,
  REPORT_POST_SAGA,
  FOLLOW_LIST_TYPE,
  GET_FOLLOW_SAGA,
  SET_FOLLOW_USERS,
  GET_ALL_FOLLOW_USERS_SAGA,
  REDIRECT_TO_FRIEND_PROFILE_SAGA,
  SET_USER_ARRAY, REMOVE_FROM_USER_ARRAY_SAGA, AUTH_USER_FOLLOW_LIST_TYPE, GET_FOLLOWERS_FOLLOWING_SAGA
} from './actionTypes';
import {GET_ALL_USERS_SAGA} from "../friends/actionTypes";

export function setPostImage(payload) {
    return {
        type: SET_POST_IMAGE,
        payload
    };
}

export function newPostSaga(payload) {
    return {
        type: NEW_POST_SAGA,
        payload
    };
}

export function deletePostSaga(payload) {
  return {
    type: DELETE_POST_SAGA,
    payload
  };
}

export function reportPostSaga(payload) {
  return {
    type: REPORT_POST_SAGA,
    payload
  };
}

export function createNewPostSaga(payload) {
    return {
        type: CREATE_NEW_POST_SAGA,
        payload
    };
}

export function getUserPostsSaga(page, limit, userId) {
    return {
        type: GET_USER_POSTS_SAGA,
        payload: {
            page,
            limit,
            userId
        }
    };
}

export function setArePostsLoading(payload) {
    return {
        type: SET_ARE_POSTS_LOADING,
        payload
    };
}

export function setUserPosts(payload) {
    return {
        type: SET_USER_POSTS,
        payload
    };
}

export function setUserPostsFromCreate(payload) {
  return {
    type: SET_USER_POSTS_FROM_CREATE,
    payload
  };
}

export function getSettingsSaga() {
    return {
        type: GET_SETTINGS_SAGA
    };
}

export function updateProfileStatusSaga(payload) {
    return {
        type: UPDATE_PROFILE_STATUS_SAGA,
        payload
    };
}

export function updateProfileThemeSaga() {
    return {
        type: UPDATE_PROFILE_THEME_SAGA
    };
}

export function closeAchievementModalSaga() {
    return {
        type: CLOSE_ACHIEVEMENTS_MODAL_SAGA
    };
}

export function showAchievementModalSaga() {
    return {
        type: SHOW_ACHIEVEMENTS_MODAL_SAGA
    };
}

export function getUserAchievementsSaga(payload) {
    return {
        type: GET_USER_ACHIEVEMENTS_SAGA,
        payload
    };
}

export function setUserAchievements(payload) {
    return {
        type: SET_USER_ACHIEVEMENTS,
        payload
    };
}

export function setAchievement(payload) {
    return {
        type: SET_ACHIEVEMENT,
        payload
    };
}

export function setShowConfettiAchievement(payload) {
    return {
        type: SHOW_ACHIEVEMENTS_CONFETTI,
        payload
    };
}

export function setFollowListType(payload) {
    return {
        type: FOLLOW_LIST_TYPE,
        payload
    };
}

export function setAuthUserFollowListType(payload) {
    return {
        type: AUTH_USER_FOLLOW_LIST_TYPE,
        payload
    };
}

export function getFollowSaga(payload) {
    return {
        type: GET_FOLLOW_SAGA,
        payload
    };
}

export function setFollowUsers(payload) {
    return {
        type: SET_FOLLOW_USERS,
        payload
    };
}

export function setUserArray(payload) {
  return {
    type: SET_USER_ARRAY,
    payload
  };
}

export function getAllFollowersFollowingSaga(page, limit, listType, userId) {
  return {
    type: GET_FOLLOWERS_FOLLOWING_SAGA,
    payload: {
      page,
      limit,
      listType,
      userId
    }
  };
}

export function redirectToFriendProfileSaga(payload) {
  return {
    type: REDIRECT_TO_FRIEND_PROFILE_SAGA,
    payload
  };
}

export function removeFromUserArraySaga() {
  return {
    type: REMOVE_FROM_USER_ARRAY_SAGA
  };
}
