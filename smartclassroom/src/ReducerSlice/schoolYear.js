import { createSlice } from '@reduxjs/toolkit';

const schoolSlice = createSlice({
    name: 'schoolYear',
    initialState: {
        SchoolYears: [],
        Loading: false,
        Error: null,
    },

    reducers: {
        FETCH_ALL_SchoolYears_REQUEST: (state) => {
            state.Loading = true;
        },
        FETCH_ALL_SchoolYears_SUCCESS: (state, action) => {
            state.Loading = false;
            state.SchoolYears = action.payload;
            state.Error = null;
        },
        FETCH_ALL_SchoolYears_FAILURE: (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        },
    },
});

export default schoolSlice;
