import { combineReducers } from 'redux';
import { reducer as activeUserReducer } from './auth';
import { reducer as errorReducer } from './errors';
import { reducer as helperReducer } from './helpers';
import { reducer as friendsReducer } from './friends';
import { reducer as notificationsReducer } from './notifications';
import { reducer as profileReducer } from './profile';
import { reducer as programsReducer } from './programs';
import { reducer as workoutsReducer } from './workouts';
import { reducer as journeyReducer } from './journey';
import { reducer as calendarReducer } from './calendar';
import { reducer as stripeReducer } from './stripe';
import { reducer as iapReducer } from './iap';


const reducer = combineReducers({
  activeUser: activeUserReducer,
  errors: errorReducer,
  helpers: helperReducer,
  friends: friendsReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  journey: journeyReducer,
  workouts: workoutsReducer,
  programs: programsReducer,
  calendar: calendarReducer,
  stripe: stripeReducer,
  iap: iapReducer,
});

export default function (state, action) {
  if (action.type === 'reset') {
    state = undefined;
  }
  return reducer(state, action);
}
