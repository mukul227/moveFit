import {call, put, select, takeLatest} from 'redux-saga/effects';

import {
  REQUEST_SUBSCRIPTION_SAGA
} from './actionTypes';
import {requestSubscription} from "react-native-iap";
import {setGlobalLoader} from "../helpers/actions";
import {Alert} from "react-native";
import navigationService from "../../services/NavigationService";
import {stripeService} from "../../services/StripeService";

function* requestSubscriptionSagaFn({subscription}) {
  try {
    yield put(setGlobalLoader(true));
    const isSubscribed = yield call(stripeService.checkSubscription);
    if (!isSubscribed) {
      yield requestSubscription({
        sku: subscription?.productId,
        ...(subscription?.subscriptionOfferDetails && {subscriptionOffers: [{sku: subscription?.productId, offerToken: subscription?.subscriptionOfferDetails[0]?.offerToken}]})
      });
    } else {
      Alert.alert(
        "Subscription",
        "You are already subscribed!",
        [
          { text: "OK", onPress: () => navigationService.navigate('MainNavigator', {screen: 'Workouts', params: {
                screen: 'HomeScreen'
              }}) }


        ]
      );
    }
  } catch (error) {
    console.log({error});
  } finally {
    yield put(setGlobalLoader(false));
  }
}


export function* watchRequestSubscriptionSaga() {
  yield takeLatest(REQUEST_SUBSCRIPTION_SAGA, requestSubscriptionSagaFn);
}
