import {call, put, select, takeLatest} from 'redux-saga/effects';
import authService from '../../services/AuthService';
import {
  setActiveUser, setPhoneNumber, setVerificationCode
} from './actions';
import {
  AUTH_LOADING_SAGA, GET_AUTH_USER_SAGA, LOGOUT, PHONE_NUMBER_SAGA, UPDATE_USER,
  VERIFICATION_CODE_SAGA,
} from './actionTypes';
import navigationService from '../../services/NavigationService';
import {setGlobalError} from '../errors';
import {setGlobalLoader, setTheme} from '../helpers/actions';
import {profileService} from '../../services/ProfileService';
import {phoneNumberSelector} from './selectors';
import {verificationCodeError} from "../errors/actions";
import {setSingleUser} from "../friends";
import {journeyService} from "../../services/JourneyService";
import {colorOptions} from "../../dummyData/journey-data/color-options";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorageService from "../../services/AsyncStorageService";
import * as RNLocalize from "react-native-localize";
import {getUserAchievementsSaga, setUserAchievements} from "../profile/actions";
import {helperService} from "../../services/HelperService";


function* authLoadingSagaFn() {
  try {
    const user = yield call(authService.getUser);
    const colorJourney = yield call(journeyService.getColorOptions);
    const theme = yield call(authService.getTheme);

    if (theme === null) {
      yield put(setTheme('light'));
    } else {
      yield put(setTheme(theme));
    }

    if(colorJourney === null){
      yield call(journeyService.setColorOptions,colorOptions)
    }

    if (user?.id) {
      const timeZone = RNLocalize.getTimeZone();
      yield call(authService.getAccessToken)
      yield call(authService.updateUser, {time_zone: timeZone})
      const newUser = yield call(authService.getAuthUser)
      yield put(setActiveUser(newUser))

      const userData = {
        user,
        isAuthUser: true
      };
      yield put(setSingleUser(userData));
      if (newUser.username) {
        if (newUser.first_name) {
          if (newUser.userGoals.length) {
            if (newUser.myPreference) {
              if (newUser.myPreference.preference_id) {
                if (newUser.myPreference.fitness_level) {
                  if (newUser.theme !== null) {
                    const newUser = yield call(authService.getAuthUser)
                    yield put(setActiveUser(newUser));
                    if (newUser.subscribed) {
                      navigationService.navigate('MainNavigator')
                    } else {
                      navigationService.navigate('AuthNavigator', {screen: 'OnBoardingStackNavigator', params: {
                          screen: 'OnBoardingSubscriptionScreen'
                        }});
                    }
                  } else {
                    navigationService.navigate('AuthNavigator', {screen: 'OnBoardingStackNavigator', params: {
                      screen: 'OnBoardingThemeScreen'
                      }});
                  }
                }
                else {
                  navigationService.navigate('AuthNavigator', {screen: 'OnBoardingStackNavigator', params: {
                      screen: 'OnBoardingFitnessLevelScreen'
                    }});
                }
              } else {
                navigationService.navigate('AuthNavigator', {screen: 'OnBoardingStackNavigator', params: {
                    screen: 'OnBoardingWorkoutTypeScreen'
                  }});
              }
            } else {
              navigationService.navigate('AuthNavigator', {screen: 'OnBoardingStackNavigator', params: {
                  screen: 'OnBoardingPreferWorkoutScreen'
                }});
            }
          } else {
            navigationService.navigate('AuthNavigator', {screen: 'OnBoardingStackNavigator', params: {
                screen: 'OnBoardingSelectGoalScreen'
              }});
          }
        } else {
          navigationService.navigate('AuthNavigator', {screen: 'OnBoardingStackNavigator', params: {
            screen: 'OnBoardingCreateAccountScreen'
            }});
        }
      } else {
        navigationService.navigate('AuthNavigator', {screen: 'OnBoardingStackNavigator'});
      }
    } else {
      const intro = yield asyncStorageService.getItem('introShown');
      if (intro) {
        navigationService.navigate('AuthNavigator', {screen: 'WelcomeAuthScreen'});
      }else {
        navigationService.navigate('AuthNavigator', {screen: 'WelcomeAuthScreen'});
      }

    }
  } catch (error) {
    console.log({error});
    yield call(authService.logout);
    navigationService.navigate('AuthNavigator', {screen: 'WelcomeAuthScreen'});
  } finally {
  }
}

