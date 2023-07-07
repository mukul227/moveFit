import {
  GET_ACTIVE_USER,
  PHONE_NUMBER_SAGA,
  LOGOUT,
  SET_ACTIVE_USER,
  SET_UPDATED_USER,
  SIGN_UP,
  UPDATE_USER,
  SET_PHONE_NUMBER,
  VERIFICATION_CODE_SAGA,
  SET_VERIFICATION_CODE,
  AUTH_LOADING_SAGA, GET_AUTH_USER_SAGA
} from './actionTypes';

export function authLoadingSaga({payload}) {
  return {
    type: AUTH_LOADING_SAGA,
    payload
  };
}

export function phoneNumberSaga(data) {
  return {
    type: PHONE_NUMBER_SAGA,
    payload: data,
  };
}

export function setPhoneNumber(phoneNumber) {
  return {
    type: SET_PHONE_NUMBER,
    payload: phoneNumber,
  };
}

export function verificationCodeSaga(code) {
  return {
    type: VERIFICATION_CODE_SAGA,
    payload: code,
  };
}

export function setVerificationCode(code) {
  return {
    type: SET_VERIFICATION_CODE,
    payload: code,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function signUp(userData) {
  return {
    type: SIGN_UP,
    payload: userData,
  };
}

export function setActiveUser(activeUser) {
  return {
    type: SET_ACTIVE_USER,
    payload: activeUser,
  };
}

export function getActiveUser() {
  return {
    type: GET_ACTIVE_USER,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user,
  };
}

export function setUpdatedUser(user) {
  return {
    type: SET_UPDATED_USER,
    payload: user,
  };
}

export function getAuthUserSaga() {
  return {
    type: GET_AUTH_USER_SAGA
  };
}
