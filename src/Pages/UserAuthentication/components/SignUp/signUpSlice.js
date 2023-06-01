import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersService } from '~/services';

export const fetchCreateAccount = createAsyncThunk('signUp/fetchCreateAccount', async (data) => {
    const response = await usersService.postSignUpUser(data);
    return response;
});

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState: { isLoading: false, status: false, message: 'idle', data: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateAccount.pending, (state, action) => {
                state.isLoading = true;
                state.message = 'Loading';
                state.status = false;
            })
            .addCase(fetchCreateAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = true;
                state.message = 'idle';
                state.data = action.payload;
            });
    },
});

const signUpReducer = signUpSlice.reducer;
export default signUpReducer;
