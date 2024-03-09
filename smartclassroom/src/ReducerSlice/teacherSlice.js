import { createSlice } from '@reduxjs/toolkit';

const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
        teachers: [],
        error: null,
    },
    reducers: {
        FETCH_ALL_TEACHERS_SUCCESS: (state, action) => {
            state.teachers = action.payload;
        },
        FETCH_ALL_TEACHERS_FAILURE: (state, action) => {
            state.error = action.payload;
        },
    },
});

export default teacherSlice;
