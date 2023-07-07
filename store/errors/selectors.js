import { createSelector } from 'reselect';

const errorStateSelector = (state) => state.errors;

export const globalErrorSelector = () =>
  createSelector(errorStateSelector, (state) => state.globalError);

export const verificationCodeErrorSelector = () =>
    createSelector(errorStateSelector, (state) => state.verificationCode);




