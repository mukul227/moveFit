import jwtDecode from 'jwt-decode';
import asyncStorageService from '../services/AsyncStorageService';
import ApiService from './ApiService';
import {checkSubscriptionAndReturnUser} from "../helpers/subscriptionHelper";
import {Platform} from "react-native";

const ENDPOINTS = {
  LOGIN: 'auth/login',
  LOGIN_V2: 'auth/login-v2',
  VERIFY_TOKEN: 'auth/verify-login',
  AUTH_ME: 'auth/me',
  SIGN_UP: 'Authentication/register',
  LOGOUT: '/auth/logout',
  AUTH_REFRESH_TOKEN: '/auth/refresh-token',
  UPDATE_USER: 'auth/me',
  SET_FCM_TOKEN: 'users/add-device-token',
  DELETE_FCM_TOKEN: 'users/delete-device-token/',
  CHECK_SUBS: 'subscriptions/check-sub',
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = async () => {
    let token = await this.getAccessToken();
    const user = await this.getUser();

    if (token && user) {
      await this.setAuthorizationHeader();
      this.api.setUnauthorizedCallback(this.checkTokenStatus.bind(this));
      this.handleRefreshTokenFailedCallback = () => {};
    }
  };

  setAuthorizationHeader = async () => {
    const accessToken = await this.getAccessToken();
    if (accessToken) {
      this.api.attachHeaders({
        Authorization: `Bearer ${accessToken}`,
      });
    }
  };

  createSession = async (data) => {
    const res = this.parseJwt(data.token);
    await asyncStorageService.setItem('user', res);
    await asyncStorageService.setItem('token', data.token);
    await this.init();
  };

  destroySession = async () => {
    await asyncStorageService.removeItem('user');
    await asyncStorageService.removeItem('token');
    await asyncStorageService.removeItem('fcmToken');
    this.api.removeHeaders(['Authorization']);
  };

  parseJwt = token => {
    let decoded = jwtDecode(token);
    return decoded;
  };

  updateUser = async (user) => {
    const { data } = await this.apiClient.put(ENDPOINTS.UPDATE_USER, user);
    return data;
  };

  checkSubscription = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.CHECK_SUBS);
    return data;
  };

  login = async (phoneNumber) => {
    const res = await this.apiClient.post(ENDPOINTS.LOGIN_V2, phoneNumber);
    return res;
  };

  getAuthUser = async () => {
    let user = null;
    user = await checkSubscriptionAndReturnUser();

    if (user) {
      return user;
    } else {
      const {data} = await this.apiClient.get(ENDPOINTS.AUTH_ME);
      return data;
    }
  };

  getAuthUserFromServer = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.AUTH_ME);
    return data;
  };

  verifyLogin = async (data) => {
    const res = await this.apiClient.post(ENDPOINTS.VERIFY_TOKEN, data);
    await this.createSession(res.data);
    return res;
  }

  deleteFcmToken = async (token) => {
    const res = await this.apiClient.delete(ENDPOINTS.DELETE_FCM_TOKEN + token);
    return res;
  }

  logout = async () => {
    await this.destroySession();
    return { ok: true };
  };

  signUpAdditionalBusinessInfo = async (data) => {
    const res = await this.apiClient.post(ENDPOINTS.SIGN_UP_ADDITIONAL_BUSINESS_INFO, data);

    return res;
  };

  signUpBusinessInfo = async (data) => {
    const res = await this.apiClient.post(ENDPOINTS.SIGN_UP_BUSINESS_INFO, data);

    return res;
  };

  setFcmToken = async (token) => {
    const res = await this.apiClient.post(ENDPOINTS.SET_FCM_TOKEN, {deviceToken: token});

    return res;
  };

  getAccessToken = async () => {
    const token = await asyncStorageService.getItem('token');
    return token ? token : undefined;
  };

  getUserLocation = async () => {
    const location = await asyncStorageService.getItem('userLocation');
    return location ? location : undefined;
  };

  /* eslint-disable no-unused-vars */
  getUser = async () => {
    const user = await asyncStorageService.getItem('user');
    return user;
  };

  getTheme = async () => {
    const theme = await asyncStorageService.getItem('theme');
    return theme;
  };

  setTheme = async (theme) => {
    await asyncStorageService.setItem('theme', theme);
  };

  updateUserInStorage = async (property) => {
    const user = await asyncStorageService.getItem('user');
    const updatedUser = { ...user, ...property };
    await asyncStorageService.setItem('user', updatedUser);
  };

  setTokenInStorage = async (token) => {
    await asyncStorageService.setItem('token', token);
  };

  setFirstTimeStorage = async (val) => {
    await asyncStorageService.setItem('firstTime', val);
  };

  getFirstTime = async () => {
    const val = await asyncStorageService.getItem('firstTime');
    return val;
  };

  refreshJwtToken = async () => {
    try {
      const { data } = await this.apiClient.post(ENDPOINTS.AUTH_REFRESH_TOKEN);
      await this.setTokenInStorage(data.accessToken);
      await this.setAuthorizationHeader();
    } catch (error) {
      this.handleRefreshTokenFailedCallback();
    }
  };

  checkTokenStatus = async () => {
    let token = await this.getAccessToken();
    const decodedToken = jwtDecode(token);
    if (Date.now() / 1000 >= decodedToken.exp) {
      await this.refreshJwtToken();
    }
  };

  setHandleRefreshTokenFailedCallback = (callback) => {
    this.handleRefreshTokenFailedCallback = callback;
  };
}

const authService = new AuthService();

export default authService;
