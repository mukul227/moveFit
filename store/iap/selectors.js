import { createSelector } from 'reselect';

const iapSelector = (state) => state.iap;

export const subscriptionsSelector = () =>
  createSelector(iapSelector, (state) => state.subscriptions);
