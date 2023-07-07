import { createSelector } from 'reselect';

const userStateSelector = (state) => state.activeUser;

export const activeUserSelector = () =>
  createSelector(userStateSelector, (state) => state.user);

export const phoneNumberSelector = () =>
  createSelector(userStateSelector, (state) => state.phoneNumber);

export const userLocationSelector = () =>
  createSelector(userStateSelector, (state) => state.userLocation);

export const userEmailSelector = () =>
  createSelector(userStateSelector, (state) => state.userEmail);

export const isAuthenticatedSelector = () =>
  createSelector(userStateSelector, (state) => !!state.user.id);



