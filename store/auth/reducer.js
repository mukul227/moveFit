import produce from 'immer';
import {
  SET_ACTIVE_USER, SET_PHONE_NUMBER,
  SET_UPDATED_USER, SET_VERIFICATION_CODE,
} from './actionTypes';

const initialState = {
  user: {},
  phoneNumber: '',
  verificationCode: '',
  signInError: false,
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case SET_ACTIVE_USER:
        draft.user = payload;
        break;
      case SET_UPDATED_USER:
        draft.user = { ...draft.user, ...payload };
        break;
      case SET_PHONE_NUMBER:
        draft.phoneNumber = payload;
        break;
      case SET_VERIFICATION_CODE:
        draft.verificationCode = payload;
        break;
    }
  });
}

export default reducer;
