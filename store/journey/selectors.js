import { createSelector } from 'reselect';

const journeyStateSelector = (state) => state.journey;

export const isHabitModalOpenSelector = () =>
  createSelector(journeyStateSelector, (state) => state.isHabitModalOpen);

export const habitsSelector = () =>
  createSelector(journeyStateSelector, (state) => state.habits);





