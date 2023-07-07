import {getAvailablePurchases} from "react-native-iap";
import {subscriptionService} from "../services/SubscriptionService";
import authService from "../services/AuthService";
import {Platform} from 'react-native';

export const checkSubscriptionAndReturnUser = async () => {
  const availablePurchases = await getAvailablePurchases();
  if (availablePurchases?.length <= 0) return;

  availablePurchases.sort((a, b) => parseInt(a.transactionDate) - parseInt(b.transactionDate));
  const latestPurchase = availablePurchases[availablePurchases?.length - 1];

  try {
    await subscriptionService.validateSubscription({
      platform: Platform.OS === 'ios' ? 'apple' : 'android',
      ...(Platform.OS === 'ios' && {appleReceipt: latestPurchase.transactionReceipt}),
      ...(Platform.OS === 'android' && {packageName: latestPurchase?.packageNameAndroid, productId: latestPurchase?.productId, purchaseToken: latestPurchase?.purchaseToken}),
    });

    const authUser = await authService.getAuthUserFromServer();

    await authService.updateUserInStorage(authUser);

    return authUser;
  } catch {
    console.error({error});
  }

  return null;
};

