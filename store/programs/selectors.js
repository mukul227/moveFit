import { createSelector } from 'reselect';

const programStateSelector = (state) => state.programs;

export const programSelector = () =>
  createSelector(programStateSelector, (state) => state.program);

export const dataForHomePageSelector = () =>
  createSelector(programStateSelector, (state) => state.dataForHomePage);

export const allProgramsDataSelector = () =>
  createSelector(programStateSelector, (state) => state.allProgramsData);
