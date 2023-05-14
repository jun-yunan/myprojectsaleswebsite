import { createSelector } from '@reduxjs/toolkit';

export const fetchGetUserSelector = (state) => state.getUser;
export const imageUploadSelector = (state) => state.getUser.image;
export const ResponseUpdateInfoUserSelector = (state) => state.getUser.responseFetchUpdateUser;

export const profileRemainingSelector = createSelector(
    fetchGetUserSelector,
    imageUploadSelector,
    ResponseUpdateInfoUserSelector,
    (fetchGetUser, imageUpload, ResponseUpdateInfoUser) => ({
        fetchGetUser,
        imageUpload,
        ResponseUpdateInfoUser,
    }),
);
