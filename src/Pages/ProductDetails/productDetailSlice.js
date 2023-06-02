import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService, productService } from '~/services';

export const fetchAddToCart = createAsyncThunk('productDetail/fetchAddToCart', async (info) => {
    const response = await cartService.addToCart(info);
    return response;
});

export const fetchGetProductById = createAsyncThunk('productDetail/fetchGetProductById', async (productId) => {
    const response = await productService.getProductById(productId);
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
        getProductById: {
            isLoading: false,
            status: false,
            message: 'idle',
            data: null,
        },
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
            })
            .addCase(fetchGetProductById.pending, (state, action) => {
                state.getProductById.isLoading = true;
                state.getProductById.message = 'Loading';
                state.getProductById.status = false;
                // state.getProductById.data = null;
            })
            .addCase(fetchGetProductById.fulfilled, (state, action) => {
                state.getProductById.isLoading = false;
                state.getProductById.message = 'idle';
                state.getProductById.status = true;
                state.getProductById.data = action.payload;
            });
    },
});

const productDetailReducer = productDetailSlice.reducer;
export default productDetailReducer;
