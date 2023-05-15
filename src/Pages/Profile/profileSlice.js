import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersService from '~/services/usersService';

export const fetchUser = createAsyncThunk('profileSlice/fetchUser', async (queryUsername) => {
    const response = await usersService.getUser(queryUsername);
    return response;
});

export const fetchUpdateUser = createAsyncThunk('profileSlice/fetchUpdateUser', async (dataUser) => {
    const response = await usersService.UpdateInfoUser(dataUser);
    // console.log(response);
    return response;
});

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        fetchGetUser: { status: false, message: 'idle', response: {} },
        fetchUpdateUser: { status: false, message: 'idle', response: {} },
        image: '',
    },
    reducers: {
        uploadImage: (state, action) => {
            state.image = action.payload;
        },
        resetFetchGetUser: (state, action) => {
            state.fetchGetUser.status = false;
            state.fetchGetUser.message = 'idle';
            state.fetchGetUser.response = {};
        },
        resetStatusUpdateUser: (state) => {
            state.fetchUpdateUser.status = false;
        },
        restoreStateImage: (state, action) => {
            state.image = action.payload;
        },
        resetImageUpload: (state) => {
            state.image = '';
        },
    },

    extraReducers: (builder) => {
        // Get Info User
        builder
            .addCase(fetchUser.pending, (state) => {
                state.fetchGetUser.message = 'Loading';
                state.fetchGetUser.status = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.fetchGetUser.response = action.payload;
                state.fetchGetUser.message = 'Fetch Get User Successfully!!!';
                state.fetchGetUser.status = true;
            })

            // Update Info User
            .addCase(fetchUpdateUser.pending, (state) => {
                state.fetchUpdateUser.message = 'Loading';
                state.fetchUpdateUser.status = false;
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                state.fetchUpdateUser.response = action.payload;
                state.fetchUpdateUser.status = true;
                state.fetchUpdateUser.message = 'Fetch Update Info User Successfully!';
            });
    },
});

const profileReducer = profileSlice.reducer;
export default profileReducer;
