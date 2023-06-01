import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersService from '~/services/usersService';

export const fetchGetUserLogin = createAsyncThunk('header/fetchGetUserLogin', async (username) => {
    const response = await usersService.getUser(username);
    return response;
});

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        getUser: {
            status: false,
            message: 'idle',
            response: {},
            isLoading: false,
        },
        avatar: '',
        infoUser: {
            status: false,
            username: '',
            userId: '',
        },
    },
    reducers: {
        resetStateHeader: (state) => {
            state.getUser.message = 'idle';
            state.getUser.response = {};
            state.getUser.status = false;
        },

        getAvatarUpload: (state, action) => {
            state.avatar = action.payload;
        },

        getUserId: (state, action) => {
            state.infoUser.userId = action.payload.userId;
            state.infoUser.username = action.payload.username;
            state.infoUser.status = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetUserLogin.pending, (state, action) => {
                state.getUser.message = 'Loading';
                state.getUser.status = false;
                state.getUser.isLoading = true;
            })
            .addCase(fetchGetUserLogin.fulfilled, (state, action) => {
                state.getUser.message = 'Successfully';
                state.getUser.status = true;
                state.getUser.response = action.payload;
                state.getUser.isLoading = false;
            });
    },
});

const headerReducer = headerSlice.reducer;
export default headerReducer;
