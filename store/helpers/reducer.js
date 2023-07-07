import produce from 'immer';
import {
  OPEN_LOCATION_POP_UP,
  SET_GLOBAL_LOADER,
  SET_IS_BOTTOM_TAB_VISIBLE,
  SET_THEME,
  IS_CONFIRMATION_MODAL_OPEN,
  SHOW_CONFETTI,
  SET_IS_ACHIEVEMENT_MODAL_SHOWN,
  SHOW_ACTIVITY_INDICATOR,
  SHOW_SUBSCRIPTION_MODAL,
  IS_FRIEND_REDIRECT,
  IS_TUTORIAL_VISIBLE, IS_TUTORIAL_START_PROGRAM_VISIBLE, WORKOUT_SCREEN_VISITED, SET_WIDGET_TOP, ON_VIDEO_SCREEN,
} from './actionTypes';

const initialState = {
  isLocationPopUpOpen: false,
  globalLoader: false,
  theme: 'light',
  isBottomTabVisible: 0,
  isConfirmationModalOpen:false,
  showConfetti: false,
  isAchievementModalShown: false,
  activityIndicator: false,
  subscriptionModal: {
    isVisible: false,
    tab: ''
  },
  isFriendRedirect:false,
  tutorialVisible: false,
  tutorialStartProgramVisible: false,
  workoutScreenVisited: false,
  widgetTop: 0,
  onVideoScreenValue: false
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case OPEN_LOCATION_POP_UP:
        draft.isLocationPopUpOpen = payload;
        break;
      case ON_VIDEO_SCREEN:
        console.log('payload',payload);
        draft.onVideoScreenValue = payload;
        break;
      case SET_WIDGET_TOP:
        draft.widgetTop = payload;
        break;
      case WORKOUT_SCREEN_VISITED:
        draft.workoutScreenVisited = payload;
        break;
      case IS_TUTORIAL_VISIBLE:
        draft.tutorialVisible = payload;
        break;
      case IS_TUTORIAL_START_PROGRAM_VISIBLE:
        draft.tutorialStartProgramVisible = payload;
        break;
      case SHOW_ACTIVITY_INDICATOR:
        draft.activityIndicator = payload;
        break;
      case SHOW_SUBSCRIPTION_MODAL:
        draft.subscriptionModal.isVisible = payload.isVisible;
        draft.subscriptionModal.tab = payload.tab;
        break;
      case SET_GLOBAL_LOADER:
        draft.globalLoader = payload;
        break;
      case SET_THEME:
        draft.theme = payload;
        break;
      case SET_IS_BOTTOM_TAB_VISIBLE:
        draft.isBottomTabVisible = payload;
        break;
      case IS_CONFIRMATION_MODAL_OPEN:
        draft.isConfirmationModalOpen = payload;
        break;
      case SHOW_CONFETTI:
        draft.showConfetti = payload;
        break;
      case SET_IS_ACHIEVEMENT_MODAL_SHOWN:
        draft.isAchievementModalShown = payload;
        break;
      case IS_FRIEND_REDIRECT:
        draft.isFriendRedirect = payload;
        break;
    }
  });
}

export default reducer;
