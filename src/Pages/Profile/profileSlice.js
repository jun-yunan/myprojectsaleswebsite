import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersService from '~/services/usersService';

export const fetchUser = createAsyncThunk('profileSlice/fetchUser', async (queryUsername) => {
    const response = await usersService.getUser(queryUsername);
    return response;
});

export const fetchUpdateUser = createAsyncThunk('profileSlice/fetchUpdateUser', async (dataUser) => {
    const response = await usersService.UpdateInfoUser(dataUser);
    console.log(response);
    return response;
});

export const getUserSlice = createSlice({
    name: 'getUser',

    initialState: {
        status: false,
        message: 'idle',
        fetchGetUser: {},
        responseFetchUpdateUser: {
            status: false,
            message: 'idle',
            data: {},
        },
    },

    reducers: {
        uploadImage: (state, action) => {
            state.image = action.payload;
        },
    },

    extraReducers: (builder) => {
        // Get Info User

        builder.addCase(fetchUser.pending, (state, action) => {
            state.message = 'Loading';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            // update state
            // console.log('Action', action.payload);
            state.message = 'Fetch Get User Successfully!!!';
            state.status = true;
            state.fetchGetUser = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.message = 'Fetch Get User Fail!!!';
            return state;
        });

        // Update Info User
        builder.addCase(fetchUpdateUser.pending, (state, action) => {
            state.responseFetchUpdateUser.message = 'Loading';
        });
        builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
            state.responseFetchUpdateUser.status = true;
            state.responseFetchUpdateUser.message = 'Fetch Update Info User Successfully!';
            state.responseFetchUpdateUser.data = action.payload;
        });
        builder.addCase(fetchUpdateUser.rejected, (state, action) => {
            state.responseFetchUpdateUser.message = 'Fetch Update Info User Fail!';
        });
    },
});

const getUserReducer = getUserSlice.reducer;
export default getUserReducer;
