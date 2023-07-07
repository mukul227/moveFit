import { createSelector } from 'reselect';

const stripeStateSelector = (state) => state.stripe;

export const stripeSelector = () =>
  createSelector(stripeStateSelector, (state) => state.stripe);

export const activeSubscriptionSelector = () =>
  createSelector(stripeStateSelector, (state) => state.activeSubscription);
