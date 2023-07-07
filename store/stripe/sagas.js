import {call, put, takeLatest} from 'redux-saga/effects';
import {
  CANCEL_SUBSCRIPTION,
  CHECKOUT_SAGA, GET_ACTIVE_SUBSCRIPTION_SAGA, REACTIVATE_SUBSCRIPTION,
} from './actionTypes';
import {setGlobalLoader} from '../helpers/actions';
import {setActiveSubscription, setCheckout} from "./actions";
import {stripeService} from "../../services/StripeService";
import {activeUserSelector} from "../auth";

function* checkoutSaga({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const data = yield call(stripeService.checkout, payload);
    yield put(setCheckout(data));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getActiveSubscriptionSagaFn({}) {
  try {
    yield put(setGlobalLoader(true));
    const data = yield call(stripeService.getActiveSubscription);
    yield put(setActiveSubscription(data));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* cancelSubscriptionSagaFn({}) {
  try {
    yield put(setGlobalLoader(true));
    yield call(stripeService.cancelSubscription);
    const data = yield call(stripeService.getActiveSubscription);
    yield put(setActiveSubscription(data));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* reactivateSubscriptionSagaFn({}) {
  try {
    yield put(setGlobalLoader(true));
    yield call(stripeService.reactivateSubscription);
    const data = yield call(stripeService.getActiveSubscription);
    yield put(setActiveSubscription(data));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

export function* watchCheckoutSagaFn() {
  yield takeLatest(CHECKOUT_SAGA, checkoutSaga);
}

export function* watchGetActiveSubscriptionSagaFn() {
  yield takeLatest(GET_ACTIVE_SUBSCRIPTION_SAGA, getActiveSubscriptionSagaFn);
}

export function* watchCancelSubscriptionSagaFn() {
  yield takeLatest(CANCEL_SUBSCRIPTION, cancelSubscriptionSagaFn);
}

export function* watchReactivateSubscriptionSagaFn() {
  yield takeLatest(REACTIVATE_SUBSCRIPTION, reactivateSubscriptionSagaFn);
}
