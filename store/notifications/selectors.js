import { createSelector } from 'reselect';

const notificationStateSelector = (state) => state.notifications;

export const allNotificationsSelector = () =>
  createSelector(notificationStateSelector, (state) => state.allNotifications);

export const notificationsGridSelector = () =>
  createSelector(notificationStateSelector, (state) => state.notificationsGrid);

export const pushNotificationSelector = () =>
  createSelector(notificationStateSelector, (state) => state.pushNotification);
