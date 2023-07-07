import produce from 'immer';
import {
  SET_ALL_USERS,
  SET_ARE_FRIENDS_LOADING,
  SET_ARE_USERS_LOADING, SET_CONTACTS,
  SET_FRIENDS,
  SET_FRIENDS_STATUS, SET_FROM_NOTIFICATION,
  SET_IS_FRIEND,
  SET_SINGLE_USER
} from "./actionTypes";

const initialState = {
  userData: {},
  fromNotification: false,
  userFriends: {
    data: [],
    limit: 10,
    page: 1,
    total: 0,
    isLoading: true
  },
  allUsers: {
    data: [],
    limit: 10,
    page: 1,
    total: 0,
    isLoading: true
  },
  contacts: []
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case SET_SINGLE_USER:
        draft.userData = payload;
        break;
      case SET_FROM_NOTIFICATION:
        draft.fromNotification = payload;
        break;

      case SET_FRIENDS:
        draft.userFriends = {
          limit: payload.limit,
          page: payload.page,
          total: payload.totalDocs,
          data:
            payload.page === 1
            ? payload.docs
            : [...draft.userFriends.data, ...payload.docs],
          isLoading: false,
        };
        break;

      case SET_ARE_FRIENDS_LOADING:
        draft.userFriends.isLoading = payload;
        break;

      case SET_IS_FRIEND:
        if (payload && payload.userFriend && payload.userFriend.status) {
          draft.userData.user.isFriend = true;
          draft.userData.user.numberOfFollowers = draft.userData.user.numberOfFollowers + 1;
        } else if (payload && payload.userFriend && !payload.userFriend.status) {
          draft.userData.user.isFriend = true;
        } else {
          draft.userData.user.isFriend = false;
          draft.userData.user.numberOfFollowers = draft.userData.user.numberOfFollowers - 1;
        }
        // draft.userData.user.isFriend = payload;
        // draft.userData.user.numberOfFollowers = payload === true ? draft.userData.user.numberOfFollowers + 1 : draft.userData.user.numberOfFollowers - 1;
        break;

      case SET_CONTACTS:
        draft.contacts = payload;
        break;

      case SET_ALL_USERS:
        draft.allUsers = {
          limit: payload.limit,
          page: payload.page,
          total: payload.totalDocs,
          data:
            payload.page === 1
              ? payload.docs
              : [...draft.allUsers.data, ...payload.docs],
          isLoading: false,
        };
        break;

      case SET_ARE_USERS_LOADING:
        draft.allUsers.isLoading = payload;
        break;

      case SET_FRIENDS_STATUS:
        draft.userData.user.friendStatus = payload;
        break;
    }
  });
}

export default reducer;
