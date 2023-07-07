import { createSelector } from 'reselect';

const calendarStateSelector = (state) => state.calendar;

export const isLogEventModalShowSelector = () =>
  createSelector(calendarStateSelector, (state) => state.isLogEventModalShow);

export const calendarEventsSelector = () =>
  createSelector(calendarStateSelector, (state) => state.calendarEvents);

export const moveCalendarObjectSelector = () =>
  createSelector(calendarStateSelector, (state) => state.moveCalendarObject);

export const isCalendarModalOpenSelector = () =>
  createSelector(calendarStateSelector, (state) => state.isCalendarModalOpen);

export const scheduleWorkoutSelector = () =>
  createSelector(calendarStateSelector, (state) => state.scheduleWorkout);






