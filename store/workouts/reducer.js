import produce from 'immer';
import {
  FROM_CALENDAR,
  SET_SHARE_PROGRAM, SET_SHARE_WORKOUT,
  SET_WEEK_ID,
  SET_WORKOUT
} from './actionTypes';

const initialState = {
  workout: {},
  weekId: null,
  shareData: {
    program: '',
    workout: ''
  },
  fromCalendar: false
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case SET_WORKOUT:
        draft.workout = payload;
        break;
      case SET_WEEK_ID:
        draft.weekId = payload;
        break;
      case SET_SHARE_PROGRAM:
        draft.shareData.program = payload;
        break;
      case SET_SHARE_WORKOUT:
        draft.shareData.workout = payload;
        break;
      case FROM_CALENDAR:
        draft.fromCalendar = payload;
        break;
    }
  });
}

export default reducer;
