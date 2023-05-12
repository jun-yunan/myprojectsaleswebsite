import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersService from '~/services/usersService';

const initialState = {
    status: 'idle',
    user: [],
};

export const fetchUser = createAsyncThunk('profileSlice/fetchUser', async (queryUsername) => {
    const response = await usersService.getUser(queryUsername);
    return response;
});

export const getUserSlice = createSlice({
    name: 'getUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            // update state
            // console.log('Action', action.payload);
            state.user = action.payload;
            state.status = 'successfully';
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = 'fail';
            return state;
        });
    },
});

const getUserReducer = getUserSlice.reducer;
export default getUserReducer;
