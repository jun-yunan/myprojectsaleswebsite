import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersService from '~/services/usersService';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export const fetchCheckLogin = createAsyncThunk('signInSlice/fetchCheckLogin', async (formData) => {
    const response = await usersService.postSignInUser(formData);
    // console.log('response: ', response);

    if (response.status) {
        Cookies.set(response.cookie.nameCookie, response.cookie.valueCookie);
        const cookie = Cookies.get(response.cookie.nameCookie);
        const decoded = jwt_decode(cookie);
        console.log('decoded: ', decoded);
    }

    return response;
});

export const signInSlice = createSlice({
    name: 'checkLogin',
    initialState: {
        status: false,
        message: 'idle',
        data: null,
    },
    reducers: {
        resetInitialState: (state) => {
            state.status = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCheckLogin.pending, (state) => {
                state.status = false;
                state.message = 'Loading';
            })
            .addCase(fetchCheckLogin.fulfilled, (state, action) => {
                state.message = 'Fetch Check Login Successfully!!!';
                state.status = true;
                state.data = action.payload;
            })
            .addCase(fetchCheckLogin.rejected, (state, action) => {
                state.message = 'Fetch Check Login Fail!!!';
                state.data = action.payload;
                state.status = false;
            });
    },
});

const signInReducer = signInSlice.reducer;
export default signInReducer;
