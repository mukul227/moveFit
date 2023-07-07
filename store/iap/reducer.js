import produce from 'immer';
import {
  SET_SUBSCRIPTIONS,
} from './actionTypes';

const initialState = {
  subscriptions: [],
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case SET_SUBSCRIPTIONS:
        draft.subscriptions = payload;

        break;
    }
  });
}

export default reducer;
