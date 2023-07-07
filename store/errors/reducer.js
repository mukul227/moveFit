import produce from 'immer';
import {
  SET_CAT,
  SET_GLOBAL_ERROR,
  VERIFICATION_CODE_ERROR
} from './actionTypes';

const initialState = {
  globalError: false,
  cat: [],
  verificationCode: {
    isVisible: false,
    text: ''
  },
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case SET_GLOBAL_ERROR:
        draft.globalError = payload;
        break;
      case SET_CAT:
        draft.cat = payload;
        break;
      case VERIFICATION_CODE_ERROR:
        draft.verificationCode.isVisible = payload.isVisible;
        draft.verificationCode.text = payload.text;
        break;
    }
  });
}

export default reducer;
