import * as authSagas from './auth/sagas';
import * as helperSagas from './helpers/sagas';
import * as friendsSagas from './friends/sagas';
import * as notificationsSagas from './notifications/sagas';
import * as profileSagas from './profile/sagas';
import * as journeySagas from './journey/sagas';
import * as workoutSagas from './workouts/sagas';
import * as programsSagas from './programs/sagas';
import * as calendarSagas from './calendar/sagas';
import * as checkoutSagas from './stripe/sagas';
import * as iapSagas from './iap/sagas';

const sagas = {
  ...authSagas,
  ...helperSagas,
  ...friendsSagas,
  ...notificationsSagas,
  ...profileSagas,
  ...journeySagas,
  ...workoutSagas,
  ...programsSagas,
  ...calendarSagas,
  ...checkoutSagas,
  ...iapSagas,
};

export default sagas;
