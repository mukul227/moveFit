import {call, put, delay, takeLatest} from 'redux-saga/effects';
import {
  ADJUST_WORKOUT_SAGA,
  COMPLETE_WORKOUT_SAGA,
  GET_WORKOUT_SAGA, LEAVE_FEEDBACK_SAGA,
  PLAY_WORKOUT_SAGA
} from './actionTypes';
import {setGlobalLoader, setIsAchievementModalShown} from '../helpers/actions';
import {workoutService} from "../../services/WorkoutService";
import {fromCalendar, setShareProgram, setShareWorkout, setWeekId, setWorkout} from "./actions";
import NavigationService from "../../services/NavigationService";
import {setAchievement, setShowConfettiAchievement} from "../profile/actions";
import authService from "../../services/AuthService";
import {setActiveUser} from "../auth/actions";
import {setSingleUser} from "../friends";
import {programsService} from "../../services/ProgramsService";
import {setDataForHomePage, setProgram} from "../programs";
import navigationService from "../../services/NavigationService";

function* getWorkoutSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    let workout;
    if (payload.workoutId) {
      yield put(setWeekId(payload.weekId));
      workout = yield call(workoutService.getWorkout, payload.workoutId);
    } else {
      yield put(setProgram(payload.todaysWorkoutProgram));
      yield put(setWeekId(payload.todaysProgramWeekId));
      workout = yield call(workoutService.getWorkout, payload.todaysWorkoutId);
    }
    yield put(setWorkout(workout));
    yield put(setShareWorkout(workout));
    if (payload.fromCalendar) {
      const program = yield call(programsService.getProgram, payload.programId);
      yield put(setProgram(program));
      yield put(setShareProgram(program));
      yield put(fromCalendar(true))
    }
      NavigationService.navigate('MainNavigator', {screen: 'Workouts', params: {
          screen: 'SingleWorkoutScreen'
        }});
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* playWorkoutSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const workout = yield call(workoutService.getWorkout, payload);
    yield put(setWorkout(workout));
    NavigationService.navigate('PlayWorkoutScreen');
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}
function* leaveFeedbackSagaFn({payload}) {
  try {
    if (!payload.rate && !payload.difficulty) {
      console.log('no feedback, ignore');
      return;
    }
    yield put(setGlobalLoader(true));

    const feedback = yield call(workoutService.sendFeedback, payload);
  } catch (error) {
    console.error({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* completeWorkoutSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const res = yield call(workoutService.completeWorkout, payload.workoutId, payload.weekId)
    if(res.achievement){
      yield put(setAchievement(res?.achievement))
    }
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}


function* adjustWorkoutSagaFn({payload}) {
  try {
    yield put(setGlobalLoader(true));
    const user = yield call(authService.updateUser, payload);
    yield call(authService.updateUserInStorage, user);
    yield put(setActiveUser(user));
    const userData = {
      user,
      isAuthUser: true
    };
    yield put(setSingleUser(userData));
    const data = yield call(programsService.getProgramsForHomePage);
    yield put(setDataForHomePage(data));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}


export function* watchAdjustWorkoutSaga() {
  yield takeLatest(ADJUST_WORKOUT_SAGA, adjustWorkoutSagaFn);
}

export function* watchGetWorkoutSaga() {
  yield takeLatest(GET_WORKOUT_SAGA, getWorkoutSagaFn);
}

export function* watchCompleteWorkoutSagaFn() {
  yield takeLatest(COMPLETE_WORKOUT_SAGA, completeWorkoutSagaFn);
}

export function* watchPlayWorkoutSaga() {
  yield takeLatest(PLAY_WORKOUT_SAGA, playWorkoutSagaFn);
}

export function* watchSendFeedbackSaga() {
  yield takeLatest(LEAVE_FEEDBACK_SAGA, leaveFeedbackSagaFn);
}
