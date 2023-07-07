import produce from 'immer';
import {
  IS_CALENDAR_MODAL_OPEN,
  OPEN_LOCATION_POP_UP, SET_CALENDAR_EVENTS, SET_MOVE_CALENDAR_OBJECT, SET_SCHEDULE_WORKOUT, SHOW_LOG_EVENT_MODAL,
} from './actionTypes';

const initialState = {
  isLogEventModalShow: false,
  calendarEvents: [],
  moveCalendarObject: {
    moveAll:false,
    date:null
  },
  isCalendarModalOpen: false,
  scheduleWorkout: null
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case SHOW_LOG_EVENT_MODAL:
        draft.isLogEventModalShow = payload;
        break;
      case SET_CALENDAR_EVENTS:
        draft.calendarEvents = payload;
        break;
      case IS_CALENDAR_MODAL_OPEN:
        draft.isCalendarModalOpen = payload;
        break;
      case SET_SCHEDULE_WORKOUT:
        draft.scheduleWorkout = payload;
        break;
      case SET_MOVE_CALENDAR_OBJECT:
        draft.moveCalendarObject = {
          moveAll: payload.moveAll,
          date: payload.date
        };
        break;
    }
  });
}

export default reducer;
