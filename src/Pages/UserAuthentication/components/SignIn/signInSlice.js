import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersService from '~/services/usersService';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const initialState = {
    status: 'idle',
    data: {},
};

export const fetchCheckLogin = createAsyncThunk('signSlice/fetchCheckLogin', async (formData) => {
    const response = await usersService.postSignInUser(formData);
    // console.log('response: ', response);
    if (response.cookie && response.status) {
        Cookies.set(response.cookie.nameCookie, response.cookie.valueCookie);
        const cookie = Cookies.get(response.cookie.nameCookie);
        const decoded = jwt_decode(cookie);
        // console.log('decoded: ', decoded);
    }
    return response;
});

export const signInSlice = createSlice({
    name: 'checkLogin',
    initialState,
    reducers: {
        resetInitialState: (state) => {
            state.data = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCheckLogin.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchCheckLogin.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.status = 'successfully!!!';
            state.data = action.payload;
            // console.log('data: ', state.data);
        });
        builder.addCase(fetchCheckLogin.rejected, (state, action) => {
            state.status = 'fail';
            state.data = action.payload;
        });
    },
});

const signInReducer = signInSlice.reducer;
export default signInReducer;
