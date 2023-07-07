import {
  REQUEST_SUBSCRIPTION_SAGA,
  SET_SUBSCRIPTIONS
} from './actionTypes';

export function setSubscriptions(payload) {
  return {
    type: SET_SUBSCRIPTIONS,
    payload
  };
}

export function requestSubscriptionSaga(subscription) {
  return {
    type: REQUEST_SUBSCRIPTION_SAGA,
    subscription
  };
}
