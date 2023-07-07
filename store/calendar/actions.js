import {
  CREATE_NEW_EVENT_SAGA,
  GET_EVENTS_SAGA,
  IS_CALENDAR_MODAL_OPEN,
  MOVE_WORKOUT_SAGA,
  SET_CALENDAR_EVENTS,
  SET_MOVE_CALENDAR_OBJECT,
  SET_SCHEDULE_WORKOUT,
  SHOW_LOG_EVENT_MODAL
} from './actionTypes';

export function isLogEventModalShown(payload) {
  return {
    type: SHOW_LOG_EVENT_MODAL,
    payload
  };
}

export function getEventsSaga(payload) {
  return {
    type: GET_EVENTS_SAGA,
    payload
  };
}

export function setCalendarEvents(payload) {
  return {
    type: SET_CALENDAR_EVENTS,
    payload
  };
}

export function createNewEventSaga(payload) {
  return {
    type: CREATE_NEW_EVENT_SAGA,
    payload
  };
}

export function setMoveCalendarObject(payload) {
  return {
    type: SET_MOVE_CALENDAR_OBJECT,
    payload
  };
}

export function setIsCalendarModalOpen(payload) {
  return {
    type: IS_CALENDAR_MODAL_OPEN,
    payload
  };
}

export function setScheduleWorkout(payload) {
  return {
    type: SET_SCHEDULE_WORKOUT,
    payload
  };
}

export function moveWorkoutSaga() {
  return {
    type: MOVE_WORKOUT_SAGA,
  };
}





