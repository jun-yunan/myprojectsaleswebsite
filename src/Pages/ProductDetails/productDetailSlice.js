import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '~/services';

export const fetchAddToCart = createAsyncThunk('productDetail/fetchAddToCart', async (info) => {
    const response = await cartService.addToCart(info);
    return response;
});

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        addToCart: {
            status: false,
            message: 'idle',
            response: {},
        },
        quantity: 1,
    },
    reducers: {
        decrease: (state) => {
            state.quantity = state.quantity - 1;
        },
        increase: (state) => {
            state.quantity = state.quantity + 1;
        },
        resetQuantity: (state) => {
            state.quantity = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddToCart.pending, (state, action) => {
                state.addToCart.message = 'loading';
                state.addToCart.status = false;
                state.addToCart.response = {};
            })
            .addCase(fetchAddToCart.fulfilled, (state, action) => {
                state.addToCart.response = action.payload;
                state.addToCart.message = 'Successfully';
                state.addToCart.status = true;
            });
    },
});

const productDetailReducer = productDetailSlice.reducer;
export default productDetailReducer;
