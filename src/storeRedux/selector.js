import { createSelector } from '@reduxjs/toolkit';

export const fetchCheckLoginSelector = (state) => state.checkLogin;

export const fetchCheckLoginResult = createSelector(fetchCheckLoginSelector, (result) => {
    return result;
});
