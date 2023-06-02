import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '~/services';

export const fetchGetProductsByType = createAsyncThunk('product/fetchGetProductsByType', async (queryTypeProduct) => {
    const response = productService.product(queryTypeProduct);
    return response;
});

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        status: false,
        message: 'idle',
        data: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetProductsByType.pending, (state, action) => {
                state.isLoading = true;
                state.message = 'Loading';
                state.status = false;
            })
            .addCase(fetchGetProductsByType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = 'idle';
                state.status = true;
                state.data = action.payload;
            });
    },
});

const productReducer = productSlice.reducer;
export default productReducer;
