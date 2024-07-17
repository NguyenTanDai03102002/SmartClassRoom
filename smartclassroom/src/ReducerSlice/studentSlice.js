import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: [],
        totalPages: null,
        pageNumber: null,
        error: null,
        loading: false,
    },
    reducers: {
        PUT_STUDENTS_TO_CLASS_SUCCESS: (state, action) => {
            state.error = null;
            state.students = action.payload.content;
            state.pageNumber = action.payload.pageable.pageNumber;
            state.totalPages = action.payload.totalPages;
            state.loading = false;
        },
        PUT_STUDENTS_TO_CLASS_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.students = [];
        },
        LOADING: (state) => {
            state.loading = true;
        },
    },
});
export default studentSlice;
