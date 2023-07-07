import ApiService from './ApiService';

const ENDPOINTS = {
  VALIDATE: 'subscriptions/validate',
};

class SubscriptionService extends ApiService {
  validateSubscription = async (validateData) => {
    const { data } = await this.apiClient.post(ENDPOINTS.VALIDATE, validateData);
    return data;
  };
}

export const subscriptionService = new SubscriptionService();
