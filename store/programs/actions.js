import {
  GET_PROGRAM_SAGA,
  SET_PROGRAM,
  GET_DATA_FOR_HOME_PAGE_SAGA,
  SET_DATA_FOR_HOME_PAGE,
  GET_ALL_PROGRAMS_SAGA,
  SET_ALL_PROGRAMS, START_PROGRAM_SAGA, GET_NOTIFICATION_INDICATOR_SAGA
} from './actionTypes';

export function getProgramSaga(payload) {
  return {
    type: GET_PROGRAM_SAGA,
    payload
  };
}

export function setProgram(payload) {
  return {
    type: SET_PROGRAM,
    payload
  };
}

export function getDataForHomePageSaga() {
  return {
    type: GET_DATA_FOR_HOME_PAGE_SAGA
  };
}

export function getNotificationIndicatorSaga() {
  return {
    type: GET_NOTIFICATION_INDICATOR_SAGA
  };
}

export function setDataForHomePage(payload) {
  return {
    type: SET_DATA_FOR_HOME_PAGE,
    payload
  };
}

export function getAllProgramsSaga(payload) {
  return {
    type: GET_ALL_PROGRAMS_SAGA,
    payload
  };
}

export function setAllPrograms(payload) {
  return {
    type: SET_ALL_PROGRAMS,
    payload
  };
}

export function startProgramSaga(payload) {
  return {
    type: START_PROGRAM_SAGA,
    payload
  };
}
