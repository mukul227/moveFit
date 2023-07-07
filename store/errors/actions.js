import {
  GET_CATEGORIES_SAGA, SET_CAT, SET_GLOBAL_ERROR, VERIFICATION_CODE_ERROR,
} from './actionTypes';

export function setGlobalError(payload) {
  return {
    type: SET_GLOBAL_ERROR,
    payload
  };
}

export function verificationCodeError(payload) {
  return {
    type: VERIFICATION_CODE_ERROR,
    payload
  };
}






