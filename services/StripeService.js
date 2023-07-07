import ApiService from './ApiService';

const ENDPOINTS = {
  CHECKOUT: 'stripe/checkout',
  GET_ACTIVE_SUBSCRIPTION: 'stripe/active-subscription',
  CANCEL_SUBSCRIPTION: 'stripe/cancel-subscription',
  REACTIVATE_SUBSCRIPTION: 'stripe/reactivate-subscription',
  CHECK_IS_USER_EVER_SUBSCRIBED: 'subscriptions/ever-subscribed',
  CHECK_SUBS: 'subscriptions/check-sub',
};

class StripeService extends ApiService {
  checkout = async (type) => {
    const { data } = await this.apiClient.post(ENDPOINTS.CHECKOUT, type);
    return data;
  };
  getActiveSubscription = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_ACTIVE_SUBSCRIPTION);
    return data;
  }

  checkSubscription = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.CHECK_SUBS);
    return data;
  };

  checkIsEverSubscribed = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.CHECK_IS_USER_EVER_SUBSCRIBED);
    return data;
  }

  cancelSubscription = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.CANCEL_SUBSCRIPTION);
    return data;
  }

  reactivateSubscription = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.REACTIVATE_SUBSCRIPTION);
    return data;
  }
}

export const stripeService = new StripeService();
