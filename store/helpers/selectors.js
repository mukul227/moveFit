import { createSelector } from 'reselect';

const helperStateSelector = (state) => state.helpers;

export const globalLoaderSelector = () =>
  createSelector(helperStateSelector, (state) => state.globalLoader);

export const themeSelector = () =>
  createSelector(helperStateSelector, (state) => state.theme);

export const isBottomTabVisibleSelector = () =>
  createSelector(helperStateSelector, (state) => state.isBottomTabVisible);

export const isConfirmationModalOpenSelector = () =>
  createSelector(helperStateSelector, (state) => state.isConfirmationModalOpen);

export const showConfettiSelector = () =>
  createSelector(helperStateSelector, (state) => state.showConfetti);

export const isAchievementModalShownSelector = () =>
  createSelector(helperStateSelector, (state) => state.isAchievementModalShown);

export const activityIndicatorSelector = () =>
  createSelector(helperStateSelector, (state) => state.activityIndicator);

export const subscriptionModalSelector = () =>
  createSelector(helperStateSelector, (state) => state.subscriptionModal);

export const isFriendRedirectSelector = () =>
  createSelector(helperStateSelector, (state) => state.isFriendRedirect);

export const isTutorialVisibleSelector = () =>
  createSelector(helperStateSelector, (state) => state.tutorialVisible);

export const isTutorialStartProgramVisibleSelector = () =>
  createSelector(helperStateSelector, (state) => state.tutorialStartProgramVisible);

export const workoutScreenVisitedSelector = () =>
  createSelector(helperStateSelector, (state) => state.workoutScreenVisited);

export const widgetTopSelector = () =>
  createSelector(helperStateSelector, (state) => state.widgetTop);

export const onVideoScreenSelector = () =>
  createSelector(helperStateSelector, (state) => state.onVideoScreenValue);
