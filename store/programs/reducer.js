import produce from 'immer';
import {
  SET_PROGRAM,
  SET_DATA_FOR_HOME_PAGE,
  SET_ALL_PROGRAMS
} from './actionTypes';

const initialState = {
  program: {},
  dataForHomePage: {},
  allProgramsData: {}
};

function reducer(state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    /*eslint-disable indent */
    switch (type) {
      case SET_PROGRAM:
        draft.program = payload;
        break;

      case SET_DATA_FOR_HOME_PAGE:
        draft.dataForHomePage = payload;
        break;

      case SET_ALL_PROGRAMS:
        draft.allProgramsData = payload;
        break;
    }
  });
}

export default reducer;
