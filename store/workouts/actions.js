import {
  ADJUST_WORKOUT_SAGA,
  COMPLETE_WORKOUT_SAGA, FROM_CALENDAR,
  GET_WORKOUT_SAGA, LEAVE_FEEDBACK_SAGA,
  PLAY_WORKOUT_SAGA, SET_SHARE_PROGRAM, SET_SHARE_WORKOUT, SET_WEEK_ID,
  SET_WORKOUT
} from './actionTypes';
import {UPDATE_USER_WITHOUT_NAVIGATION_SAGA} from "../auth/actionTypes";

export function getWorkoutSaga(payload) {
  return {
    type: GET_WORKOUT_SAGA,
    payload
  };
}

export function setWorkout(payload) {
  return {
    type: SET_WORKOUT,
    payload
  };
}

export function setWeekId(payload) {
  return {
    type: SET_WEEK_ID,
    payload
  };
}

export function fromCalendar(payload) {
  return {
    type: FROM_CALENDAR,
    payload
  };
}

export function playWorkoutSaga(payload) {
  return {
    type: PLAY_WORKOUT_SAGA,
    payload
  };
}

export function leaveFeedbackSaga(payload) {
  return {
    type: LEAVE_FEEDBACK_SAGA,
    payload
  };
}

export function completeWorkoutSaga(payload) {
  return {
    type: COMPLETE_WORKOUT_SAGA,
    payload
  };
}


export function adjustWorkoutSaga(payload) {
  return {
    type: ADJUST_WORKOUT_SAGA,
    payload
  };
}

export function setShareWorkout(payload) {
  return {
    type: SET_SHARE_WORKOUT,
    payload
  };
}

export function setShareProgram(payload) {
  return {
    type: SET_SHARE_PROGRAM,
    payload
  };
}
