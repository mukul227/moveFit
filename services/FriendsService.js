import ApiService from './ApiService';

const ENDPOINTS = {
  GET_SINGLE_USER: 'users/profile/:userId',
  FOLLOW_USER: 'users/add-friend/:userId',
  GET_FRIENDS: 'users/friends-grid/:page/:limit',
  GET_ALL_USERS: 'users/grid/:page/:limit',
  ACCEPT_FRIEND_REQUEST: 'users/accept-friend-request/:userId',
  DECLINE_FRIEND_REQUEST: 'users/decline-friend-request/:userId',
  GET_CONTACTS_FILTERED: 'users/sync-friends'
};

class FriendsService extends ApiService {
  getSingleUser = async (userId) => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_SINGLE_USER.replace(':userId', userId));
    return data;
  };

  getFilteredContacts = async (phoneNumbers) => {
    const { data } = await this.apiClient.post(ENDPOINTS.GET_CONTACTS_FILTERED, phoneNumbers);
    return data;
  };

  getAllUsers = async (page, limit, username) => {
    const filter = {
      filter: {
        username: username
      }
    };
    const { data } = await this.apiClient.post(ENDPOINTS.GET_ALL_USERS.replace(':page', page).replace(':limit', limit), filter);
    return data;
  }

  followUser = async (userId) => {
    const { data } = await this.apiClient.post(ENDPOINTS.FOLLOW_USER.replace(':userId', userId));
    return data;
  }

  getFriends = async (page, limit, term) => {
    const filter = {
      filter: {
        name: term
      }
    }
    const { data } = await this.apiClient.post(ENDPOINTS.GET_FRIENDS.replace(':page', page).replace(':limit', limit), filter);
    return data;
  }

  acceptFriendRequest = async (userId) => {
    const { data } = await this.apiClient.post(ENDPOINTS.ACCEPT_FRIEND_REQUEST.replace(':userId', userId));
    return data;
  }

  declineFriendRequest = async (userId) => {
    const { data } = await this.apiClient.delete(ENDPOINTS.DECLINE_FRIEND_REQUEST.replace(':userId', userId));
    return data;
  }
}

export const friendsService = new FriendsService();
