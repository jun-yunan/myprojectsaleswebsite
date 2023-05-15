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
        },
        avatar: '',
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetUserLogin.pending, (state, action) => {
                state.getUser.message = 'Loading';
                state.getUser.status = false;
                state.getUser.response = {};
            })
            .addCase(fetchGetUserLogin.fulfilled, (state, action) => {
                state.getUser.message = 'Successfully';
                state.getUser.status = true;
                state.getUser.response = action.payload;
            });
    },
});

const headerReducer = headerSlice.reducer;
export default headerReducer;
