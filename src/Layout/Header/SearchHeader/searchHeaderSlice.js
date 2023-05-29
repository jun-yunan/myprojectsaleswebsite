import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { cartService } from '~/services';

export const setInputValueSearch = createAction('searchHeader/setInputValueSearch');

export const fetchSearchProduct = createAsyncThunk('searchHeader/fetchSearchProduct', async (searchValue) => {
    const response = await cartService.searchProduct(searchValue);
    return response;
});

export const searchHeaderSlice = createSlice({
    name: 'searchHeader',
    initialState: {
        searchValue: '',
        searchResult: null,
        isLoading: false,
        error: null,
        historySearch: [],
    },
    reducers: {
        // setSearchValue: (state, action) => {
        //     state.searchText = action.payload;
        // },
        addHistorySearch: (state, action) => {
            state.historySearch.push(action.payload);
        },
        resetSearchResult: (state, action) => {
            state.searchResult = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // setInputValueSearch
            .addCase(setInputValueSearch, (state, action) => {
                state.searchValue = action.payload;
                state.historySearch.push(action.payload);
            })

            // fetchSearchProduct
            .addCase(fetchSearchProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSearchProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResult = action.payload;
            })
            .addCase(fetchSearchProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

const searchHeaderReducer = searchHeaderSlice.reducer;
export default searchHeaderReducer;
