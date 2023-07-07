import {call, put, select, takeLatest} from 'redux-saga/effects';
import navigationService from '../../services/NavigationService';
import {
  setTheme, showSubscriptionModal, showTutorialVisible,
} from './actions';
import {
  CHANGE_THEME, FINISH_TUTORIAL_SAGA, NAVIGATE_FROM_SUBSCRIPTION_MODAL,
  SET_THEME_SAGA,
} from './actionTypes';
import authService from "../../services/AuthService";
import {themeSelector} from "./selectors";
import {setActiveUser} from "../auth/actions";
import {stripeService} from "../../services/StripeService";

function* setThemeSagaFn({payload}) {
  try {
    yield put(setTheme(payload))
    yield call(authService.setTheme, payload);
    const data = {
      theme: payload
    };
    yield call(authService.updateUser, data);
    const isSubscribed = yield call(stripeService.checkSubscription);
    if (!isSubscribed) {
      navigationService.navigate('OnBoardingSubscriptionScreen');
    } else {
      navigationService.navigate('MainNavigator');
    }

  } catch (error) {
    console.log({error});
  } finally {
  }
}

function* changeThemeSagaFn({}) {
  try {
    let newTheme;
    const theme = yield select(themeSelector());

    if (theme === 'light') {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }

    yield put(setTheme(newTheme))
    yield call(authService.setTheme, newTheme);

  } catch (error) {
    console.log({error});
  } finally {
  }
}

function* navigateFromSubscriptionModalSagaFn() {
  try {
    yield put(showSubscriptionModal({isVisible: false, tab: ''}))
    navigationService.navigate('AuthNavigator', {screen: 'OnBoardingStackNavigator', params: {
        screen: 'OnBoardingSubscriptionScreen'
      }});
  } catch (error) {
    console.log({error});
  } finally {
  }
}

function* finishTutorialSagaFn() {
  try {
    yield put(showTutorialVisible(false));
    yield call(authService.updateUser, {tutorial: true})
    const newUser = yield call(authService.getAuthUser);
    yield put(setActiveUser(newUser))
  } catch (error) {
    console.log({error});
  } finally {
  }
}


export function* watchSetThemeSaga() {
  yield takeLatest(SET_THEME_SAGA, setThemeSagaFn);
}

export function* watchFinishTutorialSaga() {
  yield takeLatest(FINISH_TUTORIAL_SAGA, finishTutorialSagaFn);
}

export function* watchNavigateFromSubsModalSaga() {
  yield takeLatest(NAVIGATE_FROM_SUBSCRIPTION_MODAL, navigateFromSubscriptionModalSagaFn);
}

export function* watchChangeThemeSaga() {
  yield takeLatest(CHANGE_THEME, changeThemeSagaFn);
}


