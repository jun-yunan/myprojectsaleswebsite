import { createSlice } from '@reduxjs/toolkit';

export const avatarSlice = createSlice({
    name: 'avatar',
    initialState: {
        image: '',
    },
    reducers: {
        getImage: (state, action) => {
            state.image = action.payload;
        },
    },
});

const avatarReducer = avatarSlice.reducer;
export default avatarReducer;
