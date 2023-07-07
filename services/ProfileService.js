import ApiService from './ApiService';

const ENDPOINTS = {
  PROFILE: 'auth/me',
  GET_USER_POSTS: 'posts/mobile-grid/:page/:limit',
  CREATE_POST: 'posts',
  DELETE_POST: 'posts/:id',
  REPORT_POST: 'post-reports',
  GET_GOALS: 'goals',
  GET_PREFERENCES: 'preferences',
  GET_USER_ACHIEVEMENTS: 'achievements/:id',
  GET_ALL_ACHIEVEMENTS: 'achievements',
  GET_FOLLOWERS: 'users/followers-grid/:page/:limit/:userId',
  GET_FOLLOWING: 'users/following-grid/:page/:limit/:userId',
};

class ProfileService extends ApiService {
  getProfile = async () => {
    const {data} = await this.apiClient.get(ENDPOINTS.PROFILE);
    return data
  }

  getUserPosts = async (page, limit, userId) => {
    const { data } = await this.apiClient.post(ENDPOINTS.GET_USER_POSTS.replace(':page', page).replace(':limit', limit), {userId: userId});
    return data;
  }

  deleteUserPosts = async (id) => {
    const { data } = await this.apiClient.delete(ENDPOINTS.DELETE_POST.replace(':id', id));
    return data;
  }

  reportUserPosts = async (postId) => {
    const { data } = await this.apiClient.post(ENDPOINTS.REPORT_POST, postId);
    return data;
  }

  getGoals = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_GOALS);
    return data;
  }

  getAllAchievements = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_ALL_ACHIEVEMENTS);
    return data;
  }

  getUserAchievements = async (id) => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_USER_ACHIEVEMENTS.replace(':id', id));
    return data;
  }

  getPreferences = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_PREFERENCES);
    return data;
  }

  createPost = async (res) => {
    const {data} = await this.apiClient.post(ENDPOINTS.CREATE_POST, res);
    return data;
  };

  getFollowers = async (page, limit, userId) => {
    const { data } = await this.apiClient.post(ENDPOINTS.GET_FOLLOWERS.replace(':page', page).replace(':limit', limit).replace(':userId', userId));
    return data;
  }

  getFollowing = async (page, limit, userId) => {
    const { data } = await this.apiClient.post(ENDPOINTS.GET_FOLLOWING.replace(':page', page).replace(':limit', limit).replace(':userId', userId));
    return data;
  }

}

export const profileService = new ProfileService();
