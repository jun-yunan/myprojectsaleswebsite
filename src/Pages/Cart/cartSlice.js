import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '~/services';

export const fetchGetProductCart = createAsyncThunk('cart/fetchGetProductCart', async (userId) => {
    const response = await cartService.getProductCart(userId);
    return response;
});

export const fetchHandleDecrease = createAsyncThunk('cart/fetchHandleDecrease', async (data) => {
    const response = await cartService.decreaseQuantity(data);
    return response;
});

export const fetchHandleIncrease = createAsyncThunk('cart/fetchHandleIncrease', async (data) => {
    const response = await cartService.increaseQuantity(data);
    return response;
});

export const fetchDeleteProduct = createAsyncThunk('cart/fetchDeleteProduct', async (data) => {
    const response = await cartService.deleteProduct(data);
    return response;
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        getProductCart: {
            status: false,
            message: 'idle',
            response: {},
        },
        quantity: {
            status: false,
            message: 'idle',
            response: {},
        },
        deleteProduct: {
            status: false,
            message: 'idle',
            response: {},
        },
        selectAll: false,
    },
    reducers: {
        toggleCheckbox: (state, action) => {
            const productId = action.payload;
            const product = state.getProductCart.response.listProduct.find((item) => item._id === productId);
            if (product) {
                product.isChecked = !product.isChecked;
            }
        },
        toggleSelectAll: (state) => {
            state.selectAll = !state.selectAll;
            state.getProductCart.response.listProduct.forEach((product) => {
                product.isChecked = state.selectAll;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchGetProductCart
            .addCase(fetchGetProductCart.pending, (state, action) => {
                state.getProductCart.message = 'Loading';
                state.getProductCart.status = false;
                state.getProductCart.response = {};
            })
            .addCase(fetchGetProductCart.fulfilled, (state, action) => {
                state.getProductCart.message = 'Successfully';
                state.getProductCart.status = true;
                state.getProductCart.response = action.payload;
            })

            //fetchHandleDecrease
            .addCase(fetchHandleDecrease.pending, (state, action) => {
                state.quantity.status = false;
                state.quantity.message = 'Loading';
                state.quantity.response = {};
            })
            .addCase(fetchHandleDecrease.fulfilled, (state, action) => {
                state.quantity.status = true;
                state.quantity.message = 'Successfully';
                state.quantity.response = action.payload;
            })

            //fetchHandleIncrease
            .addCase(fetchHandleIncrease.pending, (state, action) => {
                state.quantity.status = false;
                state.quantity.message = 'Loading';
                state.quantity.response = {};
            })

            .addCase(fetchHandleIncrease.fulfilled, (state, action) => {
                state.quantity.status = true;
                state.quantity.message = 'Successfully';
                state.quantity.response = action.payload;
            })

            //fetchDeleteProduct
            .addCase(fetchDeleteProduct.pending, (state, action) => {
                state.deleteProduct.message = 'Loading';
                state.deleteProduct.status = false;
                state.deleteProduct.response = {};
            })
            .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
                state.deleteProduct.message = 'Successfully';
                state.deleteProduct.status = true;
                state.deleteProduct.response = action.payload;
            });
    },
});

const cartReducer = cartSlice.reducer;
export default cartReducer;
