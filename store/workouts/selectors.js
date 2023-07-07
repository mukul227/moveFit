import { createSelector } from 'reselect';

const workoutStateSelector = (state) => state.workouts;

export const workoutSelector = () =>
  createSelector(workoutStateSelector, (state) => state.workout);

export const weekIdSelector = () =>
  createSelector(workoutStateSelector, (state) => state.weekId);

export const shareProgramWorkoutSelector = () =>
  createSelector(workoutStateSelector, (state) => state.shareData);

export const fromCalendarSelector = () =>
  createSelector(workoutStateSelector, (state) => state.fromCalendar);
