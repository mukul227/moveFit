import {
  CHANGE_THEME,
  OPEN_LOCATION_POP_UP,
  SET_GLOBAL_LOADER,
  SET_IS_BOTTOM_TAB_VISIBLE,
  SET_THEME,
  SET_THEME_SAGA,
  IS_CONFIRMATION_MODAL_OPEN,
  SHOW_CONFETTI,
  SET_IS_ACHIEVEMENT_MODAL_SHOWN,
  SHOW_ACTIVITY_INDICATOR,
  SHOW_SUBSCRIPTION_MODAL,
  NAVIGATE_FROM_SUBSCRIPTION_MODAL,
  IS_FRIEND_REDIRECT,
  IS_TUTORIAL_VISIBLE,
  IS_TUTORIAL_START_PROGRAM_VISIBLE, WORKOUT_SCREEN_VISITED, SET_WIDGET_TOP, ON_VIDEO_SCREEN, FINISH_TUTORIAL_SAGA
} from './actionTypes';

export function openLocationPopUp(payload) {
  return {
    type: OPEN_LOCATION_POP_UP,
    payload
  };
}

export function showTutorialVisible(payload) {
  return {
    type: IS_TUTORIAL_VISIBLE,
    payload
  };
}

export function finishTutorialSaga() {
  return {
    type: FINISH_TUTORIAL_SAGA
  };
}

export function showTutorialStartProgramVisible(payload) {
  return {
    type: IS_TUTORIAL_START_PROGRAM_VISIBLE,
    payload
  };
}

export function workoutScreenVisited(payload) {
  return {
    type: WORKOUT_SCREEN_VISITED,
    payload
  };
}

export function setGlobalLoader(payload) {
  return {
    type: SET_GLOBAL_LOADER,
    payload
  };
}

export function setTheme(payload) {
  return {
    type: SET_THEME,
    payload
  };
}

export function setThemeSaga(payload) {
  return {
    type: SET_THEME_SAGA,
    payload
  };
}

export function changeTheme() {
  return {
    type: CHANGE_THEME,
  };
}

export function setIsBottomTabVisible(payload) {
  return {
    type: SET_IS_BOTTOM_TAB_VISIBLE,
    payload
  };
}

export function showConfirmationModal(payload) {
  return {
    type: IS_CONFIRMATION_MODAL_OPEN,
    payload
  };
}

export function showConfetti(payload) {
  return {
    type: SHOW_CONFETTI,
    payload
  };
}

export function setIsAchievementModalShown(payload) {
  return {
    type: SET_IS_ACHIEVEMENT_MODAL_SHOWN,
    payload
  };
}

export function setWidgetTop(payload) {
  return {
    type: SET_WIDGET_TOP,
    payload
  };
}

export function showSubscriptionModal(payload) {
  return {
    type: SHOW_SUBSCRIPTION_MODAL,
    payload
  };
}

export function setOnVideoScreen(payload) {
  return {
    type: ON_VIDEO_SCREEN,
    payload
  };
}

export function navigateFromSubscriptionModal() {
  return {
    type: NAVIGATE_FROM_SUBSCRIPTION_MODAL
  };
}

export function showActivityIndicator(payload) {
  return {
    type: SHOW_ACTIVITY_INDICATOR,
    payload
  };
}

export function setIsFriendRedirect(payload) {
  return {
    type: IS_FRIEND_REDIRECT,
    payload
  };
}
