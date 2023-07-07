import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View, Platform, Alert} from 'react-native';
import {useDispatch} from "react-redux";
import {authLoadingSaga, setActiveUser} from "../store/auth/actions";
import Video from "react-native-video";
import {
  initConnection,
  getSubscriptions,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
  flushFailedPurchasesCachedAsPendingAndroid, clearTransactionIOS, endConnection
} from 'react-native-iap';
import {subscriptionService} from "../services/SubscriptionService";
import authService from "../services/AuthService";
import {setSubscriptions} from "../store/iap";
import {setGlobalLoader} from "../store/helpers/actions";
import ActivityIndicatorComponent from "../components/shared/ActivityIndicatorComponent";

const AuthLoadingScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const authLoading = () => dispatch(authLoadingSaga(navigation));

  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;

  const clearIAPListeners = async () => {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }

    await endConnection();
  };

  const consumableSubscriptions = Platform.select({
    ios: ['move.monthly.subscription', 'move.3_months.subscription', 'move.6_months.subscription', 'move.1_year.subscription'],
    android: ['move.monthly.subscription', 'move.3_months.subscription', 'move.6_months.subscription', 'move.1_year.subscription']
  });

  const iAPPurchase = () => {
    initConnection()
      .then(async () => {
        const subscriptions = await getSubscriptions({skus: consumableSubscriptions});
        dispatch(setSubscriptions(subscriptions));
        if (Platform.OS === 'ios') {
          clearTransactionIOS()
            .catch((error) => {
              console.log({error});
            })
            .then(async () => {
              await handlePurchase();
            });
        } else {
          flushFailedPurchasesCachedAsPendingAndroid()
            .catch((error) => {
              console.log({error});
            })
            .then(async () => {
              await handlePurchase();
            });
        }
      }).catch((error) => {
      console.log({error});
    });

    const handlePurchase = async () => {
      purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
        dispatch(setGlobalLoader(true));
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          let androidReceiptData;
          if (Platform.OS === 'android') {
            androidReceiptData = JSON.parse(receipt);
          }

          subscriptionService.validateSubscription({
            platform: Platform.OS === 'ios' ? 'apple' : 'android',
            ...(Platform.OS === 'ios' && {appleReceipt: receipt}),
            ...(Platform.OS === 'android' && {packageName: androidReceiptData?.packageName, productId: androidReceiptData?.productId, purchaseToken: androidReceiptData?.purchaseToken}),
          })
            .then(async (res) => {
              if (res) {
                await finishTransaction({purchase: purchase, isConsumable: false});
                authService.getAuthUser()
                  .then(async (res) => {
                    if (res.subscribed) {
                      await authService.updateUserInStorage(res);
                      dispatch(setActiveUser(res));
                      navigation.navigate('MainNavigator', {screen: 'Workouts'});
                    }
                  })
                  .catch((error) => {
                    console.log({error});
                  });
              }
            })
            .catch((error) => {
              console.log({error});
            })
            .finally(() => {
              dispatch(setGlobalLoader(false));
            });
        }
      });

      purchaseErrorSubscription = purchaseErrorListener(
        (error) => {
          if (error.responseCode !== '2') {
            Alert.alert('Error', error && error.message ? error.message : JSON.stringify(error));
          }
          console.log({error});
        },
      );
    }
  };

  useEffect(() => {
    authLoading();
    iAPPurchase();

    return () => {
      clearIAPListeners()
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'white'}
        translucent
      />
      <ActivityIndicatorComponent />
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },

  loading: {
    marginTop: 30,
  },
});
