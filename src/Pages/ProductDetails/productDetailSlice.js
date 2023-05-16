import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '~/services';

export const fetchAddToCart = createAsyncThunk('productDetail/fetchAddToCart', async (info) => {
    const response = await cartService.addToCart(info);
    return response;
});

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        getProductById: {
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddToCart.pending, (state, action) => {
                state.getProductById.message = 'loading';
                state.getProductById.status = false;
                state.getProductById.response = {};
            })
            .addCase(fetchAddToCart.fulfilled, (state, action) => {
                state.getProductById.response = action.payload;
                state.getProductById.message = 'Successfully';
                state.getProductById.status = true;
            });
    },
});

const productDetailReducer = productDetailSlice.reducer;
export default productDetailReducer;
