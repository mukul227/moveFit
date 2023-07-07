import produce from 'immer';
import {
  CHECKOUT, SET_ACTIVE_SUBSCRIPTION, SET_CHECKOUT,
} from './actionTypes';

const initialState = {
  stripe: null,
  activeSubscription: null
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case SET_CHECKOUT:
        draft.stripe = payload;
        break;
      case SET_ACTIVE_SUBSCRIPTION:
        draft.activeSubscription = payload;
        break;
    }
  });
}

export default reducer;
