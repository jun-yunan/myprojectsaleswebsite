import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '~/services';

export const fetchGetAllProduct = createAsyncThunk('home/fetchGetAllProduct', async () => {
    const response = await productService.getAllProducts();
    return response;
});

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        getAllProducts: {
            isLoading: false,
            status: false,
            message: 'idle',
            data: null,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllProduct.pending, (state, action) => {
                state.getAllProducts.isLoading = true;
                state.getAllProducts.message = 'loading';
                state.getAllProducts.status = false;
            })
            .addCase(fetchGetAllProduct.fulfilled, (state, action) => {
                state.getAllProducts.isLoading = false;
                state.getAllProducts.message = 'idle';
                state.getAllProducts.status = true;
                state.getAllProducts.data = action.payload;
            });
    },
});

const homeReducer = homeSlice.reducer;
export default homeReducer;
