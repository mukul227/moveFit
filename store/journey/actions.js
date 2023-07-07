import {
  CREATE_HABIT_SAGA,
  DELETE_HABIT_SAGA,
  GET_HABITS_SAGA,
  IS_HABIT_MODAL_OPEN,
  SET_COMPLETED_SAGA,
  SET_HABITS
} from "./actionTypes";

export function showHabitModal(payload) {
  return {
    type: IS_HABIT_MODAL_OPEN,
    payload
  };
}

export function setHabits(payload) {
  return {
    type: SET_HABITS,
    payload
  };
}

export function createHabitSaga(payload) {
  return {
    type: CREATE_HABIT_SAGA,
    payload
  };
}

export function setCompletedSaga(payload) {
  return {
    type: SET_COMPLETED_SAGA,
    payload
  };
}

export function deleteHabitSaga(payload) {
  return {
    type: DELETE_HABIT_SAGA,
    payload
  };
}

export function getHabitsSaga() {
  return {
    type: GET_HABITS_SAGA,
  };
}






