import {call, put, select, takeLatest} from 'redux-saga/effects';
import {CREATE_HABIT_SAGA, DELETE_HABIT_SAGA, GET_HABITS_SAGA, SET_COMPLETED_SAGA} from "./actionTypes";
import {journeyService} from "../../services/JourneyService";
import {setHabits, showHabitModal} from "./actions";
import {setGlobalLoader, setIsAchievementModalShown} from "../helpers/actions";
import {setAchievement, setShowConfettiAchievement} from "../profile/actions";

function* getHabitsSagaFn() {
  try {
    yield put(setGlobalLoader(true));
    const res = yield call(journeyService.getHabits);
    yield put(setHabits(res))
  } catch (error) {
    yield put(setGlobalLoader(false));
    console.log({error});
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* createHabitSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const res = yield call(journeyService.createHabit, payload);
    yield getHabitsSagaFn();
    yield put(showHabitModal(false))
    if(res.achievement){
      yield put(setAchievement(res?.achievement))
      yield put(setIsAchievementModalShown(true))
      yield put(setShowConfettiAchievement(true))
    }
  } catch (error) {
    yield put(setGlobalLoader(false));
    console.log(error);
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* setCompletedSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const res = yield call(journeyService.completeHabit, payload.habit.id, payload.obj)
    yield getHabitsSagaFn();
    if(res?.id){
      yield put(setAchievement(res))
      yield put(setIsAchievementModalShown(true))
      yield put(setShowConfettiAchievement(true))
    }
  } catch (error) {
    yield put(setGlobalLoader(false));
    console.log(error);
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* deleteHabitSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    yield call(journeyService.deleteHabit, payload)
    yield getHabitsSagaFn();
  } catch (error) {
    yield put(setGlobalLoader(false));
    console.log({error});
  } finally {
    yield put(setGlobalLoader(false));
  }
}

export function* watchSetCompletedSagaFn() {
  yield takeLatest(SET_COMPLETED_SAGA, setCompletedSagaFn);
}

export function* watchDeleteHabitSagaFn() {
  yield takeLatest(DELETE_HABIT_SAGA, deleteHabitSagaFn);
}

export function* watchGetHabitsSagaFn() {
  yield takeLatest(GET_HABITS_SAGA, getHabitsSagaFn);
}

export function* watchCreateHabitSagaFn() {
  yield takeLatest(CREATE_HABIT_SAGA, createHabitSagaFn);
}


