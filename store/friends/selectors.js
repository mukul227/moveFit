import { createSelector } from 'reselect';

const friendsStateSelector = (state) => state.friends;

export const userDataSelector = () =>
  createSelector(friendsStateSelector, (state) => state.userData);

export const friendsSelector = () =>
  createSelector(friendsStateSelector, (state) => state.userFriends);

export const allUsersSelector = () =>
  createSelector(friendsStateSelector, (state) => state.allUsers);

export const contactsSelector = () =>
  createSelector(friendsStateSelector, (state) => state.contacts);

export const fromNotificationSelector = () =>
  createSelector(friendsStateSelector, (state) => state.fromNotification);
