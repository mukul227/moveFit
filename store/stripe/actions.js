import {
  CANCEL_SUBSCRIPTION,
  CHECKOUT_SAGA, GET_ACTIVE_SUBSCRIPTION_SAGA, REACTIVATE_SUBSCRIPTION, SET_ACTIVE_SUBSCRIPTION, SET_CHECKOUT,
} from './actionTypes';

export function checkoutSaga(payload) {
  return {
    type: CHECKOUT_SAGA,
    payload
  };
}

export function setCheckout(payload) {
  return {
    type: SET_CHECKOUT,
    payload
  };
}

export function getActiveSubscriptionSaga() {
  return {
    type: GET_ACTIVE_SUBSCRIPTION_SAGA,
  };
}

export function setActiveSubscription(payload) {
  return {
    type: SET_ACTIVE_SUBSCRIPTION,
    payload
  };
}

export function cancelSubscriptionSaga() {
  return {
    type: CANCEL_SUBSCRIPTION,
  };
}

export function reactivateSubscriptionSaga() {
  return {
    type: REACTIVATE_SUBSCRIPTION,
  };
}
