import messaging from '@react-native-firebase/messaging';
import asyncStorageService from "./AsyncStorageService";

class NotificationService {

  async requestUserPermission()  {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      return await this.getFcmToken();
    } else {
      return false;
    }
  }

  async getFcmToken() {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await asyncStorageService.setItem('fcmToken', fcmToken);
      return fcmToken;
    } else {
      return 'error';
    }
  }
}

const notificationService = new NotificationService();

export default notificationService;
