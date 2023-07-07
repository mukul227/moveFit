import ApiService from './ApiService';

const ENDPOINTS = {
  GET_NOTIFICATIONS: 'notifications',
  SEND_MESSAGE_TO_FRIEND: 'notifications',
  GET_NOTIFICATIONS_GRID: 'notifications/grid/:page/:limit',
  GET_LAST_NOTIFICATION: 'notifications/last',
};

class NotificationsService extends ApiService {
  getNotifications = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_NOTIFICATIONS);
    return data;
  };

  sendMessageToFriend = async (message) => {
    const { data } = await this.apiClient.post(ENDPOINTS.SEND_MESSAGE_TO_FRIEND, message);
    return data;
  }

  getNotificationsGrid = async (page, limit) => {
    const { data } = await this.apiClient.post(ENDPOINTS.GET_NOTIFICATIONS_GRID.replace(':page', page).replace(':limit', limit));
    return data;
  }

  getLastNotification = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_LAST_NOTIFICATION);
    return data;
  }
}

export const notificationsService = new NotificationsService();
