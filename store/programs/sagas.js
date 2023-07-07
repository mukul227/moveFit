import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  GET_PROGRAM_SAGA,
  GET_DATA_FOR_HOME_PAGE_SAGA, GET_ALL_PROGRAMS_SAGA, START_PROGRAM_SAGA, GET_NOTIFICATION_INDICATOR_SAGA
} from './actionTypes';
import {
  setGlobalLoader,
  setIsAchievementModalShown,
  showActivityIndicator,
  showTutorialStartProgramVisible
} from '../helpers/actions';
import {setAllPrograms, setDataForHomePage, setProgram} from "./actions";
import {programsService} from "../../services/ProgramsService";
import NavigationService from "../../services/NavigationService";
import {setShareProgram} from "../workouts/actions";
import notificationService from "../../services/PushNotificationService";
import {notificationsService} from "../../services/NotificationsService";
import asyncStorageService from "../../services/AsyncStorageService";
import {setAchievement, setShowConfettiAchievement} from "../profile/actions";

function* getProgramSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const program = yield call(programsService.getProgram, payload);
    yield put(setProgram(program));
    yield put(setShareProgram(program));
    NavigationService.navigate('SingleProgramScreen');
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getDataForHomePageSagaFn() {
  try {
    yield put(setGlobalLoader(true));
    const data = yield call(programsService.getProgramsForHomePage);
    yield put(setDataForHomePage(data));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getNotificationIndicatorSagaFn() {
  try {
    const lastNotification = yield call(notificationsService.getLastNotification);
    if (lastNotification) {
      const notificationInStorage = yield call(asyncStorageService.getItem, 'lastNotification');
      if (notificationInStorage !== null) {
        if (Number(notificationInStorage) !== Number(lastNotification.id) ) {
          yield put(showActivityIndicator(true));
        } else {
          yield put(showActivityIndicator(false));
        }
      } else {
        yield put(showActivityIndicator(true));
      }
    }
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getAllProgramsSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    yield put(setAllPrograms(payload));
    NavigationService.navigate('SeeAllProgramsScreen');
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* startProgramSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true))
    let startedProgram = yield call(programsService.startProgram, payload);
    if (startedProgram.achievement) {
      yield put(showTutorialStartProgramVisible(true));
      yield put(setAchievement(startedProgram.achievement))
    }
    const program = yield call(programsService.getProgram, payload);
    yield put(setProgram(program));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

export function* watchGetProgramSaga() {
  yield takeLatest(GET_PROGRAM_SAGA, getProgramSagaFn);
}

export function* watchGetNotificationIndicatorSaga() {
  yield takeLatest(GET_NOTIFICATION_INDICATOR_SAGA, getNotificationIndicatorSagaFn);
}



export function* watchGetDataForHomePageSaga() {
  yield takeLatest(GET_DATA_FOR_HOME_PAGE_SAGA, getDataForHomePageSagaFn);
}

export function* watchGetAllProgramsSaga() {
  yield takeLatest(GET_ALL_PROGRAMS_SAGA, getAllProgramsSagaFn);
}

export function* watchStartProgramSaga() {
  yield takeLatest(START_PROGRAM_SAGA, startProgramSagaFn);
}
