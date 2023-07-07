import produce from 'immer';
import {
  SET_ARE_NOTIFICATIONS_LOADING,
  SET_NOTIFICATION,
  SET_NOTIFICATIONS,
  SET_NOTIFICATIONS_GRID, SET_PUSH_NOTIFICATION
} from './actionTypes';

const initialState = {
  allNotifications: [],
  notification: {},
  notificationsGrid: {
    data: null,
    limit: 20,
    page: 1,
    total: 0,
    isLoading: true
  },
  pushNotification: {
    isVisible: false,
    data: {},
    notification: {}
  },
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case SET_NOTIFICATIONS:
        draft.allNotifications = payload;
        break;

      case SET_NOTIFICATION:
        draft.notification = payload;
        break;

      case SET_NOTIFICATIONS_GRID:
        draft.notificationsGrid = {
          limit: payload.limit,
          page: payload.page,
          total: payload.totalDocs,
          data:
            payload.page === 1
              ? payload.docs
              : [...draft.notificationsGrid.data, ...payload.docs],
          isLoading: false,
        };
        break;

      case SET_ARE_NOTIFICATIONS_LOADING:
        draft.notificationsGrid.isLoading = payload;
        break;
      case SET_PUSH_NOTIFICATION:
        draft.pushNotification.isVisible = payload.isVisible;
        draft.pushNotification.data = payload.data;
        draft.pushNotification.notification = payload.notification;
        break;
    }
  });
}

export default reducer;