function* phoneNumberSagaFn({payload}) {
  try {

    yield put(setGlobalLoader(true));
    yield put(setPhoneNumber(payload));
    console.log(payload);
    const data = {
      phoneNumber: payload.phoneNumber,
      recaptchaToken: payload.recaptchaToken
    }
    yield call(authService.login, data);
    yield put(verificationCodeError({isVisible: false}))
    navigationService.navigate('AuthNavigator', {screen: 'ConfirmationCodeAuthScreen'});
  } catch (error) {
    yield put(setGlobalError(true));
    console.log({error});
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* verificationCodeSagaFn({payload}) {
  try {
    yield put(setVerificationCode(payload));
    yield put(setGlobalLoader(true));
    const phoneNumber = yield select(phoneNumberSelector());
    const fcmToken = yield asyncStorageService.getItem('fcmToken');
    const data = {
      token: payload,
      phoneNumber: phoneNumber.phoneNumber,
      deviceToken: fcmToken
    }
    yield call(authService.verifyLogin, data);
    const user = yield call(profileService.getProfile);
    yield call(authService.updateUserInStorage, user);
    yield call(authService.setTheme, user.theme);
    yield put(setTheme(user.theme));

    yield put(verificationCodeError({isVisible: false}))
    navigationService.resetNavigationState();
  } catch (error) {
    console.log({error});
    yield put(
      verificationCodeError({
        isVisible: true,
        text: error?.response?.data?.message
          ? error.response.data.message
          : 'Something went wrong.',
      }),
    );
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* updateUser({payload}) {
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
    { payload.isEdit ?
        navigationService.goBack()
        : payload.isUpdatePhoto ? null : navigationService.resetNavigationState()}
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* getAuthUserSagaFn() {
  try {
    yield put(setSingleUser(null));
    yield put(setGlobalLoader(true));
    const user = yield call(authService.getAuthUser);

    const res = yield call(profileService.getUserAchievements,  user?.id);
    let data = [];
    Object.entries(res).forEach(([key, value]) => {
          data.push({title: helperService.getAchievementSectionTitle(key), data:[...value]})
        }
    );
    yield put(setUserAchievements(data))

    yield call(authService.updateUserInStorage, user);
    const userData = {
      user: user,
      isAuthUser: true
    };
    yield put(setActiveUser(user));
    yield put(setSingleUser(userData));
  } catch (error) {
    console.log({error});
    yield put(setGlobalLoader(false));
  } finally {
    yield put(setGlobalLoader(false));
  }
}

function* logoutFn() {
  try {
    const fcmToken = yield call(asyncStorageService.getItem, 'fcmToken');
    if (fcmToken) {
      try {
        const res = yield call(authService.deleteFcmToken, fcmToken);
        console.log('res', res);
      } catch (e) {
        console.log({e});
      }
    }
    yield call(authService.logout);
    yield call(asyncStorageService.removeItem, 'theme');
    yield put(setTheme('light'));
    navigationService.resetNavigationState();
  } catch (error) {
    console.log({error});
  } finally {
  }
}

export function* watchAuthLoadingSaga() {
  yield takeLatest(AUTH_LOADING_SAGA, authLoadingSagaFn);
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT, logoutFn);
}

export function* watchPhoneNumberSaga() {
  yield takeLatest(PHONE_NUMBER_SAGA, phoneNumberSagaFn);
}

export function* watchVerificationCodeSaga() {
  yield takeLatest(VERIFICATION_CODE_SAGA, verificationCodeSagaFn);
}

export function* watchUpdateUser() {
  yield takeLatest(UPDATE_USER, updateUser);
}

export function* watchGetAuthUser() {
  yield takeLatest(GET_AUTH_USER_SAGA, getAuthUserSagaFn);
}
