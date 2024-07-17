import { createSlice } from '@reduxjs/toolkit';

const teachSlice = createSlice({
    name: 'teach',
    initialState: {
        teachs: [],
        loading: false,
        error: null,
    },
    reducers: {
        FETCH_TEACHS_OF_TEACHER_REQUEST: (state) => {
            state.loading = true;
        },
        FETCH_TEACHS_OF_TEACHER_SUCCESS: (state, action) => {
            state.loading = false;
            state.error = null;
            state.teachs = action.payload;
        },
        FETCH_TEACHS_OF_TEACHER_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default teachSlice;
