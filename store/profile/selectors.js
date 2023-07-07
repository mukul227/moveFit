import { createSelector } from 'reselect';

const profileStateSelector = (state) => state.profile;

export const postImageSelector = () =>
    createSelector(profileStateSelector, (state) => state.image);

export const postsSelector = () =>
    createSelector(profileStateSelector, (state) => state.posts);

export const userArrSelector = () =>
  createSelector(profileStateSelector, (state) => state.userArray);

export const userAchievementsSelector = () =>
    createSelector(profileStateSelector, (state) => state.userAchievements);

export const achievementSelector = () =>
    createSelector(profileStateSelector, (state) => state.achievement);

export const achievementConfettiSelector = () =>
    createSelector(profileStateSelector, (state) => state.achievementConfetti);

export const followListTypeSelector = () =>
    createSelector(profileStateSelector, (state) => state.followListType);

export const authUserFollowListTypeSelector = () =>
    createSelector(profileStateSelector, (state) => state.authUserFollowListType);

export const followUsersSelector = () =>
    createSelector(profileStateSelector, (state) => state.followUsers);
