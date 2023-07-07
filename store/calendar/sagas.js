import {call, put, select, takeLatest} from 'redux-saga/effects';

import {
  CREATE_NEW_EVENT_SAGA,
  GET_EVENTS_SAGA, MOVE_WORKOUT_SAGA,
} from './actionTypes';
import {calendarService} from "../../services/CalendarService";
import {isLogEventModalShown, setCalendarEvents, setIsCalendarModalOpen} from "./actions";
import {moveCalendarObjectSelector, scheduleWorkoutSelector} from "./selectors";
import moment from "moment";


function* getEventsSagaFn({payload}) {
  try {
    const res = yield call(calendarService.getEvents, payload)
    yield put(setCalendarEvents(res))
  } catch (error) {
    console.log({error});
  } finally {
  }
}


function* createNewEventFn({payload}) {
  try {
    yield call(calendarService.createEvent, payload)
    yield getEventsSagaFn({payload: payload.date})
    yield put(isLogEventModalShown(false))
  } catch (error) {
    console.log({error});
  } finally {
  }
}

function* moveWorkoutFn({payload}) {
  try {
    const scheduledWorkout = yield select(scheduleWorkoutSelector());
    const moveObject = yield select(moveCalendarObjectSelector());
    yield call(calendarService.moveWorkout, scheduledWorkout.id, moveObject)
    yield put(setIsCalendarModalOpen(false))
    yield getEventsSagaFn({payload: moment.utc(moveObject.date).format('YYYY-MM-DD')})
  } catch (error) {
    console.log({error});
  } finally {
  }
}


export function* watchGetEventsSagaFn() {
  yield takeLatest(GET_EVENTS_SAGA, getEventsSagaFn);
}

export function* watchMoveWorkoutFn() {
  yield takeLatest(MOVE_WORKOUT_SAGA, moveWorkoutFn);
}

export function* watchCreateNewEvent() {
  yield takeLatest(CREATE_NEW_EVENT_SAGA, createNewEventFn);
}

