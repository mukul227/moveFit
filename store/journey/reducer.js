import produce from 'immer';
import {
  IS_HABIT_MODAL_OPEN, SET_HABITS
} from './actionTypes';

const initialState = {
  isHabitModalOpen:false,
  habits:[]
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case IS_HABIT_MODAL_OPEN:
        draft.isHabitModalOpen = payload;
        break;
      case SET_HABITS:
        draft.habits = payload;
        break;
    }
  });
}

export default reducer;
